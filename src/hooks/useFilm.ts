/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useHttp } from './useHttp';
import { Film } from '../types';

export const useFilm = <R = Film>({ url }: { url: string }) => {
  const [film, setFilm] = useState<R | null>(null);
  const { customFetch, isLoading } = useHttp(true);

  useEffect(() => {
    (async function () {
      const film = await customFetch({ url });
      setFilm(film);
    })();
  }, []);

  return { isLoading, film };
};
