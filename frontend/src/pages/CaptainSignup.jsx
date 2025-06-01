import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CaptainSignup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstname, setfirstname] = useState('')
  const [lastname, setlastname] = useState('')
  

  const { setCaptain } = React.useContext(CaptainDataContext)

  const [vehicleType, setVehicleType] = useState('')
  const [vehicleColor, setVehicleColor] = useState('')
  const [vehiclePlate, setVehiclePlate] = useState('')
  const [vehicleCapacity, setVehicleCapacity] = useState('')

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const captainData = {
      fullname: {
        firstname: firstname,
        lastname: lastname,
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType,
      }
    };
    //setUserData(captainData);

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData);

    if (response.status === 201) {
      const data = response.data;
      setCaptain(data);
      localStorage.setItem('token', data.token);
      navigate('/captain-home');
    }
    // setUserData(newUser);
    //   console.log(userData);

    //console.log(userData);
    setEmail('')
    setfirstname('')
    setlastname('')
    setPassword('')
    setVehicleColor('')
    setVehiclePlate('')
    setVehicleCapacity('')
    setVehicleType('')
  }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-16 mb-10' src="https://static.vecteezy.com/system/resources/previews/027/127/594/non_2x/uber-logo-uber-icon-transparent-free-png.png" alt="" />

        <form action="" onSubmit={(e) => {
          submitHandler(e)
        }}>

          <h3 className='text-lg font-medium mb-2'>What's your name</h3>
          <div className='flex gap-4'>
            <input
              value={firstname}
              onChange={(e) => {
                setfirstname(e.target.value)
              }}
              className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base'
              required type="text" placeholder='First name' />

            <input
              value={lastname}
              onChange={(e) => {
                setlastname(e.target.value)
              }}
              className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base'
              required type="text" placeholder='Last name' />
          </div>

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



          <div className='mb-7'>
            <h3 className='text-lg font-medium mb-2'>Vehicle Details</h3>
            <div className='flex gap-4'>
              <select
                required
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                className="bg-[#eeeeee] mb-2 rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base"
              >
                <option value="" disabled>Select Vehicle</option>
                <option value="car">Car</option>
                <option value="auto">Auto</option>
                <option value="moto">Moto</option>
              </select>


              <input
                value={vehicleColor}
                onChange={(e) => {
                  setVehicleColor(e.target.value)
                }}
                className='bg-[#eeeeee] mb-2 rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base'
                required type="text" placeholder='Vehicle Color' />
            </div>

            <div className='flex gap-4'>
              <input
                value={vehiclePlate}
                onChange={(e) => {
                  setVehiclePlate(e.target.value)
                }}
                className='bg-[#eeeeee] mb-2 rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base'
                required type="text" placeholder='Number Plate' />

              <input
                value={vehicleCapacity}
                onChange={(e) => {
                  setVehicleCapacity(e.target.value)
                }}
                className='bg-[#eeeeee] mb-2 rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base'
                required type="number" placeholder='Vehicle Capacity' />
            </div>
          </div>

          <button
            className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full '>
            Signup as Captain</button>

          <p className='text-center'>Already have a account? <Link to='/captain-login' className='text-blue-600'>Login as captain</Link></p>
        </form>
      </div>
    </div>
  )
}

export default CaptainSignup