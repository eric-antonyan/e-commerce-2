import React, { useEffect, useState } from 'react'
import Card from './Card'

const Products = ({ products, user }) => {
    return (
        <div className='max-w-container w-full mx-auto mt-[74px]'>
            <h1 className='text-[30px] mb-[40px] font-bold'>All Products</h1>
            {
                products.length !== 0 ? <div className={`grid grid-cols-4 gap-[16px]`}>
                    {
                        products.map((product, idx) => {
                            return (
                                product.status === "active" ? <Card key={idx} user={user} idx={idx} product={product} /> : ""
                            )
                        })
                    }
                </div> : <h3 className='text-[1.4rem] text-center'>Products not found</h3>
            }
        </div>
    )
}

export default Products