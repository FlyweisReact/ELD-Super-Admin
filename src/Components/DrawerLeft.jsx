// src/Drawer.js
import React from 'react';

const DrawerLeft = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay */}
      <div className={`fixed inset-0 overflow-hidden z-50 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="fixed inset-0 transition-opacity" onClick={onClose}>
        <div className="absolute inset-0 opacity-50"></div>
      </div>
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform transition-transform ease-in-out duration-300" style={{ transform: isOpen ? 'translateX(0)' : 'translateX(-100%)' }}>
        <div className="flex justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Drawer</h2>
          <button onClick={onClose}>Close</button>
        </div>
        <div className="p-4">
         <div>
            <div className='flex justify-between gap-10 my-3'>
                <p className='text-[28px]'>List View</p>
                <div className='px-[12px] py-[4px] rounded bg-white shadow'>
                    <img src="../ion_filter.png" alt="" />
                </div>
            </div>
            <div className='border border-[#8E8F8F] flex gap-2 items-center justify-center py-1 rounded'>
                <p className='text-[#8E8F8F]'>Truck</p>
                <img src="../chevron_down2.png" alt="" />
            </div>
            <div className='flex justify-between my-3'>
                <p className='text-[20px]'>2101</p>
                <div className='bg-[#BFE7F380] rounded-2xl w-fit'>
               <p className='py-1 px-4'>Parked</p> 
                </div>
            </div>
            <div>
            <div className='bg-[#BFE7F380] rounded w-fit'>
               <p className='py-1 px-6'>Muhammad Zurrain +4</p> 
                </div>
            </div>
            <div className='flex justify-between font-[600] text-[14px] my-3'>
                <p>Franklin County, GA 30521</p>
                <p>1:50 AM EDT</p>
            </div>
        </div>
         
        </div>
      </div>
    </div>

    </>
  );
};

export default DrawerLeft;
