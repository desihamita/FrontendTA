import React, { useEffect, useState } from 'react'
import Breadcrumb from '../../components/partials/Breadcrumb'
import CardHeader from '../../components/partials/miniComponent/CardHeader'
import Swal from 'sweetalert2'
import Constants from '../../Constants'
import axios from 'axios'
import Loader from '../../components/partials/miniComponent/Loader'
import { Link } from 'react-router-dom'
import NoDataFound from '../../components/partials/miniComponent/NoDataFound'
import Pagination from 'react-js-pagination'
import GlobalFunction from '../../GlobalFunction'

const ListBahanBaku = () => {
    const [input, setInput] = useState({
        order_by: 'created_at',
        per_page: 10,
        direction: 'asc',
        search: ''
    })

    const [isLoading, setIsLoading] = useState(false)
    const [attributes, setAttributes] = useState([])
    const [attributeColumns, setAttributeColumn] = useState([])

    const [itemsCountPerPage, setItemsCountPerPage] = useState(0)
    const [totalItemsCount, setTotalItemsCount] = useState(1)
    const [startFrom, setStartFrom] = useState(1)
    const [activePage, setActivePage] = useState(1)

    const getAttributeColumn = () => {
        axios.get(`${Constants.BASE_URL}/get-attribute-column`).then(res => {
            setAttributeColumn(res.data)
        });
    }
    
    const handleInput = (e) => {
        setInput(prevState => ({...prevState, [e.target.name]: e.target.value}));
    };
    
    const getAttributes = (pageNumber = 1) => {
        setIsLoading(true);
        axios.get(`${Constants.BASE_URL}/attribute?page=${pageNumber}&search=${input.search}&order_by=${input.order_by}&per_page=${input.per_page}&direction=${input.direction}`)
        .then(res => {
            setAttributes(res.data.data);
            setItemsCountPerPage(res.data.meta.per_page);
            setStartFrom(res.data.meta.from);
            setTotalItemsCount(res.data.meta.total);
            setActivePage(res.data.meta.current_page);
            setIsLoading(false);
        });
    };

    const handleAttributeDelete = (id) => {
        Swal.fire({
          title: "Are you sure?",
          text: "Ingredients will be deleted",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Delete it!"
        }).then((result) => {
          if (result.isConfirmed) {
            axios.delete(`${Constants.BASE_URL}/attribute/${id}`).then(res => {
              Swal.fire({
                position: "top-end",
                icon: res.data.cls,
                title: res.data.msg,
                showConfirmButton: false,
                toast: true,
                timer: 1500
              });
              getAttributes(activePage);
            });
          }
        });
    };
    
    useEffect(() => {
        getAttributes()
        getAttributeColumn()
    }, []);

    const isAdmin = GlobalFunction.isAdmin();

    return (
    <div className="content-wrapper">
        <section className="content-header">
            <Breadcrumb title="Daftar Bahan Baku" breadcrumb="bahan baku" />
        </section>
        <section className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card card-outline card-warning">
                            <div className="card-header">
                                <div className="d-flex justify-content-between align-items-center">
                                    <CardHeader 
                                        link={'/bahan-baku/create'} 
                                        btnText="Add Ingredients"
                                        btn="btn btn-warning"
                                        icon="fas fa-plus"
                                    />
                                    <CardHeader 
                                        link={'/generate-barcode-bahan-baku'} 
                                        btnText="Generate Barcode"
                                        btn="btn btn-primary"
                                        icon="fas fa-barcode"
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
                                                    {attributeColumns.map((column, index) => (
                                                        <option key={index} value={column.id}>{column.name}</option>
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
                                                <button className='btn btn-warning w-100' onClick={() => getAttributes()}>
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
                                                <th>Photo</th>
                                                <th>Name</th>
                                                <th>Price</th>
                                                <th>Status</th>
                                                <th>Category</th>
                                                <th>Brand / Supplier</th>
                                                <th>Date Time</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {attributes.length > 0 ? attributes.map((attribute, index) => (
                                            <tr key={index}>
                                                <td>{startFrom + index}</td>
                                                <td>
                                                    <img
                                                        src={attribute.photo}
                                                        alt={attribute.photo}
                                                        className="img-thumbnail table-image"
                                                        width={75}
                                                        style={{ cursor: 'pointer' }}
                                                    />
                                                </td>
                                                <td>
                                                    <p className="mb-0">Name : {attribute.name}</p>
                                                    <p className="text-success mb-0">SKU : {attribute.sku}</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0">Price : {attribute.price}</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0">Status : {attribute.status}</p>
                                                    <p className="mb-0">Stock : {attribute.stock}</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0">Category : {attribute.category}</p>
                                                    <p className="mb-0">Sub Category : {attribute.sub_category}</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0">Brand : {attribute.brand}</p>
                                                    <p className="mb-0">Supplier : {attribute.supplier}</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0"><small>Created : {attribute.created_at}</small></p>
                                                    <p className="text-success mb-0"><small>Updated : {attribute.updated_at}</small></p>
                                                    <p className="mb-0"><small>Created By : {attribute.created_by}</small></p>
                                                    <p className="text-success mb-0"><small>Updated By : {attribute.updated_by}</small></p>
                                                </td>
                                                <td className='m-1'>
                                                    <Link to={`/bahan-baku/details/${attribute.id}`} ><button className='btn btn-info btn-sm my-1'><i className="fas fa-solid fa-eye"></i></button></Link>

                                                    {isAdmin && (
                                                        <>
                                                            <Link to={`/bahan-baku/edit/${attribute.id}`}><button className='btn btn-warning btn-sm my-1 mx-1'><i className="fas fa-solid fa-edit"></i></button></Link>
                                                            
                                                            <button onClick={() => handleAttributeDelete(attribute.id)} className='btn btn-danger btn-sm my-1'><i className="fas fa-solid fa-trash"></i></button>
                                                        </>
                                                    )}
                                                </td>
                                            </tr>
                                            )) : <NoDataFound colSpan={9} /> }
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <th>No</th>
                                                <th>Photo</th>
                                                <th>Name</th>
                                                <th>Price</th>
                                                <th>Status</th>
                                                <th>Category</th>
                                                <th>Brand / Supplier</th>
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
                                    Showing {startFrom} to {startFrom + attributes.length - 1} of {totalItemsCount} entries
                                </div>
                                <nav className="pagination-sm ml-auto">
                                    <Pagination
                                        activePage={activePage}
                                        itemsCountPerPage={itemsCountPerPage}
                                        totalItemsCount={totalItemsCount}
                                        pageRangeDisplayed={10}
                                        onChange={getAttributes}
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

export default ListBahanBaku