import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const FooterImportantLinks = ({pathName}) => {
    const topCategory = [
        {
            textContent: "Getting start",
            to: "/profile/reg"
        },
        {
            textContent: "Log in",
            to: "/profile/auth"
        }
    ]
  return (
    <div className='flex flex-col gap-[16px]'>
        <h2 className='uppercase text-white text-[18px] font-bold'>Important Links</h2>
        <ul className='flex flex-col gap-[12px]'>
            {
                topCategory.map((item, idx) => {
                    return (
                        <li key={idx} className='flex items-center gap-[12px] text-[17px]'>
                            <div className='flex items-center gap-[11px]'>
                                {pathName === item.to ? <motion.div initial={{width: 0}} whileInView={{width: 24}} className='h-[3px] rounded-full bg-[#EBC80C]'></motion.div> : ""}
                                <Link to={item.to} style={{color: pathName === item.to ? "#fff" : "#5F6C72",  transition: "0.5s"}}>{item.textContent}</Link>
                            </div>
                        </li>
                    )
                })
            }
        </ul>
    </div>
  )
}

export default FooterImportantLinks