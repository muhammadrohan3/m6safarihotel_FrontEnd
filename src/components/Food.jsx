import React, { useEffect, useState } from 'react'
import Table from './Table'
import AddFood from './AddFood'
import axios from '../utils/axios'
import { useNavigate } from 'react-router-dom'
function Food() {
    const navigate = useNavigate()
    // Accessing a sample data entry

    const [foods, setFoods] = useState([])
    const [addOpen, setAddOpen] = useState(false)
    useEffect(() => {

    }, [addOpen])
    useEffect(() => {
        axios.get('/sales/getFood')
            .then(res => {
                console.log(res)
                setFoods(res.data.food)
            })
            .catch(err => {
                console.log(err)
            })
    }, [addOpen])

    return (
        <div className='flex w-full justify-center py-10'>
            {
                addOpen && <AddFood setAddOpen={setAddOpen} />
            }
            <div className='max-w-[900px] w-[90%] flex flex-col items-center gap-4'>
                <div className='w-full flex p-5 bg-slate-50 justify-between rounded-lg items-center shadow-md'>
                    <h1 className='text-gray-500 text-xl'>Food</h1>
                    <div className='flex gap-4 text-sm'>
                        <button className='px-2 h-9 border rounded-full bg-green-400 text-white hover:bg-white hover:text-green-400 border-green-400 ' onClick={setAddOpen} >+ Add Food</button>
                        <button className='px-2 h-9 border rounded-full bg-green-400 text-white hover:bg-white hover:text-green-400 border-green-400 ' onClick={() => navigate('/foodsales')} >Add FoodSales</button>
                    </div>
                </div>
                <Table header={['Food Item', "Unit Price", 'Date', "Added By"]} body={foods?.map((food) => { return { name: food.name, price: food.price, date: food?.createdAt?.split("T")[0], addedBy: food.addedBy.fullName } })} />
            </div>
        </div>
    )
}

export default Food