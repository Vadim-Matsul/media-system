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
