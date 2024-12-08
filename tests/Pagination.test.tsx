import '@testing-library/jest-dom';
import { HttpResponse, http } from 'msw';
import { describe, expect, it } from 'vitest';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { Book } from '../src/types';
import { Pagination } from '../src/components';
import { apiSlice } from '../src/store/apiSlice';
import { renderWithProviderAndRouter } from '../src/utils';
import { setupServer } from 'msw/node';
import { store } from '../src/store/store';
import { useSearchParams } from 'react-router-dom';

const books: Book[] = [
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
  {
    id: 2701,
    title: 'Moby Dick; Or, The Whale',
    authors: [
      {
        name: 'Melville, Herman',
        birth_year: 1819,
        death_year: 1891,
      },
    ],
    translators: [],
    subjects: [
      'Adventure stories',
      'Ahab, Captain (Fictitious character) -- Fiction',
      'Mentally ill -- Fiction',
      'Psychological fiction',
      'Sea stories',
      'Ship captains -- Fiction',
      'Whales -- Fiction',
      'Whaling -- Fiction',
      'Whaling ships -- Fiction',
    ],
    bookshelves: ['Best Books Ever Listings'],
    languages: ['en'],
    copyright: false,
    media_type: 'Text',
    formats: {
      'text/html': 'https://www.gutenberg.org/ebooks/2701.html.images',
      'text/html; charset=utf-8':
        'https://www.gutenberg.org/files/2701/2701-h/2701-h.htm',
      'application/epub+zip':
        'https://www.gutenberg.org/ebooks/2701.epub3.images',
      'application/x-mobipocket-ebook':
        'https://www.gutenberg.org/ebooks/2701.kf8.images',
      'text/plain; charset=utf-8':
        'https://www.gutenberg.org/files/2701/2701-0.txt',
      'application/rdf+xml': 'https://www.gutenberg.org/ebooks/2701.rdf',
      'image/jpeg':
        'https://www.gutenberg.org/cache/epub/2701/pg2701.cover.medium.jpg',
      'application/octet-stream':
        'https://www.gutenberg.org/cache/epub/2701/pg2701-h.zip',
      'text/plain; charset=us-ascii':
        'https://www.gutenberg.org/ebooks/2701.txt.utf-8',
    },
    download_count: 71888,
  },
];

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    useSearchParams: vi.fn().mockReturnValue([
      {
        get: () => '1',
        set: vi.fn(),
      },
      vi.fn(),
    ]),
  };
});

const dispatch = store.dispatch;

const server = setupServer(
  http.get('https://gutendex.com/books', () => {
    return HttpResponse.json({ results: books });
  })
);
beforeAll(() => server.listen());
beforeEach(() => {
  dispatch(apiSlice.util.resetApiState());
});
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => server.close());

describe('Pagination', () => {
  it('Component updates URL query parameter when page changes', () => {
    renderWithProviderAndRouter(<Pagination />);

    const currentPage = 1;

    waitFor(() => {
      fireEvent.click(screen.getByTestId('next'));
      const [searchParams] = useSearchParams();
      const page = searchParams.get('page');

      expect(page).toBe(currentPage + 1);
    });
  });

  it("If previous page does't exist, then the previous button is disabled", async () => {
    renderWithProviderAndRouter(<Pagination />);

    await waitFor(() => {
      expect(screen.getByTestId('prev')).toHaveClass(
        'pagination__arrow_disabled'
      );
    });
  });

  it('Component renders valid page number', async () => {
    const [searchParams] = useSearchParams();
    const page = searchParams.get('page');

    renderWithProviderAndRouter(<Pagination />);

    await waitFor(() => {
      expect(screen.getByTestId('page-number')).toBeInTheDocument();
      expect(
        screen.getByTestId('page-number').textContent?.includes(`${page} of`)
      ).toBe(true);
    });
  });
});
