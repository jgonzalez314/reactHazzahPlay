import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import { AuthProvider, useAuth } from "./contexts/AuthContext"
import Home from './components/pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignIn from './components/pages/SignIn';
import Register from './components/pages/Register';
import Session from './components/pages/Session';
import ViewSession from './components/pages/ViewSession';
import STSession from './components/pages/STSession';
// import AddStudent from './components/pages/AddStudent';
import PrivateRoute from "./components/PrivateRoute"
import Students from "./components/pages/Students"



function App() {
  return (
    <>
    <AuthProvider>
      <Router>
      <Navbar />
        <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/sign-in' exact component={SignIn} />
            <Route path='/register' exact component={Register} />
            {/* <PrivateRoute path='/dashboard/:id'exact component={Dashboard} />
            <PrivateRoute path='/dashboard'exact component={Dashboard} /> */}
            <PrivateRoute path='/students'exact component={Students} />
            <PrivateRoute path='/session/' exact component={Session} />
            <PrivateRoute path='/session/:id' exact component={ViewSession} />
            <PrivateRoute path='/studentsession/:id' exact component={STSession} />
            {/* <PrivateRoute path='/AddStudent' exact component={AddStudent} /> */}
          </Switch>
      </Router>
    </AuthProvider>

    </>
  );
}

export default App;
