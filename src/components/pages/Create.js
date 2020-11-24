import React, { useRef, useState } from "react"
import '../../App.css';
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import Dashbar from '../Dashbar';





function Create({match}) {
  const firstNameref = useRef()
  const lastNameRef = useRef()
  const emailRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      setError("{firstNameref} has been added")
    } catch {
      setError("This Student has been added before")
    }

    setLoading(false)
  }

  return (
    <>
        <Dashbar/>
      <Card style={{color: "#1A535C", borderColor:"#1A535C"}}>
        <Card.Body>
          <h2 className="text-center mb-4">Add Students</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" ref={firstNameref} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" ref={lastNameRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Button style={{backgroundColor: "#FF6B6B", borderColor:"transparent"}} disabled={loading} className="w-100" type="submit">
              Add student
            </Button>
          </Form>
        </Card.Body>
      </Card>

    </>
  );
}

export default Create;
