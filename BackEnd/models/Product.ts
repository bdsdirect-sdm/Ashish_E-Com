
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import User from './User';


class ProductDetails extends Model {
    static find() {
        throw new Error('Method not implemented.');
    }
    static findById(id: string) {
        throw new Error('Method not implemented.');
    }
    static findByIdAndUpdate(id: string, body: any, arg2: { new: boolean; }) {
        throw new Error('Method not implemented.');
    }
    static findByIdAndDelete(id: string) {
        throw new Error('Method not implemented.');
    }
    // static find() {
    //     throw new Error('Method not implemented.');
    // }
    // static findById(id: string) {
    //     throw new Error('Method not implemented.');
    // }
    // static findByIdAndUpdate(id: string, body: any, arg2: { new: boolean; }) {
    //     throw new Error('Method not implemented.');
    // }
    // static findByIdAndDelete(id: string) {
    //     throw new Error('Method not implemented.');
    // }
    public ProductID!: number;
    public ProductName!: string;
    public ProductCategory!: string;
    public ProductImagePath?: string;
    public ProductPrice!: number;
    public ProductQuantity!: number;
    public ProductStatus!: string;
    public userId!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

ProductDetails.init(
    {
        ProductID: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        ProductName: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        ProductCategory: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        ProductImagePath: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        ProductPrice: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        ProductQuantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        ProductStatus: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'products',
        timestamps: true,
    }
)

    ProductDetails.belongsTo(User, {
        foreignKey: 'userId',
        as: 'user',
    });
export default ProductDetails;

