import React, { useState, useEffect } from "react"
import HeroSection from '../HeroSection';
import Sessioncards from '../Sessioncards';
import { Card, Button, Alert, Container } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import { firestore } from "../../firebase"

function ViewSession({match}) {
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [group, setGroup] = useState([])
  const [studentList, setStudentList] = useState([])
  const [sessionName, setSessionName] = useState("")
  const [sentence, setSentence] = useState("")
  const [uidList, setUidList] = useState([])
  const [firstnameList, setFirstnameList] = useState([])
  const history = useHistory()

  const studentsRef = firestore.collection("students");
  const groupRef = firestore.collection("games")

  function getStudents() {
    studentsRef.onSnapshot((querySnapshot) => {
    const items = [];
    const uids = [];
    const names = [];
    querySnapshot.forEach((doc) => {
        items.push(doc.data());
        uids.push(doc.get("uid"))
        names.push(doc.get('first-name'))
    });
    setStudentList(items);
    setUidList(uids);
    setFirstnameList(names);
    })
  }

  function getGroups() {
    var docname = "session"+match.params.id
    groupRef.doc(docname).get().then(function(doc) {
        setGroup(doc.data().['group']);
        setSentence(doc.data().['sentence']);
        setSessionName(doc.data().['name']);
    })
}

  useEffect(() => {
      getGroups()
      getStudents();
  }, [])

  function matchName (uid1, uid2) {
      const a = uidList.findIndex((element) => element === uid1)
      const b = uidList.findIndex((element) => element === uid2)
      return firstnameList[a] + " & " + firstnameList[b]
  }

  return (
    <>
        <HeroSection text={"Session: " + sessionName}/>
        <Container fluid className="mt-3">
        <Card className="text-center">
          <Card.Title className="mt-3">{"First Sentence: " + sentence}</Card.Title>
          <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              <div className="text-center">
                  {group.map((grp) => (
                      <div className="mb-1">
                              <Button className="w-50"  id={group.findIndex(x => x.["uid1"] === grp["uid1"])+1}>
                                  {matchName(grp['uid1'], grp['uid2'])}
                              </Button>
                      </div>
                  ))}
              </div>
          </Card.Body>
        </Card>
        <div className="text-center">
            <Link to="./" className="btn btn-primary w-50 mt-3" style={{justifyContent: "center", backgroundColor: "#1A535C", borderColor:"transparent"}}>
                Go Back
            </Link>
        </div>

        </Container>
    </>
  );
}

export default ViewSession;
