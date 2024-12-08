import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import { Main } from '../src/components';
import { renderWithProviderAndRouter } from '../src/utils';
import { screen } from '@testing-library/react';

describe('Main', () => {
  it('Main is rendering', () => {
    renderWithProviderAndRouter(<Main />);

    expect(screen.getByTestId('main-container')).toBeInTheDocument();
  });
});
