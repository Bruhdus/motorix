import React, { useContext, useState, useEffect } from "react"
import { auth } from "./firebaseSetup"
import {
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    updatePassword as firebaseUpdatePassword,
    signInWithRedirect,
    GoogleAuthProvider,
    reauthenticateWithCredential
} from "firebase/auth";

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider();

    async function signup(email, password, name) {
        await createUserWithEmailAndPassword(auth, email, password)
        if (auth.currentUser != null) {
            await updateProfile(auth.currentUser, { displayName: name })
            console.log(auth.currentUser)
        }
    }

    async function signin(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    async function signinWithGoogle() {
        await signInWithRedirect(auth, googleProvider)
    }

    async function signout() {
        await signOut(auth);
    }

    async function resetPassword(email) {
        await sendPasswordResetEmail(auth, email);
    }

    async function updatePassword(newPassword) {
        if (currentUser) {
            await firebaseUpdatePassword(currentUser, newPassword);
        }
    }

    async function reauthenticateUser(credential) {
        if (currentUser) {
            await reauthenticateWithCredential(currentUser, credential);
        }
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
        signin,
        signinWithGoogle,
        signup,
        signout,
        resetPassword,
        updatePassword,
        reauthenticateUser
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}