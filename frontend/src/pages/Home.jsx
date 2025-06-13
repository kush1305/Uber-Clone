import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../Components/LocationSearchPanel';
import VehiclePanel from '../Components/VehiclePanel';
import ConfirmRide from '../Components/ConfirmRide';
import LookingForDriver from '../Components/LookingForDriver';
import WaitingForDriver from '../Components/WaitingForDriver';

const Home = () => {
  // State variables to control the panels
  // These states will be used to open and close the panels
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false)
  const [confirmRidePanelOpen, setConfirmRidePanelOpen] = useState(false)
  const [lookingForDriverPanelOpen, setLookingForDriverPanelOpen] = useState(false) // this state is named as vehicleFound in the original code, but it seems to be used for looking for a driver
  const [waitingForDriverPanelOpen, setWaitingForDriverPanelOpen] = useState(false) // This state is for the waiting for driver panel
  
  // Refs for the panels
  // These refs will be used to control the animations of the panels
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const vehiclePanelRef = useRef(null)
  const confirmRidePanelRef = useRef(null)
  const lookingForDriverPanelRef = useRef(null) // This ref is named as vehicleFound ref in the original code
  const waitingForDriverPanelRef = useRef(null) // This ref is for the waiting for driver panel

  const submitHandler = (e) => {
    e.preventDefault();
  }

  // Using GSAP to animate the panels based on the state changes
  // The useGSAP hook is a custom hook that uses GSAP to animate the elements when the dependencies change

  useGSAP(function () {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '70%'
      })
      gsap.to(panelCloseRef.current, {
        opacity: 1
      })
    } else {
      gsap.to(panelRef.current, {
        height: '0%'
      })
      gsap.to(panelCloseRef.current, {
        opacity: 0
      })
    }
  }, [panelOpen])

  useGSAP(function () {
    if (vehiclePanelOpen) {
      gsap.to(vehiclePanelRef.current, {
        translateY: '0%'
      })
    } else {
      gsap.to(vehiclePanelRef.current, {
        translateY: '100%'
      })
    }
  }, [vehiclePanelOpen])

  useGSAP(function () {
    if (confirmRidePanelOpen) {
      gsap.to(confirmRidePanelRef.current, {
        translateY: '0%'
      })
    } else {
      gsap.to(confirmRidePanelRef.current, {
        translateY: '100%'
      })
    }
  }, [confirmRidePanelOpen])

  useGSAP(function () {
    if (lookingForDriverPanelOpen) {
      gsap.to(lookingForDriverPanelRef.current, {
        translateY: '0%'
      })
    } else {
      gsap.to(lookingForDriverPanelRef.current, {
        translateY: '100%'
      })
    }
  }, [lookingForDriverPanelOpen])

  useGSAP(function () {
    if (waitingForDriverPanelOpen) {
      gsap.to(waitingForDriverPanelRef.current, {
        translateY: '0%'
      })
    } else {
      gsap.to(waitingForDriverPanelRef.current, {
        translateY: '100%'
      })
    }
  }, [waitingForDriverPanelOpen])

  return (
    <div className='relative h-screen overflow-hidden'>
      <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />

      <div>
        {/*image for temporary*/}
        <img className='w-full h-screen object-cover' src="https://s.wsj.net/public/resources/images/BN-XR452_201802_M_20180228165525.gif" alt="" />
      </div>

      <div className='flex flex-col justify-end h-screen absolute top-0 w-full'>
        <div className='h-[30%] p-5 bg-white relative'>
          <h5 ref={panelCloseRef} onClick={() => {
            setPanelOpen(false);
          }} className='right-6 top-6 absolute text-lg opacity-0'><i className="ri-arrow-down-double-fill "></i></h5>
          <h4 className='text-2xl font-semibold'>Find a trip</h4>

          <form onSubmit={(e) => submitHandler(e)} >

            <div className="line absolute h-16 w-1 top-[45%] left-10 bg-gray-900 rounded-full"></div>
            <input type="text"
              onClick={() => {
                setPanelOpen(true);
              }}
              value={pickup}
              onChange={(e) => {
                setPickup(e.target.value);
              }}
              className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5'
              placeholder='Add a pickup point' />


            <input
              onClick={() => {
                setPanelOpen(true);
              }}
              value={destination} onChange={(e) => {
                setDestination(e.target.value);
              }}
              type="text" className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3' placeholder='Enter a destination' />
          </form>
        </div>

        <div ref={panelRef} className='h-[0] bg-white'>
          <LocationSearchPanel setVehiclePanelOpen={setVehiclePanelOpen} setPanelOpen={setPanelOpen }/>
        </div>
      </div>

      <div ref={vehiclePanelRef} className="fixed w-full bottom-0 px-3 py-5 bg-white z-10 translate-y-full">
        <VehiclePanel setConfirmRidePanelOpen={setConfirmRidePanelOpen} setVehiclePanelOpen={setVehiclePanelOpen}/>
      </div>

      <div ref={confirmRidePanelRef} className="fixed w-full bottom-0 px-3 py-5 bg-white z-10 translate-y-full">
        <ConfirmRide setConfirmRidePanelOpen={setConfirmRidePanelOpen} setLookingForDriverPanelOpen={setLookingForDriverPanelOpen} />
      </div>

      <div ref={lookingForDriverPanelRef} className="fixed w-full bottom-0 px-3 py-5 bg-white z-10 translate-y-full">
        <LookingForDriver setLookingForDriverPanelOpen={setLookingForDriverPanelOpen}/>
      </div>

      <div ref={waitingForDriverPanelRef} className="fixed w-full bottom-0 px-3 py-5 bg-white z-10">
        <WaitingForDriver setWaitingForDriverPanelOpen={setWaitingForDriverPanelOpen} />
      </div>

      

    </div>
  )
}

export default Home