import { Request, Response } from 'express';
import Product from '../models/Product';

class ProductController {
    // Get all products
    public async getAllProducts(req: Request, res: Response): Promise<void> {
        try {
            const products = await Product.find();
            res.status(200).json(products);
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ message: 'Error fetching products', error: err.message });
        }
    }

    // Get a single product by ID
    public async getProductById(req: Request, res: Response): Promise<void> {
        try {
            const product = await Product.findById(req.params.id);
            if (product !== null) {
                res.status(200).json(product);
            } else {
                res.status(404).json({ message: 'Product not found' });
            }
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ message: 'Error fetching product At getProductById', error: err.message });
        }
    }

    // Create a new product
    public async createProduct(req: Request, res: Response): Promise<void> {
        try {
            const newProduct = new Product(req.body);
            const savedProduct = await newProduct.save();
            res.status(201).json(savedProduct);
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ message: 'Error creating product', error: err.message });
        }
    }

    // Update an existing product
    public async updateProduct(req: Request, res: Response): Promise<void> {
        try {
            const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (updatedProduct !== null && updatedProduct !== undefined) {
                res.status(200).json(updatedProduct);
            } else {
                res.status(404).json({ message: 'Product not found' });
            }
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ message: 'Error updating product', error: err.message });
        }
    }

    // Delete a product
    public async deleteProduct(req: Request, res: Response): Promise<void> {
        try {
            const deletedProduct = await Product.findByIdAndDelete(req.params.id);
            if (deletedProduct !== null && deletedProduct !== undefined) {
                res.status(200).json({ message: 'Product deleted successfully' });
            } else {
                res.status(404).json({ message: 'Product not found' });
            }
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ message: 'Error deleting product', error: err.message });
        }
    }
}

export default new ProductController();