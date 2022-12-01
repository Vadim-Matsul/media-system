/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useReducer, useRef, useState } from 'react';
import ErrorBoundaries from './ErrorBoundaries';
import { Film, UpgradeRef } from '../types';
import VideoPlayer from './VideoPlayer';

type PromotionProps = {
  film: Film;
};

let clickRender = 1;


const Promotion: React.FC<PromotionProps> = ({ film }) => {

  const PlayerRef = useRef<HTMLVideoElement>(null);
  const [, parentForceUpdate] = useReducer(n => n + 1, 0);

  const [autoStart, setAutoStart] = useState(false);
  const autoClose = useRef(false);

  function openAfterThreeSeconds() {
    setTimeout(() => setAutoStart(true), 3000);
  };

  function closeAfterTenSeconds() {
    setTimeout(() => {
      if (!document.querySelector('section')) return;
      autoClose.current = true;
      parentForceUpdate();
    }, 10000);
  };

  useEffect(() => openAfterThreeSeconds(), []);

  useEffect(() => {
    const config = PlayerRef.current as unknown as UpgradeRef;

    if (config) {
      const { isOpen, loadMeta, wasClick, isBlock, isSmall, values } = config.togglers.Flags.current;
      const { big, small } = values;
      const video = config.current.current;
      const sizer = config.togglers.Size.current;

      if (isOpen) {
        if (autoClose.current) {
          (async function () {
            config.changeBlock(false);
            config.changeSize(true);
            await config.changeOpen();
            autoClose.current = false;
            parentForceUpdate();
          })();
        }

        if (loadMeta && wasClick === clickRender) {
          closeAfterTenSeconds()
          clickRender++
        };

        if (video) {
          isSmall
            ? video.width = small
            : video.width = big;

          sizer.onclick = () => {
            if (isBlock) return;
            video.width = big;
            config.changeSize(false);
            config.changeBlock(true);
          }
        }
      } else {
        if (autoStart && !wasClick) {
          (async function () {
            await config
              .changeOpen()
              .then(() => {
                setTimeout(async () => {
                  const ok = await config.videoPlay();
                  ok && closeAfterTenSeconds();
                  if (!ok) {
                    config.current.current.muted = true;
                    await config.videoPlay();
                    closeAfterTenSeconds();
                  }
                  setAutoStart(false);
                })
              });
          })();
        }
      }
    }
  });


  return (
    <div className='promotion-wrap'>
      <ErrorBoundaries>
        <VideoPlayer
          preview={film.posterUrlPreview}
          parentForceUpdate={parentForceUpdate}
          shouldWhow={false}
          ref={PlayerRef}
        />
      </ErrorBoundaries>
    </div>
  )
}

export default Promotion;
