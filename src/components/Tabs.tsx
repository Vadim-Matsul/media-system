import React, {
  useEffect,
  useReducer,
  useRef,
  useState
} from 'react';
import { Film, UpgradeRef } from '../types';
import ErrorBoundaries from './ErrorBoundaries';
import Stories from './Stories';
import VideoPlayer from './VideoPlayer';

type TabsProps = {
  film: Film
};

const Tabs: React.FC<TabsProps> = ({ film }) => {
  const [isFilm, setIsFilm] = useState(true);
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


  const handleChangeActive = () => setIsFilm(p => !p);

  return (
    <div className='tab-wrap'>

      <div className='tab-toggle' onClick={handleChangeActive}>
        <button
          className={`btn btn-movie ${isFilm ? 'btn-movie--active' : ''}`}
        > Movie </button>
        <button
          className={`btn btn-movie ${!isFilm ? 'btn-movie--active' : ''}`}
        > Stories </button>
      </div>

      <div className='tab-elements'>
        <ErrorBoundaries>
          {
            isFilm
              ? <VideoPlayer
                preview={film.posterUrlPreview}
                parentForceUpdate={parentForceUpdate}
                initSmall={false}
                ref={PlayerRef}
              />
              : <Stories filmId={film.kinopoiskId} />
          }
        </ErrorBoundaries>
      </div>

    </div>
  )
}

export default Tabs;
