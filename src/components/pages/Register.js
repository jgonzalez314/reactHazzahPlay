import React from 'react';
import '../../App.css';
import Cards from '../Cards';
import HeroSection from '../HeroSection';
import regform from '../Regform';

const makefor = () =>{
    return(
        <div >
            <form>
                <input type ='text'>name</input>
            </form>
        </div>
        );

}

function Register() {
  return (
    <>
      <HeroSection style="background-image=learning.jpg"text="Welcome"/>
      <makefor/>
      <h1>register</h1>
      <regform />


    </>
  );
}

export default Register;
