import React, { useEffect, useReducer, useRef, useState } from 'react';
import { Film, UpgradeRef } from '../types';
import ErrorBoundaries from './ErrorBoundaries';
import { Collapse } from './svg/Collapse';
import { Expand } from './svg/Expand';
import { Pause } from './svg/Pause';
import { Play } from './svg/Play';
import { PlayButton } from './svg/PlayButton';
import VideoPlayer from './VideoPlayer';

type TabsProps = {
  film: Film
};

const Tabs: React.FC<TabsProps> = ({ film }) => {
  const [active, setActive] = useState({ isFilm: true, isStories: false })
  const PlayerRef = useRef<HTMLVideoElement>(null);
  const [, parentForceUpdate] = useReducer(n => n + 1, 0);

  const obj = PlayerRef.current as unknown as UpgradeRef;

  useEffect(() => {
    if (obj && obj.togglers.Flags.current.isOpen) {
      const { isSmall, isPlay, values } = obj.togglers.Flags.current;
      const { big, small } = values;

      const video = obj.current.current;
      const active = obj.togglers.Active.current;
      const sizer = obj.togglers.Size.current;

      isSmall
        ? video!.width = small
        : video!.width = big;

      active.onclick = () => {
        isPlay
          ? obj.videoPause()
          : obj.videoPlay();
      };

      sizer.onclick = () => {
        const isSmall = obj.changeSize();

        isSmall
          ? video!.width = small
          : video!.width = big;
      };

    }
  });


  const handleChangeActive = (evt: React.MouseEvent<HTMLDivElement>) => {
    const element = evt.target as HTMLButtonElement;
    setActive({ isFilm: false, isStories: false, [element.name]: true });
  };


  return (
    <div className='tab-wrap'>

      <div className='tab-toggle' onClick={handleChangeActive}>
        <button
          name='isFilm'
          className={`btn btn-movie ${active.isFilm ? 'btn-movie--active' : ''}`}
        > Movie </button>
        <button
          name='isStories'
          className={`btn btn-movie ${active.isStories ? 'btn-movie--active' : ''}`}
        > Stories </button>
      </div>

      <div className='tab-elements'>
        {active.isFilm &&
          <ErrorBoundaries>
            <VideoPlayer
              preview={film.posterUrlPreview}
              parentForceUpdate={parentForceUpdate}
              initSmall={false}
              ref={PlayerRef}
            />
          </ErrorBoundaries>
        }
      </div>

    </div>
  )
}

export default Tabs;
