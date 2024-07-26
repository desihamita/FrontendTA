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
import GlobalFunction from '../../GlobalFunction'

const ProductList = () => {
    const [input, setInput] = useState({
        order_by: 'created_at',
        per_page: 10,
        direction: 'asc',
        search: ''
    })
    const [isLoading, setIsLoading] = useState(false)
    const [products, setProducts] = useState([])
    const [productColumns, setProductColumn] = useState([])

    const [itemsCountPerPage, setItemsCountPerPage] = useState(0)
    const [totalItemsCount, setTotalItemsCount] = useState(1)
    const [startFrom, setStartFrom] = useState(1)
    const [activePage, setActivePage] = useState(1)
    
    const getProductColumn = () => {
        axios.get(`${Constants.BASE_URL}/get-product-column`).then(res => {
            setProductColumn(res.data)
        });
    }
    
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
            title: "Apa kamu yakin?",
            text: "Produk akan dihapus",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, Hapus!"
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
        getProducts()
        getProductColumn()
    }, []);

    const isAdmin = GlobalFunction.isAdmin();

    return (
    <div className="content-wrapper">
        <section className="content-header">
            <Breadcrumb title="Daftar Produk" breadcrumb="produk" />
        </section>
        <section className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card card-outline card-warning">
                            <div className="card-header">
                                <div className="d-flex justify-content-between align-items-center">
                                    {isAdmin && (
                                        <CardHeader 
                                            link={'/product/create'} 
                                            btnText="Tambah Produk"
                                            btn="btn btn-warning"
                                            icon="fas fa-plus"
                                        />
                                    )}
                                    <CardHeader 
                                        link={'/generate-barcode'} 
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
                                                    {productColumns.map((column, index) => (
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
                                        <thead>
                                            <tr>
                                                <th>No</th>
                                                <th>Nama</th>
                                                <th>Harga</th>
                                                <th>Status</th>
                                                <th>Kategori</th>
                                                <th>Foto</th>
                                                <th>Tanggal / Waktu</th>
                                                <th>Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products.length > 0 ? products.map((product, index) => (
                                            <tr key={index}>
                                                <td>{startFrom + index}</td>
                                                <td>
                                                    <p className="mb-0">Nama : {product.name}</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0">Harga Jual : <strong>{product.sell_price.symbol} {product.sell_price.price} || Diskon : {product.sell_price.symbol} {product.sell_price.discount}</strong></p>
                                                    <p className="mb-0">Harga : {product.price}</p>
                                                    <p className="mb-0">Harga Diskon : {product.discount_fixed}</p>
                                                    <p className="mb-0">Diskon : {product.discount_percent}</p>
                                                    <p className="mb-0">Tanggal Dimulai : {product.discount_start}</p>
                                                    <p className="mb-0">Tangal Berakhir : {product.discount_end}</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0">Status : {product.status}</p>
                                                    <p className="text-success mb-0">SKU : {product.sku}</p>
                                                    <p className="mb-0">Stok : {product.stock}</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0">Kategori : {product.category}</p>
                                                </td>
                                                <td>
                                                    <img
                                                        src={product.photo}
                                                        alt={product.photo}
                                                        className="img-thumbnail table-image"
                                                        width={75}
                                                        style={{ cursor: 'pointer' }}
                                                    />
                                                </td>
                                                <td>
                                                    <p className="mb-0"><small>Dibuat : {product.created_at}</small></p>
                                                    <p className="text-success mb-0"><small>Diubah : {product.updated_at}</small></p>
                                                    <p className="mb-0"><small>Dibuat Oleh : {product.created_by}</small></p>
                                                    <p className="text-success mb-0"><small>Diubah Oleh : {product.updated_by}</small></p>
                                                </td>
                                                <td className='m-1'>
                                                    <Link to={`/product/details/${product.id}`} ><button className='btn btn-info btn-sm my-1'><i className="fas fa-solid fa-eye"></i></button></Link>

                                                    {isAdmin && (
                                                        <>
                                                            <Link to={`/product/edit/${product.id}`}><button className='btn btn-warning btn-sm my-1 mx-1'><i className="fas fa-solid fa-edit"></i></button></Link>
                                                            
                                                            <button onClick={() => handleProductDelete(product.id)} className='btn btn-danger btn-sm my-1'><i className="fas fa-solid fa-trash"></i></button>
                                                        </>
                                                    )}
                                                </td>
                                            </tr>
                                            )) : <NoDataFound colSpan={8} /> }
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <th>No</th>
                                                <th>Nama</th>
                                                <th>Harga</th>
                                                <th>Status</th>
                                                <th>Kategori</th>
                                                <th>Foto</th>
                                                <th>Tanggal / Waktu</th>
                                                <th>Aksi</th>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                                }
                            </div>
                            <div className="card-footer d-flex justify-content-between align-items-center">
                                <div className="data_tables_info">
                                {products.length > 0 ? (
                                    `Showing ${startFrom} to ${startFrom + products.length - 1} of ${totalItemsCount} entries`
                                ) : (
                                    'Showing 1 to 1 of 0 entries'
                                )}
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
