import './App.scss';
import { DetailsBookCard, ErrorBoundary } from './components';
import { ErrorPage, SearchPage } from './pages';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ThemeContext } from './context/ThemeContext';
import { useState } from 'react';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SearchPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'book/:bookId',
        element: <DetailsBookCard />,
      },
    ],
  },
]);

const App = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem('book-theme') || 'light'
  );
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </ThemeContext.Provider>
  );
};

export default App;
