import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import { Header } from '../src/components';
import { renderWithProviderAndRouter } from '../src/utils';
import { screen } from '@testing-library/react';

describe('Header', () => {
  it('Header is rendering', () => {
    renderWithProviderAndRouter(<Header />);
    const appTitle = screen.getByText(/Search books/i);
    expect(appTitle).toBeInTheDocument();
  });
});
