import React from 'react';
import { useNavigate } from 'react-router-dom';

function StartComponent() {
    const navigate = useNavigate();

    function handleLoginClick() {
        navigate('/login');
    }

    function handleRegistrationClick() {
        navigate('/register');
    }

    return (
        <div className="Start">
            <h1>Welcome!</h1>
            <div className="StartButtons">
                <button onClick={handleLoginClick}>Login</button>
                <button onClick={handleRegistrationClick}>Register</button>
            </div>
        </div>
    );
}

export default StartComponent;
