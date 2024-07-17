import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Card from "../components/Card";
import axios from "axios";
import { api } from "../models/config.model";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";

const Favorites = ({ user }) => {
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  const { VITE_SECRET_KEY } = import.meta.env;

  if (!Cookies.get("token")) {
    return <Navigate to={"/profile/auth"} />;
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${api}/api/favorite/${user._id}`);
        setProducts(response.data.favorites)
      } catch (err) {
        console.log(err);
      }
    };

    fetchProducts();
  }, [user, VITE_SECRET_KEY]);

  return (
    user && (
      <>
        <Header user={user} />
        <h1 className="font-bold text-[2.5em] text-black text-center">
          {products.length} products added in favorites
        </h1>
        <div className="max-w-container grid grid-cols-4 gap-[16px]  mt-5 w-full mx-auto">
          {products.map((product, idx) => {
            return <Card product={product} user={user} idx={idx} />;
          })}
        </div>
        <Footer />
      </>
    )
  );
};

export default Favorites;
