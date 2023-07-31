import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from '../utils/axios'
import Message from './Message'

function AddFoodSales({ setAddOpen, saleData }) {
    const [foods, setFoods] = useState([])
    const { user } = useSelector(state => state.auth)
    const [food, setFood] = useState({
        foodItem: '',
        total: 0,
        quantity: 0,
        addedBy: user?._id
    })
    useEffect(() => {
        if (saleData._id) {
            console.log(saleData)
            setFood({
                foodItem: saleData.foodItem?._id,
                total: saleData.total,
                quantity: saleData.quantity,
                addedBy: user?._id,
                price: saleData.foodItem?.price ,
                _id : saleData._id
            })
        }
    }, [saleData])
    const [message, setMessage] = useState({ text: "", type: "" })
    useEffect(() => {
        axios.get('/sales/getFood')
            .then(res => {
                console.log(res)
                setFoods(res.data.food)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])


    const handleSubmit = () => {
        console.log(food)
        if (food.drinkItem === "") {
            setMessage({ text: "Please Enter the food", type: "error" })
            return
        }
        if (food.addedBy === "") {
            setMessage({ text: "Please Enter the Added By", type: "error" })
        }
        if (food.amount === "") {
            setMessage({ text: "Please Enter the Amount", type: "error" })
            return
        }
        axios.post('/sales/addFoodSales', food)
            .then(res => {
                console.log(res)
                setMessage({ text: res.data.msg, type: "success" })
                setFood({
                    foodItem: '',
                    amount: 0,
                    date: '',
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
    const handleDelete = () => {
        axios.delete(`/sales/deleteFoodSales/${food._id}`)
            .then(res => {
                console.log(res)
                setMessage({ text: res.data.msg, type: "success" })
                setFood({
                    foodItem: '',
                    total: 0,
                    addedBy: user?._id ,
                    quantity: 0,
                })
                setAddOpen(false)
            })
            .catch(err => {
                console.log(err)
                setMessage({ text: err.response.data.msg, type: "error" })
            })
    }
    const handleUpdate = () => {
        axios.put(`/sales/updateFoodSales/${food._id}`, food)
            .then(res => {
                console.log(res)
                setMessage({ text: res.data.msg, type: "success" })
                setFood({
                    foodItem: '',
                    total: 0,
                    addedBy: user?._id ,
                    quantity: 0,
                })
                setAddOpen(false)
            })
            .catch(err => {
                console.log(err)
                setMessage({ text: err.response.data.msg, type: "error" })
            })
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
                <h1 className='text-center text-xl'>Add Drink Sale</h1>
                {message?.text?.length > 0 &&
                    <Message type={message.type} text={message.text} setMessage={setMessage} />
                }
                <div>
                    <label htmlFor="">Food Item</label>
                    <select name="food" id="" className='border w-full rounded-lg px-2 h-9 mt-3' onChange={(e) => setFood({ ...food, foodItem: e.target.value, price: foods?.find((item) => item?._id === e.target.value)?.price })} value={food?.foodItem}>
                        <option value="">Select Food Item</option>
                        {
                            foods?.map((food) => {
                                return <option value={food._id}>{food.name}</option>
                            })
                        }
                    </select>
                </div>
                <div>
                    <label htmlFor="">Unit Price</label>
                    <input type="number" className='border w-full rounded-lg px-2 h-9 mt-3' placeholder='Enter Amount here' onChange={(e) => { setFood({ ...food, price: e.target.value }) }} value={food.price} disabled />
                </div>
                <div>
                    <label htmlFor="">Unit Sold</label>
                    <input type="number" className='border w-full rounded-lg px-2 h-9 mt-3' placeholder='Enter Amount here' onChange={(e) => { setFood({ ...food, quantity: e.target.value, total: e.target.value * food?.price }) }} value={food.quantity} />
                </div>
                <div>
                    <label htmlFor="">Total</label>
                    <input type="number" className='border w-full rounded-lg px-2 h-9 mt-3' placeholder='Enter Amount here' onChange={(e) => { setFood({ ...food, stock: e.target.value }) }} value={food.total} disabled />
                </div>
                {
                    food._id ? <div className='w-full flex justify-center pt-10 gap-4'>
                        <button className='px-2 h-9 border rounded-full bg-green-400 text-white hover:bg-white hover:text-green-400 border-green-400 ' onClick={handleUpdate}>Update Sale</button>
                        <button className='px-2 h-9 border rounded-full bg-red-400 text-white hover:bg-white hover:text-red-400 border-red-400 ' onClick={handleDelete}>Delete Sale</button>
                    </div>
                        :
                        <div className='w-full flex justify-center pt-10'>
                            <button className='px-2 h-9 border rounded-full bg-green-400 text-white hover:bg-white hover:text-green-400 border-green-400 ' onClick={handleSubmit}>Add Sale</button>
                        </div>
                }
            </div>
        </div>
    )
}

export default AddFoodSales