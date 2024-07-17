import { Avatar, Button } from '@nextui-org/react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const ExistedAccount = ({user}) => {
    const navigate = useNavigate()
    const onLogOut = () => {
        Cookies.remove("token");
        return navigate("./")
    }
    return (
        <div className='w-full h-[100vh] flex justify-center items-center' style={{display: !user ? "none" : "block"}}>
            <div className={`flex flex-col justify-center gap-3 items-center`}>
                <Avatar className='w-[100px] h-[100px]' color='primary' size={'lg'} />
                <p className='text-[1.5rem] font-bold selection:bg-primary selection:text-white'>You haven't account!</p>
                <div className='flex gap-2'>
                    {
                        !Cookies.get("token") ?
                            <>
                                <Link to={"./auth"}>
                                    <Button color='primary' size='lg'>Log In</Button>
                                </Link>
                                <Link to={"./reg"}>
                                    <Button to={"./reg"} size='lg'>Sign Up</Button>
                                </Link>
                            </> :
                            <>
                                <Button onClick={onLogOut} color='danger' size='lg'>Log Out</Button>
                            </>
                    }
                </div>
            </div>
        </div>
    )
}

export default ExistedAccount