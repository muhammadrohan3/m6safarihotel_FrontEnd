import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from '../utils/axios'
import Message from './Message'
import { numberWithCommas, isNumber1, isFutureDate } from '../utils/helperFunctions'
import { imageUpload } from '../utils/cloudinaryconfig'
function AddDrink({ setAddOpen, bankingData }) {
    const { user } = useSelector(state => state.auth)
    const [banking, setBanking] = useState({
        createdAt: '',
        amount: 0,
        receipt: "",
        addedBy: user?._id,
    })
    useEffect(() => {
        if (bankingData?._id) {
            setBanking({...bankingData , createdAt : bankingData?.createdAt?.split("T")[0]})
        }
    }, [bankingData])
    useEffect(() => {

    }, [banking])
    const [message, setMessage] = useState({ text: "", type: "" })
    const handleSubmit = () => {
        if (banking.createdAt === "") {
            setMessage({ text: "Please Enter the Date", type: "error" })
            return
        }
        if (banking.addedBy === "") {
            setMessage({ text: "Please Enter the Added By", type: "error" })
        }
        if (banking.amount === "") {
            setMessage({ text: "Please Enter the Price", type: "error" })
            return
        }
        if (banking.receipt === "") {
            setMessage({ text: "Please Enter the Receipt", type: "error" })
            return
        }
        axios.post('/banking/addBanking', {
            ...banking,
            amount: Number(banking?.amount?.toString().replace(",", ""))
        })
            .then(res => {
                setMessage({ text: res.data.msg, type: "success" })
                setBanking({
                    createdAt: '',
                    amount: 0,
                    receipt: "",
                    addedBy: user?._id,
                })
                setAddOpen(false)
            })
            .catch(err => {
                console.log(err)
                setMessage({ text: err.response.data.msg, type: "error" })
            })
    }
    const handleDelete = () => {
        axios.delete(`/banking/deleteBanking/${banking._id}`)
            .then(res => {

                setMessage({ text: res.data.msg, type: "success" })
                setBanking({
                    createdAt: '',
                    amount: 0,
                    receipt: "",
                    addedBy: user?._id,
                })
                setAddOpen(false)
            })
            .catch(err => {
                console.log(err)
                setMessage({ text: err.response.data.msg, type: "error" })
            })
    }
    const handleUpdate = () => {
        if (banking.createdAt === "") {
            setMessage({ text: "Please Enter the Date", type: "error" })
            return
        }
        if (banking.addedBy === "") {
            setMessage({ text: "Please Enter the Added By", type: "error" })
        }
        if (banking.amount === "") {
            setMessage({ text: "Please Enter the Price", type: "error" })
            return
        }
        if (banking.receipt === "") {
            setMessage({ text: "Please Enter the Receipt", type: "error" })
            return
        }
        axios.put(`/banking/updateBanking/${banking._id}`, {
            ...banking,

            amount: Number(banking?.amount?.toString().replace(",", ""))
        })
            .then(res => {

                setMessage({ text: res.data.msg, type: "success" })
                setBanking({
                    createdAt: '',
                    amount: 0,
                    receipt: "",
                    addedBy: user?._id,
                })
                setAddOpen(false)
            })
            .catch(err => {
                console.log(err)
                setMessage({ text: err.response.data.msg, type: "error" })
            })
    }
    const handleIdChange = (e) => {
        imageUpload(e.target.files)
            .then((res) => {
                setBanking({ ...banking, receipt: res[0].url })
            })
            .catch((err) => {
                console.log(err)
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
                <h1 className='text-center text-xl'>Add banking</h1>
                {message?.text?.length > 0 &&
                    <Message type={message.type} text={message.text} setMessage={setMessage} />
                }
                <div>
                    <label htmlFor="">Date</label>
                    <input type="date" className='border w-full rounded-lg px-2 h-9 mt-3' placeholder='Enter Date here' onChange={(e) => {
                        if (isFutureDate(e.target.value)) {
                            setMessage({ text: "Date cannot be in the future", type: "error" })
                            return
                        }
                        setBanking({ ...banking, createdAt: e.target.value })
                    }}
                        value={banking.createdAt} />
                </div>
                <div>
                    <label htmlFor="">Banking Amount</label>
                    <input type="text" className='border w-full rounded-lg px-2 h-9 mt-3' placeholder='Enter Amount here' onChange={(e) => {
                        if (isNumber1(e.target.value) || e.target.value === "") {
                            setBanking({ ...banking, amount: e.target.value })
                        }
                    }} value={numberWithCommas(banking?.amount)} />
                </div>
                <div>
                    <label htmlFor="">Receipt</label>
                    {banking.receipt ?
                        <div className="w-64 relative my-5 border border-slate-300 rounded-lg">
                            <svg
                                onClick={() => { setBanking({ ...banking, receipt: null }) }}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6 text-red-600 absolute top-[-10px] right-[-10px]"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <img
                                src={typeof banking.receipt === 'string' ? banking.receipt : URL.createObjectURL(banking.receipt)}
                                alt=""
                                className="w-72 rounded-lg"
                            />
                        </div> :
                        <input type="file" className='border w-full rounded-lg px-2 h-9 mt-3' placeholder='Enter Receipt' onChange={(e) => { handleIdChange(e) }} />
                    }
                </div>
                {banking?._id ?
                    <div className='w-full flex justify-center pt-10 gap-4'>
                        <button className='px-2 h-9 border rounded-full bg-green-400 text-white hover:bg-white hover:text-green-400 border-green-400 ' onClick={handleUpdate}>Update banking</button>
                        <button className='px-2 h-9 border rounded-full bg-red-400 text-white hover:bg-white hover:text-red-400 border-red-400 ' onClick={handleDelete}>Remove banking</button>
                    </div> : <div className='w-full flex justify-center pt-10'>
                        <button className='px-2 h-9 border rounded-full bg-green-400 text-white hover:bg-white hover:text-green-400 border-green-400 ' onClick={handleSubmit}>Add banking</button>
                    </div>}
            </div>
        </div>
    )
}

export default AddDrink