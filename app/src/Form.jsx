import React, { useState } from 'react';
import axios from 'axios';
import './Form.css';

function FormPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        dob: '',
    });

    const [auth, switchAuth] = useState(true);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/register', formData);
            console.log('API response:', response.data.token);
            switchAuth(!auth);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', formData);
            console.log('API response:', response);
            localStorage.setItem('user', JSON.stringify(response.data.token));
            window.location.replace('/home');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container-form">
           {auth? <h1>Register Yourself</h1>:<h1>Login</h1>}
            <div className={`form-container ${auth ? 'signup' : 'login'}`}>
                {auth ? (
                    <>
                        <div className="input-group">
                            <label>Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="input-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="input-group">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="input-group">
                            <label>Date</label>
                            <input
                                type="date"
                                name="dob"
                                value={formData.dob}
                                onChange={handleInputChange}
                            />
                        </div>
                        <button className="signup-button" onClick={handleSignUp}>
                            SignUp
                        </button>
                    </>
                ) : (
                    <>
                        <div className="input-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="input-group">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                        </div>
                        <button className="signin-button" onClick={handleLogin}>
                            SignIn
                        </button>
                    </>
                )}
            </div>
            <p className="auth-toggle" onClick={() => switchAuth(!auth)}>
                {auth ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
            </p>
        </div>
    );
}

export default FormPage;
