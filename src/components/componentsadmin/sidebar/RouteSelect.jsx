import React from 'react'
import { FiHome, FiPackage, FiTruck, FiUsers } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';

export const RouteSelect = () => {
    const location = useLocation();

  return (
    <div className='space-y-1'>
        <Route Icon={FiHome} link="/admin/dashboard" currentPath={location.pathname} title="Dashboard" />
        <Route Icon={FiPackage} link="/admin/products" currentPath={location.pathname} title="Product" />
        <Route Icon={FiTruck} link="/admin/order" currentPath={location.pathname} title="Order" />
        <Route Icon={FiUsers} link="/admin/users" currentPath={location.pathname} title="User" />
    </div>
  );
};

const Route = ({
    link,
    currentPath,
    Icon,
    title,
}) => {
    const selected = currentPath === link;
    return (
        <Link to={link}>
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
        </Link>
    );
};
