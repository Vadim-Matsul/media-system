import { useMemo } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { roote_paths } from './helpers/const';
import './public/index.css';

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          {AppRoutes()}
        </Routes>
      </BrowserRouter>
    </>
  );
}

function AppRoutes() {
  return useMemo(() => roote_paths.map(
    route => <Route key={route.title} path={route.path} element={<route.element />} />
  ), [])
}

export default App;
