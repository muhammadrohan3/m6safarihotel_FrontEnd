import React, { useEffect, useState } from 'react'
import Table from './Table'
import AddRoomBooking from './AddRoomBooking'
import axios from '../utils/axios'

function RoomBookings() {
  const [roomBookings, setRoomBookings] = useState([])
  const [addOpen, setAddOpen] = useState(false)
  useEffect(() => {
    axios.get('/rooms/getRoomBooking')
      .then(res => {
        console.log("this is the room sales",res)
        setRoomBookings(res.data.bookings)
      })
      .catch(err => {
        console.log(err)
      })
  }, [addOpen])

  return (
    <div className='flex w-full justify-center py-10'>
      {
        addOpen && <AddRoomBooking setAddOpen={setAddOpen} />
      }
      <div className='max-w-[900px] w-[90%] flex flex-col items-center gap-4'>
        <div className='w-full flex p-5 bg-slate-50 justify-between rounded-lg items-center shadow-md'>
          <h1 className='text-gray-500 text-xl'>Room Bookings</h1>
          <button className='px-2 h-9 border rounded-full bg-green-400 text-white hover:bg-white hover:text-green-400 border-green-400 ' onClick={setAddOpen} >+ Book Rooms</button>
        </div>
        <Table header={['Room Name', "Room No" ,  "Customer Name" , "Type" ,  "Room Price", 'Total', 'Date']} body={roomBookings?.map((booking)=>{return {room : booking.room.roomName , roomNo : booking.room.roomNumber ,  customerName : booking.customerName , type : booking.room.roomType ,  price : booking.room.roomPrice ,total : booking.total, date : booking?.createdAt?.split("T")[0]  }})} />
      </div>
    </div>
  )
}

export default RoomBookings