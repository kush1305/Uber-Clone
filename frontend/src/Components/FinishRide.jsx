import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const FinishRide = ({ setFinishRidePanelOpen ,rideData}) => {

    const navigate = useNavigate()

    async function endRide() {

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`,{

            rideId: rideData._id
        },{
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        if(response.status === 200){
            navigate('/captain-home')
        }
        
    }
    return (
        <>

            <div className='h-[95%] py-12 overflow-y-scroll'>
                <h5 onClick={() =>
                    setFinishRidePanelOpen(false)
                } className='text-center absolute w-[93%] p-1 top-0 text-xl cursor-pointer'>
                    <i className="ri-arrow-down-wide-line"></i>
                </h5>
                <h3 className='text-2xl font-semibold mb-5'>Finish this ride</h3>
                <div className='flex justify-between items-center bg-yellow-400 p-2 rounded-lg mb-4'>
                    <div className='flex items-center'>
                        <img className='rounded-full h-10 w-10 ' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfAC3q7lkpm9lgLcbJMqtR_79aA7MxWe9C-A&s" alt="" />
                        <h4 className='text-xl px-2 font-semibold gap-2'>{rideData?.user.fullname.firstname}</h4>
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
                                <span className='text-sm -mt-1 text-gray-500'>{rideData?.pickup}</span>
                            </div>

                        </div>
                    </div>
                    <div className='w-full'>
                        <div className='flex items-center gap-5 p-3 border-b-2'>
                            <i className="ri-map-pin-fill"></i>
                            <div>
                                <h5 className='text-lg font-medium'>550-10/A</h5>
                                <span className='text-sm -mt-1 text-gray-500'>{rideData?.destination}</span>
                            </div>

                        </div>
                    </div>
                    <div className='w-full'>
                        <div className='flex items-center gap-5 p-3'>
                            <i className="ri-cash-line"></i>
                            <div>
                                <h5 className='text-lg font-medium'>Rs.{rideData?.fare}</h5>
                                <span className='text-sm -mt-1 text-gray-500'>Cash Cash</span>
                            </div>

                        </div>
                    </div>

                    <div className="mt-6 w-full">

                        <button onClick={endRide} className='w-full mt-5 flex justify-center bg-green-600 text-white font-semibold p-2 rounded-lg'>Finish Ride</button>

                        <p>click finish the ride if you completed the payment </p>
                    </div>


                </div>
            </div>
        </>
    )
}

export default FinishRide