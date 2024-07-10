import React from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import Constants from '../../Constants';
import GlobalFunction from '../../GlobalFunction';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../assets/img/logo1.png';

const Sidebar = () => {
  const location = useLocation();
  
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
  };

  const isAdmin = GlobalFunction.isAdmin();

  const getNavLinkClass = (path) => {
    return location.pathname === path ? 'nav-link active' : 'nav-link';
  };

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
              <Link to="/" className={getNavLinkClass('/')}>
                <i className="nav-icon fas fa-tachometer-alt" />
                <p>Home</p>
              </Link>
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
                      <Link to='/sales-manager' className={getNavLinkClass('/sales-manager')}>
                        <i className="far fa-circle nav-icon"></i>
                        <p>Karyawan</p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to='/category' className={getNavLinkClass('/category')}>
                        <i className="far fa-circle nav-icon"></i>
                        <p>Kategori</p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to='/sub-category' className={getNavLinkClass('/sub-category')}>
                        <i className="far fa-circle nav-icon"></i>
                        <p>Sub Kategori</p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to='/brand' className={getNavLinkClass('/brand')}>
                        <i className="far fa-circle nav-icon"></i>
                        <p>Brand / Merk</p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to='/supplier' className={getNavLinkClass('/supplier')}>
                        <i className="far fa-circle nav-icon"></i>
                        <p>Supplier</p>
                      </Link>
                    </li>
                  </ul>
                </li>
              </>
            )}
            <li className="nav-header">MASTER PRODUCT</li>
            <li className="nav-item">
              <Link to="#" className="nav-link">
                <i className="fas fa-solid fa-cube nav-icon"></i>
                <p>
                  Master Produk
                  <i className="right fas fa-angle-left"></i>
                </p>
              </Link>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to='/bahan-baku' className={getNavLinkClass('/bahan-baku')}>
                    <i className="far fa-circle nav-icon"></i>
                    <p>Bahan Baku</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to='/product' className={getNavLinkClass('/product')}>
                    <i className="far fa-circle nav-icon"></i>
                    <p>Produk</p>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-header">MASTER TRANSAKSI</li>
            <li className="nav-item">
              <Link to='/order-bahan-baku' className={getNavLinkClass('/order-bahan-baku')}>
                <i className="fas fa-solid fa-file-invoice nav-icon"></i>
                <p>Barang Masuk</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to='/barang-keluar' className={getNavLinkClass('/barang-keluar')}>
                <i className="fas fa-solid fa-file-invoice nav-icon"></i>
                <p>Barang Keluar</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to='/order' className={getNavLinkClass('/order')}>
                <i className="fas fa-solid fa-file-invoice nav-icon"></i>
                <p>Pemesanan</p>
              </Link>
            </li>
            <li className="nav-header">SETTING</li>
            <li className="nav-item">
              <Link to='/profile' className={getNavLinkClass('/profile')}>
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
