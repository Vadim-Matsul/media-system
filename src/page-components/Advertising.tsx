/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import Promotion from '../components/Promotions';
import HTTP from '../helpers/const';
import { useHttp } from '../hooks/useHttp';
import { Film } from '../types';

function Advertising() {
  const [film, setFilm] = useState<Film | null>(null);
  const { id } = useParams();
  const { customFetch, isLoading } = useHttp(true);

  useEffect(() => {
    (async function () {
      const film = await customFetch({ url: HTTP.film.replace('id', id!) });
      setFilm(film);
    })();
  }, []);

  return (
    <div>
      {
        isLoading
          ? <Loader />
          : <Promotion
            film={film!}
          />
      }
    </div>
  );
}

export default Advertising;
