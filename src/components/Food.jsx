import React, { useEffect, useState } from 'react'
import Table from './Table'
import AddFood from './AddFood'
import axios from '../utils/axios'
import { useNavigate } from 'react-router-dom'
import NavBar from './NavBar'
import { useSelector } from 'react-redux'
function Food() {
    const { user } = useSelector(state => state.auth)
    const navigate = useNavigate()
    // Accessing a sample data entry

    const [foods, setFoods] = useState([])
    const [addOpen, setAddOpen] = useState(false)
    const [data, setData] = useState({})
    useEffect(() => {
        if (!addOpen) {
            setData({})
        }
    }, [addOpen])
    useEffect(() => {
        axios.get('/sales/getFood')
            .then(res => {
                
                setFoods(res.data.food)
            })
            .catch(err => {
                console.log(err)
            })
    }, [addOpen])

    return (
        <>
            <NavBar></NavBar>

            <div className='flex w-full justify-center py-10'>
                {
                    addOpen && <AddFood setAddOpen={setAddOpen} foodData={data} />
                }
                <div className='max-w-[900px] w-[90%] flex flex-col items-center gap-4'>
                    <div className='w-full flex p-4 bg-slate-50 justify-between rounded-lg items-center shadow-md text-sm md:text-lg'>
                        <h1 className='text-gray-500 '>Food</h1>
                        <div className='flex gap-4 text-sm'>
                            {(user?.role == "Super Admin" || user?.role == "Admin") &&
                                <>
                                    <button className='px-2 h-8 border rounded-full bg-green-400 text-white hover:bg-white hover:text-green-400 border-green-400 ' onClick={setAddOpen} >+ Add Food</button>
                                </>

                            }
                            <button className='px-2 h-8 border rounded-full bg-green-400 text-white hover:bg-white hover:text-green-400 border-green-400 ' onClick={() => navigate('/foodsales')} >Add FoodSales</button>
                        </div>
                    </div>
                    <Table header={['Food Item', "Unit Price", 'Date', "Added By"]} body={foods?.map((food) => { return { ...food, 'Food Item': food.name, 'Unit Price': food.price, 'Date': food?.createdAt?.split("T")[0], 'Added By': food.addedBy.fullName } })} actionText={"Edit Food"} setAddOpen={setAddOpen} setData={setData} />
                </div>
            </div>
        </>
    )
}

export default Food