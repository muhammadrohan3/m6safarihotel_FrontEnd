import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from '../utils/axios'
import Message from './Message'
import { numberWithCommas, isNumber } from '../utils/helperFunctions'
function AddDrinksStock({ setAddOpen }) {
    const { user } = useSelector(state => state.auth)
    const [drinks , setDrinks] = useState([])
    const [drink, setDrink] = useState({
        drinkItem: '',
        stock: 0,
        addedBy: user?._id
    })
    useEffect(()=>{
        axios.get('/sales/getDrinks')
        .then(res => {
          console.log(res)
          setDrinks(res.data.drinks)
        })
        .catch(err => {
          console.log(err)
        })
    },[])
    const [message, setMessage] = useState({ text: "", type: "" })
    const handleSubmit = () => {
        console.log(drink)
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
                console.log(res)
                setMessage({ text: res.data.msg, type: "success" })
                setDrink({
                    drinkItem: '',
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
        console.log(message)
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
                    <label htmlFor="">Drink Type</label>
                    <select name="" id="" vlaue={drink?.drinkItem} onChange={(e) => { setDrink({ ...drink, drinkItem: e.target.value }) }} className='border w-full rounded-lg px-2 h-9 mt-3'>
                        <option value="">Choose The Drink</option>
                        {drinks?.map((drink)=>{
                            return <option value={drink._id}>{drink.name}</option>
                        })}
                    </select>
                </div>
                <div>
                    <label htmlFor="">Drink Stock</label>
                    <input type="text" className='border w-full rounded-lg px-2 h-9 mt-3' placeholder='Enter drink here' onChange={(e) => { setDrink({ ...drink, stock: e.target.value }) }} value={numberWithCommas(drink.stock)} />
                </div>
                
                
                <div className='w-full flex justify-center pt-10'>
                    <button className='px-2 h-9 border rounded-full bg-green-400 text-white hover:bg-white hover:text-green-400 border-green-400 ' onClick={handleSubmit}>Add drink</button>
                </div>
            </div>
        </div>
    )
}

export default AddDrinksStock