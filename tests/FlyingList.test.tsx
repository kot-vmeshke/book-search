import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { Book } from '../src/types';
import { FlyingList } from '../src/components';
import { removeAllBooksFromSelected } from '../src/store/selectedBooksSlice';
import { renderWithProviderAndRouter } from '../src/utils';
import { store } from '../src/store/store';

const book: Book = {
  id: 1513,
  title: 'Romeo and Juliet',
  authors: [
    {
      name: 'Shakespeare, William',
      birth_year: 1564,
      death_year: 1616,
    },
  ],
  translators: [],
  subjects: [
    'Conflict of generations -- Drama',
    'Juliet (Fictitious character) -- Drama',
    'Romeo (Fictitious character) -- Drama',
    'Tragedies',
    'Vendetta -- Drama',
    'Verona (Italy) -- Drama',
    'Youth -- Drama',
  ],
  bookshelves: [],
  languages: ['en'],
  copyright: false,
  media_type: 'Text',
  formats: {
    'text/html': 'https://www.gutenberg.org/ebooks/1513.html.images',
    'application/epub+zip':
      'https://www.gutenberg.org/ebooks/1513.epub3.images',
    'application/x-mobipocket-ebook':
      'https://www.gutenberg.org/ebooks/1513.kf8.images',
    'application/rdf+xml': 'https://www.gutenberg.org/ebooks/1513.rdf',
    'image/jpeg':
      'https://www.gutenberg.org/cache/epub/1513/pg1513.cover.medium.jpg',
    'text/plain; charset=us-ascii':
      'https://www.gutenberg.org/ebooks/1513.txt.utf-8',
    'application/octet-stream':
      'https://www.gutenberg.org/cache/epub/1513/pg1513-h.zip',
  },
  download_count: 77782,
};

vi.mock('react-redux', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    useSelector: vi.fn().mockReturnValue([
      {
        id: 1513,
        title: 'Romeo and Juliet',
        authors: [
          {
            name: 'Shakespeare, William',
            birth_year: 1564,
            death_year: 1616,
          },
        ],
        translators: [],
        subjects: [
          'Conflict of generations -- Drama',
          'Juliet (Fictitious character) -- Drama',
          'Romeo (Fictitious character) -- Drama',
          'Tragedies',
          'Vendetta -- Drama',
          'Verona (Italy) -- Drama',
          'Youth -- Drama',
        ],
        bookshelves: [],
        languages: ['en'],
        copyright: false,
        media_type: 'Text',
        formats: {
          'text/html': 'https://www.gutenberg.org/ebooks/1513.html.images',
          'application/epub+zip':
            'https://www.gutenberg.org/ebooks/1513.epub3.images',
          'application/x-mobipocket-ebook':
            'https://www.gutenberg.org/ebooks/1513.kf8.images',
          'application/rdf+xml': 'https://www.gutenberg.org/ebooks/1513.rdf',
          'image/jpeg':
            'https://www.gutenberg.org/cache/epub/1513/pg1513.cover.medium.jpg',
          'text/plain; charset=us-ascii':
            'https://www.gutenberg.org/ebooks/1513.txt.utf-8',
          'application/octet-stream':
            'https://www.gutenberg.org/cache/epub/1513/pg1513-h.zip',
        },
        download_count: 77782,
      },
    ]),
  };
});

describe('FliyngList', () => {
  global.URL.createObjectURL = vi.fn();

  it('Remove all saved books on click "Unselect All"', () => {
    renderWithProviderAndRouter(<FlyingList />);

    waitFor(() => {
      fireEvent.click(screen.getByTestId('unselect-all'));
      expect(store.dispatch).toBeCalledWith(removeAllBooksFromSelected());
    });
  });

  it('Unselect button has right text', () => {
    renderWithProviderAndRouter(<FlyingList />);

    waitFor(() => {
      expect(
        screen.getByTestId('unselect-all').textContent?.includes('All')
      ).toBeFalsy();
    });
  });

  it('getCSV to be called if selected books exist', () => {
    const getCSV = vi.fn();

    renderWithProviderAndRouter(<FlyingList />);

    waitFor(() => {
      expect(getCSV).toBeCalledWith(book);
    });
  });
});
