import React from 'react'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'

export const AccountToggle = () => {
  return (
    <div className='border-b mb-4 mt-2 pb-4 border-stone-400'>
        <button className='flex p-0.5 hover:bg-stone-200 rounded transition-colors relative w-full items-center gap-2'>
            <img 
                src="https://api.dicebear.com/9.x/notionists/svg" 
                alt="avatar" 
                className='size-8 rounded shrink-0 bg-violet-500 shadow'
            />
            <div className='text-start'>
                <span className='text-sm font-bold block'>
                    Julian
                </span>
                <span className='text-xs text-stone-500 block'>
                    julian@gmail.com
                </span>
            </div>
            <FiChevronDown className='absolute right-2 top-1/2 translate-y-[calc(-50%+4px)] text-xs'/>
            <FiChevronUp className='absolute right-2 top-1/2 translate-y-[calc(-50%-4px)] text-xs'/>
        </button>
    </div>
  )
}
