import React from 'react'

const WaitingForDriver = ({ setWaitingForDriverPanelOpen ,ride}) => {
    return (
        <>
            <h5 onClick={() =>
                setWaitingForDriverPanelOpen(false)
                
            } className='text-center absolute w-[93%] p-1 top-0 text-xl cursor-pointer'>
                <i className="ri-arrow-down-wide-line"></i>
            </h5>
            <h3 className='text-2xl font-semibold mb-5'>Waiting for Driver</h3>

            <div className='flex flex-col justify-between items-center'>
                <div className='flex justify-between w-full'>
                    <img className='h-20' src='https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png' alt='' />
                    <div className="text-right">
                        <h2 className="text-lg font-medium">{ride?.captain.fullname.firstname}</h2>
                        <h4 className="text-xl font-semibold -mt-1 -mb-1">{ride?.captain.vehicle.plate}</h4>
                        <p className="text-sm text-gray-600">Maruti Suzuki Alto</p>
                        <h1 className="text-sm text-gray-600">{ride?.otp}</h1>
                    </div>
                </div>
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
            </div>
        </>
    )
}

export default WaitingForDriver