import React from 'react'
import { Badge } from 'antd'

const Cart = ({ count, className }) => {
    return (
        <Badge count={count} offset={[-10, 10]} size='small' className='border-none' color='success'>
            <svg width="36.000000" height="36.000000" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <desc>
                    Created with Pixso.
                </desc>
                <defs />
                <rect id="Property 1=No." width="32.000000" height="32.000000" transform="translate(0.000000 4.000000)" fill="#FFFFFF" fillOpacity="0" />
                <path id="Vector" d="M12 31C12 32.1 11.1 33 10 33C8.89 33 8 32.1 8 31C8 29.89 8.89 29 10 29C11.1 29 12 29.89 12 31Z" fill="#FFFFFF" fillOpacity="1.000000" fillRule="evenodd" />
                <path id="Vector" d="M25 31C25 32.1 24.1 33 23 33C21.89 33 21 32.1 21 31C21 29.89 21.89 29 23 29C24.1 29 25 29.89 25 31Z" fill="#FFFFFF" fillOpacity="1.000000" fillRule="evenodd" />
                <path id="Vector" d="M5.28 13L27.71 13L24.41 24.55C24.29 24.96 24.04 25.33 23.69 25.6C23.34 25.86 22.92 26 22.48 26L10.51 26C10.07 26 9.65 25.86 9.3 25.6C8.95 25.33 8.7 24.96 8.58 24.55L4.06 8.72C4 8.51 3.87 8.33 3.7 8.2C3.52 8.07 3.31 7.99 3.09 8L1 8" stroke="#FFFFFF" strokeOpacity="1.000000" strokeWidth="2.000000" strokeLinejoin="round" strokeLinecap="round" />
            </svg>
        </Badge>
    )
}

export default Cart