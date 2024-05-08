

import React, { useState } from 'react'
import './Register.css'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from './firebase'
import { Link } from 'react-router-dom'
import { setDoc, doc } from 'firebase/firestore'
import { toast } from 'react-toastify'

function Register() {
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleRegister = async (e) => {
        e.preventDefault()

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log(user);
            console.log('Registered user');

            if (user) {
                await setDoc(doc(db, "Users", user.uid), {
                    fname: fname,
                    lname: lname,
                    email: email,
                    // uid: user.uid
                });
            }

            toast.success("Hey! you have Regustered Successfully", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

        } catch (error) {
            console.log(error);
            toast.success(error.message, {
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
        <div className="register-container">
            <form className="register-form" onSubmit={handleRegister}>
                <h2>Register</h2>
                <div className="form-group">
                    
                    <input type="text"
                        className="form-control" placeholder='first name'
                        id="fname"
                        value={fname} onChange={(e) => setFname(e.target.value)} required />
                </div>
                <div className="form-group">
                    
                    <input type="text" placeholder='last name'
                        className="form-control"
                        id="lname"
                        value={lname} onChange={(e) => setLname(e.target.value)} required />
                </div>
                <div className="form-group">
                    
                    <input type="email" placeholder='email'
                        className="form-control"
                        id="email"
                        value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                
                    <input type="password" placeholder='password'
                        className="form-control"
                        id="password"
                        value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">SignUp</button>
            </form>
            <p>Google account <Link to='/login' className="login-link">Login</Link></p>
        </div>
    )
}

export default Register

