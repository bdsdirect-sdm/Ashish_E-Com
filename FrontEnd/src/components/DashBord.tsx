/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Product {
  id: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
  status: string;
  userId: string; // Assuming each product has a userId field to associate it with a user
}

const DashBord: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token: any = localStorage.getItem('token');
        if (!token) {
          return navigate('/login');
        }
        const decoded: any = jwtDecode(token);
        const userId = decoded.id;
        console.log('userId:', userId);
        
        const response = await axios.get(`http://localhost:5000/users/userDetails`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data);

        const fetchProducts = async () => {
          try {
            const response = await axios.get(`http://localhost:5000/products/${userId}`, {
              params: { userId }
            });
            setProducts(response.data);
          } catch (error) {
            console.error('Error fetching products:', error);
            toast.error('Error fetching products');
          }
        };

        fetchProducts();
      } catch (error) {
        console.error('Error fetching user details:', error);
        toast.error('Error fetching user details');
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Successfully Logged Out');
    navigate('/login');
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const productsPerPage = 5;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const displayedProducts = filteredProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/products/${id}`);
      setProducts(products.filter(product => product.id !== id));
      toast.success('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Error deleting product');
    }
  };

  if (!userData) {
    return null;
  }

  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light m-0 p-0">
          <div className="container-fluid bg-light main-site-head-top">
            <a className="navbar-brand pl-2 pr-2" href="#">
              <h3>HostelBazaar</h3>
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <button onClick={handleLogout} className="btn mb-5 btn-danger">
              Logout
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto"></ul>
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <a className="nav-link" href="/admin">
                    <i className="fa fa-user"></i> Admin
                  </a>
                </li>
                <li className="nav-item active">
                  <a className="nav-link" href="/logout">
                    <i className="fa fa-power-off"></i> Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <main className="container-fluid" style={{ marginTop: "50px", marginBottom: "100px", minHeight: "600px" }}>
        <a href="/admin/products/add" style={{ margin: "20px 0" }} className="btn btn-primary">
          Add Product
        </a>
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearch}
          className="form-control mb-3"
        />
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th scope="col">SN</th>
              <th scope="col">Product Name</th>
              <th scope="col">Image</th>
              <th scope="col">Quantity</th>
              <th scope="col">Price</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {displayedProducts.map((product, index) => (
              <tr key={product.id}>
                <th scope="row">{(currentPage - 1) * productsPerPage + index + 1}</th>
                <td>{product.name}</td>
                <td>
                  <img src={`/productImages/${product.image}`} height="100px" width="100px" alt="Product" />
                </td>
                <td>{product.quantity}</td>
                <td>{product.price}</td>
                <td>{product.status}</td>
                <td>
                  <a href={`/product/update/${product.id}`} className="btn btn-warning mr-2">
                    Edit
                  </a>
                  <button onClick={() => handleDelete(product.id)} className="btn btn-danger">
                    Delete
                  </button>
                  <a href={`/product/view/${product.id}`} className="btn btn-info ml-2">
                    View
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <nav>
          <ul className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </main>

      <footer className="page-footer font-small blue pt-4 bg-dark text-light">
        <div className="container-fluid text-center text-md-left">
          <div className="row">
            <div className="col-md-4 mt-md-0 mt-3">
              <h5 className="text-uppercase">Hostel Bazaar</h5>
              <p>Get your needs on your feeds.</p>
              <a className="navbar-brand main-site-head" href="#">
                <img src="../static/images/logo.png" width="auto" height="40" alt="Hostel Bazaar Logo" />
              </a>
            </div>
            <div className="col-md-4 mb-md-0 mb-3">
              <h5 className="text-uppercase">For You</h5>
              <ul className="list-unstyled">
                <li><a href="#!">Today's Deals</a></li>
                <li><a href="#!">Discount</a></li>
                <li><a href="#!">Jackpot</a></li>
                <li><a href="#!">Categories</a></li>
              </ul>
            </div>
            <div className="col-md-4 mb-md-0 mb-3">
              <h5 className="text-uppercase">Our Info</h5>
              <ul className="list-unstyled">
                <li><a href="#!">About Us</a></li>
                <li><a href="#!">Contact Us</a></li>
                <li><a href="#!">Privacy Policy</a></li>
                <li><a href="#!">Disclaimer</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DashBord;