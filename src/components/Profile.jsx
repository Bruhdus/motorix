import React, { useEffect, useState } from "react";
import { Toast, Modal, Spinner, Alert } from "react-bootstrap";
import { useAuth } from "../firebase/AuthContext";
import { useNavigate } from 'react-router-dom';
import { EmailAuthProvider } from "firebase/auth";
import { primaryBgWhiteText, primaryButton, primaryColor } from '../style/AppStyle';

const ProfilePage = () => {
    const { currentUser, updatePassword, reauthenticateUser } = useAuth();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false)
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [invalidNewPass, setInvalidNewPass] = useState(false);
    const [passDontMatch, setPassDontMatch] = useState(false);

    const [password, setPassword] = useState("");
    const [newPass, setNewPass] = useState('')
    const [conNewPass, setConNewPass] = useState('')

    useEffect(() => {
        if (currentUser == null) {
            navigate('/');
        }
    }, [currentUser, navigate])

    const handleModalOpen = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false)
        setPassword('')
        setNewPass('')
        setConNewPass('')
        setPasswordError(false)
        setInvalidNewPass(false)
        setPassDontMatch(false)
    };

    const toggleSuccessToast = () => {
        setShowSuccessToast(!showSuccessToast);
        // Automatically hide the toast after 5 seconds (5000 milliseconds)
        setTimeout(() => setShowSuccessToast(false), 5000);
    };

    const checkIfNewPassConNewPassMatch = () => {
        if (newPass != conNewPass) {
            setPassDontMatch(true)
            return false
        }
        return true
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setLoading(true)
        if (checkIfNewPassConNewPassMatch()) {
            const credential = EmailAuthProvider.credential(currentUser.email, password);

            try {
                await reauthenticateUser(credential);
                try {
                    await updatePassword(newPass);
                    console.log('password updated');
                    handleModalClose();
                    toggleSuccessToast();
                } catch (error) {
                    console.log('Invalid new password');
                    setInvalidNewPass(true);
                }
            } catch (error) {
                console.log("Could not reauthenticate User");
                setPasswordError(true);
            } finally {
                setLoading(false)
            }
        } else {
            setLoading(false)
        }
    }

    return (
        <div className="p-4 mt-5">
            <h2>Your Profile</h2>
            <p>Email: {currentUser?.email}</p>
            <p>Name: {currentUser?.displayName}</p>

            <button style={primaryButton} className="btn" onClick={handleModalOpen}>
                Change Password
            </button>


            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {passwordError && (
                        <Alert variant="danger">
                            Incorrect Password 🙁
                        </Alert>
                    )}
                    {passDontMatch && (
                        <Alert variant="danger">
                            Confirm new password doesn't match new password
                        </Alert>
                    )}
                    {invalidNewPass && (
                        <Alert variant="warning">
                            Invalid New Password
                        </Alert>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group text-start">
                            <label htmlFor="oldPassword">Password</label>
                            <input type="password" className={`form-control ${passwordError ? 'is-invalid' : ''}`} id="oldPassword"
                                value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <div className="form-group text-start">
                            <label htmlFor="newPass" className="form-label">New Password</label>
                            <input type="password" className={`form-control ${invalidNewPass ? 'is-invalid' : ''}`} id="newPass" minLength={6}
                                value={newPass} onChange={(event) => setNewPass(event.target.value)} required />
                        </div>
                        <div className="form-group text-start">
                            <label htmlFor="conPass" className="form-label ">Confirm New Password</label>
                            <input type="password" className={`form-control ${passDontMatch ? 'is-invalid' : ''}`} id="conPass" minLength={6}
                                value={conNewPass} onChange={(event) => setConNewPass(event.target.value)} required />
                        </div>
                        <div className="d-flex justify-content-end mt-4">
                            <button type="button" className="btn btn-secondary me-2" disabled={loading} onClick={handleModalClose}>Close</button>
                            <button type="submit" style={primaryButton} disabled={loading} className="btn">
                                {loading ? <>
                                    <Spinner animation="border" size="sm" />
                                    <span className="ms-2">Updating...</span>
                                </> : 'Update'}
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

            <Toast className="bg-success" aria-live="assertive" aria-atomic="true" style={{ color: 'white', position: 'fixed', bottom: '20px', right: '20px', zIndex: '1000', wordWrap: 'break-word' }} show={showSuccessToast} onClose={() => setShowSuccessToast(false)}>
                <div className="d-flex">
                    <Toast.Body>Password successfully updated! 👍</Toast.Body>
                    <button type="button" className="btn-close me-2 m-auto" aria-label="Close"></button>
                </div>
            </Toast>



        </div >
    );
};

export default ProfilePage;
