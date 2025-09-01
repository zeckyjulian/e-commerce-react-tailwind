import React from 'react'
import { Sidebar } from '../../components/componentsadmin/sidebar/Sidebar'
import { User } from '../../components/componentsadmin/users/User'

export const UsersAdmin = () => {
  return (
    <div className="bg-stone-200 min-h-screen flex">
        <Sidebar/>
        <main className="flex-1 p-4">
            <User/>
        </main>
    </div>
  )
}
