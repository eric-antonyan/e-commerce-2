import React from 'react'
import FooterInfo from './FooterInfo'
import TopCategories from './TopCategories'
import { useLocation } from 'react-router-dom'
import QuickLinks from './QuickLinks'
import CopyRight from './CopyRight'
import FooterImportantLinks from './FooterImportantLinks'
import { motion } from 'framer-motion'

const Footer = () => {
    const location = useLocation()
    const pathName = location.pathname
    return (
        <>
            <motion.footer className='w-full py-[72px] mt-[72px] bg-[#191C1F]'>
                <div className='max-w-container w-full mx-auto flex justify-between'>
                    <FooterInfo />
                    <TopCategories pathName={pathName} />
                    <QuickLinks pathName={pathName} />
                    <FooterImportantLinks pathName={pathName} />
                </div>
            </motion.footer>
            <CopyRight />
        </>
    )
}

export default Footer