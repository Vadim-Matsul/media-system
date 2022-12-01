import HTTP from '../helpers/const';
import { useFilm } from '../hooks/useFilm';
import { ImagesBundle } from '../types';
import ImagesList from './ImagesList';
import Loader from './Loader';

type StoriesProps = {
  filmId: number;
}

const Stories: React.FC<StoriesProps> = ({ filmId }) => {
  const { isLoading, film: images } = useFilm<ImagesBundle>({ url: HTTP.arts.replace('id', String(filmId)) });

  return (
    <div>
      {
        isLoading
          ? <Loader />
          : <ImagesList bundle={images!} />
      }
    </div>
  );
};

export default Stories;
