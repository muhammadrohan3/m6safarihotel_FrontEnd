import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Users from './components/Users'
import Login from './components/Login'
import Expenses from './components/Expenses'
import ProtectedRoutes from './utils/ProtectedRoute'
import Drinks from './components/Drinks'
import DrinksSales from './components/DrinksSales'
import Food from './components/Food'
import FoodSales from './components/FoodSales'
import Rooms from './components/Rooms'
import RoomBookings from './components/RoomBookings'
import Loader from './components/Loader'
function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path = "/expenses" element = {<Expenses />} />
            <Route path = "/drinks" element = {<Drinks />} />
            <Route path = "/drinksales" element = {<DrinksSales />} />
            <Route path='/food' element = {<Food/>}/>
            <Route path = "/foodsales" element = {<FoodSales />} />
            <Route path = "/rooms" element = {<Rooms />} />
            <Route path = "/roombookings" element = {<RoomBookings />} />

          </Route>

          {/* <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
