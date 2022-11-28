import React from 'react';
import { Film } from '../types';
import { Navigate } from 'react-router-dom';


type FilmCardProps = {
  film: Film
}

const FilmCard: React.FC<FilmCardProps> = ({ film }) => {

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
        <button className='btn'> watch </button>
        <button className='btn'> promotion </button>
      </div>
    </div>
  );
}

export default FilmCard;