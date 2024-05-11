import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import './Profile.css';
import { auth } from './firebase';
import Upload from './Upload';
import Logo from './Assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export default function Profile() {
    const navigate = useNavigate();
    const [user, loading, error] = useAuthState(auth);

    const [menuOpen, setMenuOpen] = useState(false)

    const toggleMenu = () => {
        setMenuOpen(!menuOpen)
    }

    useEffect(() => {
        if (!loading && !user) {
            navigate('/login');
        }
    }, [user, loading, navigate]);

    const handleLogout = () => {
        auth.signOut();
    };

    return (
        <>
            {loading ? (
                <div className="loading-spinner">
                    <FontAwesomeIcon icon={faSpinner} spin />
                    <p>Loading...</p>
                </div>
            ) : user ? (
                <div className="profile-container">
                    <div className="navbar">
                        <div className="logo">
                            <img src={Logo} alt="Logo" />
                        </div>
                        <ul id='menu' className={menuOpen ? 'open' : ''}>
                            <button onClick={handleLogout} className="logout-button">Logout</button>
                            <i className="fas fa-times-circle" id='close' onClick={toggleMenu}></i>
                        </ul>
                        <i className="fas fa-bars" id='menu-icon' onClick={toggleMenu}></i>
                    </div>
                    <Upload />
                </div>
            ) : (
                <p>No user signed in</p>
            )}
            {error && <p>Error: {error.message}</p>}
        </>
    );
}
