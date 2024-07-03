import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Moment from 'react-moment';

const ShowOrderConfirmation = ({handleOrderPlace, handleOrderSummaryInput, ...props}) => {
    const [branch, setBranch] = useState({});

    useEffect(() => {
        if (localStorage.branch !== undefined) {
            setBranch(JSON.parse(localStorage.branch));
        }
    }, []);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Order Detail Confirmation
        </Modal.Title>
        <button className="close" onClick={props.onHide}>
            <span aria-hidden="true">&times;</span>
        </button>
     </Modal.Header>
      <Modal.Body>
        <div className='row px-4 align-items-center'>
            <div className='col-md-12'>
            {Object.keys(branch).length > 0 ? 
                <>
                    <img src={branch.logo} alt='logo' className='img-thumbnail' />
                </> : null
            }
            </div>
            <div className='col-md-6 text-left'>
            {Object.keys(branch).length > 0 ? 
                <>
                    <p><strong>{branch.name}</strong></p>
                    <p>{branch.address.district} {branch.address.subDistrict} {branch.address.landmark}</p>
                    <p>Phone: {branch.phone}</p>
                </> : null
            }
            </div>
            <div className='col-md-6 text-right'>
                <p><strong><Moment format="dddd, DD/MM/YYYY HH:mm"></Moment></strong></p>
                <h5>Supplier Details</h5>
                <p>Nama : {props.orderSummary.salesManager}</p>
                <p>Phone : {props.orderSummary.supplierPhone}</p>
            </div>
            <div className='col-md-12'>
                <table className='table table-hover table-striped table-bordered mt-4'>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama</th>
                            <th>Quantity</th>
                            <th>Unit Price</th>
                            <th>Sub Total</th>
                        </tr>
                    </thead>
                    <tbody>
                    {Object.keys(props.carts).map((key, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{props.carts[key].name}</td>
                        <td>{props.carts[key].quantity}</td>
                        <td>{props.carts[key].price}</td>
                        <td className="text-right">
                            {props.carts[key].price * props.carts[key].quantity}
                        </td>
                      </tr>
                    ))}
                      <tr>
                        <th colSpan="4" className="text-right">Transaction ID</th>
                        <td>
                          <input 
                            className='form-control'
                            type='text'
                            name='trxIngredients_id'
                            value={props.orderSummary.trxItems_id}
                            onChange={handleOrderSummaryInput}
                          />
                        </td>
                      </tr>
                    </tbody>
                </table>
            </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className='px-4'>
          <button className='btn btn-sm btn-danger' onClick={props.onHide}>Close</button>
          <button 
            className='btn btn-sm btn-warning ml-3'
            onClick={handleOrderPlace}
            dangerouslySetInnerHTML={{__html: props.is_loading ? '<span class="spinner-border spinner-border-sm" aria-hidden="true"></span> Loading...' : 'Confirm'}}
            {...(props.is_loading ? { 'data-loading': props.is_loading.toString() } : {})}
          />
        </div>
      </Modal.Footer>
    </Modal>
  )
}

export default ShowOrderConfirmation