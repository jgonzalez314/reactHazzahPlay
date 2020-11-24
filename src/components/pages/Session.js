import React, { useRef, useState } from "react"
import '../../App.css';
import HeroSection from '../HeroSection';
import Sessioncards from '../Sessioncards';
import SessionNav from '../SessionNav';

function Session({match}) {
    console.log(useState)
    console.log(useRef)
  return (
    <>
        <SessionNav/>
        <HeroSection text="Session Name"/>
        <h1>Session {match.params.id}</h1>
        <Sessioncards/>
    </>
  );
}

export default Session;
