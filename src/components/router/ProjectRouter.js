import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Master from '../layouts/Master'
import Home from '../../pages/Home'
import Error500 from '../../pages/errorPage/Error500'
import Error404 from '../../pages/errorPage/Error404'
import AddCategory from '../../pages/category/AddCategory'
import CategoryList from '../../pages/category/CategoryList'
import CategoryEdit from '../../pages/category/CategoryEdit'
import AddSubCategory from '../../pages/subCategory/AddSubCategory'
import ListSubCategory from '../../pages/subCategory/ListSubCategory'
import EditSubCategory from '../../pages/subCategory/EditSubCategory'
import AddBrand from '../../pages/brand/AddBrand'
import EditBrand from '../../pages/brand/EditBrand'
import ListBrand from '../../pages/brand/ListBrand'
import ListSuplier from '../../pages/supplier/ListSuplier'
import AddSuplier from '../../pages/supplier/AddSuplier'
import EditSuplier from '../../pages/supplier/EditSuplier'
import ProductAttributes from '../../pages/productAttribute/ProductAttributes'
import ProductList from '../../pages/product/ProductList'
import ProductAdd from '../../pages/product/ProductAdd'
import ProductEdit from '../../pages/product/ProductEdit'

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
                path: '/category/edit/:id',
                element: <CategoryEdit/>
            }, {
                path: '/sub-category',
                element: <ListSubCategory/>
            }, {
                path: '/sub-category/edit/:id',
                element: <EditSubCategory/>
            }, {
                path: '/sub-category/create',
                element: <AddSubCategory/>
            }, {
                path: '/brand',
                element: <ListBrand/>
            }, {
                path: '/brand/create',
                element: <AddBrand/>
            }, {
                path: '/brand/edit/:id',
                element: <EditBrand/>
            }, {
                path: '/suplier',
                element: <ListSuplier/>
            }, {
                path: '/suplier/create',
                element: <AddSuplier/>
            }, {
                path: '/suplier/edit/:id',
                element: <EditSuplier/>
            }, {
                path: '/product-attribute',
                element: <ProductAttributes/>
            },  {
                path: '/product',
                element: <ProductList/>
            }, {
                path: '/product/create',
                element: <ProductAdd/>
            }, {
                path: '/product/edit/:id',
                element: <ProductEdit/>
            },{
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