import { Films } from '../types';
import { customFetch, wrapPromise } from './utils';


export function getResource() {
  return {
    films: wrapPromise<Films>(customFetch({ url: '/films/top' })),
  };
};
