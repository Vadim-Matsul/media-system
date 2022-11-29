import { MutableRefObject } from 'react';
import { getResource } from './helpers/getResource';

export interface HttpTypes {
  url: string;
  method?: string;
};

export interface Film {
  filmId: number;
  nameRu: string;
  nameEn: string;
  year: string;
  filmLength: string;
  countries: string[];
  genres: string[];
  rating: string;
  ratingVoteCount: number;
  posterUrl: string;
  posterUrlPreview: string;
  ratingChange?: any;
};

export interface Films {
  pagesCount: number;
  films: Film[];
};

export type Resource = ReturnType<typeof getResource>;

export type UpgradeRef = {
  current: MutableRefObject<HTMLVideoElement>;
  togglers: {
    Size: MutableRefObject<HTMLDivElement>,
    Active: MutableRefObject<HTMLDivElement>,
    Flags: MutableRefObject<{
      canRemove: boolean;
      isSmall: boolean;
      isOpen: boolean;
      isPlay: boolean;
      values: {
        big: number,
        small: number,
      }
    }>
  };
  videoPlay: Function;
  videoPause: Function;
  videoReload: Function;
  changeSize: () => boolean;
}
