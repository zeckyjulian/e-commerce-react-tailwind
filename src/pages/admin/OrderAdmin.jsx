import React from 'react'
import { Sidebar } from '../../components/componentsadmin/sidebar/Sidebar'
import { Orders } from '../../components/componentsadmin/orders/Orders'

export const OrderAdmin = () => {
  return (
    <div className="bg-stone-200 min-h-screen flex">
        <Sidebar/>
        <main className="flex-1 p-4">
            <Orders/>
        </main>
    </div>
  )
}
