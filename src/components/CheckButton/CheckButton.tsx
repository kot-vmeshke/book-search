import './CheckButton.scss';
import {
  addBookToSelected,
  removeBookFromSelected,
} from '../../store/selectedBooksSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Book } from '../../types';
import { FC } from 'react';
import { RootState } from '../../store/store';
import { apiSlice } from '../../store/apiSlice';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useSearchParams } from 'react-router-dom';

interface CheckButtonProps {
  bookId: number;
}

const CheckButton: FC<CheckButtonProps> = ({ bookId }) => {
  const selectedBooks: Book[] = useSelector(
    (state: RootState) => state.selectedBooks
  );
  const [searchParams] = useSearchParams();
  const [searchString] = useLocalStorage();
  const { data } = apiSlice.useGetBooksQuery({
    str: searchString,
    page: searchParams.get('page') || '1',
  });

  const isSelected: boolean = Boolean(
    selectedBooks.find((item) => item.id === bookId)
  );
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      dispatch(
        addBookToSelected(data.results.find((item: Book) => item.id === bookId))
      );
    } else {
      dispatch(removeBookFromSelected(bookId));
    }
  };

  return (
    <div className="check-button-wrap">
      <input
        type="checkbox"
        checked={isSelected}
        id={`check-${bookId}`}
        onChange={handleChange}
        data-testid="checkbox"
      />
      <label
        htmlFor={`check-${bookId}`}
        title={isSelected ? 'Remove from selected' : 'Add to selected'}
      >
        {isSelected ? (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            data-testid="checked-icon"
          >
            <path
              d="M9 11L12 14L22 4M16 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 7.8C3 6.11984 3 5.27976 3.32698 4.63803C3.6146 4.07354 4.07354 3.6146 4.63803 3.32698C5.27976 3 6.11984 3 7.8 3H16.2C17.8802 3 18.7202 3 19.362 3.32698C19.9265 3.6146 20.3854 4.07354 20.673 4.63803C21 5.27976 21 6.11984 21 7.8V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V7.8Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </label>
    </div>
  );
};

export { CheckButton };
