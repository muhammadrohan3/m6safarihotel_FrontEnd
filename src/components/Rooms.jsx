import React, { useEffect, useState } from 'react'
import Table from './Table'
import AddRoom from './AddRooms';
import axios from '../utils/axios'
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
function Rooms() {
    const navigate = useNavigate()
    // Accessing a sample data entry

    const [rooms, setRooms] = useState([])
    const [addOpen, setAddOpen] = useState(false)
    const [data, setData] = useState({})
    useEffect(() => {
        if(!addOpen){
          setData({})
        }
    }, [addOpen])
    useEffect(() => {
        axios.get('/rooms/getRooms')
            .then(res => {
                console.log(res)
                setRooms(res.data.rooms)
            })
            .catch(err => {
                console.log(err)
            })
    }, [addOpen])

    return (
        <>
        <NavBar></NavBar>
        <div className='flex w-full justify-center py-10'>
            {
                addOpen && <AddRoom setAddOpen={setAddOpen} roomData = {data}/>
            }
            <div className='max-w-[900px] w-[90%] flex flex-col items-center gap-4'>
                <div className='w-full flex p-4 bg-slate-50 justify-between rounded-lg items-center shadow-md text-sm md:text-lg'>

                    <h1 className='text-gray-500'>Rooms</h1>
                    <div className='flex gap-4 text-sm'>
                        <button className='px-2 h-8 border rounded-full bg-green-400 text-white hover:bg-white hover:text-green-400 border-green-400 ' onClick={setAddOpen} >+ Add Rooms</button>
                        <button className='px-2 h-8 border rounded-full bg-green-400 text-white hover:bg-white hover:text-green-400 border-green-400 ' onClick={() => navigate('/roombookings')} >Add Bookings</button>
                    </div>

                </div>
                <Table header={[ "Room Name", "Room Type", "Price per Night"]} body={rooms?.map((room) => { return {...room,  "Room Name": room.roomName, "Room Type": room.roomType, "Price per Night": room.roomPrice } })} actionText = {"Edit Room"} setAddOpen={setAddOpen} setData={setData} />
            </div>
        </div>
        </>
    )
}

export default Rooms