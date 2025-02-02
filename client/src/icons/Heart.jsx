import React from 'react'
import { Badge } from 'antd'

const Heart = ({ className, style, count }) => {
    return (
        <Badge count={count} style={{border: "none"}} size='small' offset={[-4, 5]}>
            <svg className={className} style={style} width="32.000000" height="32.000000" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <desc>
                Created with Pixso.
            </desc>
            <defs />
            <rect id="Heart" width="32.000000" height="32.000000" fill="#FFFFFF" fillOpacity="0" />
            <path id="Vector" d="M3.5 11.5C3.5 9.99 4.02 8.54 4.97 7.37C5.92 6.21 7.25 5.42 8.72 5.12C10.19 4.83 11.72 5.05 13.05 5.76C14.38 6.46 15.42 7.61 16 9C16.57 7.61 17.61 6.46 18.94 5.76C20.27 5.05 21.8 4.83 23.27 5.12C24.74 5.42 26.07 6.21 27.02 7.37C27.97 8.54 28.5 9.99 28.5 11.5C28.5 20 16 27 16 27C16 27 3.5 20 3.5 11.5Z" stroke="#FFFFFF" strokeOpacity="1.000000" strokeWidth="2.000000" strokeLinejoin="round" />
        </svg>
        </Badge>
    )
}

export default Heart