import React from 'react'
import Logo from '../assets/images/Logo'
import RightManagementHeaderAdmin from './RightManagementHeaderAdmin'
import { useLocation } from 'react-router-dom'

const ManagementHeaderAdmin = ({user}) => {
  const location = useLocation()
  const pathName = location.pathname
  return (
    <div className='w-[100%] sticky top-0 z-50 py-[20px] border-t-[1px] border-slate-100 bg-warning'>
        <div className='max-w-container w-full mx-auto'>
            <div className="flex items-center gap-3 select-none justify-between">
                <div className="flex gap-2">
                <Logo />
                <h2 className='text-[32px] text-white uppercase font-bold'>clicon dashboard</h2>
                </div>
                <RightManagementHeaderAdmin pathName={pathName} count={2} user={user} />
            </div>
        </div>
    </div>
  )
}

export default ManagementHeaderAdmin