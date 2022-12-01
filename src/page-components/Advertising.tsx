import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import Promotion from '../components/Promotions';
import HTTP from '../helpers/const';
import { useFilm } from '../hooks/useFilm';

function Advertising() {
  const { id } = useParams();
  const { isLoading, film } = useFilm({ url: HTTP.film.replace('id', id!) });

  return (
    <>
      {
        isLoading
          ? <Loader />
          : <Promotion film={film!} />
      }
    </>
  );
}

export default Advertising;
