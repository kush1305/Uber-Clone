import React from 'react'

const LocationSearchPanel = ({ setVehiclePanelOpen,setPanelOpen}) => {

  const location = [
    "24B, 2nd Floor, Block B, Sector 24, Noida, Uttar Pradesh 201301, India",
    "24B, 2nd Floor, Block B, Sector 24, Noida, Uttar Pradesh 201301, India", 
    "24B, 2nd Floor, Block B, Sector 24, Noida, Uttar Pradesh 201301, India",
    "24B, 2nd Floor, Block B, Sector 24, Noida, Uttar Pradesh 201301, India"
  ];

  return (
    <div>
      {location.map((ele, ind) => (
        <div 
          key={ind}
          onClick={() => {setVehiclePanelOpen(true)
            setPanelOpen(false)}
          }
          className='flex items-center border-2 active:border-black gap-4 justify-start bg-white rounded-lg shadow-lg p-3 border-color-900 cursor-pointer'
        >
          <h2><i className="ri-map-pin-fill text-xl"></i></h2>
          <h4 className='text-sm'>{ele}</h4>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;
