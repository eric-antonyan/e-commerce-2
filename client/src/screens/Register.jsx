import React, { useState } from 'react';
import Header from "../components/Header";
import { Button, Image, Input } from '@nextui-org/react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import validator from "validator";
import axios from "axios";
import { api } from '../models/config.model';
import Cookies from 'js-cookie';

const Register = () => {
    if (Cookies.get("token")) {
        return <Navigate to={"/"} />
    }
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        swiftBank: "",
        company: "",
    });

    const [data, setData] = useState({message: "", success: false})

    const [file, setFile] = useState(null);
    const [base64, setBase64] = useState("https://nextui-docs-v2.vercel.app/images/album-cover.png");
    const [fileIsLoad, setFileIsLoad] = useState(true);

    // Validation logic
    const isEmailValid = validator.isEmail(formData.email);
    const isFirstNameValid = !!formData.firstName;
    const isLastNameValid = !!formData.lastName;
    const isPasswordValid = !!formData.password;
    const isConfirmPasswordValid = formData.password === formData.confirmPassword;
    const isSwiftBankValid = !!formData.swiftBank;
    const isCompanyValid = !!formData.company;

    // Check if all fields are valid
    const isValidated = isEmailValid && isFirstNameValid && isLastNameValid && isPasswordValid && isConfirmPasswordValid && isSwiftBankValid && isCompanyValid;

    const navigate = useNavigate()

    const onRegister = async (e) => {
        e.preventDefault();
        setData({message: "", success: false})
        
        const data = new FormData();
        data.append('avatar', file);
        for (const key in formData) {
            data.append(key, formData[key]);
        }

        try {
            const response = await axios.post(api + "/api/user", data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.success) {
                Cookies.set("token", response.data.token)
                if (Cookies.get("token")) {
                    return navigate("/")
                }
            }

            setData(response.data)
        } catch (err) {
            console.error(err.response.data);
        }
    };

    const createBase64 = async (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const handleFile = async (e) => {
        setFileIsLoad(true);
        const file = e.target.files[0];

        if (!file) return;
        setFile(file);

        try {
            const base64String = await createBase64(file);
            setBase64(base64String);
            setFileIsLoad(false);
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <>
            <Header />
            <div className="max-w-container w-full mx-auto">
                <h1 className='text-[30px] mb-[40px] font-bold text-center my-5'>Getting start!</h1>
                <div className="w-full flex justify-center">
                    <form onSubmit={onRegister} className='max-w-[400px] w-full flex justify-center items-center flex-col gap-3'>
                        <Image shadow='md' isZoomed className='w-[150px] object-center h-[150px]' radius={'full'} onClick={() => document.getElementById("file").click()} isLoading={fileIsLoad} src={base64} isBlurred />
                        <input accept='image/jpg, image/jpeg, image/avif, image/png' type="file" hidden onChange={handleFile} id='file' />
                        <div className='flex gap-2 w-full'>
                            <Input
                                name="firstName"
                                onChange={handleChange}
                                isInvalid={!isFirstNameValid}
                                errorMessage={'Fill field'}
                                value={formData.firstName}
                                label={'First Name'}
                                variant='underlined'
                                isRequired
                            />
                            <Input
                                name="lastName"
                                onChange={handleChange}
                                isInvalid={!isLastNameValid}
                                errorMessage={'Fill field'}
                                value={formData.lastName}
                                label={'Last Name'}
                                variant='underlined'
                            />
                        </div>
                        <Input
                            name="email"
                            isInvalid={!isEmailValid}
                            errorMessage={'Please enter valid email'}
                            onChange={handleChange}
                            value={formData.email}
                            type='email'
                            color='foreground'
                            variant='underlined'
                            label={"Enter your email"}
                            isRequired
                        />
                        <Input
                            name="password"
                            onChange={handleChange}
                            value={formData.password}
                            isInvalid={!isPasswordValid}
                            errorMessage={'Fill field'}
                            type='password'
                            color='foreground'
                            variant='underlined'
                            isRequired
                            label={"Enter your password"}
                            required
                        />
                        <Input
                            name="confirmPassword"
                            isInvalid={!isConfirmPasswordValid}
                            errorMessage={'Passwords do not match'}
                            onChange={handleChange}
                            value={formData.confirmPassword}
                            type='password'
                            color='foreground'
                            variant='underlined'
                            isRequired
                            label={"Confirm password"}
                            required
                        />
                        <Input
                            name="swiftBank"
                            isInvalid={!isSwiftBankValid}
                            errorMessage={'Fill field'}
                            onChange={handleChange}
                            value={formData.swiftBank}
                            type='text'
                            color='foreground'
                            variant='underlined'
                            isRequired
                            label={"Swift Bank Wallet"}
                            required
                        />
                        <Input
                            name="company"
                            isInvalid={!isCompanyValid}
                            errorMessage={'Fill field'}
                            onChange={handleChange}
                            value={formData.company}
                            type='text'
                            color='foreground'
                            variant='underlined'
                            isRequired
                            label={"Company Title"}
                            placeholder={'Apple'}
                            required
                        />
                        <p className={`text-${data.success ? "success" : "danger"}`}>{data.message}</p>
                        <Button
                            type='submit'
                            isDisabled={!isValidated}
                            color='secondary'
                            size='lg'
                            className='font-bold w-full'>
                            Register
                        </Button>
                        <p className='text-center text-slate-400 font-bold'>
                            Already have an account?
                            <Link to={'../auth'} className='text-secondary cursor-pointer'> Log in </Link>
                        </p>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Register;
