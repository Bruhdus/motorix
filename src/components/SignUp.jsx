import { FormEvent, useState, useEffect } from 'react'
import { useAuth } from "../firebase/AuthContext"
import { FirebaseError } from 'firebase/app';
import { useNavigate } from 'react-router-dom';
import { primaryColor, primaryButton } from '../style/AppStyle';
import { addUser } from "../firebase/database/FirestoreFunctions";
import { Spinner, Alert, Modal } from 'react-bootstrap';
import { cloudFunctions } from '../firebase/firebaseSetup';
import axios from 'axios';


const SignUp = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const { signup, currentUser } = useAuth();
    const [showEnterCodeCard, setShowEnterCodeCard] = useState(true);
    const [sixDigitInput, setSixDigitInput] = useState('');


    useEffect(() => {
        if (currentUser && currentUser.emailVerified === false) {
            navigate('/emailvalidation')
        } else if (currentUser != null) {
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

    const handleVerifyCodeSubmit = async (event) => {
        event.preventDefault()
        setLoading(true)
        try {
            setErrorMessage("")
            axios.get(`${process.env.REACT_APP_SERVER_URL}/`)
                .then(response => {
                    console.log(response.data)
                })
                .catch(error => {
                    console.log(error)
                })
        } catch (error) {
            console.log(error)
        }
    }

    const handleSignUpSubmit = async (event) => {
        event.preventDefault()
        setLoading(true)

        if (validatePassword()) {
            try {
                setErrorMessage("")
                // await signup(email, password, firstName + ' ' + lastName)
                // await addUser(email, { firstName: firstName, lastName: lastName, email: email })
                // navigate('/emailvalidation')
                axios.get(`${process.env.REACT_APP_SERVER_URL}/sendMail?email=${email}`)
                    .then(response => {
                        console.log(response.data)
                    })
                    .catch(error => {
                        console.log(error)
                    })
            } catch (error) {
                if (error instanceof FirebaseError) {
                    if (error.code === 'auth/email-already-in-use') {
                        setErrorMessage("Email already in use")
                    } else {
                        setErrorMessage("Failed to create an account")
                    }
                } else {
                    setErrorMessage("Please refresh the page and try again")
                }
                console.log(error)
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
            {showEnterCodeCard ?
                <div className="card shadow-lg" style={{ maxWidth: '500px', width: '100%' }}>
                    <div className="card-body">
                        <h3 className="card-title text-center mb-4">Enter verification code</h3>
                        <p>A 6-digit verification code has been sent to your email. Please check your email for the 6-digit code and enter it below.</p>
                        <form onSubmit={handleVerifyCodeSubmit}>
                            <div className="form-group text-start">
                                <input type="text" className="form-control" placeholder="Enter code" id="sixDigitInput" minLength={6} maxLength={6}
                                    value={sixDigitInput} onChange={(event) => setSixDigitInput(event.target.value)} required />
                            </div>
                            <div className='d-grid'>
                                <button style={primaryButton} type="submit" disabled={loading} className="btn mt-2">
                                    {loading ? <>
                                        <Spinner animation='border' size='sm' />
                                        <span className='ms-2'>Verifying code</span>
                                    </> : 'Verify code'}
                                </button>
                            </div>
                        </form>
                        <button style={{ color: primaryColor }} className="btn mt-2">Resend code</button>
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