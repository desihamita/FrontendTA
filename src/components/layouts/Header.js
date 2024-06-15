import React, { useEffect, useState } from 'react'

const Header = () => {
  const [branch, setBranch] = useState({})
  
  useEffect(() => {
    if(localStorage.branch != undefined) {
      setBranch(JSON.parse(localStorage.branch))
    }
  }, [])

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
            <span className="badge badge-warning navbar-badge">15</span>
          </a>
          <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
            <span className="dropdown-item dropdown-header">15 Notifications</span>
            <div className="dropdown-divider" />
              <a href="#" className="dropdown-item text-white">
                <i className="fas fa-envelope mr-2" /> 4 new messages
                <span className="float-right text-muted text-sm">3 mins</span>
              </a>
            <div className="dropdown-divider" />
              <a href="#" className="dropdown-item text-white">
                <i className="fas fa-users mr-2" /> 8 friend requests
                <span className="float-right text-muted text-sm">12 hours</span>
              </a>
            <div className="dropdown-divider" />
              <a href="#" className="dropdown-item text-white">
                <i className="fas fa-file mr-2" /> 3 new reports
                <span className="float-right text-muted text-sm">2 days</span>
              </a>
            <div className="dropdown-divider" />
            <a href="#" className="dropdown-item dropdown-footer text-white">See All Notifications</a>
          </div>
        </li>
        <li className="nav-item dropdown">
            <div className="user-panel d-flex" >
                <div className="nav-item d-none d-sm-inline-block">
                    <a href="/profile" className="nav-link pr-1 text-white">
                      {localStorage.name !== undefined ? localStorage.name : null} 
                    </a>
                </div>
                <div className="image mt-1 mr-3">
                    <img src="dist/img/user2-160x160.jpg" className="profile-user-img img-circle" alt="User Image"  style={{border: '1px solid white'}} />
                </div>
            </div>
        </li>
      </ul>
    </nav>
  )
}

export default Header
