import './FlyingList.scss';
import { Book, Person } from '../../types';
import { FC, useEffect, useState } from 'react';
import {
  removeAllBooksFromSelected,
  removeBookFromSelected,
} from '../../store/selectedBooksSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const FlyingList: FC = () => {
  const [url, setUrl] = useState<string>('');
  const selectedBooks: Book[] = useSelector(
    (state: RootState) => state.selectedBooks
  );
  const dispatch = useDispatch();

  const handleDeselectAllClick = () => {
    dispatch(removeAllBooksFromSelected());
  };

  const getCSV = (arr: Book[]) => {
    let csv: string = '';
    const temp = [['title', 'authors', 'link']];

    arr.forEach((book: Book) => {
      const data = [];
      const authors = book.authors
        .map(
          (author: Person) =>
            `${author.name.replace(/,/g, '')} (${author.birth_year || 'no data'} - ${author.death_year || 'no data'})`
        )
        .join(',');
      const link = book.formats!['text/html'] ?? '-';

      data.push(`"${book.title}"`, authors, link);

      temp.push(data);
    });

    temp.forEach((item: string[]) => {
      csv += item.join(';') + '\n';
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8,' });
    const objUrl = URL.createObjectURL(blob);
    return objUrl;
  };

  useEffect(() => {
    if (selectedBooks.length) {
      setUrl(getCSV(selectedBooks));
    }
  }, [selectedBooks]);

  return (
    <div className={`fly ${selectedBooks.length ? 'fly_visible' : ''}`}>
      {selectedBooks.length} items selected:
      <ul>
        {selectedBooks.map((item: Book) => (
          <li key={item.id}>
            {item.title}
            <button onClick={() => dispatch(removeBookFromSelected(item.id))}>
              Unselect
            </button>
          </li>
        ))}
      </ul>
      <div className="fly__controls">
        <button
          className="main-button main-button_bordered"
          onClick={handleDeselectAllClick}
          data-testid="unselect-all"
        >
          Unselect {selectedBooks.length > 1 ? 'All' : ''}
        </button>
        <a
          href={url}
          title="Download CSV"
          className="main-button"
          download={`${selectedBooks.length}_books.csv`}
        >
          Download
        </a>
      </div>
    </div>
  );
};

export { FlyingList };
