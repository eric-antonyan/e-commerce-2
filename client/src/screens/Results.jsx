import Header from '@/components/Header'
import Products from '@/components/Products';
import { api } from '@/models/config.model';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from '@/components/Footer';
import NotFound from './404';

const Results = ({ user }) => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search)
    const searchQuery = searchParams.get("search_query")
    const [productsData, setProductsData] = useState([])
    const [requestCompleted, setRequestCompleted] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`${api}/api/results?query=${searchQuery}`)
            setRequestCompleted(true)
            setProductsData(response.data)
        }

        fetchData()
    })
    return (
        requestCompleted ? productsData.length !== 0 ? <>
            <Header user={user} />
            <Products products={productsData} user={user} />
            <Footer />
        </> : <NotFound user={user} /> : ""
    )
}

export default Results