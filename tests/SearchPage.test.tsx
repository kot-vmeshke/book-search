import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import { SearchPage } from '../src/pages';
import { renderWithProviderAndRouter } from '../src/utils';
import { screen } from '@testing-library/react';

describe('SearchPage', () => {
  it('SearchPage is rendering', () => {
    renderWithProviderAndRouter(<SearchPage />);
    const errorTitle = screen.getByTestId('page-container');
    expect(errorTitle).toBeInTheDocument();
  });
});
