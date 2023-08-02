import React , {useState , useEffect} from 'react'
import UserTable from './UserTable'
import AddUser from './AddUser'
import NavBar from './NavBar'
function Users() {
  const [addOpen , setAddOpen] = useState(false)
  const [user , setUser] = useState({})
  useEffect(()=>{
    if(!addOpen){
      setUser({})
      return
    }
  }, [addOpen] )
  return (
    <>
    <NavBar></NavBar>
    <div className=' realtive w-full flex justify-center my-10'>
      { addOpen &&
        <AddUser setAddOpen = {setAddOpen} userData = {user} />
      }
        <div className='max-w-[900px] w-[90%] flex flex-col items-center gap-2'>
            <div className='w-full flex p-4 bg-slate-50 justify-between rounded-lg items-center shadow-md text-sm md:text-lg'>
                <h1 className='text-gray-500'>Users</h1>
                <button className='px-2 h-8 border rounded-full bg-green-400 text-white hover:bg-white hover:text-green-400 border-green-400 ' onClick={setAddOpen} >+ Add New</button>
            </div>
            <div className='w-full flex flex-col p-5 shadow-md bg-white justify-between rounded-lg items-center'>
                <h1>Manage Users</h1>
                <UserTable  setAddOpen={setAddOpen} setUser={setUser} addOpen={addOpen} />
            </div>
        </div>

    </div>
    </>
  )
}

export default Users