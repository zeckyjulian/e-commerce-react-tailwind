import React, { useState } from 'react'
import { Search } from './Search'
import { RouteSelect } from './RouteSelect'
import { LogOut } from './LogOut'
import { AccountToggle } from './AccountToggle'

export const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>

    {/* Tombol hamburger hanya muncul di mobile */}
    {!open && (
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded bg-gray-100 shadow"
        onClick={() => setOpen(true)}
      >
        ☰
      </button>
    )}

    <div className="hidden md:block w-64 bg-white shadow-lg h-screen sticky top-0">
      <div className="flex flex-col h-full justify-between p-4">
        <div>
          <AccountToggle />
          <Search />
          <RouteSelect />
        </div>
        <LogOut />
      </div>
    </div>

    {/* Sidebar untuk mobile (off-canvas) */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform transition-transform duration-300 z-40 ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <div className="flex flex-col h-full justify-between p-4">
          <div>
            <AccountToggle />
            <Search />
            <RouteSelect />
          </div>
          <LogOut />
        </div>
      </div>

      {/* Overlay untuk tutup sidebar mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
};
