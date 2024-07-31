import React, { useRef, useState } from 'react';
import { updateProfile } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { updateName } from '../utils/userSlice';

const UpdateNameForm = () => {

    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState(null);
    const nameRef = useRef(null);

    const handleUpdateName = async () => {
        const newName = nameRef.current.value;
        try {
            await updateProfile(auth.currentUser, { displayName: newName });
            dispatch(updateName(newName));
            alert("Name updated successfully.");
        } catch (error) {
            console.error("Error updating name:", error);
            setErrorMessage(`${error.code} - ${error.message}`);
        }
    };

    return (
        <div className='w-2/3 border border-red-200 h-52 m-10 rounded-lg flex flex-col items-center'>
            <h1 className='text-2xl my-2 text-white'>Enter name to update</h1>
            <input
                type="text"
                placeholder="New Display Name"
                ref={nameRef}
                className='px-2 py-3 my-3 w-[90%] bg-gray-200 rounded-md'
            />
            <button onClick={handleUpdateName} className='p-3 my-2 bg-red-200 w-[20%] rounded'>Update Name</button>
            {errorMessage && <p className='text-red-500 font-bold w-[90%]'>{errorMessage}</p>}
        </div>
    );
};

export default UpdateNameForm;
