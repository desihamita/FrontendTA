import React, { useEffect, useState } from 'react'
import Breadcrumb from '../components/partials/Breadcrumb'
import axios from 'axios';
import Constants from '../Constants';
import { Link } from 'react-router-dom';
import NoDataFound from '../components/partials/miniComponent/NoDataFound';

const Home = () => {
  const [reportProduct, setReportProduct] = useState([]);
  const [reportAttribute, setReportAttribute] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [products, setProducts] = useState([]);

  const getSalesReports = () => {
    axios.get(`${Constants.BASE_URL}/get-sales-reports`).then(res => {
      setReportProduct(res.data);
    });
  };

  const getBahanBakuReports = () => {
    axios.get(`${Constants.BASE_URL}/get-attribute-reports`).then(res => {
      setReportAttribute(res.data);
    });
  };

  const getIngredients = () => {
    axios.get(`${Constants.BASE_URL}/get-attribute-list`).then(res => {
      setIngredients(res.data);
    });
  };

  const getProducts = () => {
    axios.get(`${Constants.BASE_URL}/get-product-list`).then(res => {
      setProducts(res.data);
    });
  };

  useEffect(() => {
    getSalesReports();
    getBahanBakuReports();
    getIngredients();
    getProducts();
  }, []);

  const lowStockIngredients = ingredients.filter(item => item.stock <= 5);
  const lowStockProducts = products.filter(item => item.stock <= 5);

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <Breadcrumb title="Dashboard" breadcrumb="Dashboard"/>
      </section>
      <section className="content">
        <div className='row m-2'>
          <div className='col-md-3'>
            <div className='card report-card'>
              <div className='card-body'>
                <div className="media align-items-center">
                  <i className="fas fa-box-open fa-2x"></i>
                  <div className="media-body ml-3">
                    <h6 className="mt-0">Total Bahan Baku</h6>
                    <h4>{reportAttribute.total_attribute}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-3'>
            <div className='card report-card'>
              <div className='card-body'>
                <div className="media align-items-center">
                  <i className="fas fa-box fa-2x"></i>
                  <div className="media-body ml-3">
                    <h6 className="mt-0">Total Stock Bahan Baku</h6>
                    <h4>{reportAttribute.total_stock}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-3'>
            <div className='card report-card'>
              <div className='card-body'>
                <div className="media align-items-center">
                  <i className="fas fa-battery-quarter fa-2x"></i>
                  <div className="media-body ml-3">
                    <h6 className="mt-0">Total Low Stock</h6>
                    <h4>{reportAttribute.low_stock}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-3'>
            <div className='card report-card'>
              <div className='card-body'>
                <div className="media align-items-center">
                  <i className="fas fa-dollar-sign fa-2x"></i>
                  <div className="media-body ml-3">
                    <h6 className="mt-0">Total Stock Value (Order)</h6>
                    <h4>{reportAttribute.buy_value}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='row m-2'>
          <div className='col-md-3'>
            <div className='card report-card'>
              <div className='card-body'>
                <div className="media align-items-center">
                  <i className="fas fa-box-open fa-2x"></i>
                  <div className="media-body ml-3">
                    <h6 className="mt-0">Total Product</h6>
                    <h4>{reportProduct.total_product}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-3'>
            <div className='card report-card'>
              <div className='card-body'>
                <div className="media align-items-center">
                  <i className="fas fa-box fa-2x"></i>
                  <div className="media-body ml-3">
                    <h6 className="mt-0">Total Stock</h6>
                    <h4>{reportProduct.total_stock_product}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-3'>
            <div className='card report-card'>
              <div className='card-body'>
                <div className="media align-items-center">
                  <i className="fas fa-battery-quarter fa-2x"></i>
                  <div className="media-body ml-3">
                    <h6 className="mt-0">Total Low Stock</h6>
                    <h4>{reportProduct.low_stock_product}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-3'>
            <div className='card report-card'>
              <div className='card-body'>
                <div className="media align-items-center">
                  <i className="fas fa-dollar-sign fa-2x"></i>
                  <div className="media-body ml-3">
                    <h6 className="mt-0">Total Stock Value (sale)</h6>
                    <h4>{reportProduct.buy_value_product}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-3'>
            <div className='card report-card'>
              <div className='card-body'>
                <div className="media align-items-center">
                  <i className="fas fa-dollar-sign fa-2x"></i>
                  <div className="media-body ml-3">
                    <h6 className="mt-0">Total Stock Value (sale WOD)</h6>
                    <h4>{reportProduct.sale_value_product}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-3'>
            <div className='card report-card'>
              <div className='card-body'>
                <div className="media align-items-center">
                  <i className="fas fa-dollar-sign fa-2x"></i>
                  <div className="media-body ml-3">
                    <h6 className="mt-0">Possible Profit</h6>
                    <h4>{reportProduct.possible_profit_product}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-3'>
            <div className='card report-card'>
              <div className='card-body'>
                <div className="media align-items-center">
                  <i className="fas fa-hand-holding-usd fa-2x"></i>
                  <div className="media-body ml-3">
                    <h6 className="mt-0">Total Expense</h6>
                    <h4>{reportProduct.total_expense_product}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-3'>
            <div className='card report-card'>
              <div className='card-body'>
                <div className="media align-items-center">
                  <i className="fas fa-money-bill-wave fa-2x"></i>
                  <div className="media-body ml-3">
                    <h6 className="mt-0">Total Expense Today</h6>
                    <h4>12.258</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='row m-2'>
          <div className='col-md-6'>
            <div className="card">
              <div className="card-header border-transparent">
                <h3 className="card-title">Stok Bahan Baku</h3>
                <div className="card-tools">
                  <button type="button" className="btn btn-tool" data-card-widget="collapse">
                    <i className="fas fa-minus" />
                  </button>
                  <button type="button" className="btn btn-tool" data-card-widget="remove">
                    <i className="fas fa-times" />
                  </button>
                </div>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table m-0">
                    <thead>
                      <tr>
                        <th>Produk</th>
                        <th>Stock</th>
                        <th>Status</th>
                        <th>Order</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(lowStockIngredients).length > 0 ? lowStockIngredients.map(item => (
                        <tr key={item.id}>
                          <td>{item.name}</td>
                          <td>{item.stock}</td>
                          <td>
                            <span className={`badge ${item.stock > 0 ? 'badge-danger p-2' : 'badge-success p-2'}`}>
                              {item.stock > 0 ? 'Out of Stock' : 'In Stock'}
                            </span>
                          </td>
                          <td>
                            <Link to={'/bahan-baku/create'} ><button className='btn btn-info btn-sm'><i className="fas fa-solid fa-plus"></i></button></Link>
                          </td>
                        </tr>
                      )) : <NoDataFound colSpan={4} /> }
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="card-footer clearfix">
                <Link to={`/order-bahan-baku/create`}><button className="btn btn-sm btn-info float-left">Place New Order</button></Link>
                <Link to={`/order-bahan-baku`}><button className="btn btn-sm btn-secondary float-right">View All Orders</button></Link>
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <div className="card">
              <div className="card-header border-transparent">
                <h3 className="card-title">Stok Produk</h3>
                <div className="card-tools">
                  <button type="button" className="btn btn-tool" data-card-widget="collapse">
                    <i className="fas fa-minus" />
                  </button>
                  <button type="button" className="btn btn-tool" data-card-widget="remove">
                    <i className="fas fa-times" />
                  </button>
                </div>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table m-0">
                    <thead>
                      <tr>
                        <th>Produk</th>
                        <th>Stock</th>
                        <th>Status</th>
                        <th>Order</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(lowStockProducts).length > 0 ? lowStockProducts.map(item => (
                        <tr key={item.id}>
                          <td>{item.name}</td>
                          <td>{item.stock}</td>
                          <td>
                            <span className={`badge ${item.stock > 0 ? 'badge-danger p-2' : 'badge-success p-2'}`}>
                              {item.stock > 0 ? 'Out of Stock' : 'In Stock'}
                            </span>
                          </td>
                          <td>
                            <Link to={'/order/create'} ><button className='btn btn-info btn-sm'><i className="fas fa-solid fa-plus"></i></button></Link>
                          </td>
                        </tr>
                      )) : <NoDataFound colSpan={4} /> }
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="card-footer clearfix">
                <Link to={`/order/create`}><button className="btn btn-sm btn-info float-left">Place New Order</button></Link>
                <Link to={`/order`}><button className="btn btn-sm btn-secondary float-right">View All Orders</button></Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
