import React from 'react'
import { Helmet } from 'react-helmet'

const Breadcrumb = (props) => {
    return (
      <div className="container-fluid">
          <div className="row mb-2">
              <div className="col-sm-6">
                  <h1>{props.title}</h1>
              </div>
              <div className="col-sm-6">
                  <Helmet>
                      <title>{props.title} | Inventaris App</title>
                  </Helmet>
                  <ol className="breadcrumb float-sm-right">
                      <li className="breadcrumb-item"><a href="#">Home</a></li>
                      <li className="breadcrumb-item active">{props.breadcrumb}</li>
                  </ol>
              </div>
          </div>
      </div>
    )
  }

export default Breadcrumb