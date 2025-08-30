import React from 'react'
import { FiHome, FiPackage, FiTruck, FiUsers } from 'react-icons/fi';

export const RouteSelect = () => {
  return (
    <div className='space-y-1'>
        <Route Icon={FiHome} selected={true} title="Dashboard" />
        <Route Icon={FiPackage} selected={false} title="Product" />
        <Route Icon={FiTruck} selected={false} title="Order" />
        <Route Icon={FiUsers} selected={false} title="User" />
    </div>
  );
};

const Route = ({
    selected,
    Icon,
    title,
}) => {
    return (
        <button
            className={`flex items-center justify-start gap-2 w-full rounded px-2 py-1.5 text-sm transition-[box-shadow,_background-color,_color] ${
                selected
                    ? 'bg-white text-stone-950 shadow'
                    : 'hover:bg-stone-300 bg-transparent text-stone-500 shadow-none'
            }`}
        >
            <Icon className={selected ? "text-violet-500" : ""} />
            <span>{title}</span>
        </button>
    )
}
