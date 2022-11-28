import Advertising from '../page-components/Advertising';
import Error from '../page-components/Error';
import Main from '../page-components/Main';


export const roote_paths = [
  { path: '/', title: 'Главная', element: Main },
  { path: '/:id/ad', title: 'Рекламный плеер', element: Advertising },
  { path: '/:id', title: 'Плеер', element: Advertising },
  { path: '*', title: 'Ошибка', element: Error },
];

const HTTP = {
  films_list: '/films/top?type=TOP_100_POPULAR_FILMS'
};
export default HTTP;