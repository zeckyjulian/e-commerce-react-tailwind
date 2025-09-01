import React from 'react'
import { TopBar } from '../dashboard/TopBar'
import { AllTransactions } from './AllTransactions'

export const Orders = () => {
  return (
    <div className='bg-white rounded-lg pb-4 shadow h-[200vh]'>
          <TopBar />
          <div className='px-4 grid gap-3 grid-cols-12'>
            <AllTransactions />
          </div>
    </div>
  )
}
