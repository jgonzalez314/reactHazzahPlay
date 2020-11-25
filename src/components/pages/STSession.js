import React from 'react';
import '../../App.css';
import HeroSection from '../HeroSection';
import STNav from '../STNav';


function STSession({match}) {
  return (
    <>
        {/* <STNav/> */}
        <HeroSection style="background-image=learning.jpg"text="Welcome"/>
        <h1>STSession {match.params.id}</h1>
    </>
  );
}

export default STSession;
