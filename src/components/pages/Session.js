import React from 'react';
import '../../App.css';
import HeroSection from '../HeroSection';

function Session({match}) {
  return (
    <>
      <HeroSection style="background-image=learning.jpg"text="Welcome"/>
      <h1>Session {match.params.id}</h1>
    </>
  );
}

export default Session;
