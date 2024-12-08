import './BooksList.scss';
import { Book, BooksListProps } from '../../types';
import { BookCard } from '../BookCard';
import { FC } from 'react';
import { Loader } from '../Loader';
import { RootState } from '../../store/store';
import { apiSlice } from '../../store/apiSlice';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const BooksList: FC<BooksListProps> = () => {
  const [searchParams] = useSearchParams();
  const searchString = useSelector(
    (state: RootState) => state.search.searchString
  );
  const { data, isFetching } = apiSlice.useGetBooksQuery({
    str: searchString,
    page: searchParams.get('page') || '1',
  });

  return (
    <>
      {!isFetching ? (
        <ul className="books-list">
          {data.results.length ? (
            data.results.map((book: Book) => (
              <BookCard {...book} key={book.id} />
            ))
          ) : (
            <div className="books-list__nothing">Nothing was found</div>
          )}
        </ul>
      ) : (
        <Loader />
      )}
    </>
  );
};

export { BooksList };
