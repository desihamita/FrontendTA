import React from 'react'

const Footer = () => {
  return (
   <footer className="main-footer">
      <div className="float-right d-none d-sm-block">
        <b>Version</b> 3.2.0
      </div>
      <strong>Copyright © {'{'}new Date().getFullYear(){'}'}.</strong> All rights reserved.
    </footer>
  )
}

export default Footer
