import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import DriverDetails from '../Components/DriverDetails'
import RidePopUp from '../Components/RidePopUp'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ConfirmRidePopUp from '../Components/ConfirmRidePopUp'
import FinishRide from '../Components/FinishRide'
import { SocketContext } from '../context/SocketContext'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'



const CaptainHome = () => {
  const [ridePopUpPanelOpen, setRidePopUpPanelOpen] = useState(false)
  const [confirmRidePopUpPanelOpen, setConfirmRidePopUpPanelOpen] = useState(false)
  const [ride,setRide] = useState(null)

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


  const { socket } = useContext(SocketContext)
  const { captain } = useContext(CaptainDataContext)

useEffect(() => {
  if (!captain || !captain._id || !socket) return;

  // Emit join once
  socket.emit('join', { userType: 'captain', userId: captain._id });

  const updateLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const location = {
          ltd: position.coords.latitude,
          lng: position.coords.longitude
        };

        console.log('Sending location update:', {
          userId: captain._id,
          location
        });

        socket.emit('update-location-captain', {
          userId: captain._id,
          location
        });
      });
    }
  };

  // First call immediately
  updateLocation();

  
  // const locationInterval = setInterval(updateLocation, 10000);

  // return () => {
  //   clearInterval(locationInterval); // Cleanup on unmount
  // };
}, []);

socket.on('new-ride',(data)=>{
  console.log(data)
  setRide(data);
  setRidePopUpPanelOpen(true)
})


    async function confirmRide() {

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {

            rideId: ride._id,
            captainId: captain._id,


        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        setRidePopUpPanelOpen(false)
        setConfirmRidePopUpPanelOpen(true)

    }





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
        <RidePopUp 
        setRidePopUpPanelOpen={setRidePopUpPanelOpen} 
        setConfirmRidePopUpPanelOpen={setConfirmRidePopUpPanelOpen}
        ride={ride}
        confirmRide={confirmRide}
        />
      </div>
      <div ref={confirmRidePopUpRef} className="fixed w-full bottom-0 px-3 py-5 bg-white z-10">
        <ConfirmRidePopUp 
        ride={ride}
        setConfirmRidePopUpPanelOpen={setConfirmRidePopUpPanelOpen} setRidePopUpPanelOpen={setRidePopUpPanelOpen} />
      </div>


    </div>
  )
}

export default CaptainHome