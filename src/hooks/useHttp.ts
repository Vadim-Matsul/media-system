import { useCallback, useState } from 'react';
import { headers } from '../helpers/const';
import { HttpTypes } from '../types';



export const useHttp = (initLoading: boolean = false) => {
  const [isLoading, setIsLoading] = useState(initLoading);
  const [error, setError] = useState(false);

  const customFetch = useCallback(
    async function ({ url, method = 'GET' }: HttpTypes) {

      const URL = process.env.REACT_APP_BASE_URL + url;
      setIsLoading(true);

      return await fetch(URL, { method, headers })
        .then(
          async RES => (await RES.json()),
          REJ => {
            setError(true);
            throw REJ;
          }
        ).finally(() => setIsLoading(false));

    }, []);

  return { customFetch, isLoading, error };
}