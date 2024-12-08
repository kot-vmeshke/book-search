import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { SearchBar } from '../src/components';
import { renderWithProviderAndRouter } from '../src/utils';

describe('SearchBar', () => {
  it('Clicking the Search button saves the entered value to the local storage', () => {
    renderWithProviderAndRouter(<SearchBar />);

    const input = screen.getByRole('textbox');
    const testValue = 'test value';
    fireEvent.change(input, { target: { value: testValue } });

    fireEvent.click(screen.getByRole('button'));

    expect(localStorage.getItem('books-search')).toBe(testValue);
  });

  it('Component retrieves the value from the local storage upon mounting', () => {
    const testValue = 'test value';
    localStorage.setItem('books-search', testValue);

    renderWithProviderAndRouter(<SearchBar />);

    const input = screen.getByRole('textbox') as HTMLInputElement;

    waitFor(() => {
      expect(input.value).toBe(testValue);
    });
  });
});
