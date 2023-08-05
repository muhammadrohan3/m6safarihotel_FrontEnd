import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from '../utils/axios'
import Message from './Message'
import { numberWithCommas, isNumber , isFutureDate } from '../utils/helperFunctions'
function AddDrinksStock({ setAddOpen , stockData }) {
    const { user } = useSelector(state => state.auth)
    const [drinks, setDrinks] = useState([])
    const [drink, setDrink] = useState()
    useEffect(() => {
        if(stockData?._id){
            
            setDrink({
                drinkItem: stockData?.drinkItem?._id,
                stock: stockData?.stock,
                addedBy: stockData?.addedBy?._id,
                createdAt: stockData?.createdAt?.split("T")[0],
                _id: stockData?._id
            })
        }
        else{
            setDrink({
                drinkItem: '',
                createdAt: "",
                stock: 0,
                addedBy: user?._id
            })
        }
    }, [stockData])

    useEffect(() => {
        axios.get('/sales/getDrinks')
            .then(res => {
                
                setDrinks(res.data.drinks)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    useEffect(()=>{
        
    },[drink])
    const [message, setMessage] = useState({ text: "", type: "" })
    const handleSubmit = () => {

        if (drink.drinkItem === "") {
            setMessage({ text: "Please Select the drink", type: "error" })
            return
        }
        if (drink.addedBy === "") {
            setMessage({ text: "Please Enter the Added By", type: "error" })
        }
        if (drink.stock === "") {
            setMessage({ text: "Please Enter the Stock", type: "error" })
            return
        }

        axios.post('/sales/addDrinkStock', {
            ...drink,
            stock: Number(drink?.stock?.toString().replace(",", ""))
        })
            .then(res => {
                
                setMessage({ text: res.data.msg, type: "success" })
                setDrink({
                    drinkItem: '',
                    createdAt: "",
                    stock: 0,
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
        axios.delete(`/sales/deleteDrinkStock/${drink._id}`)
            .then(res => {
                
                setMessage({ text: res.data.msg, type: "success" })
                setDrink({
                    drinkItem: '',
                    createdAt: "",
                    stock: 0,
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
    const handleUpdate = () => {
        axios.put(`/sales/updateDrinkStock/${drink._id}`, {
            ...drink,
            stock: Number(drink?.stock?.toString().replace(",", ""))
        })
            .then(res => {
                
                setMessage({ text: res.data.msg, type: "success" })
                setDrink({
                    drinkItem: '',
                    createdAt: "",
                    stock: 0,
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
                <h1 className='text-center text-xl'>Add drink</h1>
                {message?.text?.length > 0 &&
                    <Message type={message.type} text={message.text} setMessage={setMessage} />
                }
                <div>
                    <label htmlFor="">Date</label>
                    <input type="date" className='border w-full rounded-lg px-2 h-9 mt-3' placeholder='Enter drink here' onChange={(e) => { 
                        if(isFutureDate(e.target.value)){
                            setMessage({ text: "Please Enter a valid date", type: "error" })
                            return
                        }            
                        setDrink({ ...drink, createdAt: e.target.value }) }} value={drink?.createdAt} />
                </div>
                <div>
                    <label htmlFor="">Drink</label>
                    <select name="" id="" value={drink?.drinkItem } onChange={(e) => { setDrink({ ...drink, drinkItem: e.target.value }) }} className='border w-full rounded-lg px-2 h-9 mt-3'>
                        <option value="">Choose The Drink</option>
                        {drinks?.map((drink) => {
                            return <option value={drink._id}>{drink.name}</option>
                        })}
                    </select>
                </div>
                <div>
                    <label htmlFor="">Drink Stock</label>
                    <input type="text" className='border w-full rounded-lg px-2 h-9 mt-3' placeholder='Enter drink here' onChange={(e) => { setDrink({ ...drink, stock: e.target.value }) }} value={numberWithCommas(drink?.stock)} />
                </div>

                {
                    drink?._id ? <div className='w-full flex justify-center pt-10 gap-4'>
                        <button className='px-2 h-9 border rounded-full bg-green-400 text-white hover:bg-white hover:text-green-400 border-green-400 ' onClick={handleUpdate}>Update</button>
                        <button className='px-2 h-9 border rounded-full bg-red-400 text-white hover:bg-white hover:text-red-400 border-red-400 ' onClick={handleDelete}>Delete</button>
                    </div> :
                        <div className='w-full flex justify-center pt-10'>
                            <button className='px-2 h-9 border rounded-full bg-green-400 text-white hover:bg-white hover:text-green-400 border-green-400 ' onClick={handleSubmit}>Add Stock</button>
                        </div>
                }

            </div>
        </div>
    )
}

export default AddDrinksStock