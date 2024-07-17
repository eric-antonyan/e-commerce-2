import React, { useState } from 'react';
import Header from '../components/Header';
import { Button, Input } from '@nextui-org/react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';
import { api } from '@/models/config.model';

const LogIn = ({ secretKey }) => {
  const [data, setData] = useState({ message: "", success: true });
  const [swiftBank, setSwiftBank] = useState("");
  const [cliconPassword, setCliconPassword] = useState("");

  const navigate = useNavigate();

  if (Cookies.get('token')) {
    return <Navigate to="../../profile" />;
  }

  const onLogin = async (e) => {
    e.preventDefault();
    setData({ message: "", success: true });

    try {
      const requestData = { swiftBank, cliconPassword };
      const encrypt = CryptoJS.AES.encrypt(JSON.stringify(requestData), secretKey).toString();

      const response = await axios.post(`${api}/api/auth`, { data: encrypt });

      setData(response.data);

      if (response.data.success) {
        Cookies.set('token', response.data.token);
        Cookies.set('user', JSON.stringify(response.data.user)); // Store user information
        if (Cookies.get("token")) {
          navigate("../../");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      setData({ message: "Login failed. Please try again.", success: false });
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-container w-full mx-auto">
        <h1 className='text-[30px] mb-[40px] font-bold text-center my-5'>Getting start!</h1>
        <div className="w-full flex justify-center">
          <motion.form
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            onSubmit={onLogin}
            className='max-w-[400px] w-full flex justify-center items-center flex-col gap-3'
          >
            <Input
              onChange={(e) => setSwiftBank(e.target.value)}
              value={swiftBank}
              type='text'
              color='foreground'
              variant='underlined'
              label="Swift Bank Wallet"
              required
            />
            <Input
              onChange={(e) => setCliconPassword(e.target.value)}
              value={cliconPassword}
              type='password'
              color='foreground'
              variant='underlined'
              label="Enter your Clicon password"
              required
            />
            {data.message && (
              <p className={`text-${data.success ? "success" : "danger"}`}>
                {data.message}
              </p>
            )}
            <Button
              type='submit'
              color='secondary'
              size='lg'
              className='font-bold w-full'
            >
              Log in
            </Button>
            <p className='text-center text-slate-400 font-bold'>
              Do not have an account? <Link to='../reg' className='text-secondary cursor-pointer'>Getting start!</Link>
            </p>
          </motion.form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LogIn;
