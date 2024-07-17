import React, { useRef, useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Avatar, Button, Image } from '@nextui-org/react';
import { api } from '../models/config.model';
import { Drawer, Placeholder } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import DrawerFooter from 'rsuite/esm/Drawer/DrawerFooter';
import Cookies from 'js-cookie';

const RightManagementHeaderAdmin = ({ count, pathName, user }) => {
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    const navLinks = [
        {
            textContent: "Create new product",
            to: '/profile/dashboard/create'
        },
        {
            textContent: "Edit Product",
            to: '/profile/dashboard/edit'
        },
        {
            textContent: "Products",
            to: '/profile/dashboard'
        },
        {
            jsx: <Avatar onClick={() => setOpen(true)} src={api + "/api/__next/__avatar__/" + user._id} />
        }
    ];

    const onLogOut = async () => {
        Cookies.remove("token")
        navigate("/")
    }

    return (
        <div className='flex gap-6 items-center relative'>
            {navLinks.map((item, idx) => {
                return (
                    <NavLink
                        style={{ transition: "0.5s" }}
                        key={idx}
                        to={item.to}
                        className={`flex flex-col text-[20px] ${item.to === pathName ? "text-[#fff]" : "text-gray-600"} font-medium items-center gap-3`}
                    >
                        <p style={{ transition: "0.5s" }}>
                            {item.textContent || item.jsx}
                        </p>
                    </NavLink>
                );
            })}
            <Drawer backdrop={'static'} size={'xs'} placement='left' open={open} onClose={() => setOpen(false)}>
                <Drawer.Header style={{alignItems: 'center'}}>
                    <Drawer.Title><p className='font-bold'>{user.company}</p></Drawer.Title>
                    <Drawer.Actions>
                        <Link to={"/profile/" + user._id}> 
                            <Image src={api + "/api/__next/__avatar__/" + user._id} width={40} shadow='sm' radius='full' />
                        </Link>
                    </Drawer.Actions>
                </Drawer.Header>
                <Drawer.Body>
                    <ul className='font-bold flex flex-col gap-3 text-[1.3rem]'>
                        <li className=''>Settings</li>
                        <li className=''>Edit profile</li>
                        <li className='text-danger cursor-pointer' onClick={onLogOut}>Log out</li>
                    </ul>
                </Drawer.Body>
            </Drawer>
        </div>
    );
}

export default RightManagementHeaderAdmin;
