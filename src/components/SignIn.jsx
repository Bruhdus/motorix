import { useEffect, useState } from 'react';
import { useAuth } from "../firebase/AuthContext";
import { useNavigate } from 'react-router-dom';
import googleImg from '../image/googleIcon.png'
import { primaryColor, primaryButton } from '../style/AppStyle';
import { Alert, Spinner } from 'react-bootstrap';

const SignIn = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [signInError, setSignInError] = useState(false);
    const [tooManyReq, setTooManyReq] = useState(false);
    const { signin, signinWithGoogle, currentUser } = useAuth();

    useEffect(() => {
        if (currentUser != null) {
            navigate('/');
        }
    }, [currentUser, navigate])

    const signInWithGoogle = async () => {
        try {
            setLoading(true);
            await signinWithGoogle();
            setLoading(false);
        } catch (error) {
            console.error('Google Sign In Error');
            setLoading(false);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            setLoading(true)
            setSignInError(false)
            setTooManyReq(false)
            // Handle the submit
            await signin(email, password)
            setLoading(false)
        } catch (error) {
            if (error.code === 'auth/invalid-credential') {
                setSignInError(true)
            } else if (error.code === 'auth/too-many-requests') {
                setTooManyReq(true)
            }
            console.log(error)
            setLoading(false)
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
            <div className="card shadow-lg" style={{ maxWidth: '500px', width: '100%' }}>
                <div className="card-body">
                    <h3 className="card-title text-center mb-4">Sign In</h3>
                    {signInError && (
                        <Alert id="signInError" variant="danger">
                            Incorrect email/password. Please try again...
                        </Alert>
                    )}

                    {tooManyReq && (<Alert variant="danger">Too many tries. Please try again later</Alert>)}

                    <form onSubmit={handleSubmit}>
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
                        <div className="d-grid">
                            <button style={primaryButton} type="submit" disabled={loading} className="btn mt-4">
                                {loading ? <>
                                    <Spinner animation="border" size='sm' />
                                    <span className='ms-2'>Signing In</span>
                                </> : 'Sign In'}
                            </button>
                        </div>
                    </form>

                    <hr className="my-4" />

                    <div className='btn btn-outline-dark btn-block' onClick={signInWithGoogle}>
                        <img src={googleImg} alt="Icon" style={{ marginRight: '8px', maxHeight: '5%', maxWidth: '5%' }} />
                        Sign In with Google
                    </div>

                    <div className='mt-4'>
                        Don't have an account? <a href='signup'>Join Now</a>
                    </div>
                </div>
            </div>
        </div>
    )

};
export default SignIn;