import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import selectedBooksReduser, {
  addBookToSelected,
  removeAllBooksFromSelected,
  removeBookFromSelected,
} from '../src/store/selectedBooksSlice';
import { Book } from '../src/types';

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
const initialState: Book[] = [];

describe('SelectedBooksSlice', () => {
  it('Book should be added to store', () => {
    const state = selectedBooksReduser(initialState, addBookToSelected(book));
    expect(state[0].id).toEqual(book.id);
  });

  it('Book should be removed from store', () => {
    const fullState = [book];

    const state = selectedBooksReduser(
      fullState,
      removeBookFromSelected(book.id)
    );

    expect(state.length).toBe(0);
  });

  it('All books was removed', () => {
    const fullState = [book];

    const state = selectedBooksReduser(fullState, removeAllBooksFromSelected());

    expect(state.length).toBe(0);
  });
});

