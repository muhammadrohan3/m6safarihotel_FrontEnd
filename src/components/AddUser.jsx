import React, { useEffect, useState } from 'react'
import axios from '../utils/axios'
function AddUser({ setAddOpen, userData }) {
    console.log(userData)
    const [user, setUser] = useState({
        email: '',
        fullName: '',
        password: '',
        role: ''
    })
    useEffect(() => {
        setUser({...userData , password : ""})
    }, [userData])
    const [message, setMessage] = useState('')
    const handleSubmit = () => {
        setTimeout(() => {
            setMessage('')
        }, 2500)
        if (user.email === "") {
            setMessage('Please Enter the Email')
            return
        }
        if (user.fullname === "") {
            setMessage("Fullname is required")
        }
        if (user.password === "" || user.password.length < 8) {
            setMessage("Min password length should be 8")
            return
        }
        if (user.role === "") {
            setMessage("User Role is required")
            return
        }
        axios.post('/users/create', user)
            .then(res => {
                setAddOpen(false)
                setMessage(res.data.msg)
                setUser({
                    email: '',
                    fullName: '',
                    password: '',
                    role: ''
                })
            })
            .catch(err => {
                console.log(err)
                setMessage(err.response.data.msg)
            })


        console.log(user)
    }
    const deleteUser = () => {
        axios.delete(`/users/deleteuser/${user._id}`)
            .then(res => {
                console.log(res)
                setAddOpen(false)
                setMessage(res.data.msg)
                setUser({
                    email: '',
                    fullName: '',
                    password: '',
                    role: ''
                })
            })
            .catch(err => {
                console.log(err)
                setMessage(err.response.data.msg)
            })
    }
    const updateUser = () => {
        axios.put(`/users/updateuser/${user._id}`, user)
            .then(res => {
                setAddOpen(false)
                setMessage(res.data.msg)
                setUser({
                    email: '',
                    fullName: '',
                    password: '',
                    role: ''
                })
            })
            .catch(err => {
                console.log(err)
                setMessage(err.response.data.msg)
            })
    }

    return (
        <div className='w-full absolute top-0 left-0 flex justify-center z-10 items-center overflow-y-scroll text-gray-600 py-10 ' onClick={(e) => {
            e.stopPropagation()
            setAddOpen(false)
            setUser({
                email: '',
                fullName: '',
                password: '',
                role: ''
            })
        }}>
            <div className='relative max-w-[800px] w-[90%] border rounded-lg bg-white flex flex-col p-10 gap-4' onClick={(e) => e.stopPropagation()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-500 absolute right-[10px] top-[10px] cursor-pointer" onClick={() => {
                    setUser({
                        email: '',
                        fullName: '',
                        password: '',
                        role: ''
                    })
                    setAddOpen(false)}}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h1 className='text-center text-xl'>Add User</h1>
                {message?.length > 0 &&
                    <div className='w-full h-9 bg-red-500 text-white rounded-lg flex items-center px-2 '>
                        {message}
                    </div>}
                <div>
                    <label htmlFor="">Email</label>
                    <input type="text" className='border w-full rounded-lg px-2 h-9 mt-3' placeholder='Enter Email here' onChange={(e) => { setUser({ ...user, email: e.target.value }) }} value={user.email} />
                </div>
                <div>
                    <label htmlFor="">Full Name</label>
                    <input type="text" className='border w-full rounded-lg px-2 h-9 mt-3' placeholder='Enter Fullname here' onChange={(e) => { setUser({ ...user, fullName: e.target.value }) }} value={user.fullName} />
                </div>
                <div>
                    <label htmlFor="">Password</label>
                    <input type="password" className='border w-full rounded-lg px-2 h-9 mt-3' placeholder='Enter Password here' onChange={(e) => { setUser({ ...user, password: e.target.value }) }} value={user.password} />
                </div>
                <div>
                    <label htmlFor="">Role</label>
                    <select name="role" id="" className='border w-full rounded-lg px-2 h-9 mt-3' onChange={(e) => { setUser({ ...user, role: e.target.value }) }} value={user.role}>
                        <option value="">Please Select the role</option>
                        <option value="Super Admin">Super Admin</option>
                        <option value="Admin">Admin</option>
                        <option value="User">User</option>
                    </select>
                </div>
                {
                    user._id ? <div className='w-full flex justify-center py-10 gap-4'>
                        <button className='px-2 h-9 border rounded-full bg-green-400 text-white hover:bg-white hover:text-green-400 border-green-400 ' onClick={updateUser}>Update User</button>
                        <button className='px-2 h-9 border rounded-full bg-red-400 text-white hover:bg-white hover:text-red-400 border-red-400 ' onClick={deleteUser}>Delete User</button>
                    </div> : <div className='w-full flex justify-center py-10'>
                        <button className='px-2 h-9 border rounded-full bg-green-400 text-white hover:bg-white hover:text-green-400 border-green-400 ' onClick={handleSubmit}>Add User</button>
                    </div>
                }

            </div>
        </div>
    )
}

export default AddUser