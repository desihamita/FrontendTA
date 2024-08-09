import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Constants from '../../Constants';
import axios from 'axios';
import Breadcrumb from '../../components/partials/Breadcrumb';
import NoDataFound from '../../components/partials/miniComponent/NoDataFound';
import GlobalFunction from '../../GlobalFunction';
import CardHeader from '../../components/partials/miniComponent/CardHeader';

const OrderDetails = () => {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState({
    order_details: [],
    customer: {},
    shop: {},
    sales_manager: {},
    payment_method: {}, 
  });

  const getOrderDetails = () => {
    setIsLoading(true);
    axios.get(`${Constants.BASE_URL}/order/${params.id}`)
      .then(res => {
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
        <Breadcrumb title="Detail Pesanan" breadcrumb="detail" />
      </section>
      <section className="content">
        <div className="card">
          <div className="card-header">
            <CardHeader
              link={'/order'} 
              btnText="Batal"
              btn="btn btn-primary"
              icon="fas fa-backspace"
            />
          </div>
          <div className="card-body">
            <div className='row'>
              <div className='col-md-6'>
                <div className='card card-danger'>
                  <div className='card-header'>
                    <h5>Detail Pelanggan</h5>
                  </div>
                  <div className='card-body'>
                    <table className='table table-hover table-striped table-bordered'>
                      <tbody>
                        <tr>
                          <th>Nama</th>
                          <td>{order?.customer.name}</td>
                        </tr>
                        <tr>
                          <th>No.Telepon</th>
                          <td>{order?.customer.phone}</td>
                        </tr>
                        <tr>
                          <th>Email</th>
                          <td>{order?.customer.email}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className='col-md-6'>
                <div className='card card-danger'>
                  <div className='card-header'>
                    <h5>Detail kafe</h5>
                  </div>
                  <div className='card-body'>
                    <table className='table table-bordered table-striped'>
                      <tbody>
                        <tr>
                          <th>Nama Kafe</th>
                          <td>{order?.shop.name}</td>
                        </tr>
                        <tr>
                          <th>Nama Sales</th>
                          <td>{order.sales_manager.name}</td>
                        </tr>
                        <tr>
                          <th>Email Kafe</th>
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
                    <h5>Ringkasan Pesanan</h5>
                  </div>
                  <div className='card-body'>
                    <table className='table table-hover table-bordered table-striped'>
                      <tbody>
                        <tr>
                          <th>No.Pesanan</th>
                          <td><strong>{order.order_number}</strong></td>
                          <th>Total Barang</th>
                          <td>{order.quantity}</td>
                        </tr>
                        <tr>
                          <th>Status Pesanan</th>
                          <td>{order.order_status}</td>
                          <th>Status Pembayaran</th>
                          <td>
                            <button className={getPaymentStatusButtonClass(order.payment_status)}>
                                {order.payment_status}
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <th>Cara Pembayaran</th>
                          <td>{order.payment_method.name}</td>
                          <th>No.Akun</th>
                          <td>{order.payment_method.account_number}</td>
                        </tr>
                        <tr>
                          <th>Sub Total</th>
                          <td>Rp.{order.sub_total}</td>
                          <th>Diskon</th>
                          <td>Rp.{order.discount}</td>
                        </tr>
                        <tr>
                          <th>Total</th>
                          <td>Rp.{order.total}</td>
                          <th>Pesan Ditempat</th>
                          <td>{order.created_at}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className='col-md-12 mt-4'>
                <div className='card'>
                  <div className='card-header'>
                    <h5>Detail Barang Pesanan</h5>
                  </div>
                  <div className='card-body'>
                    <table className='table table-hover table-bordered table-striped'>
                      <thead>
                        <tr>
                          <th>No</th>
                          <th>Nama</th>
                          <th>Informasi</th>
                          <th>Kuantitas</th>
                          <th>Foto</th>
                          <th>Jumlah</th>
                          <th>Sub Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.order_details && order.order_details.length > 0 ? (
                          order.order_details.map((product, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>
                                <p>{product.name}</p>
                                <p>SKU : {product.sku}</p>
                              </td>
                              <td>
                                <p>Kategori : {product.category}</p>
                                <p>Sub Kategori : {product.sub_category}</p>
                              </td>
                              <td>{product.quantity}</td>
                              <td>
                                <img src={product.photo} alt='product photo' className='img-thumbnail' />
                              </td>
                              <td>
                                <p>Harga Asli : {product.price}</p>
                                <p>Diskon : {GlobalFunction.formatRupiah(product?.sell_price?.discount)}</p>
                                <p>Harga Jual : {GlobalFunction.formatRupiah(product?.sell_price?.price)}</p>
                              </td>
                              <td>{GlobalFunction.formatRupiah(product.sell_price.price * product.quantity)}</td>
                            </tr>
                          ))
                        ) : <NoDataFound colSpan={7}/>}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className='col-md-12 mt-4'>
                <div className='card'>
                  <div className='card-header'>
                    <h5>Transaksi</h5>
                  </div>
                  <div className='card-body'>
                    <table className='table table-hover table-bordered table-striped'>
                      <thead>
                        <tr>
                          <th>No</th>
                          <th>ID Transaksi</th>
                          <th>Jumlah</th>
                          <th>Pelanggan</th>
                          <th>Cara Pembayaran</th>
                          <th>Transaksi</th>
                          <th>Dibuat</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.transactions && order.transactions.length > 0 ? (
                          order.transactions.map((transaction, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{transaction.trx_id ? transaction.trx_id : 'Tidak Ada ID Transaksi'}</td>
                              <td>{GlobalFunction.formatRupiah(transaction.amount)}</td>
                              <td>
                                <p>Nama : {transaction.customer_name}</p>
                                <p>No.Telepon : {transaction.customer_phone}</p>
                              </td>
                              <td>
                                <p>Nama : {transaction.payment_method_name}</p>
                                <p>No.Akun: {transaction.account_number ? transaction.account_number : 'Tidak Ada No.Akun'}</p>
                              </td>
                              <td>
                                <p>Jenis Transaksi:{transaction.transaction_type}</p>
                                <p>Transaksi Oleh: {transaction.transaction_by}</p>
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
  );
};

export default OrderDetails;
