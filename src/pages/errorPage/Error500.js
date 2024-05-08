import React from 'react'

const Error500 = () => {
  return (
    <div className="d-flex justify-content-center mt-5">
      <section className="content mt-5">
      <div className="error-page mt-5">
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
