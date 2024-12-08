import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export const useLocalStorage = (): [
  string,
  Dispatch<SetStateAction<string>>,
] => {
  const [searchString, setSearchString] = useState<string>(
    localStorage.getItem('books-search') || ''
  );

  useEffect(() => {
    localStorage.setItem('books-search', searchString);
    return () => {
      localStorage.setItem('books-search', searchString);
    };
  }, [searchString]);

  return [searchString, setSearchString];
};
