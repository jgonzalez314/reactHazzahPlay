import React from 'react';
import '../../App.css';
import HeroSection from '../HeroSection';
import Dashbar from '../Dashbar';
import { useAuth } from "../../contexts/AuthContext";
import Cards from '../Cards';




function Dash({match}) {
    console.log(match);
    const {getCurrentUser} = useAuth();
    const name = getCurrentUser
    console.log(getCurrentUser);
    console.log(name);

  return (
    <>
        <Dashbar/>
        <HeroSection style="background-image=learning.jpg"text="Welcome"/>
        <h1>Dash {name}</h1>
        <Cards/>
    </>
  );
}

export default Dash;
