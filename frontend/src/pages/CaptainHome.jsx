import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import DriverDetails from '../Components/DriverDetails'
import RidePopUp from '../Components/RidePopUp'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ConfirmRidePopUp from '../Components/ConfirmRidePopUp'
import FinishRide from '../Components/FinishRide'

const CaptainHome = () => {
  const [ridePopUpPanelOpen, setRidePopUpPanelOpen] = useState(true)
  const [confirmRidePopUpPanelOpen, setConfirmRidePopUpPanelOpen] = useState(false)
  

  const ridePopUpRef = useRef(null)
  const confirmRidePopUpRef = useRef(null)
  

  useGSAP(function () {
    if (ridePopUpPanelOpen) {
      gsap.to(ridePopUpRef.current, {
        translateY: '0%'
      })
    } else {
      gsap.to(ridePopUpRef.current, {
        translateY: '100%'
      })
    }
  }, [ridePopUpPanelOpen])

  useGSAP(function () {
    if (confirmRidePopUpPanelOpen) {
      gsap.to(confirmRidePopUpRef.current, {
        translateY: '0%'
      })
    } else {
      gsap.to(confirmRidePopUpRef.current, {
        translateY: '100%'
      })
    }
  }, [confirmRidePopUpPanelOpen])

  

  return (
    <div className='h-screen '>
        
        <div className='h-3/5 '>
            <img className='w-16 fixed left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
            <Link to={'/home'} className='h-10 w-10 fixed bg-white rounded-full shadow-lg flex justify-center items-center right-2 top-2'>
                <i className="ri-logout-box-r-line text-lg font-bold"></i>
            </Link>
             <img className='w-full h-full object-cover' src="https://s.wsj.net/public/resources/images/BN-XR452_201802_M_20180228165525.gif" alt="" />
        </div>
        <div className="h-2/5 p-4 gap-2 ">
            <DriverDetails />
        </div>
        <div ref={ridePopUpRef} className="fixed w-full bottom-0 px-3 py-5 bg-white z-10">
        <RidePopUp setRidePopUpPanelOpen={setRidePopUpPanelOpen} setConfirmRidePopUpPanelOpen={setConfirmRidePopUpPanelOpen}/>
      </div>
        <div ref={confirmRidePopUpRef} className="fixed w-full bottom-0 px-3 py-5 bg-white z-10">
        <ConfirmRidePopUp setConfirmRidePopUpPanelOpen={setConfirmRidePopUpPanelOpen} setRidePopUpPanelOpen={setRidePopUpPanelOpen}/>
      </div>

      
    </div>
  )
}

export default CaptainHome