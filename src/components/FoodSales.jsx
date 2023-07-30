import React, { useEffect, useState } from 'react'
import Table from './Table'
import AddFoodSales from './AddFoodSales';
import axios from '../utils/axios'

function FoodSales() {
  const [foodSales, setFoodSales] = useState([])
  const [addOpen, setAddOpen] = useState(false)
  useEffect(() => {
    axios.get('/sales/getFoodSales')
      .then(res => {
        console.log("this is the food sales",res)
        setFoodSales(res.data.foodSales)
      })
      .catch(err => {
        console.log(err)
      })
  }, [addOpen])

  return (
    <div className='flex w-full justify-center py-10'>
      {
        addOpen && <AddFoodSales setAddOpen={setAddOpen} />
      }
      <div className='max-w-[900px] w-[90%] flex flex-col items-center gap-4'>
        <div className='w-full flex p-5 bg-slate-50 justify-between rounded-lg items-center shadow-md'>
          <h1 className='text-gray-500 text-xl'>Food Sales </h1>
          <button className='px-2 h-9 border rounded-full bg-green-400 text-white hover:bg-white hover:text-green-400 border-green-400 ' onClick={setAddOpen} >+ Add Sale</button>
        </div>
        <Table header={['Food Item', "No Sold", "Unit Price", 'Total', 'Date']} body={foodSales?.map((sale)=>{return {Food : sale.foodItem.name , no_sold : sale.quantity , price : sale.foodItem.price ,total : sale.total, date : sale?.createdAt?.split("T")[0]  }})} />
      </div>
    </div>
  )
}

export default FoodSales