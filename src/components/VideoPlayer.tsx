/* eslint-disable react-hooks/exhaustive-deps */
import React, { DispatchWithoutAction, MutableRefObject, RefObject, useEffect, useImperativeHandle, useLayoutEffect, useMemo, useReducer, useRef, useState, useTransition } from 'react'
import { createPortal } from 'react-dom';
import { throttle } from '../helpers/utils';
import { Collapse } from './svg/Collapse';
import { Expand } from './svg/Expand';
import { Pause } from './svg/Pause';
import { Play } from './svg/Play';
import { PlayButton } from './svg/PlayButton';

type VideoPlayerProps = {
  preview: string;
  parentForceUpdate: DispatchWithoutAction;
  shouldWhow?: boolean;
  initSmall?: boolean;
}


const VideoPlayer = React.forwardRef(
  (props: VideoPlayerProps, ref) => {
    const {
      preview,
      shouldWhow = true,
      parentForceUpdate,
      initSmall = true,
    } = props;
    const VideoRef = useRef<HTMLVideoElement>(null);
    const staticSource = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

    const [, forceUpdate] = useReducer(n => n + 1, 0);


    const FlagsRef = useRef({
      canRemove: false,
      isSmall: initSmall,
      isOpen: false,
      isPlay: true,
      values: {
        big: window.innerWidth * .75 - 60,
        small: 300,
      }
    });
    const SizeRef = useRef(null);
    const ActiveRef = useRef(null);


    const [container, modal] = useMemo(() => {
      const background = document.createElement('section');
      const element = document.createElement('div');

      background.setAttribute('class', 'modal-background');
      element.setAttribute('class', 'modal-player');

      background.onclick = handleModal;
      element.onclick = evt => evt.stopPropagation();

      background.appendChild(element);

      return [background, element];
    }, []);


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
        parentForceUpdate();
      }

      const listener = throttle(handleSize, 200);

      window.addEventListener('resize', listener);
      return () => window.removeEventListener('resize', listener);
    }, []);


    useImperativeHandle(ref, () => ({
      current: VideoRef,

      togglers: {
        Size: SizeRef,
        Active: ActiveRef,
        Flags: FlagsRef
      },

      videoPlay() {
        FlagsRef.current.isPlay = true;
        parentForceUpdate();
        forceUpdate();
        this.current!.current!.play();
      },

      videoPause() {
        FlagsRef.current.isPlay = false;
        parentForceUpdate();
        forceUpdate();
        this.current!.current!.pause();
      },

      videoReload() { this.current!.current!.load(); },

      changeOpen() {
        FlagsRef.current.isOpen = !FlagsRef.current.isOpen
        forceUpdate();
      },

      changeSize() {
        FlagsRef.current.isSmall = !FlagsRef.current.isSmall;
        forceUpdate();
        return FlagsRef.current.isSmall;
      }

    }), []);


    function handleModal() {
      setTimeout(() => {
        if (FlagsRef.current.isOpen && VideoRef.current) VideoRef.current.play();
      });

      FlagsRef.current.isOpen = !FlagsRef.current.isOpen;

      FlagsRef.current.isOpen
        ? FlagsRef.current.isPlay = true
        : FlagsRef.current.isPlay = false;

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
            height='300'
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
                  ref={VideoRef}
                  className='player-video-modal'
                >
                  <source src={staticSource} />
                </video>
                <span
                  className='player-modal-close'
                  onClick={handleModal}
                />
                <div className='modal-toggle-wrap' >
                  <div className='modal-toggle-size' ref={SizeRef} >
                    {FlagsRef.current.isSmall
                      ? <Expand />
                      : <Collapse />
                    }
                  </div>
                  <div className='modal-toggle-time' ref={ActiveRef} >
                    {FlagsRef.current.isPlay
                      ? <Pause />
                      : <Play />
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

