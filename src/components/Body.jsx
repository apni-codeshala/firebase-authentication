import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";

import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice"; 

const Body = () => {
    
    const dispatch = useDispatch(); 
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User signed in already
                const { uid, email, displayName, photoURL } = user;
                dispatch(addUser({ uid, email, displayName, photoURL }));
                navigate("/home");
            } else {
                // User is not signed in
                dispatch(removeUser());
                navigate("/login");
            }
        });

        return () => unsubscribe(); 
    }, [dispatch, navigate]);

    return (
        <Outlet />
    );
};

export default Body;
