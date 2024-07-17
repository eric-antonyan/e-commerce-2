import React from 'react'
import Logo from '../assets/images/Logo'
import HeaderSearchBar from './HeaderSearchBar'
import RightManagementHeader from './RightManagementHeader'

const ManagementHeader = ({user, SECRET_KEY}) => {
  return (
    <div className='w-[100%] sticky top-0 z-50 py-[20px] border-t-[1px] border-slate-400 bg-secondary'>
        <div className='max-w-container w-full mx-auto'>
            <div className="flex items-center gap-3 select-none justify-between">
                <div className="flex gap-2">
                <Logo />
                <h2 className='text-[32px] text-white uppercase font-bold'>clicon</h2>
                </div>
                <HeaderSearchBar />
                <RightManagementHeader user={user} cart={2} />
            </div>
        </div>
    </div>
  )
}

export default ManagementHeader