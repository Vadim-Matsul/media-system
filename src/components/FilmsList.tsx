/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from 'react';
import { Films, Resource } from '../types';
import FilmCard from './FilmCard';

type FilmsListProps = {
  resource: Resource
}

const FilmsList: React.FC<FilmsListProps> = ({ resource }) => {

  const films = useMemo(() => {
    const film_bundle = resource.films.read() as Films;

    return film_bundle.films.map(film => <FilmCard film={film} key={film.filmId} />);
  }, []);

  return (
    <div className="films-list">
      {films}
    </div>
  );
};

export default FilmsList;
