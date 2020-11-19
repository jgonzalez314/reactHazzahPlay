import React from 'react';
import '../../App.css';
import Cards from '../Cards';
import HeroSection from '../HeroSection';

function Home() {
  return (
    <>
      <HeroSection style="background-image=learning.jpg"text="Welcome"/>
      <h1>home</h1>
      <Cards />
    </>
  );
}

export default Home;
