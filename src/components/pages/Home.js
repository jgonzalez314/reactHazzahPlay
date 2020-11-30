import React from 'react';
import HeroSection from '../HeroSection';
import image from '../../learning.jpg'
import { Container } from "react-bootstrap"

function Home() {
  return (
    <>
        <HeroSection text="Welcome"/>
        <Container fluid>
          <div className="text-center mt-2">
          <img style={{maxWidth: "30%", justifyContent: "center", margin:"auto", alignItems:"center",textAlign:"center"}}src={image}></img>

          </div>
        <div>
            <h2 className="text-center">Why Huzzah Play?</h2>
            <p className="text-center">Due to the 2019 Covid pandemic, many students were forced into an online classroom. This changed the dynamic of classroom interactions. The goal for Huzzah Play is to account for classroom interactions between students. This is done through sessions in which two students play a game like creating a story.  </p>
            <h2 className="text-center">Why is social development important? </h2>
            <p className="text-center">Early childhood social development plays a huge part in the way a student is able to be socially sensible. A student that is socially sensible is able to empathize. This brings other positive skills like being able to work in a team and problem solving skills.   </p>
        </div>
        </Container>
       
    </>
  );
}

export default Home;
