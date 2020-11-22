import React from 'react';
import '../../App.css';
import HeroSection from '../HeroSection';

function Dash({match}) {
    console.log(match)
  return (
    <>
      <HeroSection style="background-image=learning.jpg"text="Welcome"/>
      <h1>Dash {match.params.id}</h1>
    </>
  );
}

export default Dash;
