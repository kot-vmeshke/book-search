import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ErrorPage } from '../src/pages';

describe('ErrorPage', () => {
  it('ErrorPage is rendering', () => {
    render(<ErrorPage />);
    const errorTitle = screen.getByRole('heading', { level: 1 }).textContent;
    expect(errorTitle).toBe('404');
  });
});
