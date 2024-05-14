import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CardHeader = (props) => {
  return (
    <div>
        <Link to={props.add} className="btn btn-primary mr-2">Add</Link>
        <button className="btn btn-secondary mr-2">PDF</button>
        <button className="btn btn-success mr-2">Excel</button>
    </div>
  )
}

export default CardHeader