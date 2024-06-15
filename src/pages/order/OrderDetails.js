import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Constants from '../../Constants'
import axios from 'axios'
import Breadcrumb from '../../components/partials/Breadcrumb'
import NoDataFound from '../../components/partials/miniComponent/NoDataFound'
import GlobalFunction from '../../GlobalFunction'

const OrderDetails = () => {
  const params = useParams()
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState([]);

  const getOrderDetails  = () => {
    setIsLoading(true);
    axios.get(`${Constants.BASE_URL}/order/${params.id}`).then(res => {
        setOrder(res.data.data)
        setIsLoading(false)
    });
  };

  return (
    <div className="content-wrapper">
        <section className="content-header">
            <Breadcrumb title="Order Details" breadcrumb="Order Details" />
        </section>
        <section className="content">
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Order Details</h3>
                </div>
                <div className="card-body">
                    <div className='row'>
                        <div className='col-md-6'>
                            <div className='card card-danger'>
                                <div className='card-header'>
                                    <h5>Customer Details</h5>
                                </div>
                                <div className='card-body'>
                                    <table className='table table-hover table-striped table-bordered'>
                                        <tbody>
                                            <tr>
                                                <th>Name</th>
                                                <td>{order?.customer?.name}</td>
                                            </tr>
                                            <tr>
                                                <th>Phone</th>
                                                <td>{order?.customer?.phone}</td>
                                            </tr>
                                            <tr>
                                                <th>Email</th>
                                                <td>{order?.customer?.email}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='card card-danger'>
                                <div className='card-header'>
                                    <h5>Shop Details</h5>
                                </div>
                                <div className='card-body'>
                                    <table className='table table-bordered table-striped'>
                                        <tbody>
                                            <tr>
                                                <th>Name</th>
                                                <td> <img src={order?.shop?.logo} alt='shop logo' className='img-fluid' />{order?.shop?.name}</td>
                                            </tr>
                                            <tr>
                                                <th>Cashier</th>
                                                <td> <img src={order?.sales_manager?.photo} alt='shop logo' className='img-fluid' />{order?.sales_manager?.name}</td>
                                            </tr>
                                            <tr>
                                                <th>Email</th>
                                                <td>{order.shop?.email}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-12 mt-4'>
                            <div className='card'>
                                <div className='card-header'>
                                    <h5>Order Summary</h5>
                                </div>
                                <div className='card-body'>
                                    <table className='table table-hover table-bordered table-striped'>
                                        <tbody>
                                            <tr>
                                                <th>Order Number</th>
                                                <td><strong>{order.order_number}</strong></td>
                                                <th>Total Items</th>
                                                <td>{order.quantity}</td>
                                            </tr>
                                            <tr>
                                                <th>Order Status</th>
                                                <td>{order.order_status_string}</td>
                                                <th>Payment Status</th>
                                                <td>{order.payment_status}</td>
                                            </tr>
                                            <tr>
                                                <th>Paymnet Method</th>
                                                <td>{order?.payment_method?.name}</td>
                                                <th>Account Number</th>
                                                <td>{order?.payment_method?.account_number}</td>
                                            </tr>
                                            <tr>
                                                <th>Order Placed</th>
                                                <td>{order.created_at}</td>
                                                <th>Order Updated</th>
                                                <td>{order.updated_at}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-12 mt-4'>
                            <div className='card'>
                                <div className='card-header'>
                                    <h5>Order Items Details</h5>
                                </div>
                                <div className='card-body'>
                                    <table className='table table-hover table-bordered table-striped'>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Name</th>
                                                <th>Info</th>
                                                <th>Quantity</th>
                                                <th>Phone</th>
                                                <th>Amounts</th>
                                                <th>Sub Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {order?.order_details.map((product, index) => (
                                                <tr key={index}>
                                                    <td>{++index}</td>
                                                    <td>
                                                        <p>{product.name}</p>
                                                        <p>SKU : {product.sku}</p>
                                                        <p>Supplier : {product.supplier}</p>
                                                    </td>
                                                    <td>
                                                        <p>{product.brand}</p>
                                                        <p>{product.category}</p>
                                                        <p>{product.sub_category}</p>
                                                    </td>
                                                    <td>{product.quantity}</td>
                                                    <td><img src={product.photo} alt='product photo' className='img-fluid' /></td>
                                                    <td>
                                                        <p>Original Price : {GlobalFunction.formatRupiah(product.price)}</p>
                                                        <p>Discount : {GlobalFunction.formatRupiah(product?.sell_price?.discount)}</p>
                                                        <p>Sale Price : {GlobalFunction.formatRupiah(product?.sell_price?.price)}</p>
                                                    </td>
                                                    <td>Sub Total</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-footer">
                    Footer
                </div>
            </div>
        </section>
    </div>
  )
}

export default OrderDetails