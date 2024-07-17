import React from 'react'
import { Facebook, Instagram, Pinterest, Twitter } from '../icons/SocialMedia'
import ManagementHeader from './ManagementHeader'
import ManagementHeaderAdmin from './ManagementHeaderAdmin'

const AdminPanelHeader = ({ user }) => {
    console.log(user);
    return (
        <>
            <header className="bg-warning w-[100%] py-[16px]">
                <div className='max-w-container flex justify-between mx-auto'>
                    <p className='text-white'>Welcome to Clicon online eCommerce store.</p>
                    <div className='text-white flex items-center gap-3'>
                        <p>Follow us: </p>
                        <Twitter className={"cursor-pointer"} />
                        <Pinterest className={"cursor-pointer"} />
                        <Instagram className={"cursor-pointer"} />
                        <div className='w-[1px] h-[100%] bg-slate-300 ml-[10px]'></div>
                        <select className='bg-warning outline-none'>
                            <option value="">USD</option>
                            <option value="">AMD</option>
                        </select>
                    </div>
                </div>
            </header>
            <ManagementHeaderAdmin user={user} />
        </>
    )
}

export default AdminPanelHeader