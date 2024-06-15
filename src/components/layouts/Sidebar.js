import React from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import Constants from '../../Constants';
import GlobalFunction from '../../GlobalFunction';
import { Link } from 'react-router-dom';
import Logo from '../../assets/img/logo1.png';

const Sidebar = () => {
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post(`${Constants.BASE_URL}/logout`).then(res => {
          GlobalFunction.logout();
        }).catch(errors => {
          GlobalFunction.logout();
        });
      }
    });
  }

  const isAdmin = GlobalFunction.isAdmin();

  return (
    <aside className="main-sidebar sidebar-light-warning elevation-4">
      <Link to="/" className="brand-link bg-orange">
        <img src={Logo} alt="Logo" className="brand-image mt-1" />
        <span className="brand-text font-weight-200"> Inventory App</span>
      </Link>
      <div className="sidebar">
        <nav className="mt-4">
          <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            <li className="nav-item menu-open">
              <Link to="/" className="nav-link active">
                <i className="nav-icon fas fa-tachometer-alt" />
                <p>Dashboard</p>
              </Link>
            </li>
            <li className="nav-header">MASTER PRODUCT</li>
            <li className="nav-item">
              <Link to="#" className="nav-link">
                <i className="fas fa-solid fa-cube nav-icon"></i>
                <p>
                  Master Product
                  <i className="right fas fa-angle-left"></i>
                </p>
              </Link>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to='/product-attribute' className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Ingredients</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to='/product' className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Products</p>
                  </Link>
                </li>
              </ul>
            </li>
            {isAdmin && (
              <>
                <li className="nav-header">MASTER DATA</li>
                <li className="nav-item">
                  <Link to="#" className="nav-link">
                    <i className="fas fa-solid fa-database nav-icon"></i>
                    <p>
                      Master Data
                      <i className="right fas fa-angle-left"></i>
                    </p>
                  </Link>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <Link to='/category' className="nav-link">
                        <i className="far fa-circle nav-icon"></i>
                        <p>Category</p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to='/sub-category' className="nav-link">
                        <i className="far fa-circle nav-icon"></i>
                        <p>Sub Category</p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to='/brand' className="nav-link">
                        <i className="far fa-circle nav-icon"></i>
                        <p>Brand / Merk</p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to='/supplier' className="nav-link">
                        <i className="far fa-circle nav-icon"></i>
                        <p>Suppliers</p>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-header">SHOP</li>
                <li className="nav-item">
                  <Link to='/shop' className="nav-link">
                    <i className="fas fa-solid fa-cart-plus nav-icon"></i>
                    <p>Shops</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to='/sales-manager' className="nav-link">
                    <i className="far fa-solid fa-user nav-icon"></i>
                    <p>Sales Manager</p>
                  </Link>
                </li>
                <li className="nav-header">TRANSACTION</li>
                <li className="nav-item">
                  <Link to='/' className="nav-link">
                    <i className="fas fa-solid fa-file-invoice nav-icon"></i>
                    <p>Orders</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to='#' className="nav-link">
                    <i className="fas fa-file nav-icon" />
                    <p>Stock Out</p>
                  </Link>
                </li>
                <li className="nav-header">REPORT</li>
                <li className="nav-item">
                  <Link to='#' className="nav-link">
                    <i className="fas fa-solid fa-book nav-icon"></i>
                    <p>Lap. Barang Masuk</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to='#' className="nav-link">
                    <i className="fas fa-solid fa-book nav-icon"></i>
                    <p>Lap. Barang Keluar</p>
                  </Link>
                </li>
              </>
            )}
            
            <li className="nav-header">MASTER TRANSAKSI</li>
            <li className="nav-item">
              <Link to='/order' className="nav-link">
                <i className="fas fa-solid fa-file-invoice nav-icon"></i>
                <p>Orders</p>
              </Link>
            </li>
            <li className="nav-header">ACCESSORIES</li>
            <li className="nav-item">
              <Link to='/generate-barcode' className="nav-link">
                <i className="fas fa-solid fa-file-invoice nav-icon"></i>
                <p>Generate Barcode</p>
              </Link>
            </li>
            <li className="nav-header">SETTING</li>
            <li className="nav-item">
              <Link to='#' className="nav-link">
                <i className="fas fa-solid fa-user nav-icon"></i>
                <p>Profile</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to='#' onClick={handleLogout} className="nav-link">
                <i className="fas fa-sign-out-alt nav-icon"></i>
                <p>Logout</p>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
