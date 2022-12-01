/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from 'react';
import { ImagesBundle } from '../types';

type ImagesListProps = {
  bundle: ImagesBundle
}

const ImagesList: React.FC<ImagesListProps> = ({ bundle }) => {
  const [count, setCount] = useState(0);
  const check = bundle.items.length === 0;
  const limit = check ? 0 : bundle.items.length - 1;

  const images = useMemo(() =>
    bundle.items.map(items => (
      <>
        <img
          key={items.imageUrl}
          src={items.imageUrl}
          className='center-wrap'
          alt={items.previewUrl}
        />
        <div className='progress'>
          <div
            className='progress-process'
            style={{ animationIterationCount: limit }}
          />
        </div>
      </>
    )), []);

  useEffect(() => {
    if (count === limit) return;
    setTimeout(() => {
      setCount(c => c += 1);
    }, 1000);
  }, [count]);

  const handleRepeat = () => setCount(0);

  return (
    <div className='stories-wrap' >
      {count === limit
        ? <span
          className='center-wrap'
          style={{ cursor: 'pointer' }}
          onClick={handleRepeat}
        > {check ? 'nothing to watch' : 'repeat'}
        </span>
        : <>{images[count]}</>
      }
    </div >
  );
};

export default ImagesList;
