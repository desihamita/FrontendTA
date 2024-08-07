import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Constants from '../../Constants';
import Swal from 'sweetalert2';
import Pagination from 'react-js-pagination';
import NoDataFound from '../../components/partials/miniComponent/NoDataFound';
import { Link } from 'react-router-dom';
import Loader from '../../components/partials/miniComponent/Loader';
import Breadcrumb from '../../components/partials/Breadcrumb';
import CardHeader from '../../components/partials/miniComponent/CardHeader';
import CategoryPhotoModal from '../../components/partials/modal/CategoryPhotoModal';
import DetailsSupplier from '../supplier/DetailsSupplier';
import GlobalFunction from '../../GlobalFunction';
import photoProfile from '../../assets/img/default-foto.png'

const Profile = () => {
    const [input, setInput] = useState({
        order_by: 'created_at',
        per_page: 10,
        direction: 'desc',
        search: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [shop, setShop] = useState([]);

    const [itemsCountPerPage, setItemsCountPerPage] = useState(0);
    const [totalItemsCount, setTotalItemsCount] = useState(1);
    const [startFrom, setStartFrom] = useState(1);
    const [activePage, setActivePage] = useState(1);
    const [modalShow, setModalShow] = useState(false);
    const [modalLogoShow, setModalLogoShow] = useState(false);
    const [shops, setShops] = useState([]);
    const [modalLogo, setModalLogo] = useState('');
    const [columns, setColumns] = useState([]);
    
    const [users, setUsers] = useState(null);

    const handleInput = (e) => {
        setInput(prevState => ({...prevState, [e.target.name]: e.target.value}));
    };

    const getShops = (pageNumber = 1) => {
        setIsLoading(true);
        axios.get(`${Constants.BASE_URL}/shop?page=${pageNumber}&search=${input.search}&order_by=${input.order_by}&per_page=${input.per_page}&direction=${input.direction}`)
        .then(res => {
            const { data, meta } = res.data;
            if (data && meta) {
                setShops(data);
                setItemsCountPerPage(meta.per_page);
                setStartFrom(meta.from);
                setTotalItemsCount(meta.total);
                setActivePage(meta.current_page);
            } 
            setIsLoading(false);
        })
        .catch(error => {
            setIsLoading(false);
        });
    };

    const getUser = () => {
        axios.get(`${Constants.BASE_URL}/get-user`)
          .then(res => {
            if (res.data.length > 0) {
              setUsers(res.data[0]); 
            }
          })
          .catch(error => {
            console.log(error);
          });
    };

    const handleLogoModal = (logo) => {
        setModalLogo(logo);
        setModalLogoShow(true);
    };

    const handleDetailsModal = (shop) => {
        setShop(shop);
        setModalShow(true);
    };

    const handleShopDelete = (id) => {
        Swal.fire({
            title: "Apa kamu yakin?",
            text: "Kafe akan dihapus",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, Hapus!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${Constants.BASE_URL}/shop/${id}`).then(res => {
                    Swal.fire({
                        position: "top-end",
                        icon: res.data.cls,
                        title: res.data.msg,
                        showConfirmButton: false,
                        toast: true,
                        timer: 1500
                    });
                    getShops(activePage);
                });
            }
        });
    };

    const getColumns = () => {
      axios.get(`${Constants.BASE_URL}/get-shop-column`).then(res => {
          setColumns(res.data)
      });
    }

    useEffect(() => {
        getShops();
        getColumns();
        getUser();
    }, []);

    const userPhoto = localStorage.getItem('photo');
    const userName = localStorage.getItem('name');
    const userPhone = localStorage.getItem('phone');
    const userEmail = localStorage.getItem('email');

    const isAdmin = GlobalFunction.isAdmin();

    return (
    <div className="content-wrapper">
        <section className="content-header">
            <Breadcrumb title="Profil" breadcrumb="profil" />
        </section>
        <section className="content">
            <div className='row'>
                <div className='col-md-3'>
                    <div className="card card-warning card-outline">
                        <div className="card-body box-profile">
                                <div className="text-center">
                                    <img
                                        className="profile-user-img img-fluid img-circle"
                                        src={`http://localhost:8000/images/uploads/sales_manager_thumb/${userPhoto}` || photoProfile} 
                                        alt="User profile picture"
                                        onError={(e) => {
                                            e.target.src = photoProfile;
                                        }}
                                    />  
                                </div>
                                <h3 className="profile-username text-center">{userName}</h3>
                                <ul className="list-group list-group-unbordered mb-3">
                                    <li className="list-group-item">
                                        <b>Email</b> <a className="float-right">{userEmail}</a>
                                    </li>
                                    <li className="list-group-item">
                                        <b>No.Tlp</b> <a className="float-right">{userPhone}</a>
                                    </li>
                                </ul>
                        </div>
                    </div>
                </div>
                <div className='col-md-9'>
                    <div className="card card-outline card-warning">
                        {isAdmin && (
                            <div className="card-header">
                                <div className="d-flex justify-content-between align-items-center">
                                    <CardHeader 
                                        link={'/shop/create'} 
                                        btnText="Tambah Kafe"
                                        btn="btn btn-warning"
                                        icon="fas fa-plus"
                                    />
                                </div>
                            </div>
                        )}
                        <div className="card-body">
                            <div className='search-area mb-2'>
                                <div className='row'>
                                    <div className='col-md-3'>
                                        <label className='w-100'>
                                        <p className='mb-0 text-xs'>Search</p>
                                        <input 
                                            className='form-control'
                                            type='search'
                                            name='search'
                                            value={input.search}
                                            onChange={handleInput}
                                            placeholder='Search'
                                        />
                                        </label>
                                    </div>
                                    <div className='col-md-3'>
                                        <label className='w-100'>
                                            <p className='mb-0 text-xs'>Order By</p>
                                            <select 
                                                className='form-control select2'
                                                name='order_by'
                                                value={input.order_by}
                                                onChange={handleInput}
                                            >
                                                <option value={'name'}>Name</option>
                                                <option value={'created_at'}>Created At</option>
                                                <option value={'updated_at'}>Updated At</option>
                                            </select>
                                        </label>
                                    </div>
                                    <div className='col-md-2'>
                                        <label className='w-100'>
                                            <p className='mb-0 text-xs'>Order Direction</p>
                                            <select 
                                                className='form-control select2'
                                                name='direction'
                                                value={input.direction}
                                                onChange={handleInput}
                                            >
                                                <option value={'asc'}>ASC</option>
                                                <option value={'desc'}>DESC</option>
                                            </select>
                                        </label>
                                    </div>
                                    <div className='col-md-2'>
                                        <label className='w-100'>
                                            <p className='mb-0 text-xs'>Per Page</p>
                                            <select 
                                                className='form-control select2'
                                                name='per_page'
                                                value={input.per_page}
                                                onChange={handleInput}
                                            >
                                                <option value={10}>10</option>
                                                <option value={25}>25</option>
                                                <option value={50}>50</option>
                                                <option value={100}>100</option>
                                            </select>
                                        </label>
                                    </div>
                                    <div className='col-md-2'>
                                        <div className='d-grid mt-3'>
                                            <button className='btn btn-warning w-100' onClick={() => getShops(1)}>
                                                <i className="fas fa-search"></i> Search
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {isLoading ? <Loader/> : 
                                <div className="table-responsive">
                                <table className="table table-hover table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Nama</th>
                                            <th>No.Tlp / Email</th>
                                            <th>Status</th>
                                            <th>Logo</th>
                                            <th>Dibuat Oleh</th>
                                            <th>Tanggal / Waktu</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {shops.length > 0 ? shops.map((shop, index) => (
                                        <tr key={index}>
                                            <td>{startFrom + index}</td>
                                            <td>{shop.name}</td>
                                            <td>
                                                <p className="mb-0">Email : {shop.email}</p>
                                                <p className="text-success">No.Tlp : {shop.phone}</p>
                                            </td>
                                            <td>{shop.status}</td>
                                            <td>
                                                <img
                                                src={shop.logo}
                                                alt={shop.name}
                                                className="img-thumbnail table-image"
                                                width={75}
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => handleLogoModal(shop.logo_full)}
                                                />
                                            </td>
                                            <td>{shop.created_by}</td>
                                            <td>
                                                <p className="mb-0">
                                                <small>Dibuat : {shop.created_at}</small>
                                                </p>
                                                <p className="text-success">
                                                <small>Diubah : {shop.updated_at}</small>
                                                </p>
                                            </td>
                                            <td className='m-1'>
                                                <button onClick={() => handleDetailsModal(shop)} className='btn btn-info btn-sm my-1'><i className="fas fa-solid fa-eye"></i></button>
                                                
                                                {isAdmin && ( 
                                                    <>
                                                        <Link to={`/shop/edit/${shop.id}`}><button className='btn btn-warning btn-sm my-1 mx-1'><i className="fas fa-solid fa-edit"></i></button></Link>
                                                        
                                                        <button onClick={() => handleShopDelete(shop.id)} className='btn btn-danger btn-sm my-1'><i className="fas fa-solid fa-trash"></i></button>
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                    )) : <NoDataFound colSpan={7} /> }
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <th>No</th>
                                            <th>Nama</th>
                                            <th>No.Tlp / Email</th>
                                            <th>Status</th>
                                            <th>Logo</th>
                                            <th>Dibuat Oleh</th>
                                            <th>Tanggal / Waktu</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </tfoot>
                                </table>
                                <CategoryPhotoModal
                                    show={modalLogoShow}
                                    onHide={() => setModalLogoShow(false)}
                                    title={'Logo Kafe'}
                                    size={'800'}
                                    photo={modalLogo}
                                />
                                <DetailsSupplier
                                    show={modalShow}
                                    onHide={() => setModalShow(false)}
                                    title={'Detail Kafe'}
                                    size={''}
                                    supplier={shop}
                                />
                                </div>
                            }
                        </div>
                        <div className="card-footer d-flex justify-content-between align-items-center">
                            <div className="data_tables_info">
                                Showing {startFrom} to {startFrom + shops.length - 1} of {totalItemsCount} entries
                            </div>
                            <nav className="pagination-sm ml-auto">
                                <Pagination
                                activePage={activePage}
                                itemsCountPerPage={itemsCountPerPage}
                                totalItemsCount={totalItemsCount}
                                pageRangeDisplayed={10}
                                onChange={getShops}
                                nextPageText={'Next'}
                                prevPageText={'Previous'}
                                itemClass="page-item"
                                linkClass="page-link"
                                />
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Profile;
