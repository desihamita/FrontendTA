import axios from 'axios';
import React, { useEffect, useState } from 'react'
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

const ListShop = () => {
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
    const [columns, setColumns] = useState([])

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
            title: "Are you sure?",
            text: "Shop will be deleted",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete it!"
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
        getShops()
        getColumns()
    }, []);
    
    return (
    <div className="content-wrapper">
        <section className="content-header">
          <Breadcrumb title="Shop List" breadcrumb="shop" />
        </section>
        <section className="content">
          <div className="card card-outline card-warning">
            <div className="card-header">
              <div className="d-flex justify-content-between align-items-center">
                <CardHeader 
                  link={'/shop/create'} 
                  btnText="Add Shop"
                  btn="btn btn-warning"
                  icon="fas fa-plus"
                />
              </div>
            </div>
            <div className="card-body">
              <div className='search-area mb-2'>
                <div className='row'>
                  <div className='col-md-3'>
                    <label className='w-100'>
                      <p className='mb-0'>Search</p>
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
                      <p className='mb-0'>Order By</p>
                      <select 
                        className='form-control select2'
                        name='order_by'
                        value={input.order_by}
                        onChange={handleInput}
                      >
                        {columns.map((column, index) => (
                          <option key={index} value={column}>{column}</option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <div className='col-md-2'>
                    <label className='w-100'>
                      <p className='mb-0'>Order Direction</p>
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
                      <p className='mb-0'>Per Page</p>
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
                    <div className='d-grid mt-4'>
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
                        <th>SL</th>
                        <th>Shop Name</th>
                        <th>Phone / Email</th>
                        <th>Status</th>
                        <th>Photo</th>
                        <th>Created By</th>
                        <th>Date Time</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {shops.length > 0 ? shops.map((shop, index) => (
                        <tr key={index}>
                          <td>{startFrom + index}</td>
                          <td>{shop.name}</td>
                          <td>
                            <p className="mb-0">Email : {shop.email}</p>
                            <p className="text-success">Phone : {shop.phone}</p>
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
                              <small>Created : {shop.created_at}</small>
                            </p>
                            <p className="text-success">
                              <small>Updated : {shop.updated_at}</small>
                            </p>
                          </td>
                          <td className='m-1'>
                            <button onClick={() => handleDetailsModal(shop)} className='btn btn-info btn-sm my-1'><i className="fas fa-solid fa-eye"></i></button>
                            
                            <Link to={`/shop/edit/${shop.id}`}><button className='btn btn-warning btn-sm my-1 mx-1'><i className="fas fa-solid fa-edit"></i></button></Link>
                            
                            <button onClick={() => handleShopDelete(shop.id)} className='btn btn-danger btn-sm my-1'><i className="fas fa-solid fa-trash"></i></button>
                          </td>
                        </tr>
                      )) : <NoDataFound/> }
                    </tbody>
                    <tfoot>
                      <tr>
                        <th>SL</th>
                        <th>Shop Name</th>
                        <th>Serial</th>
                        <th>Status</th>
                        <th>Created By</th>
                        <th>Date Time</th>
                        <th>Action</th>
                      </tr>
                    </tfoot>
                  </table>
                  <CategoryPhotoModal
                    show={modalLogoShow}
                    onHide={() => setModalLogoShow(false)}
                    title={'Shop Logo'}
                    size={'800'}
                    photo={modalLogo}
                  />
                  <DetailsSupplier
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    title={'Shop Details'}
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
        </section>
    </div>
    )
}

export default ListShop