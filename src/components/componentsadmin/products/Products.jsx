import React from 'react'
import { TopBar } from '../dashboard/TopBar'
import { AllProducts } from './AllProducts'

export const Products = () => {
  return (
    <div className='bg-white rounded-lg pb-4 shadow min-h-screen'>
      <TopBar />
      <div className='px-4 grid gap-3 grid-cols-12'>
        <AllProducts />
      </div>
    </div>
  )
}
