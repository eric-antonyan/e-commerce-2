import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import { Image } from "@nextui-org/react";
import { api } from "../models/config.model";

const Card = ({ product, idx, user }) => {
  console.log(product);
  if (!product) {
    return null;
  }

  return (
    <motion.div
      initial={{ x: idx % 2 === 0 ? -30 : 30, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <Link to={`/product/${product._id}`}>
        <motion.div
          id={`card-${idx}`}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
          className={`flex bg-white border-[1px] border-[#E4E7E9] items-start gap-[10px] flex-col rounded-large card`}
        >
          <Image
            isZoomed
            isBlurred
            src={`${api}/__next/__thumbnail__/${product.image}`}
            className="w-[100%] aspect-square object-cover object-center hover:brightness-50 transition-all duration-150"
            alt={product.title}
            style={{ transition: "0.5s" }}
          />
          <div className="px-[16px]">
            <p className="text-[18px] font-[500] flex items-center">
              {product.company.company}{" "}
              {product.company.verified ? (
                <i className="fas ml-2 text-primary fa-badge-check"></i>
              ) : null}
            </p>
            <p className="text-[18px]">
              {product.title.length >= 15
                ? `${product.title.slice(0, 15)}...`
                : product.title}
            </p>
          </div>
          <p className="text-secondary p-[16px] font-bold">
            {Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(product.price)}
            {Cookies.get("token") && user && product.creator === user._id ? (
              <span>(Your product)</span>
            ) : null}
          </p>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default Card;
