import React from 'react'
import { motion } from "framer-motion"

const Loading = () => {
    return (
        <div className='flex w-full h-screen flex-col items-center justify-center'>
            <motion.i initial={{opacity: 0, y: -20}} animate={{opacity: 1, y: 0}} className="fas text-[4rem] fa-spin text-secondary fa-spinner-third"></motion.i>
            <motion.span initial={{opacity: 0, y: -20}} animate={{opacity: 1, y: 0}} className='mt-10 animate-bounce text-[1.5rem] text-secondary font-bold'>Please Wait</motion.span>
        </div>
    )
}

export default Loading