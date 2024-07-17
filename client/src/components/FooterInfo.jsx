import React from 'react'
import Logo from '../assets/images/Logo'

const FooterInfo = () => {
    return (
        <div className='flex flex-col gap-[28px]'>
            <div className='flex gap-2'>
                <Logo fill='#FA8232' />
                <h1 className='text-white font-bold text-[32px]'>CLICON</h1>
            </div>
            <ul className='flex flex-col gap-[12px]'>
                <li className='flex flex-col gap-[4px]'>
                    <label className='text-gray-500 font-medium'>Customers Support:</label>
                    <p className='text-white text-[18px] font-bold'>+(374) 93932251</p>
                </li>
                <li className='text-gray-500 font-[500]'>
                    <p>4517 Washington Ave.</p>
                    <p>Manchester, Kentucky 39495</p>
                </li>
                <li className='text-white text-[18px] font-bold'>support@a-eric.am</li>
            </ul>
        </div>
    )
}

export default FooterInfo