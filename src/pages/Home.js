import React, { useEffect, useState } from 'react'
import Breadcrumb from '../components/partials/Breadcrumb'
import axios from 'axios';
import Constants from '../Constants';

const Home = () => {
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
        <Breadcrumb title="Dashboard" breadcrumb="Dashboard"/>
      </section>
      <section className="content">
        <div className="card">
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
      </section>
    </div>
  )
}

export default Home
