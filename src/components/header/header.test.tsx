import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './header';

it(`Header renders correctly`, () => {
  render(
    <Header />
  );
  const headerElement = screen.getByText(`Wolt Summer 2022 Engineering Internships. Preliminary Assignment.`);

  expect(headerElement).toBeInTheDocument();
});
