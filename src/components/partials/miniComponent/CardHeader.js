import React from 'react'
import { Link } from 'react-router-dom'

const CardHeader = (props) => {
  return (
    <div className="d-flex justify-content-between align-items-center">
        <div>
            <Link to={props.add} className="btn btn-primary mr-2">Tambah Data</Link>
            <button className="btn btn-secondary mr-2">Export to PDF</button>
            <button className="btn btn-success mr-2">Export to Excel</button>
        </div>
        <div>
            <form className="form-inline">
            <div className="input-group">
                <input type="text" className="form-control" placeholder="Search" />
                <div className="input-group-append">
                <button type="submit" className="btn btn-warning">
                    <i className="fas fa-search"></i>
                </button>
                </div>
            </div>
            </form>
        </div>
    </div>
  )
}

export default CardHeader