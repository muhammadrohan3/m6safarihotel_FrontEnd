import { useRef } from "react"
import { DownloadTableExcel } from 'react-export-table-to-excel';

function Table({ body, header }) {
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
                        <tr>
                            {
                                header.map((item, index) => (
                                    <th scope="col" className="px-6 py-3" key={index}>
                                        {item}
                                    </th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {body?.map((player, index) => (
                            <tr key={index} className="bg-white border-b light:bg-gray-800 light:border-gray-700 hover:bg-gray-50 light:hover:bg-gray-600">
                                {
                                    Object.keys(player).map((item, index) => (
                                        <td className="px-6 py-4" key={index}>
                                            {player[item]}
                                        </td>
                                    ))
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