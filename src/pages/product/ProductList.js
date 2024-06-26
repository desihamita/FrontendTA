import React, { useEffect, useState } from 'react'
import NoDataFound from '../../components/partials/miniComponent/NoDataFound'
import Pagination from 'react-js-pagination'
import { Link } from 'react-router-dom'
import Loader from '../../components/partials/miniComponent/Loader'
import CardHeader from '../../components/partials/miniComponent/CardHeader'
import Breadcrumb from '../../components/partials/Breadcrumb'
import Swal from 'sweetalert2'
import Constants from '../../Constants'
import axios from 'axios'

const ProductList = () => {
    const [input, setInput] = useState({
        order_by: 'created_at',
        per_page: 10,
        direction: 'asc',
        search: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState([]);

    const [itemsCountPerPage, setItemsCountPerPage] = useState(0);
    const [totalItemsCount, setTotalItemsCount] = useState(1);
    const [startFrom, setStartFrom] = useState(1);
    const [activePage, setActivePage] = useState(1);
    
    const handleInput = (e) => {
        setInput(prevState => ({...prevState, [e.target.name]: e.target.value}));
    };
    
    const getProducts = (pageNumber = 1) => {
        setIsLoading(true);
        axios.get(`${Constants.BASE_URL}/product?page=${pageNumber}&search=${input.search}&order_by=${input.order_by}&per_page=${input.per_page}&direction=${input.direction}`)
        .then(res => {
            setProducts(res.data.data);
            setItemsCountPerPage(res.data.meta.per_page);
            setStartFrom(res.data.meta.from);
            setTotalItemsCount(res.data.meta.total);
            setActivePage(res.data.meta.current_page);
            setIsLoading(false);
        });
    };

    const handleProductDelete = (id) => {
        Swal.fire({
          title: "Are you sure?",
          text: "Product will be deleted",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Delete it!"
        }).then((result) => {
          if (result.isConfirmed) {
            axios.delete(`${Constants.BASE_URL}/product/${id}`).then(res => {
              Swal.fire({
                position: "top-end",
                icon: res.data.cls,
                title: res.data.msg,
                showConfirmButton: false,
                toast: true,
                timer: 1500
              });
              getProducts(activePage);
            });
          }
        });
    };
    
    useEffect(() => {
        getProducts();
    }, []);

    return (
    <div className="content-wrapper">
        <section className="content-header">
            <Breadcrumb title="Barang List" breadcrumb="barang" />
        </section>
        <section className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card card-outline card-warning">
                            <div className="card-header">
                                <div className="d-flex justify-content-between align-items-center">
                                    <CardHeader add={'/product/create'} />
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
                                                <option value={'name'}>Name</option>
                                                <option value={'created_at'}>Created At</option>
                                                <option value={'updated_at'}>Updated At</option>
                                                <option value={'phone'}>Phone</option>
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
                                                <button className='btn btn-warning w-100' onClick={() => getProducts(1)}>
                                                <i className="fas fa-search"></i> Search
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {isLoading ? <Loader/> : 
                                <div className="table-responsive">
                                    <table className="table table-hover table-striped table-bordered">
                                        {/* Table Header */}
                                        <thead>
                                            <tr>
                                                <th>SL</th>
                                                <th>Name</th>
                                                <th>Price</th>
                                                <th>Status</th>
                                                <th>Category</th>
                                                <th>Photo</th>
                                                <th>Date Time</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        {/* Table Body */}
                                        <tbody>
                                            {products.length > 0 ? products.map((product, index) => (
                                            <tr key={index}>
                                                <td>{startFrom + index}</td>
                                                <td>
                                                    <p className="mb-0">Name : {product.name}</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0">Sell Price : <strong>{product.sell_price.symbol} {product.sell_price.price} || Discount : {product.sell_price.symbol} {product.sell_price.discount}</strong></p>
                                                    <p className="mb-0">Price : {product.price}</p>
                                                    <p className="mb-0">Price : {product.discount_fixed}</p>
                                                    <p className="mb-0">Price : {product.discount_percent}</p>
                                                    <p className="mb-0">Price : {product.discount_start}</p>
                                                    <p className="mb-0">Price : {product.discount_end}</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0">Status : {product.status}</p>
                                                    <p className="text-success mb-0">SKU : {product.sku}</p>
                                                    <p className="mb-0">Stock : {product.stock}</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0">Category : {product.category}</p>
                                                </td>
                                                <td>
                                                    <img
                                                        src={product.primary_photo}
                                                        alt={product.primary_photo}
                                                        className="img-thumbnail table-image"
                                                        width={75}
                                                        style={{ cursor: 'pointer' }}
                                                    />
                                                </td>
                                                <td>
                                                    <p className="mb-0"><small>Created : {product.created_at}</small></p>
                                                    <p className="text-success mb-0"><small>Updated : {product.updated_at}</small></p>
                                                    <p className="mb-0"><small>Created By : {product.created_by}</small></p>
                                                    <p className="text-success mb-0"><small>Updated By : {product.updated_by}</small></p>
                                                </td>
                                                <td className='m-1'>
                                                    <button className='btn btn-info btn-sm my-1'><i className="fas fa-solid fa-eye"></i></button>
                                                    
                                                    <Link to={`/product/edit/${product.id}`}><button className='btn btn-warning btn-sm my-1 mx-1'><i className="fas fa-solid fa-edit"></i></button></Link>
                                                    
                                                    <button onClick={() => handleProductDelete(product.id)} className='btn btn-danger btn-sm my-1'><i className="fas fa-solid fa-trash"></i></button>
                                                </td>
                                            </tr>
                                            )) : <NoDataFound/> }
                                        </tbody>
                                        {/* Table Footer */}
                                        <tfoot>
                                            <tr>
                                                <th>SL</th>
                                                <th>Name</th>
                                                <th>Price</th>
                                                <th>Status</th>
                                                <th>Category</th>
                                                <th>Photo</th>
                                                <th>Date Time</th>
                                                <th>Action</th>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                                }
                            </div>
                            {/* Pagination */}
                            <div className="card-footer d-flex justify-content-between align-items-center">
                                <div className="data_tables_info">
                                    Showing {startFrom} to {startFrom + products.length - 1} of {totalItemsCount} entries
                                </div>
                                <nav className="pagination-sm ml-auto">
                                    <Pagination
                                        activePage={activePage}
                                        itemsCountPerPage={itemsCountPerPage}
                                        totalItemsCount={totalItemsCount}
                                        pageRangeDisplayed={10}
                                        onChange={getProducts}
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
            </div>
        </section>
    </div>
    )
}

export default ProductList
