import React from 'react'
import Breadcrumb from '../../components/partials/Breadcrumb'

const Reports = () => {
  return (
    <div className="content-wrapper">
        <section class="content-header">
            <Breadcrumb title="Sales Report" />
        </section>
        <section className="content">
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Title</h3>
                </div>
                <div className="card-body">
                    Start creating your amazing application!
                </div>
            </div>
        </section>
    </div>

  )
}

export default Reports