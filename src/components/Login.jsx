import React, { useRef, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import LoginHeader from './LoginHeader';
import { checkIsDataValid } from '../utils/validate'
import { auth } from '../utils/firebase';
import { addUser } from "../utils/userSlice";

const USER_AVATAR = "https://avatars.githubusercontent.com/u/127352245?v=4";

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const handleButtonClick = async () => {
        const message = checkIsDataValid(email.current.value, password.current.value);
        setErrorMessage(message);
        if (message) return;
        try {
            if (!isSignInForm) {
                // Sign Up Logic
                const userCredential = await createUserWithEmailAndPassword(auth, email.current.value, password.current.value);
                const user = userCredential.user;

                try {
                    await updateProfile(user, {
                        displayName: name.current ? name.current.value : '',
                        photoURL: USER_AVATAR,
                    });
                    const { uid, email, displayName, photoURL } = user;
                    dispatch(addUser({ uid, email, displayName, photoURL }));
                    try {
                        // Send user email
                        const response = sendEmailVerification(auth.currentUser);
                        console.log(response);
                        console.log("Verification email send successfully");
                    } catch (error) {
                        console.log("Error in sending email", error);
                    }
                    navigate("/home");
                } catch (error) {
                    console.error("Error in updating name and photoUrl:", error);
                    setErrorMessage(`${error.code} - ${error.message}`);
                }
            } else {
                // Sign In Logic
                const emailValue = email.current.value;
                const passwordValue = password.current.value;

                console.log("Signing in with:", { email: emailValue, password: passwordValue });

                try {
                    const userCredential = await signInWithEmailAndPassword(auth, emailValue, passwordValue);
                    const user = userCredential.user;
                    console.log("User signed in:", user);
                    const { uid, email, displayName, photoURL } = user;
                    dispatch(addUser({ uid, email, displayName, photoURL }));
                    navigate("/home");
                } catch (error) {
                    console.error("Error in sign in of the user:", error);
                    setErrorMessage(`${error.code} - ${error.message}`);
                }
            }
        } catch (error) {
            console.error("Unexpected error:", error);
            setErrorMessage(`Unexpected error: ${error.message}`);
        }

    }

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    }

    return (
        <div className='w-full h-screen bg-[conic-gradient(var(--tw-gradient-stops))] from-purple-600 via-pink-600 to-blue-600'>
            <LoginHeader />
            <div className='w-full h-full flex flex-row items-center justify-center'>
                <form
                    className='w-3/12 bg-black text-white flex flex-col justify-center items-center py-12 rounded-lg bg-opacity-70'
                    onSubmit={e => e.preventDefault()}
                >
                    <h1 className='font-bold text-3xl py-4 px-2'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
                    {!isSignInForm && <input
                        type="text"
                        placeholder='Full Name'
                        ref={name}
                        className='px-2 py-3 my-3 w-[90%] bg-gray-700'
                    />}
                    <input
                        type="text"
                        placeholder='Email Address *'
                        className='px-2 py-3 my-3 w-[90%] bg-gray-700'
                        ref={email}
                    />
                    <input
                        type="password"
                        placeholder='Password *'
                        className='px-2 py-3 my-3 w-[90%] bg-gray-700'
                        ref={password}
                    />
                    <p className='text-red-500 font-bold w-[90%]'>{errorMessage}</p>
                    <button
                        className='p-4 my-6 bg-red-800 w-[90%] rounded'
                        onClick={handleButtonClick}
                    >
                        {isSignInForm ? "Sign In" : "Sign Up"}
                    </button>
                    <p
                        className='py-6 font-sans text-right text-white font-semibold cursor-pointer'
                        onClick={toggleSignInForm}
                    >
                        {isSignInForm ? "New to Platform? Sign Up Now." : "Already registered? Sign In Now."}
                    </p>
                </form>
            </div>
        </div>
    )
};

export default Login;