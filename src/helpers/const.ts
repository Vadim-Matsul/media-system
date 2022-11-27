import Advertising from '../page-components/Advertising';
import Error from '../page-components/Error';
import Main from '../page-components/Main';


export const roote_paths = [
  { path: '/', title: 'Главная', element: Main },
  { path: '/ad', title: 'Рекламный плеер', element: Advertising },
  { path: '*', title: 'Ошибка', element: Error },
]