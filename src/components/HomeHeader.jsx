import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from 'react-redux';

import { addUser, removeUser } from '../utils/userSlice';

const HomeHeader = () => {
    const [userMenu, setUserMenu] = useState(false);
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch(); // Import and use dispatch
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, email, displayName, photoURL } = user;
                dispatch(
                    addUser({
                        uid: uid,
                        email: email,
                        displayName: displayName,
                        photoURL: photoURL,
                    })
                );
                navigate("/home");
            } else {
                dispatch(removeUser());
                navigate("/login");
            }
        });

        return () => unsubscribe();
    }, [dispatch, navigate]); // Add dependencies for dispatch and navigate

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                navigate("/login");
            })
            .catch((error) => {
                navigate("/error");
            });
    };

    return (
        <div className='flex py-5 px-44 justify-between bg-slate-400'>
            <div>
                <h1 className='drop-shadow-[2px_2px_var(--tw-shadow-color)] shadow-blue-500 font-bold text-white text-3xl'>
                    LoginSystem
                </h1>
            </div>
            <div className="relative group">
                <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    onClick={() => setUserMenu(!userMenu)}
                >
                    <img
                        className="w-10 h-10 rounded-full"
                        src={user?.photoURL || 'default_image_url'} // Use a default image if user.photoURL is null
                        alt="user photo"
                    />
                </button>
                <div
                    className={`z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 absolute right-0 ${!userMenu ? 'invisible' : 'block'}`}
                >
                    <div className="px-4 py-3">
                        <span className="block text-sm text-gray-900 dark:text-white">{user?.displayName || 'Guest'}</span>
                        <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{user?.email || 'guest@example.com'}</span>
                    </div>
                    <ul className="py-2">
                        <li>
                            <Link
                                to="/home/dashboard"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                            >
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/home/setting"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                            >
                                Settings
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="#"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                onClick={handleSignOut}
                            >
                                Sign out
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default HomeHeader;