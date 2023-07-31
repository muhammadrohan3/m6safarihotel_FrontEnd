import { useRef } from "react"
import { DownloadTableExcel } from 'react-export-table-to-excel';

function Table({ body, header, actionText , setAddOpen , setData }) {
    const tableRef = useRef(null);
    return (
        <div className="w-full">
            <DownloadTableExcel
                filename="users table"
                sheet="users"
                currentTableRef={tableRef.current}
            >
                <div className="w-full flex justify-end text-xs text-blue-600 hover:underline hover:text-blue-500 cursor-pointer my-5"> Export to excel </div>
            </DownloadTableExcel>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">

                <table className="w-full text-sm text-left text-gray-500 light:text-gray-400" ref={tableRef}>
                    <thead className="text-xs text-gray-700 bg-slate-200 light:bg-gray-700 light:text-gray-400">
                        <tr >
                            {
                                header.map((item, index) => (
                                    <th scope="col" className="px-6 py-3" key={index}>
                                        {item}
                                    </th>
                                ))
                            }
                            {
                                actionText && <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {body?.map((bodyItem, index) => (
                            <tr key={index} className="bg-white border-b light:bg-gray-800 light:border-gray-700 hover:bg-gray-50 light:hover:bg-gray-600">
                                {
                                    header.map((item, index) => (
                                        <td className="px-6 py-4" key={index}>
                                            {bodyItem[item]}
                                        </td>
                                    ))

                                }
                                {
                                    actionText && <td className="px-6 py-4">
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
            </div>
        </div>
    )
}

export default Table