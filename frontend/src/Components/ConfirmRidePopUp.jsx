import axios from 'axios'
import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'

const ConfirmRidePopUp = ({ setConfirmRidePopUpPanelOpen, setRidePopUpPanelOpen,ride }) => {

    const [otp, setOtp] = React.useState('')

    const navigate = useNavigate()

    const submitHander = async (e) => {
        e.preventDefault()

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
            params: {
                rideId: ride._id,
                otp: otp
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        if (response.status === 200) {
            setConfirmRidePopUpPanelOpen(false)
            setRidePopUpPanelOpen(false)
            navigate('/captain-riding', { state: { ride: ride } })
        }


    }
    return (
        <>

            <div className='h-screen py-12 overflow-y-scroll'>
                <h3 className='text-2xl font-semibold mb-5'>Confirm this ride to Start</h3>
                <div className='flex justify-between items-center bg-yellow-400 p-2 rounded-lg mb-4'>
                    <div className='flex items-center'>
                        <img className='rounded-full h-10 w-10 ' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfAC3q7lkpm9lgLcbJMqtR_79aA7MxWe9C-A&s" alt="" />
                        <h4 className='text-xl px-2 font-semibold gap-2 capitalize'>{ride?.user.fullname.firstname}</h4>
                    </div>
                    <div className='flex flex-col items-center'>
                        <h2 className='text-lg font-semibold'>2.5 km</h2>
                        <h5 className='text-sm text-gray-400'>Distance</h5>
                    </div>
                </div>

                <div className='flex flex-col justify-between items-center'>


                    <div className='w-full'>
                        <div className='flex items-center gap-5 p-3 border-b-2'>
                            <i className="ri-map-pin-fill"></i>
                            <div>
                                <h5 className='text-lg font-medium'>562-11/A</h5>
                                <span className='text-sm -mt-1 text-gray-500'>{ride?.pickup}</span>
                            </div>

                        </div>
                    </div>
                    <div className='w-full'>
                        <div className='flex items-center gap-5 p-3 border-b-2'>
                            <i className="ri-map-pin-fill"></i>
                            <div>
                                <h5 className='text-lg font-medium'>550-10/A</h5>
                                <span className='text-sm -mt-1 text-gray-500'>{ride?.destination}</span>
                            </div>

                        </div>
                    </div>
                    <div className='w-full'>
                        <div className='flex items-center gap-5 p-3'>
                            <i className="ri-cash-line"></i>
                            <div>
                                <h5 className='text-lg font-medium'>Rs.{ride?.fare}</h5>
                                <span className='text-sm -mt-1 text-gray-500'>Cash Cash</span>
                            </div>

                        </div>
                    </div>

                    <div className="mt-6 w-full">
                        <form onSubmit={
                            submitHander}>

                            <input value={otp} onChange={(e) => setOtp(e.target.value)} type="text" className='bg-[#eee] px-12 py-2 text-lg font-mono rounded-lg w-full mt-3' placeholder='Enter OTP'/>
                            <button className='w-full mt-5 flex justify-center bg-green-600 text-white font-semibold p-2 rounded-lg'>Accept</button>
                            <button type="button" onClick={() => {

                                setConfirmRidePopUpPanelOpen(false)
                                setRidePopUpPanelOpen(false)

                            }} className='w-full bg-red-600 text-white font-semibold p-2 rounded-lg mt-3'>Decline</button>
                        </form>
                    </div>


                </div>
            </div>
        </>
    )
}

export default ConfirmRidePopUp