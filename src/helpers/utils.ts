import { HttpTypes } from '../types';

export async function customFetch({ url, method = 'GET' }: HttpTypes) {
  const URL = process.env.REACT_APP_BASE_URL + url;

  try {
    const response = await fetch(URL, {
      method,
      headers: {
        'X-API-KEY': process.env.REACT_APP_X_API_KEY!,
        'Content-Type': 'application/json',
      }
    });
    return await response.json();
  } catch (err) { return err; };

};

export function wrapPromise<R = void>(promise: Promise<R>) {
  let status = 'pending';
  let result: R | Error;

  const resource = promise.then(RES => {
    status = 'success';
    result = RES;
  }, REJ => {
    status = 'error';
    result = REJ;
  });

  return {
    read(): R | Error {
      if (status === 'pending') throw resource;
      if (status === 'error') throw result;
      return result;
    }
  };
};

export const spaceKeyPrevent = (evt: React.KeyboardEvent) => {
  if (evt.code === "Space") evt.preventDefault();
};

export const throttle = (fn: Function, delay: number) => {
  let isPending = false;
  let repeat = false;
  let timeout: ReturnType<typeof setTimeout>;

  const wrapper = () => {
    if (isPending) {
      repeat = true;
      return;
    };

    fn.apply(this)
    isPending = true

    timeout && clearTimeout(timeout);

    timeout = setTimeout(() => {
      isPending = false;
      if (repeat) {
        wrapper()
        repeat = false;
      }
    }, delay)
  }

  return wrapper;
}
