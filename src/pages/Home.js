import React, { useEffect, useState } from 'react'
import Breadcrumb from '../components/partials/Breadcrumb'
import axios from 'axios';
import Constants from '../Constants';
import { Link } from 'react-router-dom';

const Home = () => {
  const [report, setReport] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  const getSalesReports = () => {
    axios.get(`${Constants.BASE_URL}/get-sales-reports`).then(res => {
        setReport(res.data);
    })
  } 
  
  useEffect(() => {
    getSalesReports();
  },[])

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
                            <i class="fas fa-box-open fa-2x"></i>
                            <div className="media-body ml-3">
                                <h6 className="mt-0">Total Product</h6>
                                <h4>{report.total_product}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-md-3'>
                <div className='card report-card'>
                    <div className='card-body'>
                        <div className="media align-items-center">
                            <i class="fas fa-box fa-2x"></i>
                            <div className="media-body ml-3">
                                <h6 className="mt-0">Total Stock</h6>
                                <h4>{report.total_stock}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-md-3'>
                <div className='card report-card'>
                    <div className='card-body'>
                        <div className="media align-items-center">
                            <i class="fas fa-battery-quarter fa-2x"></i>
                            <div className="media-body ml-3">
                                <h6 className="mt-0">Total Low Stock</h6>
                                <h4>{report.low_stock}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-md-3'>
                <div className='card report-card'>
                    <div className='card-body'>
                        <div className="media align-items-center">
                            <i class="fas fa-dollar-sign fa-2x"></i>
                            <div className="media-body ml-3">
                                <h6 className="mt-0">Total Stock Value (sale)</h6>
                                <h4>{report.buy_value}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-md-3'>
                <div className='card report-card'>
                    <div className='card-body'>
                        <div className="media align-items-center">
                            <i class="fas fa-dollar-sign fa-2x"></i>
                            <div className="media-body ml-3">
                                <h6 className="mt-0">Total Stock Value (sale WOD)</h6>
                                <h4>{report.sale_value}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-md-3'>
                <div className='card report-card'>
                    <div className='card-body'>
                        <div className="media align-items-center">
                            <i class="fas fa-dollar-sign fa-2x"></i>
                            <div className="media-body ml-3">
                                <h6 className="mt-0">Possible Profit</h6>
                                <h4>{report.possible_profit}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-md-3'>
                <div className='card report-card'>
                    <div className='card-body'>
                        <div className="media align-items-center">
                            <i class="fas fa-hand-holding-usd fa-2x"></i>
                            <div className="media-body ml-3">
                                <h6 className="mt-0">Total Expense</h6>
                                <h4>12.258</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-md-3'>
                <div className='card report-card'>
                    <div className='card-body'>
                        <div className="media align-items-center">
                            <i class="fas fa-money-bill-wave fa-2x"></i>
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
                      <tr>
                        <td><a href="pages/examples/invoice.html">OR9842</a></td>
                        <td>Call of Duty IV</td>
                        <td><span className="badge badge-success">Shipped</span></td>
                        <td>
                          <div className="sparkbar" data-color="#00a65a" data-height={20}>90,80,90,-70,61,-83,63</div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="card-footer clearfix">
                <Link to={`/order-bahan-baku/create`}><button className="btn btn-sm btn-info float-left">Place New Orde</button></Link>

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
                      <tr>
                        <td><a href="pages/examples/invoice.html">OR9842</a></td>
                        <td>Call of Duty IV</td>
                        <td><span className="badge badge-success">Shipped</span></td>
                        <td>
                          <div className="sparkbar" data-color="#00a65a" data-height={20}>90,80,90,-70,61,-83,63</div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="card-footer clearfix">
                <Link to={`/order/create`}><button className="btn btn-sm btn-info float-left">Place New Orde</button></Link>

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
