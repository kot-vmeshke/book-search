import './Header.scss';
import { FC } from 'react';
import { SearchBar } from '../SearchBar';
import { SearchBarProps } from '../../types';
import { ThemeSwitch } from '../ThemeSwitch';

const Header: FC<SearchBarProps> = () => {
  return (
    <header className="header">
      <div className="container header__container">
        <h1 className="header__title">Search books</h1>
        <SearchBar />
        <ThemeSwitch />
      </div>
    </header>
  );
};

export { Header };
