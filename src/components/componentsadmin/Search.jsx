import React from 'react'
import { FiCommand, FiSearch } from 'react-icons/fi'

export const Search = () => {
  return (
    <>
        <div className='bg-stone-300 mb-4 relative rounded flex items-center px-2 py-1.5 text-sm'>
            <FiSearch className=' mr-2'/>
            <input 
                type="text" 
                placeholder='Search...'
                className='w-full bg-transparent placeholder:text-stone-400 focus:outline-none'
            />

            <span className='p-1 text-xs flex gap-0.5 items-center shadow bg-stone-50 rounded absolute right-1.5 top-1/2 -translate-y-1/2'>
                <FiCommand/>
            </span>
        </div>
    </>
  )
}
