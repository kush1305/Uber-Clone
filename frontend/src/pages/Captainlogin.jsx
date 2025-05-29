import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Captainlogin = () => {
    const [email, setEmail] = useState('')
        const [password, setPassword] = useState('')
        const [captainData, setCaptainData] = useState({})
    
        const submitHandler =(e)=>{
            e.preventDefault();
            const newUser = {
                email: email,
                password: password
              };
            
              setCaptainData(newUser);
            //   console.log(userData);
    
            console.log(captainData)
            setEmail('')
            setPassword('')
        }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
        <img className='w-16 mb-10' src="https://static.vecteezy.com/system/resources/previews/027/127/594/non_2x/uber-logo-uber-icon-transparent-free-png.png" alt="" />
        
        <form action="" onSubmit={(e)=>{
            submitHandler(e)
        }}>
            <h3 className='text-lg font-medium mb-2'>What's your email</h3>
            <input
             value={email}
             onChange={(e)=>{
                setEmail(e.target.value)
             }}
             className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
             required type="email" placeholder='email@example.com' />

            <h3 className='text-lg font-medium mb-2'>Enter Password</h3>

            <input
            value={password}
            onChange={(e)=>{
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