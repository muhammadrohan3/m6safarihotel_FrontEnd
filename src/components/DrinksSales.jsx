import React, { useEffect, useState } from 'react'
import Table from './Table'
import AddDrinkSales from './AddDrinkSales';
import axios from '../utils/axios'
function DrinksSales() {
  const [drinkSales, setDrinkSales] = useState([])
  const [data , setData]  = useState({})
  const [addOpen, setAddOpen] = useState(false)
  useEffect(() => {
    if(!addOpen){
      setData({})
    }
    axios.get('/sales/getDrinkSales')
      .then(res => {
        console.log(res)
        setDrinkSales(res.data.sales)
      })
      .catch(err => {
        console.log(err)
      })
  }, [addOpen])


  return (
    <div className='flex w-full justify-center py-10'>
      {
        addOpen && <AddDrinkSales setAddOpen={setAddOpen} salesData = {data} />
      }
      <div className='max-w-[900px] w-[90%] flex flex-col items-center gap-4'>
        <div className='w-full flex p-5 bg-slate-50 justify-between rounded-lg items-center shadow-md'>
          <h1 className='text-gray-500 text-xl'>Drinks Sales </h1>
          <button className='px-2 h-9 border rounded-full bg-green-400 text-white hover:bg-white hover:text-green-400 border-green-400 ' onClick={setAddOpen} >+ Add Sale</button>
        </div>
        <Table header={['Drink', "No Sold", "Unit Price", 'Total', 'Date']} body={drinkSales?.map((sale)=>{return {...sale, 'Drink' : sale.drinkItem?.name , "No Sold" : sale.quantity , 'Unit Price' : sale.drinkItem?.price , "Total" : sale.total, "Date" : sale?.createdAt?.split("T")[0] }})} actionText = {"Edit Sale"} setAddOpen={setAddOpen} setData={setData}/>
      </div>
    </div>
  )
}

export default DrinksSales