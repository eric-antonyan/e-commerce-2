import React from 'react'
import Header from '../components/Header'
import NavigationBar from '../components/NavigationBar'
import Products from '../components/Products'
import Footer from '../components/Footer'
import { useState, useEffect } from "react"
import axios from "axios"
import { api } from "../models/config.model"
import CryptoJS from "crypto-js"

const Shop = ({ user }) => {
    const [products, setProducts] = useState([])

    const { VITE_SECRET_KEY } = import.meta.env

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${api}/api/p`);
                const products = response.data.products;

                // Use Promise.all to wait for all asynchronous operations to complete
                const updatedProducts = await Promise.all(products.map(async product => {
                    try {
                        const res = await axios.get(`${api}/api/user?get=${product.creator}`);
                        const userData = res.data;
                        const userToken = userData.id;

                        const decryptedUser = CryptoJS.AES.decrypt(userToken, VITE_SECRET_KEY).toString(CryptoJS.enc.Utf8);
                        const user = JSON.parse(decryptedUser);

                        product.company = user;
                    } catch (userError) {
                        console.error('Error fetching user data:', userError);
                        product.company = 'Unknown'; // Handle the case where user data could not be fetched
                    }
                    return product;
                }));

                setProducts(updatedProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [VITE_SECRET_KEY]);

    return (
        <>
            <Header user={user} />
            <NavigationBar user={user} />
            <Products user={user} products={products} />
            <Footer />
        </>
    )
}

export default Shop