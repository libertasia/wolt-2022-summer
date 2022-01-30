import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorMessage from './error-message';

it(`ErrorMessage renders correctly`, () => {
  render(
    <ErrorMessage />
  );
  const element = screen.getByText(`Required field`);

  expect(element).toBeInTheDocument();
});
