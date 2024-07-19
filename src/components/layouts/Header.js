import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Constants from '../../Constants';
import photoProfile from '../../assets/img/default-foto.png';

const Header = () => {
  const [branch, setBranch] = useState({});
  const [users, setUsers] = useState(null);
  const [reportAttribute, setReportAttribute] = useState([]);
  const [reportProduct, setReportProduct] = useState([]);

  const getBahanBakuReports = () => {
    axios.get(`${Constants.BASE_URL}/get-attribute-reports`).then(res => {
      setReportAttribute(res.data);
    });
  };

  const getSalesReports = () => {
    axios.get(`${Constants.BASE_URL}/get-sales-reports`).then(res => {
      setReportProduct(res.data);
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

  const getBranch = () => {
    if(localStorage.branch != undefined) {
      setBranch(JSON.parse(localStorage.branch))
    }
  }
  
  useEffect(() => {
    getBranch();
    getUser();
    getBahanBakuReports();
    getSalesReports();
  }, [])

  const totalNotifications = (reportAttribute.low_stock || 0) + (reportProduct.low_stock_product || 0);

  const userPhoto = localStorage.getItem('photo');
  const userName = localStorage.getItem('name');

  return (
    <nav className="main-header navbar navbar-expand bg-warning navbar-light bg-orange">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link text-white" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
        </li>
      </ul>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item dropdown">
          <a className="nav-link text-white" data-toggle="dropdown" href="#">
            <i className="far fa-bell" />
            <span className="badge badge-warning navbar-badge">{totalNotifications}</span>
          </a>
          <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
            <span className="dropdown-item dropdown-header">{totalNotifications} Notifications</span>
              <div className="dropdown-divider" />
              <a href="/#stock-bahan-baku" className="dropdown-item">
                <i className="fas fa-box-open" /> Stock Bahan Baku Habis
                <span className="float-right text-muted text-sm">{reportAttribute.low_stock} </span>
              </a>
              <div className="dropdown-divider" />
              <a href="/#stock-product" className="dropdown-item">
                <i className="fas fa-box-open" /> Stock Produk Habis
                <span className="float-right text-muted text-sm">{reportProduct.low_stock_product}</span>
              </a>
            </div>
        </li>
        <li className="nav-item dropdown">
            <div className="user-panel d-flex" >
                <div className="nav-item d-none d-sm-inline-block">
                    <a href="/profile" className="nav-link pr-1 text-white">
                      {userName !== undefined ? userName : null} 
                    </a>
                </div>
                <div className="image mt-1 mr-3">
                  {userPhoto ? (
                    <img className="profile-user-img img-fluid img-circle" src={`http://localhost:8000/images/uploads/sales_manager_thumb/${userPhoto}`} alt="User profile picture" />
                  ) : (
                    <img src={photoProfile} className="profile-user-img img-fluid img-circle" alt="Default profile" />
                  )}
                </div>
            </div>
        </li>
      </ul>
    </nav>
  )
}

export default Header;
