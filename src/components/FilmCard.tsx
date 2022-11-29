import React from 'react';
import { Film } from '../types';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../helpers/const';
import { spaceKeyPrevent } from '../helpers/utils';


type FilmCardProps = {
  film: Film
}

const FilmCard: React.FC<FilmCardProps> = ({ film }) => {
  const watchPath = AppRoutes.film.replace(':id', String(film.filmId));

  return (
    <div
      key={film.filmId}
      className="films-card"
      tabIndex={0}
    >

      <img
        src={film.posterUrl}
        alt={film.nameRu}
        className="film-card-img"
      />

      <span
        className='films-card--title'
      >{film.nameEn || 'Film'}</span>

      <div className="film-card-btns">
        <Link
          className='btn'
          to={watchPath}
          onKeyDown={spaceKeyPrevent}
        > watch </Link>
        <Link
          className='btn'
          to='/'
          onKeyDown={spaceKeyPrevent}
        > promotion </Link>
      </div>

    </div>
  );
}

export default FilmCard;