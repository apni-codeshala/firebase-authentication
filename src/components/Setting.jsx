import React from 'react'

import UpdatePasswordForm from './UpdatePasswordForm'
import UpdateNameForm from './NameUpdateForm'


const Setting = () => {
    return (
        <div className='flex flex-col items-center w-[100vw]'>
            <h1 className='font-bold underline text-3xl text-white my-4'>Update Information</h1>
            <UpdatePasswordForm />
            <UpdateNameForm />
        </div>
    )
}

export default Setting