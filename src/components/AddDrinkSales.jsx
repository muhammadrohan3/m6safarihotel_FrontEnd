import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from '../utils/axios'
import Message from './Message'
import { numberWithCommas, isNumber1 , isFutureDate } from '../utils/helperFunctions'
function AddDrinkSales({ setAddOpen, salesData }) {
    const [drinks, setDrinks] = useState([])
    const { user } = useSelector(state => state.auth)
    const [drink, setDrink] = useState({
        drinkItem: '',
        total: "",
        quantity: '1',
        addedBy: user?._id,
        createdAt: ""
    })
    useEffect(() => {
        if (salesData._id) {
            setDrink({
                drinkItem: salesData?.drinkItem?._id,
                total: salesData?.total,
                quantity: salesData?.quantity,
                addedBy: salesData?._id,
                price: salesData?.drinkItem?.price,
                _id: salesData?._id,
                createdAt: salesData?.createdAt.split("T")[0]
            })
        }
        else {
            setDrink({
                drinkItem: '',
                total: "",
                quantity: '1',
                addedBy: user?._id,
                createdAt: ""
            })
        }
    }, [salesData])
    useEffect(() => {

    }, [drink])
    const [message, setMessage] = useState({ text: "", type: "" })
    useEffect(() => {
        axios.get('/sales/getDrinks')
            .then(res => {
                setDrinks(res.data.drinks)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    const setTotal = (quantity, price) => {
        setDrink({ ...drink, total: quantity * price })
    }

    const handleSubmit = () => {
        if (drink.createdAt === "") {
            setMessage({ text: "Please Enter the Date", type: "error" })
            return
        }
        if (drink.drinkItem === "") {
            setMessage({ text: "Please Enter the drink", type: "error" })
            return
        }
        if (drink.addedBy === "") {
            setMessage({ text: "Please Enter the Added By", type: "error" })
        }
        if (drink.quantity === "") {
            setMessage({ text: "Please Enter the Quantity", type: "error" })
            return
        }
        
        axios.post('/sales/addDrinkSales', {
            ...drink, total: Number(drink.total.toString().replace(",", "")),
            quantity: Number(drink.quantity?.toString().replace(",", ""))
        })
            .then(res => {
                
                setMessage({ text: res.data.msg, type: "success" })
                setDrink({
                    drinkItem: '',
                    total: "",
                    quantity: '1',
                    addedBy: user?._id,
                    createdAt: ""
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

        axios.delete(`/sales/deleteDrinkSales/${drink._id}`)
            .then(res => {
                
                setMessage({ text: res.data.msg, type: "success" })
                setDrink({
                    drinkItem: '',
                    total: "",
                    quantity: '1',
                    addedBy: user?._id,
                    createdAt: ""
                })
                setAddOpen(false)
            })
            .catch(err => {
                console.log(err)
                setMessage({ text: err.response.data.msg, type: "error" })
            })
    }
    const handleUpdate = () => {
        if (drink.createdAt === "") {
            setMessage({ text: "Please Enter the Date", type: "error" })
            return
        }
        if (drink.drinkItem === "") {
            setMessage({ text: "Please Enter the drink", type: "error" })
            return
        }
        if (drink.addedBy === "") {
            setMessage({ text: "Please Enter the Added By", type: "error" })
        }
        if (drink.quantity === "") {
            setMessage({ text: "Please Enter the Quantity", type: "error" })
            return
        }
        axios.put(`/sales/updateDrinkSales/${drink._id}`, {
            ...drink, total: Number(drink.total?.toString().replace(",", "")),
            quantity: Number(drink.quantity?.toString().replace(",", ""))
        })
            .then(res => {
                setMessage({ text: res.data.msg, type: "success" })
                setDrink({
                    drinkItem: '',
                    total: "",
                    quantity: '1',
                    addedBy: user?._id,
                    createdAt: ""
                })
                setAddOpen(false)
            })
            .catch(err => {
                console.log(err)
                setMessage({ text: err.response.data.msg, type: "error" })
            })
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
                <h1 className='text-center text-xl'>Add Drink Sale</h1>
                {message?.text?.length > 0 &&
                    <Message type={message?.type} text={message?.text} setMessage={setMessage} />
                }

                <div>
                    <label htmlFor="">Date</label>
                    <input type="date" className='border w-full rounded-lg px-2 h-9 mt-3' placeholder='Enter Date here' onChange={(e) => { 
                        if(isFutureDate(e.target.value)){
                            setMessage({ text: "You cannot select future date", type: "error" })
                            return
                        }
                        setDrink({ ...drink, createdAt: e.target.value }) }} value={drink?.createdAt} />
                </div>
                <div>

                    <label htmlFor="">Drink</label>
                    <select name="drink" id="" className='border w-full rounded-lg px-2 h-9 mt-3' onChange={(e) => {
                        setDrink({
                            ...drink, 
                            drinkItem: e.target.value, 
                            price: drinks?.find((item) => item._id === e.target.value)?.price,
                            total : Number(drink?.quantity?.toString().replace(",", "")) * Number(drinks?.find((item) => item._id === e.target.value)?.price?.toString().replace(",", ""))
                        })
                    }} value={drink?.drinkItem}>
                        <option value="">Select Drink</option>
                        {
                            drinks?.map((drink) => {
                                return <option value={drink?._id}>{drink?.name}</option>
                            })
                        }
                    </select>
                </div>
                <div>
                    <label htmlFor="">Unit Price</label>
                    <input type="text" className='border w-full rounded-lg px-2 h-9 mt-3' placeholder='Enter Amount here' onChange={(e) => { setDrink({ ...drink, price: e.target.value }) }} value={numberWithCommas(drink?.price)} disabled />
                </div>
                <div>
                    <label htmlFor="">Unit Sold</label>
                    <input
                        type="text"
                        className='border w-full rounded-lg px-2 h-9 mt-3'
                        placeholder='Enter Units here'
                        onChange={(e) => {
                            if (isNumber1(e.target.value) || e.target.value === "") {
                                if (Number(e.target.value?.toString()?.replace(',', '')) <= drinks?.find((item) => item?._id === drink?.drinkItem)?.stock) {
                                    
                                    setDrink({ ...drink, quantity: e.target.value, total: Number(e.target.value.toString().replace(',', '')) * Number(drink?.price?.toString().replace(',', '')) })
                                }
                                else {
                                    setMessage({ text: "You cannot sell more than the available stock", type: "error" })
                                }
                            }
                        }}
                        value={numberWithCommas(drink?.quantity)}
                    />
                    {/* <input type="text" className='border w-full rounded-lg px-2 h-9 mt-3' placeholder='Enter Units here' value={numberWithCommas(drink.quantity)} onChange={(e) => {
                        console.log("This is ", e.target.value)
                        if (isNumber1(e.target.value) || e.target.value === "") {
                            console.log("This is 2", e.target.value)
                            if (Number(e.target.value?.toString()?.replace(',', '')) <= drinks?.find((item) => item?._id === drink?.drinkItem)?.stock) {
                                console.log(e.target.value)
                                setDrink({ ...drink, quantity: e.target.value, total: Number(e.target.value.toString().replace(',', '')) * Number(drink?.price?.toString().replace(',', '')) })
                            }
                            else {
                                setMessage({ text: "You cannot sell more than the available stock", type: "error" })
                            }
                        }

                    }} disabled={drink?.price ? false : true} /> */}
                    {drink?.drinkItem && <span className='flex w-full text-xs text-blue-600 justify-end'>Available : {drinks?.find((item) => item?._id === drink?.drinkItem)?.stock}</span>}
                </div>

                <div>
                    <label htmlFor="">Total</label>
                    <input type="text" className='border w-full rounded-lg px-2 h-9 mt-3' placeholder='Enter Amount here' onChange={(e) => { setDrink({ ...drink, stock: e.target.value }) }} value={numberWithCommas(drink?.total)} disabled />
                </div>
                {
                    drink?._id ?
                        <div className='w-full flex justify-center pt-10 gap-4'>
                            <button className='px-2 h-9 border rounded-full bg-green-400 text-white hover:bg-white hover:text-green-400 border-green-400 ' onClick={handleUpdate}>Update Sale</button>
                            <button className='px-2 h-9 border rounded-full bg-red-400 text-white hover:bg-white hover:text-red-400 border-red-400 ' onClick={handleDelete}>Delete Sale</button>
                        </div> :
                        <div className='w-full flex justify-center pt-10'>
                            <button className='px-2 h-9 border rounded-full bg-green-400 text-white hover:bg-white hover:text-green-400 border-green-400 ' onClick={handleSubmit}>Add Sale</button>
                        </div>}
            </div>
        </div>
    )
}

export default AddDrinkSales