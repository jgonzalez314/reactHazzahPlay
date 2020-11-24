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
import Create from './components/pages/Create';



function App() {
  return (
    <>
    <AuthProvider>
      <Router>

        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/sign-In' exact component={SignIn} />
          <Route path='/register' exact component={Register} />
          <Route path='/dash/:id'exact component={Dash} />
          <Route path='/session/:id' exact component={Session} />
          <Route path='/studentsession/:id' exact component={STSession} />
          <Route path='/create' exact component={Create} />

        </Switch>
      </Router>
    </AuthProvider>

    </>
  );
}

export default App;
