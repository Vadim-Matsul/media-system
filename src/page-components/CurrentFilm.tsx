import { useFilm } from '../hooks/useFilm';
import Loader from '../components/Loader';
import Tabs from '../components/Tabs';
import HTTP from '../helpers/const';
import { useParams } from 'react-router-dom';


function CurrentFilm() {
  const { id } = useParams();
  const { isLoading, film } = useFilm({ url: HTTP.film.replace('id', id!) });

  return (
    <div>
      {
        isLoading
          ? <Loader />
          : <Tabs film={film!} />
      }
    </div>
  );
}

export default CurrentFilm;
