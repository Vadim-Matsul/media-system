import Advertising from '../page-components/Advertising';
import CurrentFilm from '../page-components/CurrentFilm';
import Error from '../page-components/Error';
import Main from '../page-components/Main';


export const AppRoutes = {
  main: '/',
  promotion: '/:id/ad',
  film: '/:id',
};

export const roote_paths = [
  { path: AppRoutes.main, title: 'Главная', element: Main },
  { path: AppRoutes.promotion, title: 'Рекламный плеер', element: Advertising },
  { path: AppRoutes.film, title: 'Фильм', element: CurrentFilm },
  { path: '*', title: 'Ошибка', element: Error },
];

export const HTTP = {
  films_list: '/films/top?type=TOP_100_POPULAR_FILMS',
  film: '/films/id',
  arts: '/films/id/images?type=SHOOTING'
};

export const headers = {
  'X-API-KEY': process.env.REACT_APP_X_API_KEY!,
  'Content-Type': 'application/json',
};
