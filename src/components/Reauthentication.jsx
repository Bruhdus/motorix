import React, { useState } from "react";
import { EmailAuthProvider } from "firebase/auth";
import { useAuth } from "../firebase/AuthContext";

const Reauthentication = ({ showModal, onClose, onReauthenticateSuccess, onReauthenticateError }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { reauthenticateUser } = useAuth();

    const handleReauthenticate = async () => {
        try {
            const credential = EmailAuthProvider.credential(email, password);
            reauthenticateUser(credential)
                .then()
                .catch()
            onReauthenticateSuccess();
        } catch (error) {
            onReauthenticateError(error.message);
        }
    };

    return (
        <div class={`modal ${showModal ? "show" : ""}`} tabIndex="-1" role="dialog" style={{ display: showModal ? "block" : "none" }}>
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Reauthenticate</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={onClose}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" class="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div class="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" class="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" onClick={onClose}>
                            Close
                        </button>
                        <button type="button" class="btn btn-primary" onClick={handleReauthenticate}>
                            Reauthenticate
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reauthentication;
