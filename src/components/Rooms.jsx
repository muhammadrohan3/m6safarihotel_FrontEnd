import React, { useEffect, useState } from 'react'
import Table from './Table'
import AddRoom from './AddRooms';
import axios from '../utils/axios'
import { useNavigate } from 'react-router-dom';
function Rooms() {
    const navigate = useNavigate()
    // Accessing a sample data entry

    const [rooms, setRooms] = useState([])
    const [addOpen, setAddOpen] = useState(false)
    useEffect(() => {

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
        <div className='flex w-full justify-center py-10'>
            {
                addOpen && <AddRoom setAddOpen={setAddOpen} />
            }
            <div className='max-w-[900px] w-[90%] flex flex-col items-center gap-4'>
                <div className='w-full flex p-5 bg-slate-50 justify-between rounded-lg items-center shadow-md'>

                    <h1 className='text-gray-500 text-xl'>Rooms</h1>
                    <div className='flex gap-4 text-sm'>
                        <button className='px-2 h-9 border rounded-full bg-green-400 text-white hover:bg-white hover:text-green-400 border-green-400 ' onClick={setAddOpen} >+ Add Rooms</button>
                        <button className='px-2 h-9 border rounded-full bg-green-400 text-white hover:bg-white hover:text-green-400 border-green-400 ' onClick={() => navigate('/roombookings')} >Add Bookings</button>
                    </div>

                </div>
                <Table header={['Rooms no', 'Room Name', " Room Type", "Price per Night"]} body={rooms?.map((room) => { return { no: room.roomNumber, name: room.roomName, roomType: room.roomType, price: room.roomPrice } })} />
            </div>
        </div>
    )
}

export default Rooms