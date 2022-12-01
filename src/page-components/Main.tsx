import ErrorBoundaries from '../components/ErrorBoundaries';
import { getResource } from '../helpers/getResource';
import FilmsList from '../components/FilmsList';
import MainHead from '../components/MainHead';
import Loader from '../components/Loader';
import React, { Suspense } from 'react';

const resource = getResource();

const Main: React.FC = () => (
  <div className="main-root--white">
    <MainHead />
    <div className='main-body'>
      <ErrorBoundaries>
        <Suspense fallback={<Loader />} >
          <FilmsList resource={resource} />
        </Suspense>
      </ErrorBoundaries>
    </div>
  </div>
);

export default Main;
