
import React, { useEffect, useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import apiService from '../../api/apiService'

function AdminUsers() {

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [refresh, setRefresh] = useState(0)

    // Fetch customers from MongoDB
    const fetchUsers = async () => {

        setLoading(true)
        setError('')

        try {

            const response = await apiService(
                'GET',
                '/user-list'
            )

            if (response?.response) {
                throw response
            }

            setUsers(
                Array.isArray(response.data)
                    ? response.data
                    : []
            )

        } catch (err) {

            console.error('Fetch users error:', err)

            setError(
                typeof err.response?.data === 'string'
                    ? err.response.data
                    : err.response?.data?.message || 'Unable to load customers'
            )

        } finally {

            setLoading(false)

        }

    }

    useEffect(() => {

        fetchUsers()

    }, [refresh])

    return (
        <>
            <AdminHeader />

            <div className="grid md:grid-cols-[250px_1fr] min-h-screen">

                <AdminSidebar />

                <main className="bg-[#fff8f6] p-6 md:p-10">

                    <h1 className="text-3xl font-bold">
                        Customers
                    </h1>

                    <p className="text-gray-500 mt-2">
                        View registered customer accounts.
                    </p>

                    <div className="bg-white rounded-2xl shadow-sm p-6 mt-8 overflow-x-auto">

                        {loading ? (

                            <p className="text-center text-rose-700 py-10">
                                Loading customers...
                            </p>

                        ) : error ? (

                            <div className="text-center py-10">

                                <p className="text-red-600 mb-4">
                                    {error}
                                </p>

                                <button
                                    onClick={() => setRefresh(prev => prev + 1)}
                                    className="gift-btn"
                                >
                                    Try Again
                                </button>

                            </div>

                        ) : (

                            <>
                                <table className="w-full min-w-[550px] text-left">

                                    <thead>
                                        <tr className="border-b text-gray-500">

                                            <th className="p-3">
                                                Name
                                            </th>

                                            <th className="p-3">
                                                Email
                                            </th>

                                            <th className="p-3">
                                                Role
                                            </th>

                                        </tr>
                                    </thead>

                                    <tbody>

                                        {users.map((user) => (

                                            <tr
                                                key={user._id}
                                                className="border-b"
                                            >

                                                <td className="p-3 font-semibold">
                                                    {user.username}
                                                </td>

                                                <td className="p-3">
                                                    {user.email}
                                                </td>

                                                <td className="p-3 capitalize">
                                                    {user.role}
                                                </td>

                                            </tr>

                                        ))}

                                    </tbody>

                                </table>

                                {users.length === 0 && (

                                    <p className="text-center text-gray-500 py-10">
                                        No customers registered yet.
                                    </p>

                                )}

                            </>

                        )}

                    </div>

                </main>

            </div>
        </>
    )
}

export default AdminUsers
