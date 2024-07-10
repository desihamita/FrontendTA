import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Constants from '../../Constants';
import Swal from 'sweetalert2';
import Breadcrumb from '../../components/partials/Breadcrumb';
import CardHeader from '../../components/partials/miniComponent/CardHeader';
import Loader from '../../components/partials/miniComponent/Loader';
import GlobalFunction from '../../GlobalFunction';
import NoDataFound from '../../components/partials/miniComponent/NoDataFound';
import { Link } from 'react-router-dom';
import Pagination from 'react-js-pagination';

const OrderBahanBakuList = () => {
  const [input, setInput] = useState({
    order_by: 'created_at',
    per_page: 10,
    direction: 'asc',
    search: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [orderIngredient, setOrderIngredient] = useState([]);
  const [orderIngredients, setOrderIngredients] = useState([]);

  const [itemsCountPerPage, setItemsCountPerPage] = useState(0);
  const [totalItemsCount, setTotalItemsCount] = useState(1);
  const [startFrom, setStartFrom] = useState(1);
  const [activePage, setActivePage] = useState(1);

  const handleInput = (e) => {
    setInput(prevState => ({...prevState, [e.target.name]: e.target.value}));
  };

  const getOrders = (pageNumber = 1) => {
    setIsLoading(true);
    axios.get(`${Constants.BASE_URL}/order-bahan-baku?page=${pageNumber}&search=${input.search}&order_by=${input.order_by}&per_page=${input.per_page}&direction=${input.direction}`)
      .then(res => {
        setOrderIngredients(res.data.data);
        setItemsCountPerPage(res.data.meta.per_page);
        setStartFrom(res.data.meta.from);
        setTotalItemsCount(res.data.meta.total);
        setActivePage(res.data.meta.current_page);
        setIsLoading(false);
      }
    );
  };

  const handleExportOrders = () => {
    axios.get(`${Constants.BASE_URL}/export-bahan-baku`, {
      responseType: 'blob',
    })
    .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'PesananBahanBaku.csv');
        document.body.appendChild(link);
        link.click();
    })
    .catch(error => {
        console.error('Error exporting orders:', error);
        Swal.fire({
            icon: 'error',
            title: 'Export Error',
            text: 'Failed to export orders. Please try again later.',
        });
    });
  }

  useEffect(() => {
    getOrders();
  }, []);

  const isSales = GlobalFunction.isSales();

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <Breadcrumb title="Daftar Pesanan Bahan Baku" breadcrumb="Pesanan Bahan Baku" />
      </section>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card card-outline card-warning">
                <div className="card-header">
                  <div className="d-flex justify-content-between align-items-center">
                  {isSales && (
                    <CardHeader 
                        link={'/order-bahan-baku/create'} 
                        btnText="Tambah Pesanan"
                        btn="btn btn-warning"
                        icon="fas fa-plus"
                    />
                  )}
                    <button className="btn btn-success ml-2" onClick={handleExportOrders}>
                          <i className="fas fa-download"></i> Export
                    </button>
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
                          <button className='btn btn-warning w-100' onClick={() => getOrders(1)}>
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
                            <th>#</th>
                            <th>Order Details</th>
                            <th>Customer</th>
                            <th>Amount</th>
                            <th>Sales</th>
                            <th>Date Time</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.keys(orderIngredients).length > 0 ? orderIngredients.map((order, index) => (
                            <tr key={index}>
                              <td>{startFrom + index}</td>
                              <td>
                                <p>Order No. <strong>{order.order_number}</strong></p>
                                <p className='text-success'>Order Status : {order.order_status_string}</p>
                                <p>Payment Status : {order.payment_status}</p>
                              </td>
                              <td>
                                <p>{order.supplier_name}</p>
                                <p className='text-success'>{order.supplier_phone}</p>
                              </td>
                              <td>
                                <p>Quantity : {order.quantity}</p>
                                <p className='text-success'>Sub Total : {order.sub_total}</p>
                                <p className='text-success'>Total : {order.total}</p>
                                <p>Due Amount : {order.due_amount}</p>
                                <p className='text-success'>Paid Amount : {order.paid_amount}</p>
                              </td>
                              <td>
                                <p>Shop : {order.shop}</p>
                                <p className='text-success'>Sales Manager : {order.sales_manager}</p>
                              </td>
                              <td>
                                <p className="mb-0">
                                  <small>Created : {order.created_at}</small>
                                </p>
                                <p className="text-success">
                                  <small>Updated : {order.updated_at}</small>
                                </p>
                              </td>
                              <td>
                                <Link to={`/order-bahan-baku/details/${order.id}`}><button className='btn btn-info btn-sm'><i className="fas fa-solid fa-eye"></i></button></Link>
                              </td>
                            </tr>
                          )) : <NoDataFound colSpan={7} /> 
                          }
                        </tbody>
                        <tfoot>
                          <tr>
                            <th>#</th>
                            <th>Order Details</th>
                            <th>Customer</th>
                            <th>Amount</th>
                            <th>Sales</th>
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
                      Showing {startFrom} to {startFrom + orderIngredients.length - 1} of {totalItemsCount} entries
                  </div>
                  <nav className="pagination-sm ml-auto">
                      <Pagination
                      activePage={activePage}
                      itemsCountPerPage={itemsCountPerPage}
                      totalItemsCount={totalItemsCount}
                      pageRangeDisplayed={10}
                      onChange={getOrders}
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

export default OrderBahanBakuList