import React, { useEffect, useState } from 'react'
import Table from './Table'
import AddFoodSales from './AddFoodSales';
import axios from '../utils/axios'
import NavBar from './NavBar';
function FoodSales() {
  const [foodSales, setFoodSales] = useState([])
  const [addOpen, setAddOpen] = useState(false)
  const [data, setData] = useState({})
  useEffect(() => {
    if(!addOpen){
      setData({})
    }
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
    <>
    <NavBar></NavBar>
    <div className='flex w-full justify-center py-10'>
      {
        addOpen && <AddFoodSales setAddOpen={setAddOpen} saleData = {data} />
      }
      <div className='max-w-[900px] w-[90%] flex flex-col items-center gap-4'>
        <div className='w-full flex p-4 bg-slate-50 justify-between rounded-lg items-center shadow-md text-sm md:text-lg'>
          <h1 className='text-gray-500 '>Food Sales </h1>
          <button className='px-2 h-8 border rounded-full bg-green-400 text-white hover:bg-white hover:text-green-400 border-green-400 text-sm' onClick={setAddOpen} >+ Add Sale</button>
        </div>
        <Table header={['Food Item', "No Sold", "Unit Price", 'Total', 'Date']} body={foodSales?.map((sale)=>{return {...sale , 'Food Item' : sale.foodItem?.name , 'No Sold' : sale.quantity , 'Unit Price' : sale.foodItem?.price ,Total : sale.total, Date : sale?.createdAt?.split("T")[0]  }})}actionText = {"Edit Sale"} setAddOpen={setAddOpen} setData={setData} />
      </div>
    </div>
    </>
  )
}

export default FoodSales