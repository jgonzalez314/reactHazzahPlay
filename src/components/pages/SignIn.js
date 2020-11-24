import React, { useRef, useState } from "react"
import '../../App.css';
import HeroSection from '../HeroSection';
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import Navbar from '../Navbar';

export default function SignIn() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

    try {
        setError("")
        setLoading(true)
        await login(emailRef.current.value, passwordRef.current.value)
        history.push("/dash/hello")
        } catch {
        setError("Failed to log in")
        }

        setLoading(false)
}

    return (
        <>
        <Navbar/>
        <Container className="d-flex align-items-center justify-content-center" >
            <div className="w-100" style={{ maxWidth: "400px" }}>
            <Card className="text-center" style={{color: "#1A535C", borderColor:"#1A535C"}}>
                <Card.Body>
                <h2 className="text-center mb-4">Log In</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} required />
                    </Form.Group>
                    <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" ref={passwordRef} required />
                    </Form.Group>
                    <Button style={{backgroundColor: "#FF6B6B", borderColor: "transparent"}}disabled={loading} className="w-100" type="submit">
                    Log In
                    </Button>
                </Form>
                <div className="w-100 text-center mt-3">
                    <Link to="/forgot-password" style={{color: "black"}}>Forgot Password?</Link>
                </div>
                <div className="w-100 text-center mt-2" style={{color: "white"}}>
                Need an account? <Link to="/register" style={{color: "black", fontWeight: "bold"}}>Sign Up</Link>
                </div>
                </Card.Body>
            </Card>

        </div>
        </Container>

        </>
    )
}
