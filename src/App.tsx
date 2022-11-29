import { useMemo } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ErrorBoundaries from './components/ErrorBoundaries';
import { roote_paths } from './helpers/const';
import './public/index.css';

const App = () => (
  <BrowserRouter>
    <Routes>
      {AppRoutes()}
    </Routes>
  </BrowserRouter>
)

function AppRoutes() {
  return useMemo(() => roote_paths.map(
    route => (
      <Route
        key={route.title}
        path={route.path}
        element={
          <ErrorBoundaries>
            <route.element />
          </ErrorBoundaries>
        } />
    )
  ), []);
};

export default App;
