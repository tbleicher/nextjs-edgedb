import { ReactElement } from 'react';

import { render, RenderOptions } from '@testing-library/react';

import { ComponentTestWrapper } from './ComponentTestWrapper';

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: ComponentTestWrapper, ...options });

export * from "@testing-library/react";

export { customRender as render };
