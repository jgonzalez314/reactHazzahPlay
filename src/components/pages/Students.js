import React, { useState, useEffect, useRef } from 'react';
import '../../App.css';
import HeroSection from '../HeroSection';
import { useAuth } from "../../contexts/AuthContext";
import { Card, Modal, Button, Alert, Container, Form } from 'react-bootstrap';
import {  useHistory } from "react-router-dom"
import { firestore } from "../../firebase"

export const emailList = new Set();

function addstudent(firstname, lastname, email, uid) {
    const student = firestore.collection("students"); 
    student
        .doc(uid).set({
            'first-name': firstname,
            'last-name': lastname,
            'email': email,
            'uid': uid
        })
}

export default function Students() {

    const [error, setError] = useState("")
    const [addError, setAddError] = useState("");
    const [studentList, setStudentList] = useState([])
    const history = useHistory()
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false)
    const students = firestore.collection("students");
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const codeRef = useRef();
    const { signup } = useAuth();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    var classId = 0

    async function handleAuth() {
        try {
            await authenticate().then(loadClient).then(execute).then(getStudentEmail)
        } catch {
            
        }
    }

    function authenticate() {
        return window.gapi.auth2.getAuthInstance()
            .signIn({scope: "https://www.googleapis.com/auth/classroom.courses https://www.googleapis.com/auth/classroom.courses.readonly https://www.googleapis.com/auth/classroom.profile.emails https://www.googleapis.com/auth/classroom.rosters.readonly"})
            .then(function() { console.log("Sign-in successful"); },
                function(err) { console.error("Error signing in", err); });
    }

    function loadClient() {
        window.gapi.client.setApiKey(process.env.REACT_APP_API_KEY);
        return window.gapi.client.load("https://classroom.googleapis.com/$discovery/rest?version=v1")
            .then(function() { console.log("GAPI client loaded for API"); },
                function(err) { console.error("Error loading GAPI client for API", err); });
    }
    
    function execute() {
        return window.gapi.client.classroom.courses.list()
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                classId = response.result.courses[0].id
            },
            function(err) { console.error("Execute error", err); });
    }

    function getStudentEmail() {
        return window.gapi.client.classroom.courses.students.list({
            "courseId": parseInt(classId)
        })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                firestore.collection("studentList").doc("list").set(response.result);
            },
            function(err) { console.error("Execute error", err); });
    }

    async function handleSubmit(e) {
        e.preventDefault()

        try {
        setAddError("")
        setLoading(true)
        await signup(emailRef.current.value, codeRef.current.value).then(data => {  
            addstudent(firstNameRef.current.value, lastNameRef.current.value, emailRef.current.value, data.user.uid)
            handleClose()
        })
        
        history.push("/students")
        } catch {
            setAddError("Failed to create add a student")
        }

        setLoading(false)
    }
    function getStudents() {
        students.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            setStudentList(items);
            })
    }
    
    useEffect(() => {
        getStudents();
    }, [])

    return (
        <>
        <HeroSection style="background-image=learning.jpg" text="Students"/>
        <Container fluid className="mt-3">
            <Card>
                <Card.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                {studentList.length > 0 ?
                    <table className="table table-sm table-striped" style={{textAlign: "center"}}>
                    <thead>
                    <tr>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                    </tr>
                    </thead>
                    <tbody>
                    {studentList.map((student) => (
                        emailList.add(student.['email']),
                        <>
                        <tr>
                        <td>{student.['first-name']}</td>
                        <td>{student.['last-name']}</td>
                        <td>{student.['email']}</td>
                        </tr>
                        </>
                    ))}
                    </tbody>
                </table>
                :
                    <p>Student does not exist.</p>
                }
                </Card.Body>
                <div className="text-center mb-2">
                    <Button className="w-50" variant="primary" style={{backgroundColor: "#FF6B6B", borderColor:"transparent"}} onClick={handleShow}>
                        Add a student
                    </Button>
                </div>
                

                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                >
                    <Modal.Body>
                        <Card style={{color: "#1A535C", borderColor:"#1A535C"}}>
                            <Card.Body>
                            <h2 className="text-center mb-4">Input a student information</h2>
                            {addError && <Alert variant="danger">{addError}</Alert>}
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
                                <Form.Label>Invite Code (At least 8 characters) </Form.Label>
                                <Form.Control type="text" ref={codeRef} required />
                                </Form.Group>
                                <div className="text-center">
                                    <Button variant="success" disabled={loading} className="" type="submit">
                                        Add student
                                    </Button>
                                    <Button className="ml-2"variant="danger" onClick={handleClose}>
                                        Close
                                    </Button>
                                </div>
                            </Form>
                            </Card.Body>
                        </Card>
                    </Modal.Body>
                </Modal>
            </Card>
            <Button className="mt-2" onClick={handleAuth}>Load Students</Button>
        </Container>
        </>
    );
}