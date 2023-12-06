import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from '../utils/axios'
import Message from './Message'
import { numberWithCommas , isNumber1 , isFutureDate} from '../utils/helperFunctions'

function AddOtherSales({ setAddOpen, salesData }) {
    const { user } = useSelector(state => state.auth)
    const [otherSales, setOtherSales] = useState({
        details: '',
        amount: 0,
        date: '',
        addedBy: user?._id
    })
    useEffect(() => {
        
        if (salesData?._id) {
            setOtherSales({ ...salesData, date: salesData?.date?.split("T")[0] })
        }

    }, [salesData])
    const [message, setMessage] = useState({ text: "", type: "" })
    const handleSubmit = () => {
        
        if (otherSales.detaials === "") {
            setMessage({ text: "Please Enter the Sales Detail", type: "error" })
            return
        }
        if (otherSales.addedBy === "") {
            setMessage({ text: "Please Enter the Added By", type: "error" })
        }
        if (otherSales.amount === "") {
            setMessage({ text: "Please Enter the Amount", type: "error" })
            return
        }
        if (otherSales.date === "") {
            setMessage({ text: "Please Enter the Date", type: "error" })
            return
        }
        axios.post('/sales/addOtherSales', {
            details: otherSales.details,
            amount: Number(otherSales.amount.replace(",", "")),
            date: otherSales.date,
            addedBy: otherSales?.addedBy
        })
            .then(res => {
                
                setMessage({ text: res.data.msg, type: "success" })
                setOtherSales({
                    details: '',
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
        axios.delete(`/sales/deleteOtherSales/${otherSales._id}`)
            .then(res => {
                
                setMessage({ text: res.data.msg, type: "success" })
                setOtherSales({
                    details: '',
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
    const handleUpdate = () => {
        axios.put(`/sales/updateOtherSales/${otherSales._id}`, {
            ...otherSales,
            amount: Number(otherSales.amount?.toString()?.replace(",", "")),
        })
            .then(res => {
                
                setMessage({ text: res.data.msg, type: "success" })
                setOtherSales({
                    details: '',
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
                <h1 className='text-center text-xl'>{`${otherSales._id ? "Update" : "Add"}`} Other Sales</h1>
                {message?.text?.length > 0 &&
                    <Message type={message.type} text={message.text} setMessage={setMessage} />
                }
                <div>
                    <label htmlFor="">Date</label>
                    <input type="date" className='border w-full rounded-lg px-2 h-9 mt-3' placeholder='Enter Date here' onChange={(e) => { 
                        if(isFutureDate(e.target.value)){
                            setMessage({ text: "Date cannot be in the future", type: "error" })
                            return
                        }
                        
                        setOtherSales({ ...otherSales, date: e.target.value })       
                }} 
                value={otherSales.date} />
                </div>
                <div>
                    <label htmlFor="">Other Sales</label>
                    <input type="text" className='border w-full rounded-lg px-2 h-9 mt-3' placeholder='Enter Details here' onChange={(e) => { setOtherSales({ ...otherSales, details: e.target.value }) }} value={otherSales.details} />
                </div>
                <div>
                    <label htmlFor="">Amount</label>
                    <input type="text" className='border w-full rounded-lg px-2 h-9 mt-3' placeholder='Enter Amount here' onChange={(e) => { 
                        if(isNumber1(e.target.value)){
                            setOtherSales({ ...otherSales, amount: e.target.value }) 
                        }
                        
                     }} value={numberWithCommas(otherSales?.amount)} />
                </div>

                {
                    otherSales._id ?
                        <div className='w-full flex justify-center pt-10 gap-4'>
                            <button className='px-2 h-9 border rounded-full bg-green-400 text-white hover:bg-white hover:text-green-400 border-green-400 ' onClick={handleUpdate}>Update Other Sales</button>
                            <button className='px-2 h-9 border rounded-full bg-red-400 text-white hover:bg-white hover:text-red-400 border-red-400 ' onClick={handleDelete}>Delete Other Sales</button>
                        </div> :
                        <div className='w-full flex justify-center pt-10'>
                            <button className='px-2 h-9 border rounded-full bg-green-400 text-white hover:bg-white hover:text-green-400 border-green-400 ' onClick={handleSubmit}>Add Other Sales</button>
                        </div>
                }
            </div>
        </div>
    )
}

export default AddOtherSales