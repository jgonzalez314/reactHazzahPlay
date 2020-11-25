import React from 'react';
import '../../App.css';
import HeroSection from '../HeroSection';


function Home() {
    var gapi = window.gapi
    const ClientID= '293262441010-bccddg6sci1mu792pr3hibnddicag0nb.apps.googleusercontent.com'
    const secretkey = 'MThEJa00NoijBtjVOYWBLBcO'
    var DDocs = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
    var SCopes = "https://www.googleapis.com/auth/calendar.readonly"

    const handleClick = () => {
        gapi.load('client:auth2', ()=>{
            gapi.client.init({
                apiKey:'AIzaSyBc0_HwqbdKTtMVWWC8cWwZIxpNI9jMvcc',
                clientId: ClientID,
                discoveryDocs: DDocs,
                scope:SCopes
            })
            gapi.client.load('calendar','v3',()=>console.log('loaded'))

            gapi.auth2.getAuthInstance().signIn().then(()=>{
                // event goes here
            })
        })
    }

  return (
    <>
      <HeroSection text="Welcome"/>
      <script async defer src="https://apis.google.com/js/api.js"
      onLoad="this.onload=function(){};handleClientLoad()"
      onreadystatechange="if (this.readyState === 'complete') this.onload()">
    </script>

      <h1>home</h1>
      <button onClick={handleClick}>add</button>

    </>
  );
}

export default Home;
