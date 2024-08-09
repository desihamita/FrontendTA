import React, { useEffect, useState, useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import Moment from 'react-moment';
import GlobalFunction from '../../GlobalFunction';
import { useReactToPrint } from 'react-to-print';

const ShowOrderConfirmation = ({ handleOrderPlace, handleOrderSummaryInput, ...props }) => {
  const [branch, setBranch] = useState({});
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
      content: () => componentRef.current,
  });

  useEffect(() => {
      const storedBranch = localStorage.getItem('branch');
      if (storedBranch) {
          setBranch(JSON.parse(storedBranch));
      }

  });

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Konfirmasi Detail Pesanan
        </Modal.Title>
        <button className="close" onClick={props.onHide}>
          <span aria-hidden="true">&times;</span>
        </button>
      </Modal.Header>
      <Modal.Body>
        <div ref={componentRef}>
          <div className='row px-4 align-items-center'>
            <div className='col-md-12'>
              {Object.keys(branch).length > 0 && (
                <img src={branch.logo} alt='logo' className='img-thumbnail' />
              )}
            </div>
            <div className='col-md-6 text-left'>
              {Object.keys(branch).length > 0 && (
                <>
                  <p><strong>{branch.name}</strong></p>
                  <p>{branch.address.district} {branch.address.subDistrict} {branch.address.landmark}</p>
                  <p>No.Telepon: {branch.phone}</p>
                </>
              )}
            </div>
            <div className='col-md-6 text-right'>
              <p><strong><Moment format="dddd, DD/MM/YYYY HH:mm"></Moment></strong></p>
              <h5>Detail Pemasok</h5>
              <p>Nama : {props.orderSummary.supplier}</p>
              <p>No.Telepon : {props.orderSummary.supplierPhone}</p>
            </div>
            <div className='col-md-12'>
              <table className='table table-hover table-striped table-bordered mt-4'>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama</th>
                    <th>Kuantitas</th>
                    <th>Harga Barang</th>
                    <th>Sub Total</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(props.carts).map((key, index) => (
                    <tr key={key}>
                      <td>{index + 1}</td>
                      <td>{props.carts[key].name}</td>
                      <td>{props.carts[key].quantity}</td>
                      <td>{props.carts[key].price}</td>
                      <td className="text-right">
                        {GlobalFunction.formatRupiah(props.carts[key].price * props.carts[key].quantity)}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan="4" className="text-right"><strong>Sub Total</strong></td>
                    <td className="text-right">{GlobalFunction.formatRupiah(props.orderSummary.amount)}</td>
                  </tr>
                  <tr>
                    <td colSpan="4" className="text-right"><strong>Total</strong></td>
                    <td className="text-right">{GlobalFunction.formatRupiah(props.orderSummary.pay_able)}</td>
                  </tr>
                  <tr>
                    <td colSpan="4" className="text-right"><strong>Jumlah Pembayaran</strong></td>
                    <td>
                      <div className='input-group'>
                        <div className='input-group-text'>Rp.</div>
                        <input
                          className="form-control form-control-sm"
                          type='number'
                          name='paid_amount'
                          value={props.orderSummary.paid_amount}
                          onChange={handleOrderSummaryInput}
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="4" className="text-right"><strong>Pilih Metode Pembayaran</strong></td>
                    <td>
                      <select
                        className='form-control'
                        name='payment_method_id'
                        value={props.orderSummary.payment_method_id}
                        onChange={handleOrderSummaryInput}
                      >
                        <option value="" disabled={true}>Select Method</option>
                        {props.paymentMethods.map((payment_method, index) => (
                          <option key={index} value={payment_method.id}>{payment_method.name}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                  {props.orderSummary.payment_method_id != 1 ? (
                    <tr>
                      <th colSpan="4" className="text-right">No. Transaction</th>
                      <td>
                        <input 
                          className='form-control'
                          type='text'
                          name='trxIngredients_id'
                          value={props.orderSummary.trxIngredients_id}
                          onChange={handleOrderSummaryInput}
                        />
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className='px-4'>
          <button className='btn btn-sm btn-danger' onClick={props.onHide}>Tutup</button>
          <button className="btn btn-sm btn-primary ml-3" onClick={handlePrint}>Print</button>
          <button
            className='btn btn-sm btn-warning ml-3'
            onClick={handleOrderPlace}
            dangerouslySetInnerHTML={{ __html: props.is_loading ? '<span class="spinner-border spinner-border-sm" aria-hidden="true"></span> Loading...' : 'Konfirmasi' }}
            {...(props.is_loading ? { 'data-loading': props.is_loading.toString() } : {})}
          />
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ShowOrderConfirmation;
