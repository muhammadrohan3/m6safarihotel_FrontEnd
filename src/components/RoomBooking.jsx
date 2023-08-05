import React from 'react'
import { numberWithCommas } from '../utils/helperFunctions'


function RoomBooking({ booking, setViewOpen , setAddOpen }) {
    
    return (
        <div className='w-full absolute top-0 left-0 flex justify-center z-10 items-center overflow-y-scroll text-gray-600 py-10 ' onClick={(e) => {
            e.stopPropagation()
            setViewOpen(false)
        }}>
            <div className='relative max-w-[800px] w-[90%] border rounded-lg bg-slate-100 flex flex-col p-10 gap-4 shadow-md' onClick={(e) => e.stopPropagation()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-500 absolute right-[10px] top-[10px] cursor-pointer" onClick={() => setViewOpen(false)}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h1 className='text-center text-xl my-10'>Room Booking</h1>
                <div className='w-full grid md:grid-cols-2 grid-cols-1 gap-4'>
                    <div className='w-full'>
                        <p className='text-base font-medium'>Room Type  : <span className='font-light'>{booking.room?.roomType}</span> </p>
                    </div>
                    <div className='w-full'>
                        <p className='text-base font-medium'>Booked Room  : <span className='font-light'>{booking.room?.roomName}</span></p>
                    </div>
                </div>
                <div className='w-full grid md:grid-cols-2 grid-cols-1 gap-4'>
                    <div className='w-full'>
                        <p className='text-base font-medium'>Check In Date : <span className='font-light'>{booking.checkIn.split("T")[0]}</span> </p>
                    </div>
                    <div className='w-full'>
                        <p className='text-base font-medium'>Checkout Date : <span className='font-light'>{booking.checkOut.split("T")[0]}</span> </p>
                    </div>
                </div>
                <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='w-full'>
                        <p className='text-base font-medium'>Room Price  : <span className='font-light'>{numberWithCommas(booking.room?.roomPrice)} UGX</span></p>
                    </div>
                    <div className='w-full'>
                        <p className='text-base font-medium'>Total Bill  : <span className='font-light'>{numberWithCommas(booking.total)} UGX</span></p>
                    </div>
                </div>
                <div>
                    <p className='text-base font-medium'>Customer Name  : <span className='font-light'>{booking.customerName}</span></p>
                </div>
                <div className='w-full flex justify-center flex-col items-center'>
                    <p className='text-base font-medium text-left w-full py-3'>Customer Id</p>
                    <img src={booking.customerId} alt="" className='w-[90%]' />
                </div>
                {
                    <div className='w-full flex justify-center pt-10'>
                        <button className='px-2 h-9 border rounded-full bg-green-400 text-white hover:bg-white hover:text-green-400 border-green-400 ' onClick={
                            ()=>{
                                setViewOpen(false)
                                setAddOpen(true)
                            }
                        }>Edit Booking</button>
                    </div>
                }

            </div>
        </div>
    )
}

export default RoomBooking