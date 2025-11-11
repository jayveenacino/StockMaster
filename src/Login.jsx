import React, { useState } from "react";
import logo from "./assets/img/logo.png";
import "./css/Login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [recoveryEmail, setRecoveryEmail] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const adminUser = "Admin";
        const adminPass = "Casino05101983";

        if (username === adminUser && password === adminPass) {
            Swal.fire({
                toast: true,
                position: "top-end",
                icon: "success",
                title: "Login successful!",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
            });

            setTimeout(() => navigate("/main/mainpanel"), 1500);
        } else {
            Swal.fire({
                toast: true,
                position: "top-end",
                icon: "error",
                title: "Invalid username or password.",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
            });
        }
    };

    const handleRecovery = (e) => {
        e.preventDefault();

        if (recoveryEmail.trim() === "") {
            Swal.fire({
                toast: true,
                position: "top-end",
                icon: "warning",
                title: "Please enter your email address.",
                showConfirmButton: false,
                timer: 2000,
            });
            return;
        }

        Swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: "Recovery link sent to your email!",
            showConfirmButton: false,
            timer: 2000,
        });

        setShowModal(false);
        setRecoveryEmail("");
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <img src={logo} alt="Logo" className="logo" />
                <h2>AZARCON AQUANET</h2>
                <h3>All Stocks Beneath Your Control</h3>

                <form onSubmit={handleSubmit} className="form-group">
                    <input
                        type="text"
                        className="input-field"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    <div className="password-container">
                        <input
                            type={showPassword ? "text" : "password"}
                            className="input-field password-input"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <span
                            className="toggle-password"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>

                    <button type="submit" className="login-btn">
                        Login
                    </button>
                </form>

                <a
                    href="#"
                    className="forgot-password"
                    onClick={() => setShowModal(true)}
                >
                    Forgot Password?
                </a>
                <p className="version">Version 1.0</p>
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Forgot your password?</h3>
                        <p>
                            No worries! If you can’t access your account, please contact your
                            developer directly for assistance at{" "}
                            <strong>jayveemadriaganacino@gmail.com</strong>.
                            <br /><br />
                            Your account credentials can be reset securely by the developer.
                        </p>
                        <div className="modal-buttons">
                            <button
                                type="button"
                                className="modal-btn cancel-btn"
                                onClick={() => setShowModal(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
