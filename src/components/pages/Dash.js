import React from 'react';
import '../../App.css';
import HeroSection from '../HeroSection';
import Dashbar from '../Dashbar';
import { useAuth } from "../../contexts/AuthContext";
import Cards from '../Cards';
import NavBar from '../Navbar'

function Dash({match}) {
    const {getCurrentUser} = useAuth();
    const name = getCurrentUser
    console.log(getCurrentUser);
    console.log(name);

  return (
    <>
        {/* <NavBar /> */}
        <HeroSection style="background-image=learning.jpg"text="Welcome"/>
        <Cards />
    </>
  );
}

export default Dash;
