import { useState, useEffect } from 'react'
import { useAuth } from "../firebase/AuthContext"
import { useNavigate } from 'react-router-dom';
import { primaryColor, primaryButton } from '../style/AppStyle';
import { addUser, deleteVerificationDoc } from "../firebase/database/FirestoreFunctions";
import { Spinner, Alert, Toast } from 'react-bootstrap';
import axios from 'axios';

const SignUp = () => {
    const navigate = useNavigate();
    const { signup, currentUser } = useAuth();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [showVerifyLinkCard, setShowVerifyLinkCard] = useState(true);
    const [showLinkSentToast, setShowLinkSentToast] = useState(false);

    useEffect(() => {
        if (currentUser != null) {
            navigate('/');
        }
    }, [currentUser])


    const validatePassword = () => {
        let isValid = true

        if (password !== confirmPassword) {
            isValid = false
            setErrorMessage('Passwords do not match')
        }
        console.log(isValid)
        return isValid
    }

    const isValidEmail = () => {
        // Regular expression for validating email addresses
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrorMessage('Invalid email')
            return false
        }
        return true
    }

    const handleHideToast = () => {
        setShowLinkSentToast(false);
    };

    const resendVerificationLink = () => {
        // TODO: implement resending the verification link
        setShowLinkSentToast(true)
    }

    const handleSignUpSubmit = async (event) => {
        event.preventDefault()
        setLoading(true)

        if (validatePassword() && isValidEmail()) {
            try {
                setErrorMessage("")
                await signup(email, password, firstName + ' ' + lastName)
                setShowVerifyLinkCard(true)
            } catch (error) {
                if (error.response.data === "No email provided") {
                    setErrorMessage("Please provide all your details")
                } else if (error.response.status === 409) {
                    setErrorMessage("Email already in use")
                } else if (error.response.status === 400) {
                    setErrorMessage("Something must have bugged out. Please refresh the page")
                } else {
                    setErrorMessage("Our servers are busy at the moment please wait a moment and try again")
                }
            }
        }
        setLoading(false)
    }

    return (
        <div style={{
            backgroundColor: primaryColor,
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: '20px',
            paddingRight: '20px'
        }}>
            {showVerifyLinkCard ?
                <div className="card shadow-lg" style={{ maxWidth: '500px', width: '100%' }}>
                    <div className="card-body">
                        <h3 className="card-title text-center mb-4">Verify your account</h3>
                        <p>A verification link has been sent to your email. Please click the link to verify your email. You must verify your account before signing in.</p>
                        <button onClick={resendVerificationLink} style={primaryButton} className='btn'>Resend link</button>
                    </div>
                    <div className="position-fixed bottom-0 end-0 p-3">
                        <Toast show={showLinkSentToast} onClose={handleHideToast} aria-live="assertive" aria-atomic="true">
                            <div className="d-flex">
                                <Toast.Body>Verification link resent 🙂</Toast.Body>
                                <button type="button" className="btn-close me-2 m-auto" onClick={handleHideToast} aria-label="Close"></button>
                            </div>
                        </Toast>
                    </div>
                </div>
                :
                <div className="card shadow-lg" style={{ maxWidth: '500px', width: '100%' }}>
                    <div className="card-body">
                        <h3 className="card-title text-center mb-4">Create an Account</h3>
                        {errorMessage && (
                            <Alert variant="danger">
                                {errorMessage}
                            </Alert>
                        )}
                        <form onSubmit={handleSignUpSubmit}>
                            <div className="form-group text-start">
                                <label htmlFor="firstName" className="form-label">First Name</label>
                                <input type="text" className="form-control" id="firstName" minLength={1}
                                    value={firstName} onChange={(event) => setFirstName(event.target.value)} required />
                            </div>
                            <div className="form-group text-start">
                                <label htmlFor="lastName" className="form-label">Last Name</label>
                                <input type="text" className="form-control" id="lastName"
                                    value={lastName} minLength={1}
                                    onChange={(event) => setLastName(event.target.value)} required />
                            </div>
                            <div className="form-group text-start">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" className="form-control" id="email"
                                    value={email} onChange={(event) => setEmail(event.target.value)} required />
                            </div>
                            <div className="form-group text-start">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password" minLength={6}
                                    value={password} onChange={(event) => setPassword(event.target.value)} required />
                            </div>
                            <div className="form-group text-start">
                                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                <input type="password" className="form-control" id="confirmPassword" minLength={6}
                                    value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} required />
                            </div>
                            <div className='d-grid'>
                                <button style={primaryButton} type="submit" disabled={loading} className="btn mt-4">
                                    {loading ? <>
                                        <Spinner animation='border' size='sm' />
                                        <span className='ms-2'>Signing Up</span>
                                    </> : 'Sign Up'}
                                </button>
                            </div>
                        </form>

                        <div className='mt-4'>
                            Already have an account? <a href='signin'>Sign In</a>
                        </div>
                    </div>
                </div>
            }
        </div >
    )
};

export default SignUp;