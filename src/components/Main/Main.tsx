import './Main.scss';
import { BooksList } from '../BooksList';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Pagination } from '../Pagination';

const Main: FC = () => {
  return (
    <main className="main">
      <div className="container main__container" data-testid="main-container">
        <div className="main__left">
          <BooksList />
          <Pagination />
        </div>
        <div className="main__right">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export { Main };
