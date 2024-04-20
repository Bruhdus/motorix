import { FormEvent, useState, useEffect } from 'react'
import { useAuth } from "../firebase/AuthContext"
import { FirebaseError } from 'firebase/app';
import { useNavigate } from 'react-router-dom';
import { primaryColor, primaryButton } from '../style/AppStyle';


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

    const handleSubmit = async (event) => {
        event.preventDefault()
        setLoading(true)

        if (validatePassword()) {
            try {
                setErrorMessage("")
                await signup(email, password, firstName + ' ' + lastName)
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

    const displayErrorMessage = () => {
        if (errorMessage !== '') {
            return (
                <p style={{ color: 'red' }}>
                    {errorMessage}
                </p>)
        }
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
            <div className="card shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
                <div className="card-body">
                    <h3 className="card-title text-center mb-4">Create an Account</h3>
                    <h1>{currentUser?.email}</h1>
                    {displayErrorMessage()}
                    <form onSubmit={handleSubmit}>
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
                        <button style={primaryButton} type="submit" disabled={loading} className="btn mt-4">
                            Create Account
                        </button>
                    </form>

                    <div className='mt-4'>
                        Already have an account? <a href='signin'>Sign In</a>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default SignUp;