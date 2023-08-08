import React, { useState, useEffect } from 'react'
import AddUser from './AddUser'
import NavBar from './NavBar'
import Table from './Table'
import axios from '../utils/axios'
import { useSelector } from 'react-redux'
function Users() {
  const { user } = useSelector(state => state.auth)
  const [addOpen, setAddOpen] = useState(false)
  const [data, setData] = useState({})
  const [users, setUsers] = useState([])
  useEffect(() => {
    if (!addOpen) {
      setData({})
      return
    }
  }, [addOpen])
  useEffect(() => {
    axios.get('/users/getusers')
        .then(res => {
            setUsers(res.data)
        })
        .catch(err => {
            console.log(err)
        })
}, [addOpen])
  return (
    <>
      <NavBar></NavBar>
      <div className=' realtive w-full flex justify-center my-10'>
        {addOpen &&
          <AddUser setAddOpen={setAddOpen} userData={data} />
        }
        <div className='max-w-[900px] w-[90%] flex flex-col items-center gap-2'>
          <div className='w-full flex p-4 bg-slate-50 justify-between rounded-lg items-center shadow-md text-sm md:text-lg'>
            <h1 className='text-gray-500'>Users</h1>
            {(user?.role == "Super Admin") &&

              <button className='px-2 h-8 border rounded-full bg-green-400 text-white hover:bg-white hover:text-green-400 border-green-400 text-xs' onClick={setAddOpen} >+ Add New</button>
            }
          </div>
          
          <div className='w-full flex flex-col p-5 shadow-md bg-white justify-between rounded-lg items-center'>
            <h1>Manage Users</h1>
            <Table header = {["Name" , "Email" , "User Name" , "Role"]} body={users.map((user)=>({...user , "Name" : user?.fullName ,"Email" : user?.email , 'User Name' : user?.userName , Role : user?.role  }))} actionText={"Manage"} setAddOpen={setAddOpen} setData={setData} addOpen={addOpen} />
          </div>
        </div>

      </div>
    </>
  )
}

export default Users