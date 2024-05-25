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
    reauthenticateWithCredential,
    sendEmailVerification
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
        await sendEmailVerification(auth.currentUser)
        await updateProfile(auth.currentUser, { displayName: name })
    }

    async function signin(email, password) {
        await signInWithEmailAndPassword(auth, email, password)
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

    async function refetchUser() {
        if (currentUser) {
            await currentUser.reload()
                .then(() => {
                    const user = auth.currentUser
                    setCurrentUser(user)
                })
                .catch(async () => {
                    await signOut()
                    //TODO: deleteUser
                })
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
        reauthenticateUser,
        refetchUser,
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}