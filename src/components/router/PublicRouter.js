import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import AuthLayout from '../layouts/AuthLayout'
import Login from '../../pages/Login'
import Error404 from '../../pages/errorPage/Error404'

const PublicRouter = createBrowserRouter([
    {
        path: '/',
        element: <AuthLayout/>,
        children: [
            {
                path: '/',
                element: <Login/>
            }
        ]
    }, {
        path: '/*',
        element: <Error404/>
    }
])


export default PublicRouter
