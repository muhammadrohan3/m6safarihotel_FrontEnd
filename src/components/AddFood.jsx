import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from '../utils/axios'
import Message from './Message'
function AddFood({ setAddOpen }) {
    const { user } = useSelector(state => state.auth)
    const [food, setFood] = useState({
        name: '',
        price: 0,
        addedBy: user?._id
    })
    const [message, setMessage] = useState({ text: "", type: "" })
    const handleSubmit = () => {
        console.log(food)
        if (food.name === "") {
            setMessage({ text: "Please Enter the food", type: "error" })
            return
        }
        if (food.addedBy === "") {
            setMessage({ text: "Please Enter the Added By", type: "error" })
        }
        // if (food.stock === "") {
        //     setMessage({ text: "Please Enter the Stock", type: "error" })
        //     return
        // }
        if (food.price === "") {
            setMessage({ text: "Please Enter the Price", type: "error" })
            return
        }
        axios.post('/sales/addFood', food)
            .then(res => {
                console.log(res)
                setMessage({ text: res.data.msg, type: "success" })
                setFood({
                    name: '',
                    price: 0,
                    addedBy: user?._id
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
                <div>
                    <label htmlFor="">Drink Name</label>
                    <input type="text" className='border w-full rounded-lg px-2 h-9 mt-3' placeholder='Enter food here' onChange={(e) => { setFood({ ...food, name: e.target.value }) }} value={food.name} />
                </div>
                <div>
                    <label htmlFor="">Unit Price</label>
                    <input type="number" className='border w-full rounded-lg px-2 h-9 mt-3' placeholder='Enter Amount here' onChange={(e) => { setFood({ ...food, price: e.target.value }) }} value={food.price} />
                </div>
                {/* <div>
                    <label htmlFor="">Stock Available</label>
                    <input type="number" className='border w-full rounded-lg px-2 h-9 mt-3' placeholder='Enter Amount here' onChange={(e) => { setFood({ ...food, stock: e.target.value }) }} value={food.stock} />
                </div> */}
                <div className='w-full flex justify-center pt-10'>
                    <button className='px-2 h-9 border rounded-full bg-green-400 text-white hover:bg-white hover:text-green-400 border-green-400 ' onClick={handleSubmit}>Add Food</button>
                </div>
            </div>
        </div>
    )
}

export default AddFood