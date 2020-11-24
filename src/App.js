import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import { AuthProvider, useAuth } from "./contexts/AuthContext"
import Home from './components/pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignIn from './components/pages/SignIn';
import Register from './components/pages/Register';
import Dash from './components/pages/Dash';
import Session from './components/pages/Session';
import STSession from './components/pages/STSession';


function App() {
  return (
    <>
    <AuthProvider>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/sign-up' component={SignIn} />
          <Route path='/register' component={Register} />
          <Route path='/dash/:id' component={Dash} />
          <Route path='/session/:id' component={Session} />
          <Route path='/studentsession/:id' component={STSession} />
        </Switch>
      </Router>
    </AuthProvider>
      
    </>
  );
}

export default App;
