import {
    Avatar, Button, Chip, Input, Modal, ModalContent, ModalBody, ModalFooter, ModalHeader, Spacer, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure, RadioGroup, Radio,
    Textarea
} from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import AdminPanelHeader from '../components/AdminPanelHeader'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { api } from '../models/config.model'
import CryptoJS from 'crypto-js'

const AdminPanelEdit = ({ user }) => {
    const [productsData, setProductsData] = useState([]);
    const { VITE_SECRET_KEY } = import.meta.env;
    const [selected, setSelected] = useState({});

    const [price, setPrice] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [status, setStatus] = useState("active");

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    useEffect(() => {
        const fetchProductsAndUsers = async () => {
            try {
                // Fetch products
                const productsResponse = await axios.get(`${api}/api/p?get=${user && user._id}`);
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

        // Check if user and VITE_SECRET_KEY are available before fetching
        if (user && user._id && VITE_SECRET_KEY) {
            fetchProductsAndUsers();
        }
    }, [user && user._id, VITE_SECRET_KEY]);

    const onEdit = async (e, id) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${api}/api/p/${id}`, {
                price,
                title,
                description,
                status
            });
            console.log(response.data.message);
            // Optionally, update the product in state
            setProductsData(productsData.map(product => product._id === id ? { ...product, price, title, description, status } : product));
        } catch (error) {
            console.error(error);
        }
    };

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
                            <TableColumn>Price</TableColumn>
                            <TableColumn>Title</TableColumn>
                            <TableColumn>Description</TableColumn>
                            <TableColumn>Creator Company</TableColumn>
                            <TableColumn>Status</TableColumn>
                            <TableColumn>Actions</TableColumn>
                        </TableHeader>
                        <TableBody emptyContent={<Spinner color='warining' label={<p className='font-bold mt-[20px]'>Content is Loading</p>} labelColor='warning' />} items={[productsData]}>
                            {
                                productsData.map((product, idx) => {
                                    return (
                                        <TableRow key={idx}>
                                            <TableCell>
                                                <Avatar
                                                    isBordered
                                                    color={product.status === "active" ? "success" : "danger"}
                                                    size='lg'
                                                    src={`${api}/__next/__thumbnail__/${product.image}`}
                                                />
                                            </TableCell>
                                            <TableCell>{product._id}</TableCell>
                                            <TableCell>{Intl.NumberFormat('en-US', {
                                                style: 'currency',
                                                currency: 'USD'
                                            }).format(product.price)}</TableCell>
                                            <TableCell>{product.title}</TableCell>
                                            <TableCell>{product.description.length >= 16 ? product.description.slice(0, 15) + "..." : product.description}</TableCell>
                                            <TableCell>{product.creator}</TableCell>
                                            <TableCell><Chip variant='flat' color={product.status === "active" ? "success" : "danger"}>{product.status}</Chip></TableCell>
                                            <TableCell className='flex gap-4'>
                                                <Button onPress={(e) => {
                                                    setSelected(product);
                                                    setPrice(product.price);
                                                    setTitle(product.title);
                                                    setDescription(product.description);
                                                    setStatus(product.status);
                                                    onOpen();
                                                }} color='warning' variant='flat'>Edit</Button>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </form>
                <p className='text-center mt-[30px] font-bold'>When you have problems call <Link to={"tel:+37493932251"} className="text-warning">+374 93932251</Link></p>
            </div>
            <Modal backdrop='blur' isOpen={isOpen} size='lg' onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => {
                        return <>
                            <form onSubmit={(e) => {
                                onEdit(e, selected._id)
                                onClose()
                            }}>
                                <ModalHeader className="flex flex-col gap-1">{selected.title}</ModalHeader>
                                <ModalBody>
                                    <Input
                                        variant='underlined'
                                        label={'New Price'}
                                        isRequired
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                    <Input
                                        variant='underlined'
                                        label={'New Title'}
                                        isRequired
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                    <Textarea
                                        variant='underlined'
                                        label={'New Description'}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                    <RadioGroup
                                        onValueChange={setStatus}
                                        value={status}
                                        color='warning'
                                        defaultValue='active'
                                        orientation='horizontal'
                                    >
                                        <Radio value="active">Active</Radio>
                                        <Radio value="inactive">Inactive</Radio>
                                    </RadioGroup>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button color="warning" type='submit' variant='flat'>
                                        Update
                                    </Button>
                                </ModalFooter>
                            </form>
                        </>
                    }}
                </ModalContent>
            </Modal>
            <Footer />
        </>
    )
}

export default AdminPanelEdit
