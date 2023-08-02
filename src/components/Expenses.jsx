import React , {useEffect, useState} from 'react'
import Table from './Table'
import AddExpenses from './AddExpenses';
import axios from '../utils/axios'
import NavBar from './NavBar';
function Expenses() {
   const [expenses , setExpenses] = useState([])
   const [addOpen, setAddOpen] = useState(false)
   const [data, setData] = useState({})
   useEffect(() => {
    console.log(data)
         if(!addOpen){
              setData({})
            }

        axios.get('/expenses/getexpenses')
        .then(res => {
            console.log(res)
            setExpenses(res.data.expenses)
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
                addOpen && <AddExpenses setAddOpen={setAddOpen}  expenseData = {data}/>
            }
            <div className='max-w-[900px] w-[90%] flex flex-col items-center gap-4'>
                <div className='w-full flex p-4 bg-slate-50 justify-between rounded-lg items-center shadow-md text-sm md:text-lg'>
                    <h1 className='text-gray-500 '>Expenses</h1>
                    <button className='px-2 h-8 border rounded-full bg-green-400 text-white hover:bg-white hover:text-green-400 border-green-400 text-sm' onClick={setAddOpen} >+ Add Expenses</button>
                </div>
                <Table header={['Expense', 'Date', 'Amount', "Entry By"]} body={expenses?.map((expense)=>{ return {...expense , 'Expense' : expense.expense , 'Date' : expense.date.split("T")[0] , 'Amount' : expense.amount , 'Entry By' : expense.addedBy.fullName}})} actionText = {"Edit"} setAddOpen={setAddOpen} setData={setData} />
            </div>
        </div>
        </>
    )
}

export default Expenses