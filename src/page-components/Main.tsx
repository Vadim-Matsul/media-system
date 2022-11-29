import { Suspense } from 'react';
import ErrorBoundaries from '../components/ErrorBoundaries';
import FilmsList from '../components/FilmsList';
import Loader from '../components/Loader';
import { MainHead } from '../components/MainHead';
import { getResource } from '../helpers/getResource';

const resource = getResource();

function Main() {

  return (
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
}



export default Main;
