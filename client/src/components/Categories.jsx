import React from 'react'
import LocationDot from '../icons/LocationDot'
import Compare from '../icons/Compare'

const Categories = ({path}) => {
    const categories = [
        {
            name: "All Category",
            to: "/",
            startIcon: null
        },
        {
            name: "Track Order",
            to: "/order",
            startIcon: <LocationDot />
        },
        {
            name: "Compare",
            to: "/compare",
            startIcon: <Compare />
        }
    ]
  return (
    <div className='flex gap-6'>
        {
            categories.map((category, idx) => {
                return (
                    <div key={idx} className='flex items-center gap-[6px] text-[#5F6C72] text-[17px]'>
                        {category.startIcon}
                        <p className={category.to === path ? "font-bold text-[#000]" : ""}>{category.name}</p>
                    </div>
                )
            })
        }
    </div>
  )
}

export default Categories