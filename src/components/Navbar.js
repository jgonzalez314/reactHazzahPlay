import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

export default function NavBar() {

  const { currentUser, logout } = useAuth();
  const signout = () => {
    window.alert("Sucessfully Signed Out")
    logout()
  };

  const navbar = {backgroundColor: '#1A535C'}
  return (
    <>
    <Navbar style={navbar} expand="lg">
      <Navbar.Brand style={{ color: "white"}} href={!currentUser ? "/" : "/session"}> HuzzahPlay </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
        {!currentUser ? 
        <Button href="/sign-in" style={{backgroundColor: "#FF6B6B", borderColor: "transparent"}} > Sign In </Button>
        :
        <>
        <Nav className="mr-auto">
          <Nav.Link style={{color: "white"}} href="/">Home</Nav.Link>
          <Nav.Link style={{color: "white"}} href="/session">Session</Nav.Link>
          <Nav.Link style={{color: "white"}} href="/students">Students</Nav.Link>
        </Nav>
        <Button style={{backgroundColor: "#FF6B6B", borderColor: "transparent"}} onClick={signout} > Sign Out </Button>
        </>
        }
      </Navbar.Collapse>
    </Navbar>
    </>
  );
}
