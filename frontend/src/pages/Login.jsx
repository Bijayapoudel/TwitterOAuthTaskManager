import React, { useState, useEffect } from 'react';       //added
import Twitter from '../assets/twitter.png';
import Navbar from '../components/Navbar';


const Login = () => {
    const [twitterAuthenticated, setTwitterAuthenticated] = useState(false);   //added
    const [errorMessage, setErrorMessage] = useState('');                   //added


    useEffect(() => {   //added
        setTimeout(() => {   //added
            setTwitterAuthenticated(true);   //added
        }, 3000);       //added
    }, []);                //added



    const twitterLogin = () => {
        //added
        if (!twitterAuthenticated) {
            setErrorMessage("Twitter authentication failed.");
            return;
        }
        window.open("http://localhost:4000/auth/twitter", "_self");
        window.location.href = "http://localhost:4000/auth/twitter"
    };


    const handleRegularLogin = () => {
        // Handle regular login logic if needed
        // For now, simulate the task manager app redirection
        if (!twitterAuthenticated) {
            setErrorMessage("You cannot be logged in.");
            return;
        }

        window.location.href = "http://localhost:4000/auth/twitter";   // Replace with the actual URL
    };


    return (
        <>
            <Navbar />
            <div className="login">
                <h1 className="loginTitle">PLEASE LOGIN! </h1>
                <div className="wrapper">
                    <div className="left">
                        <div className="loginButton twitter" onClick={twitterLogin}>
                            <img src={Twitter} alt="" className='icon' />
                            <p className='lTwitter'>Login With Twitter</p>
                        </div>
                    </div>

                    <div className="center">
                        <div className="line" />
                        <div className="or">OR</div>
                    </div>

                    {twitterAuthenticated ? (  //added

                        <div className="right">
                            <input type="text" id="username" placeholder='UserName' />
                            <input type="text" id="password" placeholder='Password' />
                            <button className="submit" onClick={handleRegularLogin}>Login</button>
                        </div>
                    ) : null}
                </div>
            </div>
        </>
    )
}

export default Login