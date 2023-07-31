import React , {useState , useEffect} from 'react'
import Bargraph from './Bargraph'
import { useSelector } from 'react-redux'
import axios from '../utils/axios'
import Loader from './Loader'
function Home() {
    const {user} = useSelector(state => state.auth)
    const [total, setTotal] = useState({})
    const [weeklyTotal , setWeeklyTotal] = useState({})
    const [monthlyTotal , setMonthlyTotal] = useState({})
    const [monthlyDetailedTotal , setMonthlyDetailedTotal] = useState([])
    const options = { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true };
    useEffect(() => {
        axios.get('/reports/getdailyreport')
            .then(res => {
                console.log(res)
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
    useEffect(() => {
        axios.get('/reports/getmonthlydetailedreport')
            .then(res => {
                console.log(res)
                setMonthlyDetailedTotal(res.data.total)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    console.log("This is user object", user)
    return (
        <div className='w-full flex justify-center'>
            { monthlyDetailedTotal.length > 0   ? 
            <div className="max-w-[900px] w-[90%] flex flex-col items-center justify-center my-10">
                <div className='w-full'>
                    <h1 className='py-5'>Analytics <span className='text-xs text-gray-400'>(This Month)</span></h1>
                    <div className="w-full grid grid-cols-2 gap-3 sm:grid-cols-4">
                        <div className="w-full bg-slate-200 border border-slate-50 rounded-lg">
                            <h1 className='font-semibold text-base text-slate-200 border bg-slate-500 rounded-lg m-1 p-3'>Drinks Sales</h1>
                            <h2 className='font-sans text-lg font-light text-slate-400 m-2 '>{Number(monthlyTotal.drinksTotal).toLocaleString(undefined , options)} <span className='font-medium' >PKR</span></h2>
                        </div>
                        <div className="w-full bg-red-200 border border-slate-50 rounded-lg ">
                            <h1 className='font-semibold text-base text-red-200 bg-red-500 rounded-lg m-1 p-3'>Food Sales</h1>
                            <h2 className='font-sans text-lg font-light text-red-400 m-2 '>{Number(monthlyTotal.foodTotal).toLocaleString(undefined , options)} <span className='font-medium' >PKR</span></h2>
                        </div>
                        <div className="w-full bg-green-200 border border-slate-50 rounded-lg">
                            <h1 className='font-semibold text-base text-green-200 bg-green-500 rounded-lg m-1 p-3'>Expenses</h1>
                            <h2 className='font-sans text-lg font-light text-green-400 m-2 '>{Number(monthlyTotal.expenseTotal).toLocaleString(undefined , options)} <span className='font-medium' >PKR</span></h2>
                        </div>
                        <div className="w-full bg-blue-200 border border-blue-50 rounded-lg">
                            <h1 className='font-semibold text-base text-blue-200 bg-blue-500 rounded-lg m-1 p-3'>Room Booking</h1>
                            <h2 className='font-sans text-lg font-light text-blue-400 m-2 '>{Number(monthlyTotal.roomsTotal).toLocaleString(undefined , options)} <span className='font-medium' >PKR</span></h2>
                        </div>
                    </div>
                </div>
                <div className='w-full my-10'>
                    <h1 className='py-5'>Sales</h1>
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 ">
                        <Bargraph data = {total} salesType = "Daily Sales"/>
                        <Bargraph data = {weeklyTotal} salesType = "Weekly Sales"/>
                    </div>
                    <div className='w-full'>
                    <Bargraph data = {monthlyDetailedTotal} salesType = "Weekly Sales"/>
                    </div>
                </div>


            </div> : <Loader/>}

        </div>
    )
}

export default Home