import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

const Master = () => {
  return (
    <>
      <Header/>
      <Sidebar/>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default Master
