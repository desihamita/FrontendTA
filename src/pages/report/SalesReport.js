import React, { useEffect, useState } from 'react'
import Breadcrumb from '../../components/partials/Breadcrumb'
import './Report.css'
import axios from 'axios';
import Constants from '../../Constants';

const SalesReport = () => { 
  const [report, setReport] = useState([]);

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
            <Breadcrumb title="Sales Reports" breadcrumb="sales reports" />
        </section>
        <section className="content">
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Sales (Branch)</h3>
                </div>
                <div className="card-body">
                    <div className='row'>
                        <div className='col-md-3'>
                            <div className='card report-card'>
                                <div className='card-body'>
                                    <div className="media align-items-center">
                                        <i class="fas fa-shopping-cart fa-2x"></i>
                                        <div className="media-body ml-3">
                                            <h6 className="mt-0">Total Sales</h6>
                                            <h4>{report.total_sale}</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-3'>
                            <div className='card report-card'>
                                <div className='card-body'>
                                    <div className="media align-items-center">
                                        <i class="fas fa-cart-plus fa-2x"></i>
                                        <div className="media-body ml-3">
                                            <h6 className="mt-0">Total Purchase</h6>
                                            <h4>{report.total_purchase}</h4>
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
                                            <h6 className="mt-0">Today Sale</h6>
                                            <h4>{report.total_sale_today}</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-3'>
                            <div className='card report-card'>
                                <div className='card-body'>
                                    <div className="media align-items-center">
                                        <i class="fas fa-undo fa-flip-horizontal fa-2x"></i>
                                        <div className="media-body ml-3">
                                            <h6 className="mt-0">Today Purchase</h6>
                                            <h4>{report.total_purchase_today}</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Stocks</h3>
                </div>
                <div className="card-body">
                    <div className='row'>
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
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Expense (Branch)</h3>
                </div>
                <div className="card-body">
                    <div className='row'>
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
                </div>
            </div>
        </section>
    </div>
  )
}

export default SalesReport