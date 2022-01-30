import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './footer';

it(`Footer renders correctly`, () => {
  render(
    <Footer />
  );
  const element = screen.getByText(`Copyright © 2022 Anastasiia Erokhina.`);

  expect(element).toBeInTheDocument();
});
