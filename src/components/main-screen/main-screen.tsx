import React from 'react';
import Calculator from '../calculator/calculator';
import Footer from '../footer/footer';
import Header from '../header/header';

const MainScreen: React.FC  = () => {
  return (
    <React.Fragment>
      <Header />
      <main className='main container'>
        <h1 className='visually-hidden'>Preliminary Assignment for Engineering Positions</h1>
        <Calculator />
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default MainScreen;
