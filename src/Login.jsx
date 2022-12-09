import './App.css';

import { useState, useEffect, useContext } from "react";
// import { getSuggestedQuery } from '@testing-library/react';
import { db } from "./firebase-config";
import { collection, getDocs, deleteDoc, doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { async } from '@firebase/util';
import { HjemKnap } from "./HjemKnap";
import { Link } from "react-router-dom";
import { NyBooking } from "./NyBooking";
import { Spinner } from "./Spinner"
import { ThemeContext } from "./HomeLayout";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateCurrentUser,
} from "firebase/auth";
import { auth } from "./firebase-config";
import { useNavigate } from 'react-router-dom';
import './login.css';



export function Login() {

    // importer content

    



    const { theme, lang, lyd, playLyd, loggedIn, setLoggedIn } = useContext(ThemeContext);

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");


    const [showLogin, setShowLogin] = useState(true);
    const [showSignUp, setShowSignUp] = useState(false);



    const register = async () => {


        try {
            const user = await createUserWithEmailAndPassword(
                auth,
                registerEmail,
                registerPassword
            );
            console.log(user);
            console.log("user created")
        } catch (error) {
            console.log(error.message);
        }
    };

    const navigate = useNavigate();

    const login = async () => {


        try {

            const user = await signInWithEmailAndPassword(
                auth,
                loginEmail,
                loginPassword
            );

            console.log(user);
            console.log("Logged in");
            setLoggedIn(true)
            navigate("/Home");
        } catch (error) {
            console.log(error.message);

        }

    };



    // const logout = async () => {
    //     await signOut(auth);
    //     console.log("signed out")
    // };


    return (
        <>
            <div className={`login-container`}>
                {showLogin &&
                    <>
                        <div className="login-wrapper">
                            <h1 className={`velkommen`} > {lang === 'dk' ? 'Velkommen' : 'Welcome'} </h1>
                            <input placeholder='  Email' onChange={(event) => setLoginEmail(event.target.value)} />
                            <input placeholder='  Password' onChange={(event) => setLoginPassword(event.target.value)} />
                            <a className='glemt'>Har du glemt dit login?</a>
                        </div>
                        <div onClick={lyd === true ? playLyd : null} className="knapper">
                            <button className='login-knap' onClick={login}>{lang === 'dk' ? 'Log ind' : 'Log in'}</button>
                            <div className="knapper"></div>
                            <button className={(theme === 'dark' ? "hjem-knap-settings " : "hjem-knap")} onClick={() => setShowSignUp(!showSignUp) & setShowLogin(!showLogin)}> {lang === 'dk' ? 'Opret dig her' : 'Not a member? Sign up'} </button>
                        </div>
                    </>}


                {showSignUp && 
                <>
                    <div className="login-wrapper">
                        <h1 className={`velkommen`}>{lang === 'dk' ? 'Tilmælding' : 'Sign up'}</h1>
                        <input placeholder='  Email' onChange={(event) => setRegisterEmail(event.target.value)} />
                        <input placeholder='  Password' onChange={(event) => setRegisterPassword(event.target.value)} />
                        <a className='glemt' > </a>
                    </div>
                    <div onClick={lyd === true ? playLyd : null} className="knapper">
                        <button className='login-knap' onClick={register}>{lang === 'dk' ? 'Registrer' : 'Register'}</button>
                        <div className="knapper"></div>
                        <button className={(theme === 'dark' ? "hjem-knap-settings " : "hjem-knap")} onClick={() => setShowSignUp(!showSignUp) & setShowLogin(!showLogin)}> {lang === 'dk' ? 'Tilbage til login' : 'Already a member? Sign in'} </button>
                    </div>
                </>}
            </div>




            {/* 
        
            <div className="wrapper-white">

                <div className={`grid-container-1 bg-${theme}`}>



                    {showLogin &&
                        <>
                            <h1 className={`velkommen`} > {lang === 'dk' ? 'Velkommen' : 'Welcome'} </h1>

                            <input placeholder='Email' onChange={(event) => setLoginEmail(event.target.value)} />
                            <input placeholder='Password' onChange={(event) => setLoginPassword(event.target.value)} />
                            <a>Har du glemt dit login?</a>

                            <button className='login-knap' onClick={login}>log ind</button>
                            <a className='opret' onClick={() => setShowSignUp(!showSignUp) & setShowLogin(!showLogin)}>Opret dig her</a>
                        </>

                    }


                    {showSignUp && <>
                        <h2 className={`velkommen`}>sign up</h2>
                        <input placeholder='Email' onChange={(event) => setRegisterEmail(event.target.value)} />
                        <input placeholder='Password' onChange={(event) => setRegisterPassword(event.target.value)} />
                        <button className='login-knap' onClick={register}>register</button>
                        <a className='opret' onClick={() => setShowSignUp(!showSignUp) & setShowLogin(!showLogin)}>Tilbage til login</a>
                    </>}




                </div>
            </div> */}

        </>)
} 