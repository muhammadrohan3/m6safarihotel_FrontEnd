import React , {useEffect, useState} from 'react'
import Table from './Table'
import AddExpenses from './AddExpenses';
import axios from '../utils/axios'
function Expenses() {
   const [expenses , setExpenses] = useState([])
   const [addOpen, setAddOpen] = useState(false)
   useEffect(() => {
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
        <div className='flex w-full justify-center py-10'>
            {
                addOpen && <AddExpenses setAddOpen={setAddOpen} />
            }
            <div className='max-w-[900px] w-[90%] flex flex-col items-center gap-4'>
                <div className='w-full flex p-5 bg-slate-50 justify-between rounded-lg items-center shadow-md'>
                    <h1 className='text-gray-500 text-xl'>Expenses</h1>
                    <button className='px-2 h-9 border rounded-full bg-green-400 text-white hover:bg-white hover:text-green-400 border-green-400 ' onClick={setAddOpen} >+ Add Expenses</button>
                </div>
                <Table header={['Expense', 'Date', 'Amount', "Entry By"]} body={expenses?.map((expense)=>{ return {Expense : expense.expense , Date : expense.date.split("T")[0] , Amount : expense.amount , AddedBy : expense.addedBy.fullName}})}/>
            </div>
        </div>
    )
}

export default Expenses