import React, { useState } from 'react'
import Search from '../icons/Search'
import { useLocation, useNavigate } from 'react-router-dom'

const HeaderSearchBar = () => {
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const query = params.get("search_query")
    const [searchParam, setSearchParam] = useState(query)

    const navigate = useNavigate()

    const handleSearch = async (e) => {
        e.preventDefault()
        if (query !== "") {
            return navigate(`/results?search_query=${searchParam}`)
        } else {
            navigate("/")
        }
    }
    return (
        <form onSubmit={handleSearch} className='py-[14px] bg-[#fff] w-[660px] flex px-[20px]'>
            <input onChange={(e) => setSearchParam(e.target.value)} type="text" value={searchParam} className='h-[20px] outline-none w-full border-none' placeholder='Search for anything...' />
            <button><Search /></button>
        </form>
    )
}

export default HeaderSearchBar