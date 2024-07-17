import React from 'react'
import bg from "../assets/images/404bg.jpg"
import Header from '../components/Header'
import { Button } from '@nextui-org/react'
import { Link } from 'react-router-dom'
import NavigationBar from '../components/NavigationBar'
import Footer from '../components/Footer'

const NotFound = ({ user }) => {
    const headerHeight = document.getElementById("header")
    const headerHeightValue = headerHeight ? headerHeight.offsetHeight : 0
    console.log(headerHeightValue);
    return (
        <div
            className={`w-[100%] bg-cover bg-center h-[100vh]`}
            style={{ background: `url(${bg})` }}>
            <Header 
            user={user}
             />
             <NavigationBar />
            <div className='flex justify-center items-center' style={{ height: `calc(100% - (55.98px + 88.91px + 84.9px))` }}>
                <div className='max-w-[500px] w-full flex justify-center flex-col items-center'>
                    <div className="bg-[#fff] p-[16px] text-center">
                        <h1 className='text-[60px] font-extrabold text-[#818C8B]'>404</h1>
                        <p className='text-[#2D4642] font-semibold text-center text-[18px]'>Sorry. the content you’re looking for doesn’t exist. Either it was removed, or you mistyped the link.</p>
                    </div>
                    <div className='mt-4 flex gap-4'>
                        <Link to={"/"}>
                            <Button size='lg' className='font-bold' color='secondary'>Go to Home Page</Button>
                        </Link>
                        <Button variant='bordered' size='lg' className='font-bold' color='secondary'>Contact Us</Button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default NotFound