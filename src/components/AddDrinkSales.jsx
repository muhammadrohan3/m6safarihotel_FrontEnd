import React , {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import axios from '../utils/axios'
import Message from './Message'

function AddDrinkSales({ setAddOpen }) {
    const [drinks, setDrinks] = useState([])
    const {user} = useSelector(state => state.auth)
    const [drink , setDrink] = useState({
        drinkItem : '',
        total : 0,
        quantity : 0,
        addedBy : user?._id
    })
    const [message , setMessage] = useState({text : "" , type : ""})
    useEffect(() => {
        axios.get('/sales/getDrinks')
        .then(res => {
            console.log(res)
            setDrinks(res.data.drinks)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])


    const handleSubmit = () =>{
        console.log(drink)
        if(drink.drinkItem === ""){
            setMessage({text : "Please Enter the drink" , type : "error"})
            return
        }
        if(drink.addedBy === ""){
            setMessage({text : "Please Enter the Added By" , type : "error"})
        }
        if(drink.amount === "" ){
            setMessage({text : "Please Enter the Amount" , type : "error"})
            return
        }
        if(drink.date === ""){
            setMessage({text : "Please Enter the Date" , type : "error"})
            return
        }
        axios.post('/sales/addDrinkSales' , drink)
        .then(res => {
            console.log(res)
            setMessage({text : res.data.msg , type : "success"})
            setDrink({
                drink : '',
                amount : 0,
                date : '',
                addedBy : user?._id
            })
            setAddOpen(false)
        }
        )
        .catch(err => {
            console.log(err)
            setMessage({text : err.response.data.msg , type : "error"})
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
                <h1 className='text-center text-xl'>Add Drink Sale</h1>
                {message?.text?.length > 0 && 
                    <Message type = {message.type} text = {message.text} setMessage={setMessage} />
        }
                <div>
                    <label htmlFor="">Drink</label>
                    <select name="drink" id="" className='border w-full rounded-lg px-2 h-9 mt-3' onChange={(e)=>setDrink({...drink , drinkItem : e.target.value , price : drinks?.find((item)=> item._id === e.target.value)?.price})}>
                        <option value="">Select Drink</option>
                        {
                            drinks?.map((drink ) => {
                                return <option value={drink._id}>{drink.name}</option>
                            })
                        }
                    </select>
                </div>
                <div>
                    <label htmlFor="">Unit Price</label>
                    <input type="number" className='border w-full rounded-lg px-2 h-9 mt-3' placeholder='Enter Amount here' onChange={(e)=>{setDrink({...drink , price : e.target.value})}} value = {drink.price} disabled />
                </div>
                <div>
                    <label htmlFor="">Unit Sold</label>
                    <input type="number" className='border w-full rounded-lg px-2 h-9 mt-3' placeholder='Enter Amount here' onChange={(e)=>{setDrink({...drink , quantity : e.target.value , total : e.target.value * drink?.price })}} value = {drink.quantity} />
                </div>
                <div>
                    <label htmlFor="">Total</label>
                    <input type="number" className='border w-full rounded-lg px-2 h-9 mt-3' placeholder='Enter Amount here' onChange={(e)=>{setDrink({...drink , stock : e.target.value})}} value = {drink.total} disabled />
                </div>


                <div className='w-full flex justify-center pt-10'>
                    <button className='px-2 h-9 border rounded-full bg-green-400 text-white hover:bg-white hover:text-green-400 border-green-400 ' onClick={handleSubmit}>Add Sale</button>
                </div>
            </div>
        </div>
    )
}

export default AddDrinkSales