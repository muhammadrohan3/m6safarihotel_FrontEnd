import React, { useEffect, useState } from 'react'
import Table from './Table'
import AddRoomBooking from './AddRoomBooking'
import axios from '../utils/axios'
import NavBar from './NavBar'
import RoomBooking from './RoomBooking'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
function RoomBookings() {
  const navigate = useNavigate()
  const { user } = useSelector(state => state.auth)
  const [roomBookings, setRoomBookings] = useState([])
  const [addOpen, setAddOpen] = useState(false)
  const [viewOpen , setViewOpen] = useState(false)
  const [data, setData] = useState({})
  useEffect(() => {
    if (!addOpen) {
      setData({})
    }
    axios.get('/rooms/getRoomBooking')
      .then(res => {
        
        setRoomBookings(res.data.bookings)
      })
      .catch(err => {
        console.log(err)
      })
  }, [addOpen])
  useEffect(()=>{
    if (!viewOpen && !addOpen) {
      setData({})
    }
  }, [viewOpen , addOpen])
  return (
    <>
    <NavBar/>
    <div className='flex w-full justify-center py-10'>
      {
        addOpen && <AddRoomBooking setAddOpen={setAddOpen} bookingData = {data} />
      }
      {
        viewOpen && <RoomBooking booking = {data} setViewOpen = {setViewOpen} setAddOpen={setAddOpen}/>
      }
      <div className='max-w-[900px] w-[90%] flex flex-col items-center gap-4'>
        <div className='w-full flex p-4 bg-slate-50 justify-between rounded-lg items-center shadow-md text-sm md:text-lg'>
          <h1 className='text-gray-500'>Room Bookings</h1>
          <div className='flex gap-2'>
          { (user?.role === "Super Admin" || user?.role === "Admin") &&
                
                <button className='px-2 h-8 border rounded-full bg-green-400 text-white hover:bg-white hover:text-green-400 border-green-400 text-sm' onClick={setAddOpen} >+ Book Rooms</button>
          }
          <button className='px-2 h-8 border rounded-full bg-green-400 text-white hover:bg-white hover:text-green-400 border-green-400 text-sm' onClick={()=>navigate('/rooms')} > Rooms</button>

          </div>
         
          </div>
        <Table header={['Room Name' ,  "Customer Name" , "Type" ,  "Room Price", 'Total', 'Date']} body={roomBookings?.map((booking)=>{return {...booking , 'Room Name' : booking.room?.roomName , 'Customer Name' : booking.customerName , 'Type' : booking.room?.roomType ,  'Room Price' : booking.room?.roomPrice ,'Total' : booking.total, 'Date' : booking?.createdAt?.split("T")[0]  }})} actionText={"View"} setAddOpen={setViewOpen} setData={setData} />
      </div>
    </div>
    </>
  )
}

export default RoomBookings