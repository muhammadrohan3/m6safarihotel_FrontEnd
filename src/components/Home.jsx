import React, { useState, useEffect } from 'react'
import Bargraph from './Graphs/Bargraph'
import PieGraph from './Graphs/PieGraph'
import { useSelector } from 'react-redux'
import axios from '../utils/axios'
import Loader from './Loader'
import NavBar from './NavBar'
import NewPie from './Graphs/NewPie'
function Home() {
    const { user } = useSelector(state => state.auth)
    const [total, setTotal] = useState({})
    const [weeklyTotal, setWeeklyTotal] = useState({})
    const [monthlyTotal, setMonthlyTotal] = useState({})
    const [loading , setLoading] = useState(true)
    const [monthlyDetailedTotal, setMonthlyDetailedTotal] = useState([])
    const options = { useGrouping: true };
    useEffect(() => {
        
        axios.get('/reports/getdailyreport')
            .then(res => {
                console.log(res)
                setLoading(false)
                setTotal(res.data.total)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    useEffect(() => {
        axios.get('/reports/getweeklyreport')
            .then(res => {
                console.log(res)
                setWeeklyTotal(res.data.total)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    useEffect(() => {
        axios.get('/reports/getmonthlyreport')
            .then(res => {
                console.log(res)
                setMonthlyTotal(res.data.total)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    return (
        <>
        <NavBar></NavBar>
        <div className='w-full flex justify-center'>
            {!loading ?
                <div className="max-w-[950px] w-[90%] flex flex-col items-center justify-center my-10">
                    <div className='w-full'>
                        <h1 className='py-5'>Analytics <span className='text-xs text-gray-400'>(This Month)</span></h1>
                        <div className="w-full grid grid-cols-2 gap-3 sm:grid-cols-4">
                            <div className="w-full bg-blue-200 border border-blue-200 rounded-lg">
                                <h1 className='font-semibold text-base text-blue-200 bg-[#36A2EB] rounded-lg m-1 p-3'>Drinks Sales</h1>
                                <h2 className='font-sans text-lg font-light text-blue-400 m-2 '>{Number(monthlyTotal.drinksTotal).toLocaleString(undefined, options)} <span className='font-medium' >UGX</span></h2>
                            </div>
                            <div className="w-full bg-red-200 border border-slate-50 rounded-lg ">
                                <h1 className='font-semibold text-base text-red-200 bg-[#F31559] rounded-lg m-1 p-3'>Food Sales</h1>
                                <h2 className='font-sans text-lg font-light text-[#F31559] m-2 '>{Number(monthlyTotal.foodTotal).toLocaleString(undefined, options)} <span className='font-medium' >UGX</span></h2>
                            </div>
                            <div className="w-full bg-[#CFFFFF] border border-emerald-50 rounded-lg">
                                <h1 className='font-semibold text-base text-[#CFFFFF] bg-[#4BC0C0] rounded-lg m-1 p-3'>Room Bookings</h1>
                                <h2 className='font-sans text-lg font-light text-[#4BC0C0] m-2 '>{Number(monthlyTotal.roomsTotal).toLocaleString(undefined, options)} <span className='font-medium' >UGX</span></h2>
                            </div>
                            <div className="w-full bg-[#FFDBB9] border border-slate-50 rounded-lg">
                                <h1 className='font-semibold text-base text-[#FFDBB9] bg-[#FF9F40] rounded-lg m-1 p-3'>Expenses</h1>
                                <h2 className='font-sans text-lg font-light text-[#FF9F40] m-2 '>{Number(monthlyTotal.expenseTotal).toLocaleString(undefined, options)} <span className='font-medium' >UGX</span></h2>
                            </div>
                        </div>
                    </div>
                    <div className='w-full my-5'>
                        <div className='w-full'>
                            {/* <div className='flex gap-4 justify-center text-xs mt-10'>
                                <div className='flex gap-1 items-center'> <span className='flex w-8 h-5 bg-[#36A2EB]'></span><span>Drink</span></div>
                                <div className='flex gap-1 items-center'> <span className='flex w-8 h-5 bg-[#F31559]'></span><span>Food</span></div>
                                <div className='flex gap-1 items-center'> <span className='flex w-8 h-5 bg-[#4BC0C0]'></span><span>Room Bookings</span></div>
                                <div className='flex gap-1 items-center'> <span className='flex w-8 h-5 bg-[#FF9F40]'></span><span>Expenses</span></div>
                            </div> */}
                        </div>
                        <div className="w-full grid grid-cols-1 md:grid-cols- gap-3  ">
                            <div className='w-full flex flex-col'>
                                <h1 className='w-full text-left font-semibold text-base text-slate-600 m-1 p-3'>Daily Analytics</h1>
                                <NewPie graphData = {total} saleType={"daily"}/>
                                {/* <NewPie graphData = {weeklyTotal} saleType={"weekly"}/> */}
                            </div>
                            <div className='w-full flex flex-col'>
                                <h1 className='font-semibold text-base text-slate-600 m-1 p-3'>Weekly Analytics</h1>
                                <NewPie graphData = {weeklyTotal} saleType={"weekly"}/>
                            </div>



                        </div>
                        <div className='w-full flex flex-col items-center'>
                            <h1 className='font-semibold text-xl text-slate-600 m-1 p-3'>Monthly Analytics</h1>
                            <Bargraph data={monthlyTotal} salesType="Monthly Analytics" />
                        </div>
                        <NewPie graphData = {weeklyTotal} saleType={"weekly"}/>
                        {/* <NewPie graphData = {total} saleType={'daily'}/> */}
                    </div>


                </div> : <Loader />}

        </div>
        </>
    )
}

export default Home