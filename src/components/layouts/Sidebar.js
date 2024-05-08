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
                    window.location.reload();
                }).catch(errors => {
                    GlobalFunction.logout();
                });
            }
        });
    }
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <Link to={'/'} className="brand-link">
            <img src={Logo} alt="Logo" className="brand-image img-circle " style={{opacity: '.8'}} />
            <span className="brand-text font-weight-light"> Inventory App</span>
        </Link>
        <div className="sidebar">
            <nav className="mt-2">
                <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                    <li className="nav-item menu-open">
                        <Link to="/" className="nav-link">
                            <i className="nav-icon fas fa-tachometer-alt" />
                            <p>Dashboard</p>
                        </Link>
                    </li>
                    <li className="nav-header">MASTER DATA</li>
                    <li className="nav-item">
                        <a href="#" className="nav-link">
                            <i className="nav-icon fas fa-tachometer-alt"></i>
                            <p>
                                Master Data
                                <i className="right fas fa-angle-left"></i>
                            </p>
                        </a>
                        <ul className="nav nav-treeview">
                            <li className="nav-item">
                                <Link to='/category' className="nav-link">
                                    <i className="far fa-circle nav-icon"></i>
                                    <p>Data Kategori</p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a href='#' className="nav-link">
                                    <i className="far fa-circle nav-icon"></i>
                                    <p>Data Barang</p>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href='#' className="nav-link active">
                                    <i className="far fa-circle nav-icon"></i>
                                    <p>Data Supplier</p>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-header">TRANSAKSI</li>
                    <li className="nav-item">
                        <a href='#' className="nav-link">
                            <i className="nav-icon fas fa-ellipsis-h" />
                            <p>Barang Masuk</p>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href='#' className="nav-link">
                            <i className="nav-icon fas fa-file" />
                            <p>Barang Keluar</p>
                        </a>
                    </li>
                    <li className="nav-header">MANAGEMENT</li>
                    <li className="nav-item">
                        <a href='#' className="nav-link">
                            <i className="fas fa-circle nav-icon" />
                            <p>Prediksi Stok</p>
                        </a>
                    </li>
                    <li className="nav-item mt-5 m-2">
                        <button onClick={handleLogout} className="nav-link btn btn-warning" style={{width: '100%'}}>
                            <p>Logout</p>
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    </aside>
  );
};

export default Sidebar;
