import { describe, expect, it } from 'vitest';
import App from '../src/App';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { store } from '../src/store/store';

describe('App component', () => {
  it('App renders', () => {
    const { container } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(container.querySelector('.page')).toBeInTheDocument();
  });
});
