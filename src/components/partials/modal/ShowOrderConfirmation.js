import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row, Table } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Logo from '../../../assets/img/logo12.png';
import Moment from 'react-moment';
import GlobalFunction from '../../../GlobalFunction';

const ShowOrderConfirmation = ({ handleOrderPlace, handleOrderSummaryInput, ...props }) => {
    const [branch, setBranch] = useState({});

    useEffect(() => {
        if (localStorage.branch !== undefined) {
            setBranch(JSON.parse(localStorage.branch));
        }
    }, []);

    return (
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Order Details Confirmation
                    </Modal.Title>
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
                                        {Object.keys(branch).length > 0 ? 
                                            <>
                                            <img src={branch.logo} alt='logo' className='img-fluid' />
                                            <p><strong>{branch.name}</strong></p>
                                            <p>{branch.address.district} {branch.address.subDistrict} {branch.address.landmark}</p>
                                            <p>Phone: {branch.phone}</p>
                                            </> : null
                                        }
                                    </Card.Header>
                                    <Card.Body>
                                        <Row>
                                            <dt className="col-sm-4">Date</dt>
                                            <dd className="col-sm-8">
                                                <Moment format="dddd, DD/MM/YYYY HH:mm"></Moment>
                                            </dd>
                                            <dt className="col-sm-4">Order No</dt>
                                            <dd className="col-sm-8">{Math.floor(Math.random() * 100000)}</dd>
                                            <dt className="col-sm-4">Customer</dt>
                                            <dd className="col-sm-8">{props.orderSummary.customer.split('-')[0]}</dd>
                                        </Row>
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Item</th>
                                                    <th>Quantity</th>
                                                    <th>Price</th>
                                                    <th>Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Object.keys(props.carts).map((key, index) => (
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
                                                    <td colSpan="4" className="text-right"><strong>Discount</strong></td>
                                                    <td>{GlobalFunction.formatRupiah(props.orderSummary.discount)}</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan="4" className="text-right"><strong>Total</strong></td>
                                                    <td>{GlobalFunction.formatRupiah(props.orderSummary.pay_able)}</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan="4" className="text-right"><strong>Paid Amount</strong></td>
                                                    <td>
                                                        <div className='input-group' >
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
                                                    <td colSpan="4" className="text-right"><strong>Due Amount</strong></td>
                                                    <td>{GlobalFunction.formatRupiah(props.orderSummary.due_amount)}</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan="4" className="text-right"><strong>Select Payment Method</strong></td>
                                                    <td>
                                                        <select
                                                            className='form-control'
                                                            name='payment_method_id'
                                                            value={props.orderSummary.payment_method_id}
                                                            onChange={handleOrderSummaryInput}
                                                        >
                                                            <option value="" disabled={true} selected>Select Method</option>
                                                            {props.paymentMethods.map((payment_method, index) => (
                                                                <option key={index} value={payment_method.id}>{payment_method.name}</option>
                                                            ))}
                                                        </select>
                                                    </td>
                                                </tr>
                                                {props.orderSummary.payment_method_id != 1 ? 
                                                    <tr>
                                                        <th colSpan="4" className="text-right">Transaction ID</th>
                                                        <td>
                                                            <input 
                                                                className='form-control'
                                                                type='text'
                                                                name='trx_id'
                                                                value={props.orderSummary.trx_id}
                                                                onChange={handleOrderSummaryInput}
                                                            />
                                                        </td>
                                                    </tr> : null
                                                }
                                            </tbody>
                                        </Table>
                                    </Card.Body>
                                    <Card.Footer className="text-center">
                                        <p className='mb-0'>Thank you for dining with us!</p>
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
}

export default ShowOrderConfirmation;
