import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';


class User extends Model {
    public UserID!: number;
    public FirstName!: string;
    public LastName!: string;
    public CompanyName!: string;
    public Email!: string;
    public Password!: string;
    public PhoneNumber!: string;
    public Address!: string;
    public CompanyLogoPath?: string;
    public ProfilePicturePath?: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

}

User.init(
    {
        UserID: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        FirstName: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        LastName: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        CompanyName: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        Email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        Password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        PhoneNumber: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },
        Address: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        CompanyLogoPath: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        ProfilePicturePath: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'Users',
        timestamps: true,
    }
);

export default User;
