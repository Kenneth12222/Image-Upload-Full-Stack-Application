

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import './Profile.css';
import { auth } from './firebase';
import Upload from './Upload';

export default function Profile(props) {
    const navigate = useNavigate();
    const [user, loading, error] = useAuthState(auth);
    const [imageList, setImageList] = useState([]);
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
                <p>Loading...</p>
            ) : user ? (
                <div className="profile-container">
                    <div className="navbar">
                        <div className="logo"></div>
                        <ul id='menu' className={menuOpen ? 'open' : ''}>
            
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="">Contact Us</Link></li>
                            <button onClick={handleLogout} className="logout-button">Logout</button>

                            <i class="fas fa-times-circle" id='close' onClick={toggleMenu}></i>
                        </ul>
                        <i class="fas fa-bars" id='menu-icon' onClick={toggleMenu}></i>
                        
                    </div>
                    <Upload  />
                </div>
                
            ) : (
                <p>No user signed in</p>
            )}
            {error && <p>Error: {error.message}</p>}
        </>
    );
}


