import React from 'react'

const vehicles = [
    {
        name: "UberGo",
        capacity: 4,
        waitTime: "2 mins away",
        description: "Affordable, compact rides",
        price: "Rs.168.80",
        img: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png",
        alt: "UberGo vehicle icon"
    },
    {
        name: "Moto",
        capacity: 1,
        waitTime: "2 mins away",
        description: "Affordable, compact rides",
        price: "Rs.68.80",
        img: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png",
        alt: "Moto vehicle icon"
    },
    {
        name: "UberAuto",
        capacity: 3,
        waitTime: "2 mins away",
        description: "Affordable, compact rides",
        price: "Rs.118.80",
        img: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png",
        alt: "UberAuto vehicle icon"
    },
];

const VehiclePanel = ({ setVehiclePanelOpen, setConfirmRidePanelOpen }) => {
    return (
        <>
            <h5 onClick={() => setVehiclePanelOpen(false)} className='text-center absolute w-[93%] p-1 top-0 text-xl cursor-pointer'>
                <i className="ri-arrow-down-wide-line"></i>
            </h5>
            <h3 className='text-2xl font-semibold mb-5'>Choose a vehicle</h3>

            {vehicles.map((vehicle, index) => (
                <div key={index} onClick={() => {
                    setConfirmRidePanelOpen(true);
                    setVehiclePanelOpen(false);
                }} className='flex border-2 bg-gray-100 w-full items-center mb-3 justify-between active:border-black p-3 rounded-lg cursor-pointer'>
                    <img className='h-8' src={vehicle.img} alt={vehicle.alt} />
                    <div className='w-1/2 ml-2'>
                        <div className='flex items-center gap-2 font-medium text-base'>
                            {vehicle.name} <i className="ri-user-3-fill"></i>{vehicle.capacity}
                        </div>
                        <h5 className='font-medium text-sm'>{vehicle.waitTime}</h5>
                        <span className='text-xs text-gray-500 font-normal'>{vehicle.description}</span>
                    </div>
                    <h3 className='font-semibold'>{vehicle.price}</h3>
                </div>
            ))}
        </>
    );
}

export default VehiclePanel;
