import React, { useEffect, useState } from 'react'
import { FiCalendar } from 'react-icons/fi'

export const TopBar = () => {
    const [user, setUser] = useState(null);
    const [today, setToday] = useState("");

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const role = localStorage.getItem("role");

        if (storedUser && role === "admin") {
            setUser(JSON.parse(storedUser));
        } else {
            setUser(null);
        }

        const date = new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "short",
            day: "numeric",
            year: "numeric",
        })
        setToday(date);
    }, []);

    return (
        <div className='border-b px-4 mb-4 pb-4 border-stone-400'>
            <div className='flex items-center justify-between p-0.5'>
                <div className='mt-4 mx-auto'>
                    <span className='text-sm font-bold block'>
                        Good Morning, {user?.name}!
                    </span>
                    <span className='text-xs block text-stone-500'>
                        {today}
                    </span>
                </div>

                <button className='flex text-sm items-center mt-4 gap-2 bg-stone-100 transition-colors hover:bg-violet-100 hover:text-violet-700 px-3 py-1.5 rounded'>
                    <FiCalendar />
                    <span>Prev 6 Months</span>
                </button>
            </div>
        </div>
    )
}
