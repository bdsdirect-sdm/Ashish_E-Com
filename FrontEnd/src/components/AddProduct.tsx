import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProduct: React.FC = () => {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productImage, setProductImage] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', productName);
        formData.append('price', productPrice);
        formData.append('description', productDescription);
        if (productImage) {
            formData.append('image', productImage);
        }

        try {
            const response = await axios.post('http://localhost:5000/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Product added:', response.data);
            toast.success('Product added successfully');
            setProductName('');
            setProductPrice('');
            setProductDescription('');
            setProductImage(null);
        } catch (error) {
            console.error('Error adding product:', error);
            toast.error('Error adding product');
        }
    };

    return (
        <div>
            <h2>Add New Product</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Product Name:</label>
                    <input
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Product Price:</label>
                    <input
                        type="number"
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Product Description:</label>
                    <textarea
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Product Image:</label>
                    <input
                        type="file"
                        onChange={(e) => setProductImage(e.target.files ? e.target.files[0] : null)}
                    />
                </div>
                <button type="submit">Add Product</button>
            </form>
        </div>
    );
};

export default AddProduct;