import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from '../utils/axios'
import Message from './Message'
function AddRoomBooking({ setAddOpen  , bookingData}) {
    const { user } = useSelector(state => state.auth)
    const [availableRooms, setAvailableRooms] = useState([])
    const [seletedRooms, setSelectedRooms] = useState([])
    const [roomTypes, setRoomTypes] = useState([])
    const [room, setRoom] = useState({
        room: '',
        total: 0,
        customerName: 'Dummy Customer',
        customerId: 'Dummy CustomerId',
        checkIn: '',
        checkOut: '',
    })
    useEffect(() => {
        if(bookingData){
            setRoom({
                room: bookingData.room._id,
                total: bookingData.total,
                customerName: bookingData.customerName,
                customerId: bookingData.customerId,
                checkIn: bookingData.checkIn,
                checkOut: bookingData.checkOut,
            })
        }
    }, [bookingData])
    const [message, setMessage] = useState({ text: "", type: "" })
    useEffect(() => {
        if (room.checkIn === "" || room.checkOut === "") {
            return
        }
        else if (new Date(room.checkIn) > new Date(room.checkOut)) {
            setMessage({ text: "Check Out date cannot be before Check In date", type: "error" })
            return
        }
        axios.post('/rooms/getAvailableRooms', { checkIn: room.checkIn, checkOut: room.checkOut })
            .then(res => {
                console.log(res)
                setAvailableRooms(res.data)
                let types = []
                res.data.forEach((room) => {
                    console.log(types.includes(room.roomType))
                    if (!types.includes(room.roomType)) {
                        console.log(room.roomType)
                        types.push(room.roomType)
                    }
                })
                setRoomTypes(types)
            }
            )
            .catch(err => {
                console.log(err)
            }
            )

    }, [room.checkIn, room.checkOut])
    useEffect(() => {
        if (room.roomType === "") {
            return
        }
        let rooms = availableRooms.filter((room1) => {
            console.log("This is room type", room.roomType)
            return room.roomType == room1.roomType
        }
        )
        setSelectedRooms(rooms)
    }, [room.roomType])
    const handleDateChange = (e) => {
        setAvailableRooms([])
        if (e.target.name === "checkIn") {
            setRoom({ ...room, checkIn: e.target.value })
        } else if (e.target.name === "checkOut" && new Date(room.checkIn) < new Date(e.target.value)) {
            setRoom({ ...room, checkOut: e.target.value })
        }
        if (new Date(room.checkIn) > new Date(room.checkOut)) {
            setMessage({ text: "Check Out date cannot be before Check In date", type: "error" })
            return
        }

    }
    const handleSubmit = () => {
        console.log(room)
        if (room.room === "") {
            setMessage({ text: "Please Enter the room", type: "error" })
            return
        }
        if (room.total == 0 || room.total < 0) {
            setMessage({ text: "Please Enter the Added By", type: "error" })
        }
        if (room.checkIn === "") {
            setMessage({ text: "Please Enter the Check in Date", type: "error" })
            return
        }
        if (room.checkOut === "") {
            setMessage({ text: "Please Enter the Check out Date", type: "error" })
            return
        }
        axios.post('/rooms/addRoomBooking', room)
            .then(res => {
                console.log(res)
                setMessage({ text: res.data.msg, type: "success" })
                setRoom({
                    room: '',
                    total: 0,
                    customerName: 'Dummy Customer',
                    customerId: 'Dummy CustomerId',
                    checkIn: '',
                    checkOut: '',
                })
                setAddOpen(false)
            }
            )
            .catch(err => {
                console.log(err)
                setMessage({ text: err.response.data.msg, type: "error" })
            }
            )
    }
    useEffect(() => {
        console.log(message)
    }, [message])
    const getDays = () => {
        let days = (new Date(room.checkOut) - new Date(room.checkIn)) / (1000 * 60 * 60 * 24)
        console.log(days)
        return days
    }
    return (
        <div className='w-full absolute top-0 left-0 flex justify-center z-10 items-center overflow-y-scroll text-gray-600 py-10 ' onClick={(e) => {
            e.stopPropagation()
            setAddOpen(false)
        }}>
            <div className='relative max-w-[800px] w-[90%] border rounded-lg bg-white flex flex-col p-10 gap-4' onClick={(e) => e.stopPropagation()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-500 absolute right-[10px] top-[10px] cursor-pointer" onClick={() => setAddOpen(false)}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h1 className='text-center text-xl'>Add food</h1>
                {message?.text?.length > 0 &&
                    <Message type={message.type} text={message.text} setMessage={setMessage} />
                }
                <div className='w-full grid md:grid-cols-2 grid-cols-1 gap-4'>
                    <div className='w-full'>
                        <label htmlFor="">Check In Date </label>
                        <input type="date" name={'checkIn'} className='border w-full rounded-lg px-2 h-9 mt-3' placeholder='Enter Room Name here' onChange={(e) => { handleDateChange(e) }} value={room.checkIn} />
                    </div>
                    <div className='w-full'>
                        <label htmlFor="">Checkout Date</label>
                        <input type="date" name={'checkOut'} className='border w-full rounded-lg px-2 h-9 mt-3' placeholder='Enter Room Number here' onChange={(e) => { handleDateChange(e) }} value={room.checkOut} />
                    </div>
                </div>
                <div>
                    <label htmlFor="">Room Type</label>
                    <select name="roomType" id="" className='border w-full rounded-lg px-2 h-9 mt-3' onChange={(e) => setRoom({ ...room, roomType: e.target.value })} value={room.roomType}>
                        <option value="">Select Room Type</option>
                        {
                            roomTypes.map((roomType) => {
                                return <option value={roomType}>{roomType}</option>
                            }
                            )
                        }

                    </select>
                </div>
                <div>
                    <label htmlFor="">Available Rooms</label>
                    <select name="roomType" id="" className='border w-full rounded-lg px-2 h-9 mt-3' onChange={(e) => setRoom({ ...room, room: e.target.value , total : (getDays()) * seletedRooms?.find((room1) => room1._id == e.target.value)?.roomPrice })} value={room.room}>
                        <option value="">Select The Room</option>
                        {
                            seletedRooms?.map((room) => {
                                return <option value={room._id}>{room.roomNumber} - {room.roomName}</option>
                            }
                            )
                        }

                    </select>
                </div>
                <div>
                    <label htmlFor="">Room Price</label>
                    <input type="number" className='border w-full rounded-lg px-2 h-9 mt-3' placeholder='Enter Room Price here' onChange={(e) => { setRoom({ ...room, roomPrice: e.target.value }) }} value={seletedRooms?.find((room1) => room1._id == room.room)?.roomPrice} disabled />
                </div>
                <div>
                    <label htmlFor="">Toal Bill</label>
                    <input type="number" className='border w-full rounded-lg px-2 h-9 mt-3' placeholder='Enter Amount here' onChange={(e) => { setRoom({ ...room, total: e.target.value }) }} value={(getDays()) * seletedRooms?.find((room1) => room1._id == room.room)?.roomPrice} />
                </div>
                <div className='w-full flex justify-center pt-10'>
                    <button className='px-2 h-9 border rounded-full bg-green-400 text-white hover:bg-white hover:text-green-400 border-green-400 ' onClick={handleSubmit}>Add Rooom</button>
                </div>
            </div>
        </div>
    )
}

export default AddRoomBooking