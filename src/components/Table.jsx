import { useRef, useState, useEffect } from "react"
import { DownloadTableExcel } from 'react-export-table-to-excel';
import Loader from './Loader'
import { useSelector } from "react-redux";
function Table({ body, header, actionText, setAddOpen, setData  }) {
    const {user} = useSelector(state => state.auth)
    const [page , setPage] = useState(1)
    const [totalPages , setTotalPages] = useState(0)
    const [bodyData , setBodyData] = useState()
    const [searchText , setSearchText] = useState("")
    useEffect(()=>{
        if(searchText.length > 0){
            setBodyData(body.filter((item)=>item[header[0]].toLowerCase().includes(searchText.toLowerCase())))
        }
        else{
            setBodyData(body.slice((0+(((page-1)*10))) , (10+((page-1)*10))))
        }
    },[searchText])
    useEffect(()=>{
        if(body.length > 0){
            setTotalPages(Math.ceil(body.length/10))
        }
    },[body])
    useEffect(()=>{
        
        setBodyData(body.slice((0+(((page-1)*10))) , (10+((page-1)*10))))
    },[page , body])
    const tableRef = useRef(null);
    return (
        <>
        
{       header.length > 0 ?  
        <div className="w-full">
            
            <div className="w-full py-5">
                <input type="text" className="w-full border rounded-lg h-9 text-gray-700 px-4 p-1" onChange={(e)=>setSearchText(e.target.value)} placeholder="Search Here..."/>
            </div>
            <DownloadTableExcel
                filename="users_table.xlsx"
                sheet="users"
                currentTableRef={tableRef.current}
            >
                <div className="w-full flex justify-end text-xs text-blue-600 hover:underline hover:text-blue-500 cursor-pointer my-5"> Export to excel </div>
            </DownloadTableExcel>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">

                <table className="w-full text-sm text-left text-gray-500 light:text-gray-400" ref={tableRef}>
                    <thead className="text-xs text-gray-700 bg-slate-200 light:bg-gray-700 light:text-gray-400">
                        <tr >
                            <th scope="col" className="px-6 py-3">
                                #
                            </th>
                            {
                                header.map((item, index) => (
                                    <th scope="col" className="px-6 py-3" key={index}>
                                        {item}
                                    </th>
                                ))
                            }
                            {
                                actionText && user?.role=== "Super Admin" && <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {bodyData?.map((bodyItem, index) => (
                            <tr key={index} className="bg-white border-b light:bg-gray-800 light:border-gray-700 hover:bg-gray-50 light:hover:bg-gray-600">
                                <td className="px-6 py-3">{(index + 1)+((page-1)*10)}</td>
                                {
                                    header.map((item, index) => (
                                        <td className="px-6 py-4" key={index}>
                                            {
                                                typeof (bodyItem[item]) === "number" ?
                                                    Number(bodyItem[item]).toLocaleString({ useGrouping: true })
                                                    : bodyItem[item]
                                            }
                                        </td>
                                    ))

                                }
                                {
                                    actionText && user?.role === "Super Admin" && <td className="px-6 py-4">
                                        <button className='px-1 h-7 text-sm border rounded-full bg-yellow-400 text-white hover:bg-white hover:text-yellow-400 border-yellow-400 ' onClick={() => {
                                            setAddOpen(true)
                                            setData(bodyItem)
                                        }} >{actionText}</button>
                                    </td>
                                }
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="w-full flex justify-center gap-2 my-5 text-white items-center">
                    {(page > 1) && 
                        <div className="h-7 w-7 rounded-full bg-base flex justify-center items-center" onClick = {()=>setPage(page-1)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </div>}
                    <div className="h-8 w-8 rounded-full bg-base flex justify-center items-center">
                        {page}
                    </div>
                    {page < totalPages &&  <div className="h-7 w-7 rounded-full bg-base flex justify-center items-center" onClick = {()=>setPage(page+1)} disabled>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </div>}

                </div>
            </div>
        </div> : <Loader/>}
        </>
    )
}

export default Table