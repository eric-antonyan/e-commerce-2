import React from 'react'

const Logo = ({fill = "#FFFFFF"}) => {
    return (
        <svg width="48.000000" height="48.000000" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <desc>
                Created with Pixso.
            </desc>
            <defs />
            <path id="Icon" d="M0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24ZM12 24C12 17.3726 17.3726 12 24 12C30.6274 12 36 17.3726 36 24C36 30.6274 30.6274 36 24 36C17.3726 36 12 30.6274 12 24ZM24 16C19.5817 16 16 19.5817 16 24C16 28.4183 19.5817 32 24 32C28.4183 32 32 28.4183 32 24C32 19.5817 28.4183 16 24 16Z" clipRule="evenodd" fill={fill} fillOpacity="1.000000" fillRule="evenodd" />
        </svg>
    )
}

export default Logo