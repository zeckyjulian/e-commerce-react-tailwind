import React from 'react'
import { AllUsers } from './AllUser'
import { TopBar } from '../dashboard/TopBar'

export const User = () => {
  return (
    <div className='bg-white rounded-lg pb-4 shadow min-h-screen'>
        <TopBar />
        <div className='px-4 grid gap-3 grid-cols-12'>
        <AllUsers />
        </div>
    </div>
  )
}
