import React from 'react';
import '../../App.css';
import HeroSection from '../HeroSection';

function STSession({match}) {
  return (
    <>
      <HeroSection style="background-image=learning.jpg"text="Welcome"/>
      <h1>STSession {match.params.id}</h1>
    </>
  );
}

export default STSession;
