import React from 'react'

const RidePopUp = ({setRidePopUpPanelOpen,setConfirmRidePopUpPanelOpen,ride,confirmRide}) => {
    return (
        <>
            <h5 onClick={() => setRidePopUpPanelOpen(false)} className='text-center absolute w-[93%] p-1 top-0 text-xl cursor-pointer'>
                <i className="ri-arrow-down-wide-line"></i>
            </h5>
            <h3 className='text-2xl font-semibold mb-5'>New Ride Available</h3>
            <div className='flex justify-between items-center bg-yellow-400 p-2 rounded-lg mb-4'>
                <div className='flex items-center'>
                    <img className='rounded-full h-10 w-10 ' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfAC3q7lkpm9lgLcbJMqtR_79aA7MxWe9C-A&s" alt="" />
                    <h4 className='text-xl px-2 font-semibold gap-2'>{ride?.user.fullname.firstname + " " + ride?.user.fullname.lastname}</h4>
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

                <button onClick={() => {
                    setConfirmRidePopUpPanelOpen(true)
                    confirmRide();

                }} className='w-full bg-green-600 text-white font-semibold p-2 rounded-lg'>Accept</button>
                <button onClick={() => {

                    
                    setRidePopUpPanelOpen(false)

                }} className='w-full bg-red-600 text-white font-semibold p-2 rounded-lg mt-3'>Decline</button>


            </div>
        </>
    )
}

export default RidePopUp