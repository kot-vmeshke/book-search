import './BookCard.scss';
import { Link, useSearchParams } from 'react-router-dom';
import { Book } from '../../types';
import { CheckButton } from '../CheckButton';
import { FC } from 'react';

const BookCard: FC<Book> = ({ id, authors, title, subjects }) => {
  const [searchParams] = useSearchParams();

  return (
    <li className="book-wrap">
      <div className="book">
        <CheckButton bookId={id} />
        <span className="book__author">
          {authors.map((author) => author.name).join(', ')}
        </span>
        <Link
          to={`book/${id}?${searchParams.toString()}`}
          className="book__name"
          data-testid="book"
        >
          {title}
        </Link>
        <span className="book__subjects">Subjects: {subjects.join(', ')}.</span>
      </div>
    </li>
  );
};

export { BookCard };
