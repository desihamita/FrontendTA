import React, { useEffect, useState, useRef, forwardRef } from 'react';
import { Card, Col, Container, Row, Table } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Moment from 'react-moment';
import GlobalFunction from '../../../GlobalFunction';
import { useReactToPrint } from 'react-to-print';

const ShowOrderConfirmation = forwardRef(({ handleOrderPlace, handleOrderSummaryInput, ...props }, ref) => {
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
        <>
            <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">Konfirmasi Detail Pesanan</Modal.Title>
                    <button className="close" onClick={props.onHide}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row className="justify-content-md-center">
                            <Col md="10">
                                <Card>
                                    <Card.Header className="text-center">
                                        {Object.keys(branch).length > 0 && branch.address ? (
                                            <>
                                                <img src={branch.logo} alt='logo' className='profile-user-img img-fluid img-circle' />
                                                <p><strong>{branch.name}</strong></p>
                                                <p>{branch.address.district} {branch.address.subDistrict} {branch.address.landmark}</p>
                                                <p>No.Telepon: {branch.phone}</p>
                                            </>
                                        ) : null}
                                    </Card.Header>
                                    <Card.Body>
                                        <Row>
                                            <dt className="col-sm-4">Tanggal</dt>
                                            <dd className="col-sm-8">
                                                <Moment format="dddd, DD/MM/YYYY HH:mm"></Moment>
                                            </dd>
                                            <dt className="col-sm-4">No.Pesanan</dt>
                                            <dd className="col-sm-8">{Math.floor(Math.random() * 100000)}</dd>
                                            <dt className="col-sm-4">Pelanggan</dt>
                                            <dd className="col-sm-8">{props.orderSummary.customer.split('-')[0]}</dd>
                                        </Row>
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>No</th>
                                                    <th>Barang</th>
                                                    <th>Kuantitas</th>
                                                    <th>Harga</th>
                                                    <th>Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {props.carts && Object.keys(props.carts).map((key, index) => (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{props.carts[key].name}</td>
                                                        <td>{props.carts[key].quantity}</td>
                                                        <td>{props.carts[key].price}</td>
                                                        <td>
                                                            {GlobalFunction.formatRupiah(props.carts[key].original_price * props.carts[key].quantity)}
                                                        </td>
                                                    </tr>
                                                ))}
                                                <tr>
                                                    <td colSpan="4" className="text-right"><strong>Sub Total</strong></td>
                                                    <td>{GlobalFunction.formatRupiah(props.orderSummary.amount)}</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan="4" className="text-right"><strong>Diskon</strong></td>
                                                    <td>{GlobalFunction.formatRupiah(props.orderSummary.discount)}</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan="4" className="text-right"><strong>Total</strong></td>
                                                    <td>{GlobalFunction.formatRupiah(props.orderSummary.pay_able)}</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan="4" className="text-right"><strong>Jumlah pembayaran</strong></td>
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
                                                                name='trx_id'
                                                                value={props.orderSummary.trx_id}
                                                                onChange={handleOrderSummaryInput}
                                                            />
                                                        </td>
                                                    </tr>
                                                ) : null}
                                            </tbody>
                                        </Table>
                                    </Card.Body>
                                    <Card.Footer className="text-center">
                                        <p className='mb-0'>Terima kasih telah berkunjung ke {branch.name}!</p>
                                        <p className='mb-0'>Selamat menikmati menu kami!</p>
                                        <p>{localStorage.name}</p>
                                    </Card.Footer>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <div className='px-4'>
                        <button className='btn btn-sm btn-danger' onClick={props.onHide}>Close</button>
                        <button className="btn btn-sm btn-primary ml-3" onClick={handlePrint}>Print</button>
                        <button 
                            className='btn btn-sm btn-warning ml-3'
                            onClick={handleOrderPlace}
                            dangerouslySetInnerHTML={{__html: props.is_loading ? '<span class="spinner-border spinner-border-sm" aria-hidden="true"></span> Loading...' : 'Confirm'}}
                            {...(props.is_loading ? { 'data-loading': props.is_loading.toString() } : {})}
                        />
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
});

export default ShowOrderConfirmation;
