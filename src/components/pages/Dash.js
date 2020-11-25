import React, { useState, useEffect } from 'react';
import '../../App.css';
import HeroSection from '../HeroSection';
import { useAuth } from "../../contexts/AuthContext";
// import Cards from '../Cards'
import { Card, CardDeck } from 'react-bootstrap';
import { Link, useHistory } from "react-router-dom"
import { firestore } from "../../firebase"

function Dash({match}) {
  
  return (
    <>
        <HeroSection style="background-image=learning.jpg" text="Sessions"/>
        <Card />
    </>
  );
}

export default Dash;
