import React, { useEffect, useState } from 'react'
import Table from './Table'
import AddDrinkSales from './AddDrinkSales';
import axios from '../utils/axios'
import NavBar from './NavBar';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function DrinksSales() {
  const navigate = useNavigate()
  const [drinkSales, setDrinkSales] = useState([])
  const {user} = useSelector(state => state.auth)
  const [data , setData]  = useState({})
  const [addOpen, setAddOpen] = useState(false)
  useEffect(() => {
    console.log("This is from drinksales", data)
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
    <>
    <NavBar></NavBar>
    <div className='flex w-full justify-center py-10'>
      {
        addOpen && <AddDrinkSales setAddOpen={setAddOpen} salesData = {data} />
      }
      <div className='max-w-[900px] w-[90%] flex flex-col items-center gap-4'>
        <div className='w-full flex p-4 bg-slate-50 justify-between rounded-lg items-center shadow-md text-sm md:text-lg'>
          <h1 className='text-gray-500'>Drinks Sales </h1>
          <div className="flex gap-2">
          { (user?.role === "Super Admin" || user?.role === "Admin") &&
                
                <button className='px-2 h-8 border rounded-full bg-green-400 text-white hover:bg-white hover:text-green-400 border-green-400 text-sm' onClick={setAddOpen} >+ Add Sale</button>
          }
          <button className='px-2 h-8 border rounded-full bg-green-400 text-white hover:bg-white hover:text-green-400 border-green-400 text-sm' onClick={()=>navigate("/drinks")} >Drinks</button>
          </div>
          
          </div>
        <Table header={['Drink', "No Sold", "Unit Price", 'Total', 'Date']} body={drinkSales?.map((sale)=>{return {...sale, 'Drink' : sale.drinkItem?.name , "No Sold" : sale.quantity , 'Unit Price' : sale.drinkItem?.price , "Total" : sale.total, "Date" : sale?.createdAt?.split("T")[0] }})} actionText = {"Edit Sale"} setAddOpen={setAddOpen} setData={setData}/>
      </div>
    </div>
    </>
  )
}

export default DrinksSales