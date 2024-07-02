import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CardHeader = (props) => {
  return (
    <div>
        {props.hide == undefined ? 
          <Link to={props.link}><button className={`mr-2 ${props.btn}`}><i className={`mr-2 ${props.icon}`}></i>{props.btnText}</button></Link>
          : ''
        }
    </div>
  )
}

export default CardHeader