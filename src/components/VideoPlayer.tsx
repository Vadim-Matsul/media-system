/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  DispatchWithoutAction,
  useImperativeHandle,
  useReducer,
  useEffect,
  useState,
  useMemo,
  useRef,
} from 'react';
import { PlayButton } from './svg/PlayButton';
import { throttle } from '../helpers/utils';
import { Collapse } from './svg/Collapse';
import { createPortal } from 'react-dom';
import { Expand } from './svg/Expand';
import { Pause } from './svg/Pause';
import { Muted } from './svg/Muted';
import { Play } from './svg/Play';


type VideoPlayerProps = {
  preview: string;
  parentForceUpdate: DispatchWithoutAction;
  shouldWhow?: boolean;
  initSmall?: boolean;
  smallSize?: number;
}

const staticSource = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';


const VideoPlayer = React.forwardRef(
  (props: VideoPlayerProps, ref) => {

    const {
      preview,
      shouldWhow = true,
      parentForceUpdate,
      initSmall = true,
      smallSize = 300,
    } = props;
    const VideoRef = useRef<HTMLVideoElement>(null);
    const [, forceUpdate] = useReducer(n => n + 1, 0);
    const [videoError, setVideoErorr] = useState(false);


    const FlagsRef = useRef({
      canRemove: false,
      isSmall: initSmall,
      isOpen: false,
      isPlay: true,
      wasClick: 0,
      isBlock: false,
      loadMeta: false,
      values: {
        big: window.innerWidth * .75 - 60,
        small: smallSize,
      },
    });
    const SizeRef = useRef(null);
    const ActiveRef = useRef(null);

    const [container, modal] = useMemo(() => {
      const background = document.createElement('section');
      const element = document.createElement('div');

      background.setAttribute('class', 'modal-background');
      element.setAttribute('class', 'modal-player');

      if (shouldWhow) {
        background.onclick = handleModal;
        element.onclick = evt => evt.stopPropagation();
      }

      background.appendChild(element);

      return [background, element];
    }, []);


    useEffect(() => {
      const instance = VideoRef.current;
      if (!instance) return;

      const listener = () => {
        FlagsRef.current.isOpen
          ? FlagsRef.current.loadMeta = true
          : FlagsRef.current.loadMeta = false;
        force();
      };

      instance.addEventListener('loadedmetadata', listener);
      return () => instance.removeEventListener('loadedmetadata', listener);
    }, [VideoRef.current, FlagsRef.current.isOpen]);


    useEffect(() => {
      if (FlagsRef.current.isOpen) {
        document.body.appendChild(container);
        FlagsRef.current.isOpen = true;
        FlagsRef.current.canRemove = true;
      } else if (FlagsRef.current.canRemove) {
        document.body.removeChild(container);
        FlagsRef.current.isOpen = false;
        FlagsRef.current.canRemove = false;
      }

      return () => {
        if (FlagsRef.current.canRemove) {
          document.body.removeChild(container);
          FlagsRef.current.isOpen = false;
          FlagsRef.current.canRemove = false;
        }
      };
    }, [FlagsRef.current.isOpen]);


    useEffect(() => {
      function handleSize() {
        let currentSize = window.innerWidth * .75 - 60;
        const { small } = FlagsRef.current.values;

        if (currentSize < small) currentSize = small + 50;
        FlagsRef.current.values.big = currentSize;

        if (FlagsRef.current.isOpen && !FlagsRef.current.isSmall) {
          parentForceUpdate();
        }
      }

      const listener = throttle(handleSize, 500);

      window.addEventListener('resize', listener);
      return () => window.removeEventListener('resize', listener);
    }, []);


    useImperativeHandle(ref, () => ({
      current: VideoRef,

      togglers: {
        Size: SizeRef,
        Active: ActiveRef,
        Flags: FlagsRef,
      },

      async videoPlay() {
        return await this.current!.current!.play()
          .then(
            () => {
              FlagsRef.current.isPlay = true;
              return true;
            },
            () => {
              FlagsRef.current.isPlay = false;
              setVideoErorr(true);
              return false;
            })
          .finally(() => force());
      },

      videoPause() {
        FlagsRef.current.isPlay = false;
        force();
        this.current!.current!.pause();
      },

      changeOpen() {
        FlagsRef.current.isOpen = !FlagsRef.current.isOpen

        if (FlagsRef.current.isOpen) {
          FlagsRef.current.isPlay = true
        } else if (!FlagsRef.current.isOpen) {
          FlagsRef.current.isPlay = false;
          FlagsRef.current.loadMeta = false;
        }

        force();

        return new Promise(res => setTimeout(() => res(FlagsRef.current.isOpen)));
      },

      changeBlock(boolean: boolean) {
        FlagsRef.current.isBlock = boolean;
        force();
      },

      changeSize(isSmall?: boolean) {
        let choose = !FlagsRef.current.isSmall;
        if (typeof isSmall !== 'undefined') choose = isSmall;

        FlagsRef.current.isSmall = choose;
        forceUpdate();
        return FlagsRef.current.isSmall;
      }

    }), []);


    function handleModal() {
      FlagsRef.current.wasClick++;
      FlagsRef.current.isOpen = !FlagsRef.current.isOpen;

      if (FlagsRef.current.isOpen) {
        forceUpdate()
        setTimeout(async () => await VideoRef.current!.play());
      }

      videoError && setVideoErorr(false);

      if (FlagsRef.current.isOpen) {
        FlagsRef.current.isPlay = true
      } else if (!FlagsRef.current.isOpen) {
        FlagsRef.current.isPlay = false;
        FlagsRef.current.loadMeta = false;
      }

      force();
    };

    function force() {
      forceUpdate();
      parentForceUpdate();
    };

    return (
      <>
        <div className='player-wrap'>
          <img
            className='player-wrap--image'
            src={preview}
            width='100%'
            height='400'
            alt={'test'}
          />
          <PlayButton
            className='player-play'
            onClick={handleModal}
          />
        </div>
        {
          FlagsRef.current.isOpen
            ? createPortal(
              <>
                <video
                  className='player-video-modal'
                  ref={VideoRef}
                >
                  <source src={staticSource} />
                </video>
                {shouldWhow &&
                  <span
                    className='player-modal-close'
                    onClick={handleModal}
                  />
                }
                {
                  videoError &&
                  <Muted
                    className='player-video-muted'
                    onClick={() => {
                      setVideoErorr(false);
                      VideoRef.current!.muted = false;
                    }}
                  />
                }
                <div className='modal-toggle-wrap' >
                  <div ref={SizeRef}>
                    {
                      FlagsRef.current.isSmall
                        ? <Expand />
                        : <Collapse
                          className={`${FlagsRef.current.isBlock ? 'block' : ''}`}
                        />
                    }
                  </div>
                  <div ref={ActiveRef}>
                    {
                      shouldWhow &&
                      <>
                        {
                          FlagsRef.current.isPlay
                            ? <Pause />
                            : <Play />
                        }
                      </>
                    }
                  </div>
                </div>
              </>
              , modal)
            : <></>
        }
      </>
    );
  });

VideoPlayer.displayName = 'VideoPlayer';
export default React.memo(VideoPlayer);
