import { Avatar, Button, Chip, Input, Spacer, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Image, Textarea } from '@nextui-org/react'
import React, { useState } from 'react'
import Footer from '../components/Footer'
import AdminPanelHeader from '../components/AdminPanelHeader'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { api } from '../models/config.model'

const AdminPanelCreate = ({ user }) => {
    console.log(user);
    const [price, setPrice] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [fileLoading, setFileLoading] = useState(true)
    const [height, setHeight] = useState('auto');
    const [file, setFile] = useState(null)
    const [base64, setBase64] = useState("https://nextui-docs-v2.vercel.app/images/album-cover.png")

    const navigate = useNavigate()

    const handleChange = (event) => {
        setText(event.target.value);
    };


    const calculateHeight = () => {
        const lineHeight = 20;
        const lines = text.split('\n').length;
        return lineHeight * lines;
    };

    const textareaLineHeight = 24;

    const textarea = (event) => {
        const textareaLineHeight = 24; // Adjust this value based on your textarea's line-height
        const { scrollHeight, clientHeight, scrollLeft } = event.target;

        setHeight(scrollHeight > clientHeight ? `${scrollHeight}px` : 'auto');

        // If you want to keep the cursor position after resizing
        event.target.scrollTop = event.target.scrollHeight - scrollHeight + clientHeight;
        event.target.scrollLeft = scrollLeft;
    };

    const handleChangeTextarea = (event) => {
        setDescription(event.target.value);
    };

    const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => {
                resolve(reader.result);
            };

            reader.onerror = reject;

            reader.readAsDataURL(file);
        });
    };

    const handleFileChange = async (e) => {
        setFileLoading(true)
        const file = e.target.files[0];

        if (!file) return;
        setFile(file)

        try {
            const base64String = await fileToBase64(file);
            setFileLoading(false)
            setBase64(base64String)
        } catch (error) {
            console.error('Error converting file to base64:', error);
        }
    };

    const onCreate = async (e) => {
        e.preventDefault()
        const data = {
            title,
            price,
            description,
            file
        }

        const formData = new FormData()


        for (const key in data) {
            formData.append(key, data[key]);
        }

        formData.append("_id", user._id)

        const response = await axios.post(api + '/api/p', formData);
        console.log(response.data.success);
        if (response.data.success) {
            return navigate('..')
        }
    }

    return (
        user && <>
            <AdminPanelHeader user={user} />
            <div className='max-w-container w-full mx-auto'>
                <h1 className='text-[30px] font-bold my-5 text-center'>Create New Product</h1>
                <div className='flex w-full flex-col justify-center items-center'>
                    <form onSubmit={onCreate} action="" className='max-w-[400px] w-full'>
                        <Image
                            shadow='md'
                            className={'aspect-square'}
                            isZoomed
                            isBlurred
                            width={"100%"}
                            src={base64}
                            isLoading={fileLoading}
                            onClick={() => document.getElementById("file_cracker").click()}
                            alt="NextUI Album Cover"
                        />
                        <input type="file" accept='image/jpg, image/jpeg, image/avif' hidden id='file_cracker' onChange={handleFileChange} />
                        <Input isRequired value={title} onChange={(e) => setTitle(e.target.value)} label='Product Title' variant={'underlined'} />
                        <Input isRequired placeholder='100' startContent={'$'} onChange={(e) => setPrice(e.target.value)} value={price.replace(',', '.')} label='Product Price' variant={'underlined'} />
                        <p className='text-small text-secondary mt-2'>Formatted price: <span className={`font-bold text-${price >= 0 ? "success" : "danger"}`}>{Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD',
                        }).format(price.replace(',', '.'))}</span></p>
                        <Textarea
                            className='my-3'
                            label={'Description'}
                            placeholder={'Imported from China'}
                            value={description}
                            onChange={handleChangeTextarea}
                            maxRows={10}
                        ></Textarea>
                        <Button type='submit' color='warning' isDisabled={!file || !title || !Number(price)} variant={'flat'} size='lg' className='w-full'>Create Product</Button>
                    </form>
                </div>
                <p className='text-center mt-[30px] font-bold'>When you have an problems call <Link to={"tel:+37493932251"} className="text-warning">+374 93932251</Link></p>
            </div>
            <Footer />
        </>
    )
}

export default AdminPanelCreate