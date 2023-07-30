import React, { useEffect, useState } from 'react'
import Table from './Table'
import AddDrink from './AddDrink';
import axios from '../utils/axios'
import { useNavigate } from 'react-router-dom';
function Drinks() {
  const navigate = useNavigate()
  const [drinks, setDrinks] = useState([])
  const [addOpen, setAddOpen] = useState(false)
  useEffect(() => {

  }, [addOpen])
  useEffect(() => {
    axios.get('/sales/getDrinks')
      .then(res => {
        console.log(res)
        setDrinks(res.data.drinks)
      })
      .catch(err => {
        console.log(err)
      })
  }, [addOpen])

  return (
    <div className='flex w-full justify-center py-10'>
      {
        addOpen && <AddDrink setAddOpen={setAddOpen} />
      }
      <div className='max-w-[900px] w-[90%] flex flex-col items-center gap-4'>
        <div className='w-full flex p-5 bg-slate-50 justify-between rounded-lg items-center shadow-md'>
          <h1 className='text-gray-500 text-xl'>Drinks</h1>
          <div className='flex gap-4 text-sm'>
            <button className='px-2 h-9 border rounded-full bg-green-400 text-white hover:bg-white hover:text-green-400 border-green-400 ' onClick={setAddOpen} >+ Add Drink</button>
            <button className='px-2 h-9 border rounded-full bg-green-400 text-white hover:bg-white hover:text-green-400 border-green-400 ' onClick={() => navigate('/drinksales')} >Add DrinkSales</button>
          </div>

        </div>
        <Table header={['Drink', "No Available", "Unit Price", 'Date', "Added By"]} body={drinks.map((drink) => { return { name: drink.name, stock: drink.stock, price: drink.price, date: drink?.createdAt?.split("T")[0], addedBy: drink.addedBy.fullName } })} />
      </div>
    </div>
  )
}

export default Drinks