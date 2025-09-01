import React from 'react'
import { FiTrendingDown, FiTrendingUp } from 'react-icons/fi'

export const StatCards = () => {
  return (
    <>
        <Card 
          title="Gross Revenue"
          value="$120,054.24"
          pillText="2.75%"
          trend="up"
          period="From Jan 1st - Jul 31st"
        />
        <Card 
          title="Avg Order"
          value="$27.97"
          pillText="1.01%"
          trend="down"
          period="From Jan 1st - Jul 31st"
        />
        <Card 
          title="Trailing Year"
          value="$278,054.24"
          pillText="60.75%"
          trend="up"
          period="Previous 265 days"
        />
    </>
  )
}

const Card = ({
        title,
        value,
        pillText,
        trend,
        period,
    }) => {
    return (
      <div className="col-span-4 p-4 rounded border border-stone-300">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6 gap-3">
          <div>
            <h3 className="text-stone-500 mb-1 text-sm">{title}</h3>
            <p className="text-2xl sm:text-3xl font-semibold break-words">{value}</p>
          </div>

          <div className="mt-2 sm:mt-0 sm:text-right">
            <span
              className={`block sm:inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded ${
                trend === "up"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {trend === "up" ? <FiTrendingUp /> : <FiTrendingDown />} {pillText}
            </span>
          </div>
        </div>

        <p className="text-xs text-stone-500">{period}</p>
      </div>
    )
}
