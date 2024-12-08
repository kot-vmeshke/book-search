import { BookCard, DetailsBookCard } from '../src/components';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Book } from '../src/types';
import { Provider } from 'react-redux';
import { renderWithProviderAndRouter } from '../src/utils';
import { store } from '../src/store/store';

const book: Book = {
  id: 1,
  title: 'The Declaration of Independence of the United States of America',
  authors: [
    {
      name: 'Jefferson, Thomas',
      birth_year: 1743,
      death_year: 1826,
    },
  ],
  translators: [],
  subjects: [
    'United States -- History -- Revolution, 1775-1783 -- Sources',
    'United States. Declaration of Independence',
  ],
  bookshelves: ['American Revolutionary War', 'Politics', 'United States Law'],
  languages: ['en'],
  copyright: false,
  media_type: 'Text',
  formats: {
    'text/html': 'https://www.gutenberg.org/ebooks/1.html.images',
    'application/epub+zip': 'https://www.gutenberg.org/ebooks/1.epub3.images',
    'application/x-mobipocket-ebook':
      'https://www.gutenberg.org/ebooks/1.kf8.images',
    'application/rdf+xml': 'https://www.gutenberg.org/ebooks/1.rdf',
    'image/jpeg': 'https://www.gutenberg.org/cache/epub/1/pg1.cover.medium.jpg',
    'application/octet-stream':
      'https://www.gutenberg.org/cache/epub/1/pg1-h.zip',
    'text/plain; charset=us-ascii':
      'https://www.gutenberg.org/ebooks/1.txt.utf-8',
  },
  download_count: 8839,
};

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    useParams: vi.fn().mockReturnValue({ bookId: '1' }),
  };
});

describe('DetailsBookCard', () => {
  it('A loading indicator is displayed while fetching data', () => {
    renderWithProviderAndRouter(<DetailsBookCard />);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it.skip('Detailed card component correctly displays the detailed card data', async () => {
    renderWithProviderAndRouter(<DetailsBookCard />, { route: '/book/1' });

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 3 }).textContent).toBe(
        book.title
      );
    }, {timeout: 3000});
  });

  it('Clicking the close button hides the component', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<BookCard {...book} />} />
            <Route path="/book/:id" element={<DetailsBookCard />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByTestId('book'));

    const detailsElement = await waitFor(() => screen.getByTestId('details'));
    expect(detailsElement).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('close-btn'));

    await waitFor(() => {
      expect(screen.queryByTestId('details')).toBeNull();
    });
  });
});
