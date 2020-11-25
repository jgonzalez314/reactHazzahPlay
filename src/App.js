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
            <PrivateRoute path='/dash/:id'exact component={Dash} />
            <PrivateRoute path='/dash'exact component={Dash} />
            <PrivateRoute path='/students'exact component={Students} />
            <PrivateRoute path='/session/:id' exact component={Session} />
            <PrivateRoute path='/studentsession/:id' exact component={STSession} />
            {/* <PrivateRoute path='/AddStudent' exact component={AddStudent} /> */}
          </Switch>
      </Router>
    </AuthProvider>

    </>
  );
}

export default App;
