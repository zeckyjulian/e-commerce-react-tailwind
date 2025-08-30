import React from 'react'
import { FiLogOut } from 'react-icons/fi'

export const LogOut = () => {
  return (
    <div className='flex sticky top-[calc(100vh_-_48px_-_16px)] flex col h-12 border-t border-stone-300 justify-end text-xs'>
        <button className='flex items-center mt-2 justify-start ps-2 gap-1 w-full rounded py-1.5 text-sm hover:bg-stone-300 bg-transparent text-stone-500 shadow-none'>
            <FiLogOut />
            Log Out
        </button>
    </div>
  )
}
