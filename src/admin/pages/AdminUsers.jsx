import React from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'

function AdminUsers() {
  const users = JSON.parse(localStorage.getItem('giftUsers')) || []

  return (
    <>
      <AdminHeader />

      <div className="grid md:grid-cols-[250px_1fr] min-h-screen">
        <AdminSidebar />

        <main className="bg-[#fff8f6] p-6 md:p-10">
          <h1 className="text-3xl font-bold">Customers</h1>
          <p className="text-gray-500 mt-2">View registered customer accounts.</p>

          <div className="bg-white rounded-2xl shadow-sm p-6 mt-8 overflow-x-auto">
            <table className="w-full min-w-[550px] text-left">
              <thead>
                <tr className="border-b text-gray-500">
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Role</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-3 font-semibold">{user.name}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3 capitalize">{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {users.length === 0 && (
              <p className="text-center text-gray-500 py-10">
                No customers registered yet.
              </p>
            )}
          </div>
        </main>
      </div>
    </>
  )
}

export default AdminUsers