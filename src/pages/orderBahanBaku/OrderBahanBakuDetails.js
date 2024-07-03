import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Constants from '../../Constants';
import NoDataFound from '../../components/partials/miniComponent/NoDataFound';
import GlobalFunction from '../../GlobalFunction';
import Breadcrumb from '../../components/partials/Breadcrumb';
import CardHeader from '../../components/partials/miniComponent/CardHeader';

const OrderBahanBakuDetails = () => {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState({
    order_details: [],
    supplier: {},
    shop: {},
    sales_manager: {},
    payment_method: {}, 
  });

  const getOrderDetails = () => {
    setIsLoading(true);
    axios.get(`${Constants.BASE_URL}/order-bahan-baku/${params.id}`)
      .then(res => {
        console.log(res.data.data);
        setOrder(res.data.data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  const getPaymentStatusButtonClass = (status) => {
    if (status === "Paid") {
      return 'btn btn-success btn-sm';
    } else if (status === "Unpaid") {
      return 'btn btn-danger btn-sm';
    } else {
      return 'btn btn-secondary btn-xs';
    }
  };

  useEffect(() => {
    getOrderDetails();
  }, [params.id]);

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <Breadcrumb title="Order Ingredient Details" breadcrumb="Order Ingredient Details" />
      </section>
      <section className="content">
        <div className="card">
          <div className="card-header">
            <CardHeader
              link={'/order-bahan-baku'} 
              btnText="Cancel"
              btn="btn btn-primary"
              icon="fas fa-plus"
            />
          </div>
          <div className="card-body">
            <div className='row'>
              <div className='col-md-6'>
                <div className='card card-danger'>
                  <div className='card-header'>
                    <h5>Supplier Details</h5>
                  </div>
                  <div className='card-body'>
                    <table className='table table-hover table-striped table-bordered'>
                      <tbody>
                        <tr>
                          <th>Name</th>
                          <td>{order?.supplier.name}</td>
                        </tr>
                        <tr>
                          <th>Phone</th>
                          <td>{order?.supplier.phone}</td>
                        </tr>
                        <tr>
                          <th>Email</th>
                          <td>{order?.supplier.email}</td>
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
                          <td>{order?.shop.name}</td>
                        </tr>
                        <tr>
                          <th>Cashier</th>
                          <td>{order?.sales_manager.name}</td>
                        </tr>
                        <tr>
                          <th>Email</th>
                          <td>{order?.shop.email}</td>
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
                          <td><strong>{order?.order_number}</strong></td>
                          <th>Total Items</th>
                          <td>{order?.quantity}</td>
                        </tr>
                        <tr>
                          <th>Order Status</th>
                          <td>{order?.order_status}</td>
                          <th>Payment Status</th>
                          <td>
                            <button className={getPaymentStatusButtonClass(order?.payment_status)}>
                                {order?.payment_status}
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <th>Payment Method</th>
                          <td>{order?.payment_method.name}</td>
                          <th>Account Number</th>
                          <td>{order?.payment_method.account_number}</td>
                        </tr>
                        <tr>
                          <th>Sub Total</th>
                          <td>Rp.{order?.sub_total}</td>
                          <th>Total</th>
                          <td>Rp.{order?.total}</td>
                        </tr>
                        <tr>
                          <th>Order Placed</th>
                          <td>{order?.created_at}</td>
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
                          <th>Photo</th>
                          <th>Amounts</th>
                          <th>Sub Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order?.order_details && order?.order_details.length > 0 ? (
                          order?.order_details.map((product, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>
                                <p>{product.name}</p>
                                <p>SKU : {product.sku}</p>
                              </td>
                              <td>
                                <p>Category : {product.category}</p>
                                <p>Sub Category : {product.sub_category}</p>
                              </td>
                              <td>{product.quantity}</td>
                              <td><img src={product.photo} alt='product photo' className='img-thumbnail' /></td>
                              <td>
                                <p>Price : {GlobalFunction.formatRupiah(product.price)}</p>
                              </td>
                              <td>{GlobalFunction.formatRupiah(product.price * product.quantity)}</td>
                            </tr>
                          ))
                        ) : <NoDataFound colSpan={7} /> }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className='col-md-12 mt-4'>
                <div className='card'>
                  <div className='card-header'>
                    <h5>Transactions</h5>
                  </div>
                  <div className='card-body'>
                    <table className='table table-hover table-bordered table-striped'>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>ID Transaction</th>
                          <th>Amount</th>
                          <th>Supplier</th>
                          <th>Payment Method</th>
                          <th>Transaction</th>
                          <th>Created At</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order?.transactions && order?.transactions.length > 0 ? (
                          order?.transactions.map((transaction, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{transaction.trxIngredients_id}</td>
                              <td>{GlobalFunction.formatRupiah(transaction.amount)}</td>
                              <td>
                                <p>Name : {transaction.supplier_name}</p>
                                <p>Phone : {transaction.supplier_phone}</p>
                              </td>
                              <td>
                                <p>Name : {transaction.payment_method_name}</p>
                                <p>Account No : {transaction.account_number}</p>
                              </td>
                              <td>
                                <p>Trx Type :{transaction.transaction_type}</p>
                                <p>Trx By: {transaction.transaction_by}</p>
                              </td>
                              <td>{transaction.created_at}</td>
                              <td>
                                <button className='btn btn-success btn-xs'>{transaction.status}</button>
                              </td>
                            </tr>
                          ))
                        ) : <NoDataFound colSpan={8} />}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default OrderBahanBakuDetails