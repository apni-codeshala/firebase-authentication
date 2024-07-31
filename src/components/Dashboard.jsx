import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Dashboard = () => {

    const user = useSelector((store) => store.user);

    return (
        <div className='flex flex-col justify-center items-center h-[95vh] w-[100vw]'>
            <h1 className='font-bold underline text-3xl text-white mb-10'>Your Information</h1>
            <div className="bg-white shadow-xl rounded-lg py-3 w-[30rem]">
                <div className="photo-wrapper p-2">
                    <img className="w-32 h-32 rounded-full mx-auto" src={user.photoURL} alt="John Doe" />
                </div>
                <div className="p-2">
                    <h3 className="text-center text-2xl text-gray-900 font-medium leading-8">{user.displayName}</h3>
                    <div className="text-center text-gray-400 text-xs font-semibold">
                        <p>Web Developer</p>
                    </div>
                    <table className="text-xl my-3">
                        <tbody><tr>
                            <td className="px-2 py-2 text-gray-500 font-semibold">Address</td>
                            <td className="px-2 py-2">Nani Daman, Daman, Daman and Diu</td>
                        </tr>
                            <tr>
                                <td className="px-2 py-2 text-gray-500 font-semibold">Phone</td>
                                <td className="px-2 py-2">+91 9955221114</td>
                            </tr>
                            <tr>
                                <td className="px-2 py-2 text-gray-500 font-semibold">Email</td>
                                <td className="px-2 py-2">{user.email}</td>
                            </tr>
                        </tbody></table>

                    <div className="text-center my-3">
                        <Link className="text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium" to="/home/setting">Update Info</Link >
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Dashboard;