import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from '../utils/axios'
import Message from './Message'
import { numberWithCommas } from '../utils/helperFunctions'

function AddRooms({ setAddOpen, roomData }) {
    const { user } = useSelector(state => state.auth)
    const [room, setRoom] = useState({
        roomName: '',
        roomPrice: 0,
        roomType: '',
        roomNumber: '',
        roomFloor: ''
    })
    useEffect(() => {
        console.log(roomData)
        setRoom(roomData)
    }, [roomData])
    const [message, setMessage] = useState({ text: "", type: "" })
    const handleSubmit = () => {
        console.log(room)
        if (room.roomName === "") {
            setMessage({ text: "Please Enter the room", type: "error" })
            return
        }
        if (room.roomType === "") {
            setMessage({ text: "Please Enter the Added By", type: "error" })
        }
        if (room.roomPrice === 0 || room.roomPrice < 0) {
            setMessage({ text: "Please Enter the Price", type: "error" })
            return
        }
        axios.post('/rooms/addRoom', { ...room, roomPrice: Number(room.roomPrice?.replace(",", "")) })
            .then(res => {
                setMessage({ text: res.data.msg, type: "success" })
                setRoom({
                    roomName: '',
                    roomPrice: 0,
                    roomType: '',
                    roomNumber: '',
                    roomFloor: ''
                })
                setAddOpen(false)
            })
            .catch(err => {
                console.log(err)
                setMessage({ text: err.response.data.msg, type: "error" })
            })
    }
    const handleUpdate = () => {
        axios.put("/rooms/update/" + room._id, { ...room, roomPrice: Number(room.roomPrice?.toString()?.replace(",", "")) })
            .then(res => {
                setMessage({ text: res.data.msg, type: "success" })
                setRoom({
                    roomName: '',
                    roomPrice: 0,
                    roomType: '',
                    roomNumber: '',
                    roomFloor: ''
                })
                setAddOpen(false)
            })
            .catch((err) => setMessage({ text: err.response.data.msg, type: "error" }))
    }
    const handleDelete = () => {
        axios.delete('/rooms/delete/' + room._id)
            .then(res => {
                setMessage({ text: res.data.msg, type: "success" })
                setRoom({
                    roomName: '',
                    roomPrice: 0,
                    roomType: '',
                    roomNumber: '',
                    roomFloor: ''
                })
                setAddOpen(false)
            })
            .catch((err) => setMessage({ text: err.response.data.msg, type: "error" }))
    }
    useEffect(() => {

    }, [message])
    return (
        <div className='w-full absolute top-0 left-0 flex justify-center z-10 items-center overflow-y-scroll text-gray-600 py-10 ' onClick={(e) => {
            e.stopPropagation()
            setAddOpen(false)
        }}>
            <div className='relative max-w-[800px] w-[90%] border rounded-lg flex flex-col p-10 gap-4 bg-slate-200' onClick={(e) => e.stopPropagation()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-500 absolute right-[10px] top-[10px] cursor-pointer" onClick={() => setAddOpen(false)}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h1 className='text-center text-xl'>Add Room</h1>
                {message?.text?.length > 0 &&
                    <Message type={message.type} text={message.text} setMessage={setMessage} />
                }
                <div className='w-full grid md:grid-cols-2 grid-cols-1 gap-4'>
                    <div className='w-full'>
                        <label htmlFor="">Room Name</label>
                        <input type="text" className='border w-full rounded-lg px-2 h-9 mt-3' placeholder='Enter Room Name here' onChange={(e) => { setRoom({ ...room, roomName: e.target.value }) }} value={room?.roomName} />
                    </div>
                    <div className='w-full'>
                        <label htmlFor="">Floor</label>
                        <select name="roomFloor" id="" className='border w-full rounded-lg px-2 h-9 mt-3' onChange={(e) => setRoom({ ...room, roomFloor: e.target.value })} value={room?.roomFloor}>
                            <option value="">Select Floor</option>
                            <option value="Ground Floor">Ground Floor</option>
                            <option value="First Floor">First Floor</option>
                            <option value="Second Floor">Second Floor</option>
                            <option value="Second Floor">Third Floor</option>


                        </select>
                    </div>
                </div>
                <div>
                    <label htmlFor="">Room Type</label>
                    <select name="roomType" id="" className='border w-full rounded-lg px-2 h-9 mt-3' onChange={(e) => setRoom({ ...room, roomType: e.target.value })} value={room?.roomType}>
                        <option value="">Select Room Type</option>
                        <option value="Executive">Executive</option>
                        <option value="Standard">Standard</option>
                        <option value="Twin">Twin</option>

                    </select>
                </div>
                <div>
                    <label htmlFor="">Room Price</label>
                    <input type="text" className='border w-full rounded-lg px-2 h-9 mt-3' placeholder='Enter Room Price here' onChange={(e) => { setRoom({ ...room, roomPrice: e.target.value }) }} value={numberWithCommas(room?.roomPrice)} />
                </div>
                {/* <div>
                    <label htmlFor="">Stock Available</label>
                    <input type="number" className='border w-full rounded-lg px-2 h-9 mt-3' placeholder='Enter Amount here' onChange={(e) => { setRoom({ ...room, stock: e.target.value }) }} value={room.stock} />
                </div> */}
                {room._id ? <div className='w-full flex justify-center pt-10 gap-4 text-sm'>
                    <button className='px-2 h-9 border rounded-full bg-green-400 text-white hover:bg-white hover:text-green-400 border-green-400 ' onClick={handleUpdate}>Update</button>
                    <button className='px-2 h-9 border rounded-full bg-red-400 text-white hover:bg-white hover:text-red-400 border-red-400 ' onClick={handleDelete}>Delete</button>
                </div> :
                    <div className='w-full flex justify-center pt-10'>
                        <button className='px-2 h-9 border rounded-full bg-green-400 text-white hover:bg-white hover:text-green-400 border-green-400 ' onClick={handleSubmit}>Add Rooom</button>
                    </div>}
            </div>
        </div>
    )
}

export default AddRooms