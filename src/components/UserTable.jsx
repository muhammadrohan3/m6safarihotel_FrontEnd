import React, { useEffect, useState } from 'react'
import axios from '../utils/axios'
function UserTable() {
    const [users, setUsers] = useState([])
    useEffect(() => {
        axios.get('/users/getusers')
            .then(res => {
                console.log(res)
                setUsers(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (

        <div className="w-full relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Role
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Status

                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users?.map((user, index) => (<tr className="bg-white border-t hover:bg-slate-100 " key={index}>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                {user?.fullName}
                            </th>
                            <td className="px-6 py-4">
                                {user.email}
                            </td>
                            <td className="px-6 py-4">
                                {user.role}
                            </td>
                            <td className="px-6 py-4">
                                Active
                            </td>
                            <td className="px-6 py-4">
                                <button className='px-2 text-sm h-7 border rounded-full bg-yellow-400 text-white hover:bg-white hover:text-yellow-400 border-yellow-400 '>Manage</button>
                            </td>
                        </tr>))}
                </tbody>
            </table>
        </div>

    )
}

export default UserTable