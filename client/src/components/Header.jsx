import React from 'react'
import { Facebook, Instagram, Pinterest, Twitter } from '../icons/SocialMedia'
import ManagementHeader from './ManagementHeader'
import { motion } from 'framer-motion'

const Header = ({ user, SECRET_KEY = "angushakgaxtnabar" }) => {
    return (
        <motion.div initial={{opacity: 0, y: -20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5}}>
            <header id='header' className="bg-secondary w-[100%] sticky top-0 py-[16px]">
                <div className='max-w-container flex justify-between mx-auto'>
                    <p className='text-white'>Welcome to Clicon online eCommerce store.</p>
                    <div className='text-white flex items-center gap-3'>
                        <p>Follow us: </p>
                        <Twitter className={"cursor-pointer"} />
                        <Facebook className={"cursor-pointer"} />
                        <Pinterest className={"cursor-pointer"} />
                        <Instagram className={"cursor-pointer"} />
                        <div className='w-[1px] h-[100%] bg-slate-300 ml-[10px]'></div>
                        <select className='bg-secondary outline-none'>
                            <option value="">USD</option>
                            <option value="">AMD</option>
                        </select>
                    </div>
                </div>
            </header>
            <ManagementHeader SECRET_KEY={SECRET_KEY} user={user} />
        </motion.div>
    )
}

export default Header