import { Avatar, Button, Chip, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import AdminPanelHeader from '../components/AdminPanelHeader';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { api } from '../models/config.model';
import CryptoJS from 'crypto-js';

const AdminPanel = ({ user }) => {
    const [productsData, setProductsData] = useState([]);
    const { VITE_SECRET_KEY } = import.meta.env;

    useEffect(() => {
        const fetchProductsAndUsers = async () => {
            try {
                // Fetch products
                const productsResponse = await axios.get(`${api}/api/p?get=${user._id}`);
                console.log('Products Response:', productsResponse.data); // Log the products response
                const products = productsResponse.data.products;

                // Function to fetch user company
                const fetchUserCompany = async (creatorId) => {
                    const response = await axios.get(`${api}/api/user?get=${creatorId}`);
                    console.log('User Response:', response.data); // Log the user response
                    const decryptedId = CryptoJS.AES.decrypt(response.data.id, VITE_SECRET_KEY).toString(CryptoJS.enc.Utf8);
                    const user = JSON.parse(decryptedId);
                    console.log('Decrypted User:', user); // Log the decrypted user
                    return user.company;
                };

                // Fetch company for each product
                const productsWithCompany = await Promise.all(products.map(async (product) => {
                    const company = await fetchUserCompany(product.creator);
                    return { ...product, company };
                }));

                console.log('Products with Company:', productsWithCompany); // Log the combined data
                // Update state with combined data
                setProductsData(productsWithCompany);
            } catch (error) {
                console.error('Error fetching products or user company:', error);
            }
        };

        fetchProductsAndUsers();
    }, [user && user._id, VITE_SECRET_KEY]);

    const onRemove = async (id) => {
        const response = await axios.delete(api + `/api/p/${id}`)
        if (response.data.success) {
            setProductsData(productsData.filter(product => product._id !== response.data.id))
        }
    }

    return (
        user && <>
            <AdminPanelHeader user={user} />
            <div className='max-w-container w-full mx-auto'>
                <h1 className='text-[30px] font-bold my-5'>Products</h1>
                <form action="">
                    <Table color='warning'>
                        <TableHeader>
                            <TableColumn>Image</TableColumn>
                            <TableColumn>Product ID</TableColumn>
                            <TableColumn>Title</TableColumn>
                            <TableColumn>Description</TableColumn>
                            <TableColumn>Creator Company</TableColumn>
                            <TableColumn>Status</TableColumn>
                            <TableColumn>Actions</TableColumn>
                        </TableHeader>
                        <TableBody
                            emptyContent={
                                <Spinner color='warning' label={<p className='font-bold mt-[20px]'>Content is Loading</p>} labelColor='warning' />
                            }
                            items={productsData}
                        >
                            {productsData.map((product, idx) => (
                                <TableRow key={idx}>
                                    <TableCell>
                                        <Avatar
                                            isBordered
                                            color={product.status === "active" ? "success" : "danger"}
                                            size='lg'
                                            src={`${api}/__next/__thumbnail__/${product.image}`}
                                        />
                                    </TableCell>
                                    <TableCell>{product._id.toUpperCase()}</TableCell>
                                    <TableCell>{product.title}</TableCell>
                                    <TableCell>{product.description.length >= 16 ? product.description.slice(0, 15) + "..." : product.description}</TableCell>
                                    <TableCell>{product.company}</TableCell>
                                    <TableCell>
                                        <Chip variant='flat' color={product.status === "active" ? "success" : "danger"}>
                                            {product.status}
                                        </Chip>
                                    </TableCell>
                                    <TableCell className='flex gap-4'>
                                        <Button onPress={() => onRemove(product._id)} color='danger' size='md' variant='flat'>Remove</Button>
                                        <Link to={"/product/" + product._id}>
                                            <Button color='success' size='md' variant='flat'>View</Button>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </form>
                <p className='text-center mt-[30px] font-bold'>
                    When you have problems call <Link to={"tel:+37493932251"} className="text-warning">+374 93932251</Link>
                </p>
            </div>
            <Footer />
        </>
    );
};

export default AdminPanel;
