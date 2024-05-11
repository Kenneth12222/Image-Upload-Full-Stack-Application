

import React, { useState } from 'react'
import './Login.css'
import { Link } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from './firebase'
import { toast } from 'react-toastify'
import { Message } from 'primereact/message';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [menuActive, setMenuActive] = useState(false);

    const toggleMenu = () => {
      setMenuActive(!menuActive);
    };
  

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("Hey Buddy you're loged in successfully");
            window.location.href = '/profile';
            toast.success("Hey Buddy you loged in successfully", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (err) {
            console.log(err);
            toast.success("Hey Buddy try again", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <h2>Login</h2>
                <div className="form-group">
          
                    <input type="email"
                        className="form-control"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                        value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <input type="password"
                        className="form-control"
                        placeholder="Password"
                        value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <p>SignUp with Google <Link to="/register" className="create-account-link">here</Link></p>
        </div>
    )
}

export default Login;

