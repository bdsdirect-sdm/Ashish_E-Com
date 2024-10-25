/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

interface FormData {
    FirstName: string;
    LastName: string;
    CompanyName: string;
    Email: string;
    PhoneNumber: string;
    Address: string;
    CompanyLogoPath?: File;
    ProfilePicturePath?: File;
}

const SignupSchema = Yup.object().shape({
    FirstName: Yup.string()
        .matches(/^[A-Za-z]+$/, 'First name must contain only letters')
        .max(100, 'First name must be at most 100 characters')
        .required('First name is required'),
    LastName: Yup.string()
        .matches(/^[A-Za-z]+$/, 'Last name must contain only letters')
        .max(100, 'Last name must be at most 100 characters')
        .required('Last name is required'),
    CompanyName: Yup.string()
        .max(255, 'Company name must be at most 255 characters')
        .required('Company name is required'),
    Email: Yup.string().email('Invalid email').required('Email is required'),
    PhoneNumber: Yup.string()
        .matches(/^[0-9]+$/, 'Phone number must be numeric')
        .max(15, 'Phone number must be at most 15 digits')
        .required('Phone number is required'),
    Address: Yup.string()
        .max(255, 'Address must be at most 255 characters')
        .required('Address is required'),
    CompanyLogoPath: Yup.mixed()
        .required('Company logo is required')
        .test('fileFormat', 'Unsupported Format, only JPG and PNG allowed', (value) => {
            return value && (value instanceof File) && (value.type === 'image/jpeg' || value.type === 'image/png');
        }),
    ProfilePicturePath: Yup.mixed()
        .required('Profile picture is required')
        .test('fileFormat', 'Unsupported Format, only JPG and PNG allowed', (value) => {
            return value && (value instanceof File) && (value.type === 'image/jpeg' || value.type === 'image/png');
        }),
});

export default function SignUp() {
    const navigate = useNavigate();

    const handleSubmit = async (values: FormData) => {
        try {
            const formData = new FormData();
            Object.entries(values).forEach(([key, value]) => {
                if (value !== undefined) {
                    formData.append(key, value);
                }
            });

            await axios.post('http://localhost:5000/users/signup', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success('Registration successful.');
            navigate('/login');
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
            toast.error(errorMessage);
            console.log(error);
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-form">
                <h2 className="text-center">Signup</h2>
                <ToastContainer />
                <Formik
                    initialValues={{
                        FirstName: '',
                        LastName: '',
                        CompanyName: '',
                        Email: '',
                        PhoneNumber: '',
                        Address: '',
                        CompanyLogoPath: undefined,
                        ProfilePicturePath: undefined,
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={handleSubmit}
                >
                    {({ setFieldValue }) => (
                        <Form>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="FirstName">First Name</label>
                                    <Field type="text" className="form-control" placeholder="Enter First Name" name="FirstName" id="FirstName" />
                                    <ErrorMessage name="FirstName" component="div" className="text-danger" />
                                </div>

                                <div className="form-group col-md-6">
                                    <label htmlFor="LastName">Last Name</label>
                                    <Field type="text" className="form-control" placeholder="Enter Last Name" name="LastName" id="LastName" />
                                    <ErrorMessage name="LastName" component="div" className="text-danger" />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="CompanyName">Company Name</label>
                                    <Field type="text" className="form-control" placeholder="Enter Company Name" name="CompanyName" id="CompanyName" />
                                    <ErrorMessage name="CompanyName" component="div" className="text-danger" />
                                </div>

                                <div className="form-group col-md-6">
                                    <label htmlFor="Email">Email</label>
                                    <Field type="email" className="form-control" placeholder="Enter Email" name="Email" id="Email" />
                                    <ErrorMessage name="Email" component="div" className="text-danger" />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="PhoneNumber">Phone Number</label>
                                    <Field type="text" className="form-control" placeholder="Enter Phone Number" name="PhoneNumber" id="PhoneNumber" />
                                    <ErrorMessage name="PhoneNumber" component="div" className="text-danger" />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="Address">Address</label>
                                <Field type="text" className="form-control" placeholder="Enter Address" name="Address" id="Address" />
                                <ErrorMessage name="Address" component="div" className="text-danger" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="CompanyLogoPath">Company Logo</label>
                                <input
                                    className="form-control"
                                    type="file"
                                    id="CompanyLogoPath"
                                    name="CompanyLogoPath"
                                    onChange={(event) => {
                                        const file = event.currentTarget.files![0];
                                        setFieldValue('CompanyLogoPath', file);
                                    }}
                                />
                                <ErrorMessage name="CompanyLogoPath" component="div" className="text-danger" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="ProfilePicturePath">Profile Picture</label>
                                <input
                                    className="form-control"
                                    type="file"
                                    id="ProfilePicturePath"
                                    name="ProfilePicturePath"
                                    onChange={(event) => {
                                        const file = event.currentTarget.files![0];
                                        setFieldValue('ProfilePicturePath', file);
                                    }}
                                />
                                <ErrorMessage name="ProfilePicturePath" component="div" className="text-danger" />
                            </div>

                            <button type="submit" className="btn btn-primary btn-block">Signup</button>
                        </Form>
                    )}
                </Formik>
                <p className="text-center mt-3">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
}