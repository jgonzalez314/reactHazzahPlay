import React, { useContext, useState, useEffect, createContext } from "react"
import { auth } from "../firebase"
import firebase from "firebase"

const AuthContext = createContext()
export const googleProvider = new firebase.auth.GoogleAuthProvider()
googleProvider.addScope('https://www.googleapis.com/auth/classroom.courses.readonly');

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout() {
        return auth.signOut()
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }

    function googleSignIn() {
        return auth.signInWithPopup(googleProvider).then(function(result) {
        })
    }
    
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    const value = {
        currentUser,
        googleSignIn,
        login,
        signup,
        logout,
        resetPassword,
        updateEmail,
        updatePassword
    }

    return (
        <AuthContext.Provider value={value}>
        {!loading && children}
        </AuthContext.Provider>
    )
}
