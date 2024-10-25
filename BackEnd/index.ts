import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/database';
import userRoutes from './routes/userRoutes';
import productRoutes from './routes/productRouts';
import path from 'path';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, 'uploads')));
app.use("/uploads", express.static(path.join(__dirname, 'uploads')));
// Routes
app.use('/users', userRoutes);
app.use('/products', productRoutes);

// Sync Database and Start Server
const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: true }).then(() => {
    console.log('Database synced');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((error) => {
    console.error('Unable to connect to the database:', error);
});

