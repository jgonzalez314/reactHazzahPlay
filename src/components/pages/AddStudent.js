import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { firestore } from "../../firebase"
import { emailList } from "./Students"
import { useAuth } from "../../contexts/AuthContext"

function addstudent(firstname, lastname, email, uid) {
  const student = firestore.collection("students");
  student
      .doc(uid).set({
          'first-name': firstname,
          'last-name': lastname,
          'email': email,
          'uid': uid
      })
  var newCityRef = firestore.collection("cities").doc();
}

export default function AddStudent() {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const codeRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const { signup } = useAuth();
  const uid = "";

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, codeRef.current.value).then(data => {
        addstudent(firstNameRef.current.value, lastNameRef.current.value, emailRef.current.value, data.user.uid)
      })

      history.push("/students")
    } catch {
      setError("Failed to create an account")
    }

    setLoading(false)
  }
  return (
    <>
      <Container className="w-50 mt-4">
      <Card style={{color: "#1A535C", borderColor:"#1A535C"}}>
        <Card.Body>
          <h2 className="text-center mb-4">Input a student information</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <div className="row">
              <Form.Group className="col-md-6" id="email">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" ref={firstNameRef} required />
              </Form.Group>
              <Form.Group className="col-md-6" id="password">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" ref={lastNameRef} required />
              </Form.Group>
            </div>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="code">
              <Form.Label>Invite Code</Form.Label>
              <Form.Control type="text" ref={codeRef} required />
            </Form.Group>
            <Button style={{backgroundColor: "#FF6B6B", borderColor:"transparent"}} disabled={loading} className="w-100" type="submit">
              Add student
            </Button>
          </Form>
        </Card.Body>
      </Card>
      </Container>
    </>
  );
}
