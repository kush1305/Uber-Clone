
import { Link, useLocation } from 'react-router-dom'
import { SocketContext } from '../context/SocketContext'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'


const Riding = () => {

    const location= useLocation()

    const {ride} = location.state

    const {socket} = useContext(SocketContext)
    const navigate= useNavigate()

    socket.on('ride-ended',()=>{
        navigate('/home')
    })
  return (
    <div className='h-screen '>
        
        <div className='h-1/2'>
            <Link to={'/home'} className='fixed h-10 w-10 bg-white rounded-full shadow-lg flex justify-center items-center right-2 top-2'>
                <i className="ri-home-line text-lg font-bold"></i>
            </Link>
             <img className='w-full h-full object-cover' src="https://s.wsj.net/public/resources/images/BN-XR452_201802_M_20180228165525.gif" alt="" />
        </div>
        <div className="h-1/2 p-4 gap-2">
            <div className='flex flex-col justify-between items-center'>
                <div className='flex justify-between w-full'>
                    <img className='h-20' src='https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png' alt='' />
                    <div className="text-right">
                        <h2 className="text-lg font-medium capitalize">{ride?.captain.fullname.firstname}</h2>
                        <h4 className="text-xl font-semibold -mt-1 -mb-1">{ride?.captain.vehicle.plate}</h4>
                        <p className="text-sm text-gray-600">Maruti Suzuki Alto</p>
                    </div>
                </div>
                
                <div className='w-full pt-3'>
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
                            <h5 className='text-lg font-medium'>Rs{ride?.fare}</h5>
                            <span className='text-sm -mt-1 text-gray-500'>Cash Cash</span>
                        </div>

                    </div>
                </div>
            </div>
            <button className='w-full bg-green-600 text-white font-semibold p-3 rounded-lg'>Make a Payment</button>
        </div>
    </div>
  )
}

export default Riding