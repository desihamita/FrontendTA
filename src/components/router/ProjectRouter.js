import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Master from '../layouts/Master';
import Home from '../../pages/Home';
import Error500 from '../../pages/errorPage/Error500';
import Error404 from '../../pages/errorPage/Error404';
import AddCategory from '../../pages/category/AddCategory';
import CategoryList from '../../pages/category/CategoryList';
import CategoryEdit from '../../pages/category/CategoryEdit';
import AddSubCategory from '../../pages/subCategory/AddSubCategory';
import ListSubCategory from '../../pages/subCategory/ListSubCategory';
import EditSubCategory from '../../pages/subCategory/EditSubCategory';
import AddBrand from '../../pages/brand/AddBrand';
import EditBrand from '../../pages/brand/EditBrand';
import ListBrand from '../../pages/brand/ListBrand';
import ListSupplier from '../../pages/supplier/ListSupplier';
import AddSupplier from '../../pages/supplier/AddSupplier';
import EditSupplier from '../../pages/supplier/EditSupplier';
import ProductAttributes from '../../pages/productAttribute/ProductAttributes';
import ProductList from '../../pages/product/ProductList';
import ProductAdd from '../../pages/product/ProductAdd';
import ProductEdit from '../../pages/product/ProductEdit';
import AddProductPhoto from '../../pages/product/AddProductPhoto';
import ListShop from '../../pages/shop/ListShop';
import AddShop from '../../pages/shop/AddShop';
import EditShop from '../../pages/shop/EditShop';
import ListSalesManager from '../../pages/salesManager/ListSalesManager';
import AddSalesManager from '../../pages/salesManager/AddSalesManager';
import EditSalesManager from '../../pages/salesManager/EditSalesManager';
import ListOrder from '../../pages/order/ListOrder';
import AddOrder from '../../pages/order/AddOrder';
import OrderDetails from '../../pages/order/OrderDetails';
import BarcodeComponent from '../modules/barcode/BarcodeComponent';
import SalesReport from '../../pages/report/SalesReport';
import Profile from '../../pages/profile/Profile';
import ProductDetails from '../../pages/product/ProductDetails';
import ListBahanBaku from '../../pages/bahanBaku/ListBahanBaku';
import AddBahanBaku from '../../pages/bahanBaku/AddBahanBaku';
import EditBahanBaku from '../../pages/bahanBaku/EditBahanBaku';
import DetailsBahanBaku from '../../pages/bahanBaku/DetailsBahanBaku';
import OrderBahanBakuAdd from '../../pages/orderBahanBaku/OrderBahanBakuAdd';
import OrderBahanBakuList from '../../pages/orderBahanBaku/OrderBahanBakuList';
import OrderBahanBakuDetails from '../../pages/orderBahanBaku/OrderBahanBakuDetails';

const ProjectRouter = createBrowserRouter([
  {
    path: '/',
    element: <Master />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/category',
        element: <CategoryList />,
      },
      {
        path: '/category/create',
        element: <AddCategory />,
      },
      {
        path: '/category/edit/:id',
        element: <CategoryEdit />,
      },
      {
        path: '/sub-category',
        element: <ListSubCategory />,
      },
      {
        path: '/sub-category/edit/:id',
        element: <EditSubCategory />,
      },
      {
        path: '/sub-category/create',
        element: <AddSubCategory />,
      },
      {
        path: '/brand',
        element: <ListBrand />,
      },
      {
        path: '/brand/create',
        element: <AddBrand />,
      },
      {
        path: '/brand/edit/:id',
        element: <EditBrand />,
      },
      {
        path: '/supplier',
        element: <ListSupplier />,
      },
      {
        path: '/supplier/create',
        element: <AddSupplier />,
      },
      {
        path: '/supplier/edit/:id',
        element: <EditSupplier />,
      },
      {
        path: '/product',
        element: <ProductList />,
      },
      {
        path: '/product/details/:id',
        element: <ProductDetails />,
      },
      {
        path: '/product/create',
        element: <ProductAdd />,
      },
      {
        path: '/product/photo/:id',
        element: <AddProductPhoto />,
      },
      {
        path: '/product/edit/:id',
        element: <ProductEdit />,
      },
      {
        path: '/shop',
        element: <ListShop />,
      },
      {
        path: '/shop/create',
        element: <AddShop />,
      },
      {
        path: '/shop/edit/:id',
        element: <EditShop />,
      },
      {
        path: '/sales-manager',
        element: <ListSalesManager />,
      },
      {
        path: '/sales-manager/create',
        element: <AddSalesManager />,
      },
      {
        path: '/sales-manager/edit/:id',
        element: <EditSalesManager />,
      },
      {
        path: '/order',
        element: <ListOrder />,
      },
      {
        path: '/order/create',
        element: <AddOrder />,
      },
      {
        path: '/order/details/:id',
        element: <OrderDetails />,
      },
      {
        path: '/order-bahan-baku',
        element: <OrderBahanBakuList />,
      },
      {
        path: '/order-bahan-baku/create',
        element: <OrderBahanBakuAdd />,
      },
      {
        path: '/order-bahan-baku/details/:id',
        element: <OrderBahanBakuDetails />,
      },
      {
        path: '/generate-barcode',
        element: <BarcodeComponent />,
      },
      {
        path: '/sales-reports',
        element: <SalesReport/>,
      },
      {
        path: '/bahan-baku',
        element: <ListBahanBaku />,
      },
      {
        path: '/bahan-baku/create',
        element: <AddBahanBaku />,
      },
      {
        path: '/bahan-baku/edit/:id',
        element: <EditBahanBaku />,
      },
      {
        path: '/bahan-baku/details/:id',
        element: <DetailsBahanBaku />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/error500',
        element: <Error500 />,
      },
    ],
  },
  {
    path: '/*',
    element: <Error404 />,
  },
]);

export default ProjectRouter;
