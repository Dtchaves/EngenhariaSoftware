import React, { useState } from 'react';
import axios from 'axios';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [message, setMessage] = useState('');

    const handleLogin = (username, password) => {
        axios.post('http://127.0.0.1:5000/api/login', { username, password })
            .then(response => {
                setMessage(response.data.message);
                setLoggedIn(true);
            })
            .catch(error => {
                console.error('Login failed!', error);
                setMessage('Invalid credentials');
            });
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>My Application</h1>
            {loggedIn ? (
                <HomePage />
            ) : (
                <LoginPage onLogin={handleLogin} message={message} />
            )}
        </div>
    );
}

export default App;
