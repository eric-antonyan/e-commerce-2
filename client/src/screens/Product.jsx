import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import { Button, Image } from "@nextui-org/react";
import Footer from "../components/Footer";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../models/config.model";
import { motion } from "framer-motion";
import CryptoJS from "crypto-js";
import NotFound from "./404";
import Loading from "./Loading";
import toast, { Toaster } from "react-hot-toast";

const Product = ({ user }) => {
  const { id } = useParams();
  const [productData, setProductData] = useState({});
  const [isFavorite, setIsFavorite] = useState(false);
  const [requestCompleted, setRequestCompleted] = useState(false);
  const [addToCartResponse, setAddToCartResponse] = useState({
    message: "",
    success: false,
    count: 0
  })
  const navigate = useNavigate();
  const { VITE_SECRET_KEY } = import.meta.env;

  const addToFavorites = async () => {
    if (user && user._id) {
      const favoritePromise = async () => {
        const response = await axios.post(`${api}/api/favorite/add`, {
          productId: id,
          userId: user._id,
        });
        setIsFavorite(response.data.added);
      };

      toast.promise(favoritePromise(), {
        loading: isFavorite
          ? "Removing from favorites..."
          : "Adding to favorites",
        success: isFavorite
          ? "Removed from favorites..."
          : "Added to favorites",
        error: "Failed to add to favorites",
      });
    } else {
      console.warn("User is not logged in");
      navigate("/profile/auth");
      alert("User is not logged in");
    }
  };

  const addToCart = async () => {
    const addToCartPromise = async () => {
        const response = await axios.post(api + "/api/cart", {
            productId: id,
            userId: user._id
        })
        setAddToCartResponse(response.data)
    }

    toast.promise(addToCartPromise(), {
        loading: "Adding to cart",
        success: `Added to cart ${addToCartResponse.count + 1} items`,
        error: "Failed to add to cart"
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${api}/api/p/${id}`);
        const product = response.data.product;

        const userResponse = await axios.get(
          `${api}/api/user?get=${product.creator}`
        );
        const decryptedUser = CryptoJS.AES.decrypt(
          userResponse.data.id,
          VITE_SECRET_KEY
        ).toString(CryptoJS.enc.Utf8);
        const user = JSON.parse(decryptedUser);
        product.company = user.company;
        product.success = true;
        setProductData(product);
        setRequestCompleted(true);

        if (user && user._id) {
          const favoriteResponse = await axios.post(
            `${api}/api/favorite/check`,
            {
              userId: user._id,
              productId: id,
            }
          );
          setIsFavorite(favoriteResponse.data.added);
        }
      } catch (error) {
        console.error("Failed to fetch product data:", error);
      }
    };

    fetchData();
  }, [id, VITE_SECRET_KEY, user]);

  return requestCompleted ? (
    productData.success ? (
      <>
        <Header user={user} />
        <p className="font-bold my-8 text-center">
          Articule: <span className="text-secondary">{productData._id}</span>
        </p>
        <motion.div className="max-w-container items-start mt-5 w-full mx-auto grid grid-cols-2 gap-8">
          <Image
            layout="responsive"
            radius="lg"
            className="border-[1.5px] border-solid border-[#E4E7E9] aspect-square"
            shadow="md"
            src={`${api}/__next/__thumbnail__/${productData.image}`}
            alt={productData.title}
            isZoomed
            isBlurred
          />
          <div>
            <h1 className="text-[25px] mb-5 leading-[40px] text-black font-medium">
              {productData.title}
              <motion.i
                onClick={addToFavorites}
                whileHover={{ scale: 0.9 }}
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                className={`fa${
                  isFavorite ? "s" : "r"
                } ml-5 cursor-pointer fa-heart text-[25px] text-danger`}
              ></motion.i>
            </h1>
            <Link
              to={`/profile/${productData.creator}`}
              className="text-secondary font-bold text-[1.6em]"
            >
              {productData.company}
            </Link>
            <p className="text-[19px]">{productData.description}</p>
            <h2 className="font-bold text-[24px] text-primary">
              {Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(productData.price)}
            </h2>
            <div className="flex gap-3 mt-6 items-center">
              <Button onClick={addToCart} size="lg" color="warning" variant="flat">
                {addToCartResponse.count < 1 ? "ADD TO CART" : `Added to cart ${addToCartResponse.count}`}
              </Button>
              <Button size="lg" color="warning" variant="bordered">
                BUY NOW
              </Button>
            </div>
          </div>
        </motion.div>
        <Footer />
        <Toaster />
      </>
    ) : (
      <NotFound user={user} />
    )
  ) : (
    <Loading />
  );
};

export default Product;
