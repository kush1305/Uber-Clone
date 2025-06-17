import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useRef, useState } from 'react'
import { Link,useLocation } from 'react-router-dom'
import FinishRide from '../Components/FinishRide'

const CaptainRiding = () => {
    const [finishRidePanelOpen, setFinishRidePanelOpen] = useState(false)
    const finishRideRef = useRef(null)

    const location= useLocation()

    const rideData= location.state?.ride

    useGSAP(function () {
        if (finishRidePanelOpen) {
          gsap.to(finishRideRef.current, {
            translateY: '0%'
          })
        } else {
          gsap.to(finishRideRef.current, {
            translateY: '100%'
          })
        }
      }, [finishRidePanelOpen])

  return (
    <div className='h-screen '>
        
        <div className='h-4/5 '>
            <img className='w-16 fixed left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
            <Link to={'/home'} className='h-10 w-10 fixed bg-white rounded-full shadow-lg flex justify-center items-center right-2 top-2'>
                <i className="ri-logout-box-r-line text-lg font-bold"></i>
            </Link>
             <img className='w-full h-full object-cover' src="https://s.wsj.net/public/resources/images/BN-XR452_201802_M_20180228165525.gif" alt="" />
        </div>
        <div className="h-1/5 p-6 flex items-center justify-between relative bg-yellow-400 ">
            <h5 className='text-center absolute w-[93%] p-1 top-0 text-xl cursor-pointer'>
                <i className="ri-arrow-up-wide-line"></i>
            </h5>
            <h4 className='text-xl font-semibold'>4 KM away</h4>
            <button onClick={() => {
                setFinishRidePanelOpen(true)
            }} className='bg-green-600 text-white font-semibold p-2 rounded-lg mt-3'>Complete ride</button>
        </div>

        <div ref={finishRideRef} className="fixed w-full bottom-0 px-3 py-5 bg-white z-10">
        <FinishRide  
        rideData={rideData}
        setFinishRidePanelOpen={setFinishRidePanelOpen} />
      </div>

        
        
    </div>
  )
}

export default CaptainRiding