import React from 'react'
import Categories from './Categories'
import { Link, useLocation } from 'react-router-dom'
import Phone from '../icons/Phone'
import { motion } from 'framer-motion'

const NavigationBar = ({ user }) => {
    const location = useLocation()
    const path = location.pathname
    return (
        <motion.nav initial={{opacity: 0, y: -20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5, delay: 0.5}} className='w-[100%] bg-[#fff] border-b-[1px] border-slate-300 py-[28px]'>
            <div className='max-w-container w-full mx-auto flex justify-between'>
                <Categories path={path} />
                <Link to='tel:+37493932251' className='flex gap-2 items-center'>
                    <Phone />
                    <h2 className='text-[18px]'>+(374) 93932251</h2>
                </Link>
            </div>
        </motion.nav>
    )
}

export default NavigationBar