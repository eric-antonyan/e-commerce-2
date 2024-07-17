import React, { useEffect, useState } from 'react'
import Cart from '../icons/Cart'
import Heart from '../icons/Heart'
import User from '../icons/User'
import { NavLink } from 'react-router-dom'
import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode"
import { Avatar } from "@nextui-org/react"
import { api } from "../models/config.model"
import { Drawer } from "rsuite"
import CryptoJS from 'crypto-js'
import axios from 'axios'

const RightManagementHeader = ({ cart, user }) => {

    const { VITE_SECRET_KEY } = import.meta.env

    const [favoritesCount, setFavoritesCount] = useState(0)

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                if (user && user._id) {
                    const response = await axios.get(`${api}/api/favorite/${user._id}`);
                    setFavoritesCount(response.data.favorites.length);
                }
            } catch (e) {
                console.error(e);
            }
        };

        const interval = setInterval(() => {
            fetchFavorites();
        }, 2000)

        return () => clearInterval(interval)
    }, [user, api]);

    const navLinks = [
        {
            jsx: <Heart count={favoritesCount} className={'cursor-pointer'} />,
            to: '/favorites'
        },
        {
            jsx: <Cart count={2} className={'cursor-pointer'} />,
            to: '/cart'
        },
        {
            jsx: !user ? <User className={'cursor-pointer'} /> : <Avatar src={api + "/api/__next/__avatar__/" + user._id} />,
            to: user ? "/profile/" + user._id : "/profile/auth"
        },
    ]
    return (
        <div className='flex gap-6 items-center'>
            {
                navLinks.map((item, idx) => {
                    return (
                        <NavLink key={idx} to={item.to}>
                            {item.jsx}
                        </NavLink>
                    )
                })
            }
            <Drawer size={'sm'} placement='left' />
        </div>
    )
}

export default RightManagementHeader