import React from 'react'
import { Search } from './Search'
import { RouteSelect } from './RouteSelect'
import { LogOut } from './LogOut'
import { AccountToggle } from './AccountToggle'

export const Sidebar = () => {
  return (
    <div>
        <div className="overflow-y-scroll sticky top-4 h-[calc(100vh-32px-48px)]">
            {/* Main Sidebar content */}
            <AccountToggle />
            <Search/>
            <RouteSelect/>
        </div>

        <LogOut />
    </div>
  )
}
