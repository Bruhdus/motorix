import { Card } from "react-bootstrap";
import { primaryButton, primaryColor } from "../style/AppStyle";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../firebase/AuthContext"

const EmailValidation = () => {
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    useEffect(() => {
        if (currentUser && currentUser.emailVerified === true) {
            navigate('/')
        } else if (currentUser == null) {
            navigate('/');
        }
    }, [currentUser])

    const handleContinue = () => {
        navigate('/')
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
                    <p>
                        A verification link has been sent to your email.
                    </p>
                    <p>
                        Please click the link in the email to verify your account. Thank you!
                    </p>
                    <div className="d-grid">
                        <button className="btn" style={primaryButton} onClick={handleContinue}>I'll check my email now!</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmailValidation;