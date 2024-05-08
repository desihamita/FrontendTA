import React from 'react'
import Breadcrumb from '../../components/partials/Breadcrumb'

const Error500 = () => {
  return (
    <div className="content-wrapper">
      <section className="content-header">
        <Breadcrumb title='Error 500' breadcrumb="Error page" />
      </section>
      <section className="content mt-5 pt-5">
        <div className="error-page">
          <h2 className="headline text-danger">500</h2>
          <div className="error-content">
            <h3><i className="fas fa-exclamation-triangle text-danger" /> Oops! Something went wrong.</h3>
            <p>
              We will work on fixing that right away.
              Meanwhile, you may <a href="../../index.html">return to dashboard</a> or try using the search form.
            </p>
            <form className="search-form">
              <div className="input-group">
                <input type="text" name="search" className="form-control" placeholder="Search" />
                <div className="input-group-append">
                  <button type="submit" name="submit" className="btn btn-danger"><i className="fas fa-search" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>

  )
}

export default Error500
