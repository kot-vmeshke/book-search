import type { AppStore, RootState } from './store/store';
import React, { PropsWithChildren } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';
import { setupStore } from './store/store';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

export function renderWithProviderAndRouter(
  ui: React.ReactElement,
  extendedRenderOptions: ExtendedRenderOptions = {}
) {
  const {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  } = extendedRenderOptions;

  const Wrapper = ({ children }: PropsWithChildren) => (
    <Provider store={store}>
      <MemoryRouter>{children}</MemoryRouter>
    </Provider>
  );

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}
