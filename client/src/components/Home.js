import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()
    return (
        <center>
            <h1 className='text-3xl mb-20'>Form Builder</h1>
            <div className=' w-full flex items-center justify-center gap-4 '>
                <button className='bg-indigo-400 p-2 px-4' onClick={() => navigate('/user')}>User</button>
                <button className='bg-indigo-400 p-2 px-4' onClick={() => navigate('/admin')}>Admin</button>
            </div>
        </center>

    )
}

export default Home
