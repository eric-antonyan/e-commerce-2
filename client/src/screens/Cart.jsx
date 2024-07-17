import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableColumn,
} from "@nextui-org/react";
import { Button, Container, Img, Text } from "@chakra-ui/react";
import axios from "axios";
import { api } from "../models/config.model";
import Footer from "../components/Footer";

const Card = ({ user }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${api}/api/cart/${user._id}`);
      setCart(response.data.cart);
    };

    fetchData();
  }, [user]);
  return (
    <>
      <Header user={user} />
      <Container maxWidth={"1320px"}>
        <Text mt={50} fontSize={"4xl"} fontWeight={"bold"}>
          My Cart
        </Text>
        <Table>
          <TableHeader>
            <TableColumn>Products</TableColumn>
            <TableColumn>Price</TableColumn>
            <TableColumn>Count</TableColumn>
            <TableColumn>Actions</TableColumn>
          </TableHeader>
          <TableBody emptyContent={"Cart is empty"} items={cart}>
            {cart
              ? cart.map((cart) => (
                  <TableRow>
                    <TableCell className="flex gap-3">
                      <Img
                        src={`${api}/__next/__thumbnail__/${cart.image}`}
                        boxSize={50}
                        rounded={10}
                        objectFit={"cover"}
                        alt=""
                      />
                      <span className="text-[20px]">
                        {cart.title}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-[20px]">
                        {Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                        }).format(cart.price)}
                      </span>
                    </TableCell>
                    <TableCell>
                      {cart.count}
                    </TableCell>
                    <TableCell className="flex gap-3">
                      <Button colorScheme="green">+</Button>
                      <Button colorScheme="red">-</Button>
                    </TableCell>
                  </TableRow>
                ))
              : "Loading..."}
          </TableBody>
        </Table>
      </Container>
      <Footer />
    </>
  );
};

export default Card;
