export interface SearchBarProps {
  searchString?: string;
  updateSearchString?: (str: string) => void;
}
export interface SearchBarState {
  query: string;
}

export interface MainState {
  error: boolean;
}
export interface MainProps {
  isLoaded?: boolean;
  booksList?: Book[];
  paginationData?: PaginationProps;
}

export interface Person {
  birth_year: number | null;
  death_year: number | null;
  name: string;
}
export interface Format {
  [key: string]: string;
}
export interface Book {
  id: number;
  title: string;
  authors: Person[];
  translators?: Person[];
  subjects: string[];
  bookshelves?: string[];
  languages?: string[];
  copyright?: boolean | null;
  media_type?: string;
  formats?: Format;
  download_count?: number;
}
export interface BooksListProps {
  booksList?: Book[];
  isLoading?: boolean;
}

export interface PaginationProps {
  next?: string | null;
  previous?: string | null;
  pageNumber?: number;
  updatePageNumber?: (page: number) => void;
  allPages?: number;
}
