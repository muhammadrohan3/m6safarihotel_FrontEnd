import React, { useEffect, useState } from 'react'
import Table from './Table'

import axios from '../utils/axios'
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import AddDrinksStock from './AddDrinksStock';
import { useSelector } from 'react-redux';

function DrinksStock() {
  const { user } = useSelector(state => state.auth)
  const navigate = useNavigate()
  const [data, setData] = useState({})
  const [drinks, setDrinks] = useState([])
  const [addOpen, setAddOpen] = useState(false)


  useEffect(() => {
    if (!addOpen) {
      setData({})
    }

    axios.get('/sales/getDrinksStock')
      .then(res => {
        console.log(res)
        setDrinks(res.data.stock)
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
          addOpen && <AddDrinksStock setAddOpen={setAddOpen} stockData={data} />
        }
        <div className='max-w-[900px] w-[90%] flex flex-col items-center gap-4'>
          <div className='w-full flex p-4 bg-slate-50 justify-between rounded-lg items-center shadow-md text-sm md:text-lg'>
            <h1 className='text-gray-500'>Drinks' Stock</h1>
            <div className='flex gap-4 text-sm'>
              {(user?.role === "Super Admin" || user?.role === "Admin") &&

                <button className='px-2 h-8 border rounded-full bg-green-400 text-white hover:bg-white hover:text-green-400 border-green-400 ' onClick={setAddOpen} >+ Add Stock</button>
              }
              <button className='px-2 h-8 border rounded-full bg-green-400 text-white hover:bg-white hover:text-green-400 border-green-400 text-sm' onClick={()=>navigate("/drinks")} >Drinks</button>
            </div>

          </div>
          <Table header={['Drink', "No Added", 'Date Added', "Added By"]} body={drinks.map((drink) => { return { ...drink, "Drink": drink.drinkItem?.name, "No Added": drink.stock, "Date Added": drink?.createdAt?.split("T")[0], "Added By": drink.addedBy?.fullName } })} actionText={"Edit"} setAddOpen={setAddOpen} setData={setData} />
        </div>
      </div>
    </>
  )
}

export default DrinksStock