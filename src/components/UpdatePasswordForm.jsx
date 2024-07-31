import React, { useRef, useState } from 'react';
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { auth } from '../utils/firebase';

const UpdatePasswordForm = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const newPasswordRef = useRef(null);
    const currentPasswordRef = useRef(null);

    const handleUpdatePassword = async () => {
        const newPassword = newPasswordRef.current.value;
        const currentPassword = currentPasswordRef.current.value;

        if (!newPassword || !currentPassword) {
            setErrorMessage('Please enter both current and new passwords.');
            return;
        }

        const user = auth.currentUser;
        if (!user) {
            setErrorMessage('No user is currently signed in.');
            return;
        }

        try {
            // Re-authenticate the user
            const credential = EmailAuthProvider.credential(user.email, currentPassword);
            await reauthenticateWithCredential(user, credential);

            // Update the password
            await updatePassword(user, newPassword);
            setSuccessMessage('Password updated successfully.');
            setErrorMessage(null); // Clear error message on success
        } catch (error) {
            console.error('Error updating password:', error);
            setErrorMessage(`${error.code} - ${error.message}`);
            setSuccessMessage(null); // Clear success message on error
        }
    };

    return (
        <div className='w-2/3 border border-red-200 h-72 m-10 rounded-lg flex flex-col items-center'>
            <h1 className='text-2xl my-2 text-white'>Update Password</h1>
            <input
                type="password"
                placeholder="Current Password"
                ref={currentPasswordRef}
                className='px-2 py-3 my-3 w-[90%] bg-gray-200 rounded-md'
            />
            <input
                type="password"
                placeholder="New Password"
                ref={newPasswordRef}
                className='px-2 py-3 my-3 w-[90%] bg-gray-200 rounded-md'
            />
            <button onClick={handleUpdatePassword} className='p-3 my-2 bg-red-200 w-[20%] rounded'>Update Password</button>
            {errorMessage && <p className='text-red-500 font-bold w-[90%]'>{errorMessage}</p>}
            {successMessage && <p className='text-green-500 font-bold w-[90%]'>{successMessage}</p>}
        </div>
    );
};

export default UpdatePasswordForm;