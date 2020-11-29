import React, { useState, useEffect, useRef } from "react"
import { Card, Button, Alert, Container, Modal, Form } from "react-bootstrap"
import HeroSection from '../HeroSection';
import { Link, useHistory } from "react-router-dom"
import { firestore } from "../../firebase"
import firebase from "firebase/app"

export const emailList = new Set();

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    var group = new Array(a.length/2);
    var prev = "";
    for (i = 0; i < a.length; i++) {
        const element = a[i];
        if (i % 2 === 0) {
            prev = element
        } else {
            var num = Math.floor(i/2);
            group[num] = {
                "uid1": prev,
                "uid2": element
            }
        }
        
    }

    return group
}

function startSession(number, name, sentence, studentList) {
    const session = firestore.collection("sessions"); 
    const game = firestore.collection("games"); 
    const serverTimestamp = firebase.firestore.Timestamp.now()
    number = number+1;
    session
        .doc("session"+number)
        .set({
            'name': name,
            'session': number,
            'created': serverTimestamp,
            'group': studentList,
            'sentence': sentence
        })
    game
        .doc("session"+number)
        .set({
            'name': name,
            'group': studentList,
            'sentence': sentence
        })
}

export default function Session() {
    const [error, setError] = useState("")
    const [addError, setAddError] = useState("");
    const [loading, setLoading] = useState(false)
    const [studentList, setStudentList] = useState([])
    const [sessionsList, setSessionsList] = useState([])
    const [show, setShow] = useState(false);
    const nameRef = useRef();
    const sentenceRef = useRef();
    const history = useHistory()

    const students = firestore.collection("students");
    const sessions = firestore.collection("sessions").orderBy("created", "asc");
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function getSessions() {
        sessions.onSnapshot((querySnapshot) => {
            const items = [];
            // const created = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
                // created.push(doc.get('created'))
        });
        setSessionsList(items);

        })
    }

    function getStudents() {
        students.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.get('uid'));
            });
            setStudentList(items);
        })
    }

    async function handleCreate(e) {
        e.preventDefault()

        try {
            setError("")
            setLoading(true)
            const randomlist = shuffle(studentList)
            await startSession(sessionsList.length, nameRef.current.value, sentenceRef.current.value, randomlist)
            handleClose()
        } catch {
            setAddError("Failed to start a session")
        }

        setLoading(false)
    }

    useEffect(() => {
        getSessions();
        getStudents();
    }, [])
    

    return (
        <>
        <HeroSection style="background-image=learning.jpg" text="Session Lists"/>
        <Container fluid className="mt-3">
            <Card>
                <Card.Body>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <div className="text-center">
                        <>
                        {sessionsList.length > 0 ? 
                        sessionsList.map((session) => (
                            <div className="mt-1">
                                <Link to={"/session/"+session.['session']}>
                                    <Button className="btn btn-primary w-50">
                                        {"Session: " + session.['name']}
                                    </Button>
                                </Link>
                            </div>
                            
                        ))
                        :
                        <p>Session does not exist.</p>
                        }
                        </>
                        
                    </div>
                    <div className="text-center">
                        <Button onClick={handleShow} className="btn btn-primary w-50 mt-3 text-center" disabled={loading} style={{backgroundColor: "#FF6B6B", borderColor:"transparent"}}>
                            Start New Session
                        </Button>
                    </div>
                </Card.Body>
            </Card>
            <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                >
                    <Modal.Body>
                        <Card style={{color: "#1A535C", borderColor:"#1A535C"}}>
                            <Card.Body>
                            <h2 className="text-center mb-4">Input a session information</h2>
                            {addError && <Alert variant="danger">{addError}</Alert>}
                            <Form onSubmit={handleCreate}>
                                <Form.Group id="text">
                                    <Form.Label>Session Name</Form.Label>
                                    <Form.Control type="text" ref={nameRef} required />
                                </Form.Group>
                                <Form.Group id="text">
                                    <Form.Label>Starting Sentence</Form.Label>
                                    <Form.Control type="text" ref={sentenceRef} required />
                                </Form.Group>
                                <div className="text-center">
                                    <Button variant="success" disabled={loading} className="" type="submit">
                                        Create a session
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
        </Container>
        </>
    )
}
