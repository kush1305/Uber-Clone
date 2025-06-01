import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'

const Captainlogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate();
    const { setCaptain } = React.useContext(CaptainDataContext)
    

    const submitHandler = async (e) => {
        e.preventDefault();
        const captain = {
            email: email,
            password: password
        };

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain);
        if (response.status === 200) {
            const data = response.data;
            setCaptain(data);
            localStorage.setItem('token', data.token);
            navigate('/captain-home');
        } else {
            alert('Login failed. Please check your credentials.');
        }
        setEmail('')
        setPassword('')
    }
    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
            <div>
                <img className='w-16 mb-10' src="https://static.vecteezy.com/system/resources/previews/027/127/594/non_2x/uber-logo-uber-icon-transparent-free-png.png" alt="" />

                <form action="" onSubmit={(e) => {
                    submitHandler(e)
                }}>
                    <h3 className='text-lg font-medium mb-2'>What's your email</h3>
                    <input
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                        className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                        required type="email" placeholder='email@example.com' />

                    <h3 className='text-lg font-medium mb-2'>Enter Password</h3>

                    <input
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                        className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                        type="password" placeholder='password' />
                    <button
                        className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full '>
                        Login</button>

                    <p className='text-center'>Join a fleet? <Link to='/captain-signup' className='text-blue-600'>Register as a Captain</Link></p>
                </form>

            </div>

            <div>
                <Link
                    to='/login'
                    className='bg-[#61e628] flex items-center justify-center text-white font-semibold mb-7 rounded px-4 py-2 w-full '>
                    Sign in as User</Link>
            </div>
        </div>
    )
}

export default Captainlogin