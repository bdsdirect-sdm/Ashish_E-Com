import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditProduct: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productImage, setProductImage] = useState<File | null>(null);
    const [existingImage, setExistingImage] = useState<string>('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/products/${id}`);
                const product = response.data;
                setProductName(product.name);
                setProductPrice(product.price);
                setProductDescription(product.description);
                setExistingImage(product.image);
            } catch (error) {
                console.error('Error fetching product:', error);
                toast.error('Error fetching product');
            }
        };

        fetchProduct();
    }, [id]);

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
            const response = await axios.put(`http://localhost:5000/products/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Product updated:', response.data);
            toast.success('Product updated successfully');
            navigate('/dashboard');
        } catch (error) {
            console.error('Error updating product:', error);
            toast.error('Error updating product');
        }
    };

    return (
        <div>
            <h2>Edit Product</h2>
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
                    {existingImage && (
                        <div>
                            <img src={`/productImages/${existingImage}`} alt="Existing Product" height="100px" width="100px" />
                        </div>
                    )}
                    <input
                        type="file"
                        onChange={(e) => setProductImage(e.target.files ? e.target.files[0] : null)}
                    />
                </div>
                <button type="submit">Update Product</button>
            </form>
        </div>
    );
};

export default EditProduct;