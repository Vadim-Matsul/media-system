import { Suspense, useEffect } from 'react';
import ErrorBoundaries from '../components/ErrorBoundaries';
import FilmsList from '../components/FilmsList';
import { MainHead } from '../components/MainHead';
import { getResource } from '../helpers/getResource';
import { Resource } from '../types';

const resource = getResource();

function Main() {

  return (
    <div className="main-root--white">
      <MainHead />
      <div className='main-body'>
        <ErrorBoundaries>
          <Suspense fallback={<h1>Loading...</h1>} >
            <FilmsList resource={resource} />
          </Suspense>
        </ErrorBoundaries>
      </div>
    </div>
  );
}



export default Main;
