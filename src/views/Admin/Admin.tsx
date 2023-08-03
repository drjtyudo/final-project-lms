import useUsers from 'data/useUsers'
import React from 'react'

function Admin() {
  const qUsers = useUsers()

  return (
    <main className="w-3/4 bg-white p-4">
      <h2 className="text-xl font-bold mb-4">Welcome, Admin!</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla posuere
        blandit arcu vel aliquet.
      </p>
      <ul>
        {qUsers.data?.map((user) => {
          return <li key={user.id}>{user.name}</li>
        })}
      </ul>
    </main>
  )
}

export default Admin
