import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import AdminHeader from "../components/AdminPanelHeader";
import { api } from "../models/config.model";
import { Button, Image, Tooltip } from "@nextui-org/react";
import Card from "../components/Card";
import axios from "axios";
import CryptoJS from "crypto-js";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Cookies from "js-cookie";

const Profile = ({ user = {}, account = {} }) => {
  const [productsData, setProductsData] = useState([]);
  const { VITE_SECRET_KEY } = import.meta.env;

  useEffect(() => {
    const fetchProductsAndUsers = async () => {
      try {
        if (user && user._id) {
          // Fetch products
          const productsResponse = await axios.get(
            `${api}/api/p?get=${user._id}`
          );
          const products = productsResponse.data.products;

          // Function to fetch user company
          const fetchUserCompany = async (creatorId) => {
            const response = await axios.get(
              `${api}/api/user?get=${creatorId}`
            );
            const decryptedId = CryptoJS.AES.decrypt(
              response.data.id,
              VITE_SECRET_KEY
            ).toString(CryptoJS.enc.Utf8);
            const user = JSON.parse(decryptedId);
            return user.company;
          };

          // Fetch company for each product
          const productsWithCompany = await Promise.all(
            products.map(async (product) => {
              const company = await fetchUserCompany(product.creator);
              return { ...product, company };
            })
          );

          // Update state with combined data
          setProductsData(productsWithCompany);
        } else {
          console.log("User is not defined or user._id is missing");
        }
      } catch (error) {
        console.error("Error fetching products or user company:", error);
      }
    };

    // Check if user._id and VITE_SECRET_KEY are available before fetching
    if (user && user._id && VITE_SECRET_KEY) {
      fetchProductsAndUsers();
    } else {
      console.log(
        "User or user._id or VITE_SECRET_KEY is not available for fetching"
      );
    }
  }, [user, VITE_SECRET_KEY]);

  return user && user._id ? (
    <>
      {Cookies.get("token") ? (
        user._id !== account._id ? (
          <Header user={account} />
        ) : (
          <AdminHeader user={account} />
        )
      ) : (
        <Header user={user} />
      )}
      <h1 className="text-center text-[2rem] font-bold my-[50px]">
        {Cookies.get("token") && user._id === account._id ? (
          <span className="text-danger">Your account!</span>
        ) : (
          <span>
            {user.company}{" "}
            {user.verifed ? (
              <Tooltip
                color="secondary"
                content={`${user.company} is Verified by CLICON`}
              >
                <i className="fas fa-badge-check mt-3 text-secondary"></i>
              </Tooltip>
            ) : (
              ""
            )}
          </span>
        )}
      </h1>
      <div className="max-w-container w-full relative mx-auto gap-40 grid grid-cols-2 items-start">
        <div>
          <Image
            className="sticky top-[80px]"
            isZoomed
            shadow="lg"
            radius="full"
            src={`${api}/api/__next/__avatar__/${user._id}`}
          />
          <div className="flex gap-4 justify-center mt-16">
            {Cookies.get("token") && user._id !== account._id ? (
              <>
                <Button color="foreground">Send Message</Button>
                <Button color="secondary">Follow</Button>
              </>
            ) : (
              <Link to={"/profile/dashboard"}>
                <Button color="success" variant="flat">
                  Go to Dashboard
                </Button>
              </Link>
            )}
          </div>
        </div>
        <div>
          <h2 className="text-[2rem] font-bold py-[20px] text-center">
            Products
          </h2>
          <div className="grid gap-2 grid-cols-2">
            {productsData.length !== 0 ? (
              productsData.map((product, idx) => (
                <Card
                  key={product._id}
                  product={product}
                  idx={idx}
                  user={user}
                />
              ))
            ) : (
              <h1 className="text-[1.6rem] font-bold text-center w-[100%]">
                No Products
              </h1>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <div>Loading...</div>
  );
};

export default Profile;
