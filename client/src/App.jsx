import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Shop from "./screens/Shop";
import Cart from "./screens/Cart";
import { AnimatePresence } from "framer-motion";
import AdminPanel from "./screens/AdminPanel";
import AdminPanelEdit from "./screens/AdminPanelEdit";
import { NextUIProvider } from "@nextui-org/react";
import Account from "./screens/Account";
import Register from "./screens/Register";
import LogIn from "./screens/LogIn";
import AdminPanelCreate from "./screens/AdminPanelCreate";
import axios from "axios";
import { api } from "./models/config.model";
import { jwtDecode } from "jwt-decode";
import CryptoJS from "crypto-js";
import Product from "./screens/Product";
import Favorites from "./screens/Favorites";
import Results from "./screens/Results";
import { ChakraProvider } from "@chakra-ui/react";
import Cookies from "js-cookie";

function App() {
  const [user, setUser] = useState(null);
  const { VITE_SECRET_KEY } = import.meta.env;

  const parseJSON = (str) => {
    try {
      return JSON.parse(str);
    } catch (e) {
      return str;
    }
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const fetchUserData = async () => {
        try {
          const decodedToken = jwtDecode(token);
          const encryptedUserId = CryptoJS.AES.encrypt(decodedToken.userId, VITE_SECRET_KEY).toString();
          const response = await axios.post(`${api}/api/hash/u`, { hashCode: encryptedUserId });

          const decryptedData = CryptoJS.AES.decrypt(response.data.jwt, VITE_SECRET_KEY);
          const userData = parseJSON(decryptedData.toString(CryptoJS.enc.Utf8));
          
          setUser(userData);
        } catch (error) {
          console.error("Error fetching user data:", error);
          // Optionally handle error (e.g., logout user, clear cookies)
        }
      };

      fetchUserData();
    }
  }, [VITE_SECRET_KEY]);

  return (
    <NextUIProvider>
      <AnimatePresence>
        <ChakraProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Shop user={user} />} />
              <Route path="/favorites" element={<Favorites user={user} />} />
              <Route path="/cart" element={<Cart user={user} />} />
              <Route path="/product/:id" element={<Product user={user} />} />
              <Route path="/results" element={<Results user={user} />} />
              <Route path="/profile">
                <Route path=":_id" element={<Account user={user} />} />
                <Route path="reg" element={<Register />} />
                <Route path="auth" element={<LogIn secretKey={VITE_SECRET_KEY} />} />
                <Route path="dashboard">
                  <Route index element={<AdminPanel user={user} />} />
                  <Route path="edit" element={<AdminPanelEdit user={user} />} />
                  <Route path="create" element={<AdminPanelCreate user={user} />} />
                </Route>
              </Route>
            </Routes>
          </Router>
        </ChakraProvider>
      </AnimatePresence>
    </NextUIProvider>
  );
}

export default App;
