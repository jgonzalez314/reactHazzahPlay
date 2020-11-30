import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import { AuthProvider } from "./contexts/AuthContext"
import Home from './components/pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignIn from './components/pages/SignIn';
import Register from './components/pages/Register';
import Session from './components/pages/Session';
import ViewSession from './components/pages/ViewSession';
import Group from './components/pages/Group';
import PrivateRoute from "./components/PrivateRoute"
import Students from "./components/pages/Students"

function App() {
  
  return (
    <>
    {window.gapi.load("client:auth2", function() {
      window.gapi.auth2.init({client_id: "318172568934-4s3l6lbqbpk6p93jg7r1jm2uf1491hv1.apps.googleusercontent.com"});
    })}
    <AuthProvider>
      <Router>
        <Navbar />
        <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/sign-in' exact component={SignIn} />
            <Route path='/register' exact component={Register} />
            <PrivateRoute path='/students'exact component={Students} />
            <PrivateRoute path='/session/' exact component={Session} />
            <PrivateRoute path='/session/:sessionId' exact component={ViewSession} />
            <PrivateRoute path='/session/:sessionId/:group' exact component={Group} />
          </Switch>
      </Router>
    </AuthProvider>

    </>
  );
}

export default App;
