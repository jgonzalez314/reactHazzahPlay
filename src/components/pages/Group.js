import React, { useState, useEffect } from "react"
import HeroSection from '../HeroSection';
import { Card, Button, Alert, ListGroup, Container } from "react-bootstrap"
import { Link, useLocation } from "react-router-dom"
import { firestore } from "../../firebase"


function Group({match}) {
  const location = useLocation();
  const [error, setError] = useState("")
  const [group, setGroup] = useState([])
  const [storyList, setStoryList] = useState([])
  const [sentence, setSentence] = useState("")
  const [firstStudent, setFirstStudent] = useState("")
  const [secondStudent, setSecondStudent] = useState("")

  const groupRef = firestore.collection("sessions")
  const studentsRef = firestore.collection("students")

  const uid1 = location.state.thisGroup[0];
  const uid2 = location.state.thisGroup[1];

  function getStories() {
      const gameRef = groupRef.doc("session" + match.params.sessionId).collection("games").doc(uid1).collection(uid2).orderBy("timestamp");
      gameRef.onSnapshot((querySnapshot) => {
        const story = [];
        querySnapshot.forEach((doc) => {
          story.push(doc.data())
        });
        setStoryList(story);
      })
  }
  function getStudents() {
    studentsRef.doc(uid1).get().then(function(doc) {
      setFirstStudent(doc.data().['first-name'] + " " + doc.data().['last-name'])
    })
    studentsRef.doc(uid2).get().then(function(doc) {
      setSecondStudent(doc.data().['first-name'] + " " + doc.data().['last-name'])
    })
  }

  function getGroups() {
    var docname = "session"+match.params.sessionId
    groupRef.doc(docname).get().then(function(doc) {
      setGroup(doc.data().group[match.params.group]);
      setSentence(doc.data().['sentence']);
    })
  }


  useEffect(() => {
    getGroups();
    getStudents();
    getStories();
  }, [])

  return (
    <>
        <HeroSection style="background-image=learning.jpg" text={firstStudent + " & " + secondStudent}/>
        <Container fluid="md" className="mt-3">
          <ListGroup className="text-center mb-2">
            <ListGroup.Item variant="primary">{firstStudent}</ListGroup.Item>
            <ListGroup.Item variant="info">{secondStudent}</ListGroup.Item>
          </ListGroup>
          <ListGroup className="text-center">
            <ListGroup.Item variant="">{sentence}</ListGroup.Item>
            {storyList.map((story) => (
              <ListGroup.Item variant={story.['fromId'] === uid1 ? "primary" : "info"}>{story.['sentence']}</ListGroup.Item>
            ))}
          </ListGroup>
          <div className="text-center">
            <Link to={"./"} className="btn btn-primary w-50 mt-3" style={{justifyContent: "center", backgroundColor: "#1A535C", borderColor:"transparent"}}>
                Go Back
            </Link>
          </div>
        </Container>
    </>
  );
}

export default Group;
