import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Master from '../layouts/Master'
import Home from '../../pages/Home'
import Error500 from '../../pages/errorPage/Error500'
import Error404 from '../../pages/errorPage/Error404'
import AddCategory from '../../pages/category/AddCategory'
import CategoryList from '../../pages/category/CategoryList'

const ProjectRouter = createBrowserRouter([
    {
        path: '/',
        element: <Master/>,
        children: [
            {
                path: '/',
                element: <Home/>
            }, {
                path: '/category',
                element: <CategoryList/>
            }, {
                path: '/category/create',
                element: <AddCategory/>
            }, {
                path: '/error500',
                element: <Error500/>
            }
        ]
    }, {
        path: '/*',
        element: <Error404/>
    }
])

export default ProjectRouter