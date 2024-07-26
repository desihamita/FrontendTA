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
        <Breadcrumb title="Detail Pesanan Bahan Baku" breadcrumb="Detail" />
      </section>
      <section className="content">
        <div className="card">
          <div className="card-header">
            <CardHeader
              link={'/order-bahan-baku'} 
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
                    <h5>Detail Pemasok</h5>
                  </div>
                  <div className='card-body'>
                    <table className='table table-hover table-striped table-bordered'>
                      <tbody>
                        <tr>
                          <th>Nama</th>
                          <td>{order?.supplier.name}</td>
                        </tr>
                        <tr>
                          <th>No.Telepon</th>
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
                    <h5>Detail Kafe</h5>
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
                          <td>{order?.sales_manager.name}</td>
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
                          <td><strong>{order?.order_number}</strong></td>
                          <th>Total Barang</th>
                          <td>{order?.quantity}</td>
                        </tr>
                        <tr>
                          <th>Status Pesanan</th>
                          <td>{order?.order_status}</td>
                          <th>Status Pembayaran</th>
                          <td>
                            <button className={getPaymentStatusButtonClass(order?.payment_status)}>
                                {order?.payment_status}
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <th>Cara Pembayaran</th>
                          <td>{order?.payment_method.name}</td>
                          <th>No.Akun</th>
                          <td>{order?.payment_method.account_number}</td>
                        </tr>
                        <tr>
                          <th>Sub Total</th>
                          <td>Rp.{order?.sub_total}</td>
                          <th>Total</th>
                          <td>Rp.{order?.total}</td>
                        </tr>
                        <tr>
                          <th>Pesanan Ditempatkan</th>
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
                    <h5>Detail Barang Pesanan</h5>
                  </div>
                  <div className='card-body'>
                    <table className='table table-hover table-bordered table-striped'>
                      <thead>
                        <tr>
                          <th>No</th>
                          <th>Nama</th>
                          <th>Informasi</th>
                          <th>Kuantitias</th>
                          <th>Foto</th>
                          <th>Jumlah</th>
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
                                <p>Kategori : {product.category}</p>
                                <p>Sub Kategori : {product.sub_category}</p>
                              </td>
                              <td>{product.quantity}</td>
                              <td><img src={product.photo} alt='product photo' className='img-thumbnail' /></td>
                              <td>
                                <p>Harga : {GlobalFunction.formatRupiah(product.price)}</p>
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
                    <h5>Transaksi</h5>
                  </div>
                  <div className='card-body'>
                    <table className='table table-hover table-bordered table-striped'>
                      <thead>
                        <tr>
                          <th>No</th>
                          <th>ID Transaksi</th>
                          <th>Jumlah</th>
                          <th>Pemasok</th>
                          <th>Cara Pembayaran</th>
                          <th>Transaksi</th>
                          <th>Dibuat</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order?.transactions && order?.transactions.length > 0 ? (
                          order?.transactions.map((transaction, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{transaction.trxIngredients_id ? transaction.trxIngredients_id : 'Tidak Ada ID Transaksi'}</td>
                              <td>{GlobalFunction.formatRupiah(transaction.amount)}</td>
                              <td>
                                <p>Nama : {transaction.supplier_name}</p>
                                <p>No.Telepon : {transaction.supplier_phone}</p>
                              </td>
                              <td>
                                <p>Nama : {transaction.payment_method_name}</p>
                                <p>No.  Akun: {transaction.account_number ? transaction.account_number : 'Tidak Ada No.Akun'}</p>
                              </td>
                              <td>
                                <p>Jenis Transaksi :{transaction.transaction_type}</p>
                                <p>Transaksi Oleh : {transaction.transaction_by}</p>
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