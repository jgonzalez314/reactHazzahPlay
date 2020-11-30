import React from 'react';
import HeroSection from '../HeroSection';

function Home() {
  return (
    <>
        <HeroSection text="Welcome"/>
        <img scr=url('../../../public/images/learning.jpg')><img>
        <div >
            <h2 style="text-align: center;">Why Huzzah Play?</h2>
            <p style="text-align: center;">Due to the 2019 Covid pandemic, many students were forced into an online classroom. This changed the dynamic of classroom interactions. The goal for Huzzah Play is to account for classroom interactions between students. This is done through sessions in which two students play a game like creating a story.  </p>
            <h2 style="text-align: center;">Why is social development important? </h2>
            <p style="text-align: center;">Early childhood social development plays a huge part in the way a student is able to be socially sensible. A student that is socially sensible is able to empathize. This brings other positive skills like being able to work in a team and problem solving skills.   </p>
        </div>
    </>
  );
}

export default Home;
