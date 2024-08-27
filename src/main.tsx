import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import App from './App.tsx';
import './index.scss';
import Movies from './pages/movies/Movies';
import Shows from './pages/shows/Shows';
import Search from './pages/search/Search';
import DetailsPage from './pages/DetailsPage.tsx';
import Genres from './pages/Genres';

const router = createBrowserRouter([
   {
      path: '/',
      element: <App />,
      children: [
         {
            path: '/',
            element: <Home />,
         },
         {
            path: '/movies',
            element: <Movies />,
         },
         {
            path: '/shows',
            element: <Shows />,
         },
         {
            path: '/search',
            element: <Search />,
         },
         {
            path: '/:type/:id',
            element: <DetailsPage />,
         },
         {
            path: '/genre/:query/:id',
            element: <Genres />,
         },
      ],
   },
]);

createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <RouterProvider router={router} />
   </StrictMode>
);
