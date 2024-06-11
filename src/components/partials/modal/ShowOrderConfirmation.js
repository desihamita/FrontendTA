import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Row, Table } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import Logo from '../../../assets/img/logo12.png'
import Moment from 'react-moment'
import { formatRupiah } from '../numberFormat'

const ShowOrderConfirmation = (props) => {
    const [branch, setBranch] = useState({})

    useEffect(() => {
        if(localStorage.branch != undefined) {
          console.log(branch)
          setBranch(JSON.parse(localStorage.branch))
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
                        <Col md="8">
                            <Card>
                                <Card.Header className="text-center">
                                    <img src={Logo} alt='logo' className='img-fluid' />
                                    <p>123 Main Street, Anytown, USA</p>
                                    <p>Phone: (123) 456-7890</p>
                                </Card.Header>
                                <Card.Body>
                                    <h5>Order Details</h5>
                                    <Row>
                                        <dt class="col-sm-4">Date</dt>
                                        <dd class="col-sm-8">
                                            <Moment format="dddd, DD/MM/YYYY HH:mm"></Moment>
                                        </dd>

                                        <dt class="col-sm-4">Order No</dt>
                                        <dd class="col-sm-8">{Math.floor(Math.random() * 100000)}</dd>
                                        
                                        <dt class="col-sm-4">Customer</dt>
                                        <dd class="col-sm-8">{props.orderSummary.customer.split('-')[0]}</dd>
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
                                                <tr>
                                                    <td>{++index}</td>
                                                    <td>{props.carts[key].name}</td>
                                                    <td>{props.carts[key].quantity}</td>
                                                    <td>{props.carts[key].price}</td>
                                                    <td>
                                                        {formatRupiah(props.carts[key].original_price * props.carts[key].quantity)}
                                                    </td>
                                                </tr>
                                            ))}
                                            <tr>
                                                <td colSpan="4" className="text-right"><strong>Sub Total</strong></td>
                                                <td>{formatRupiah(props.orderSummary.amount)}</td>
                                            </tr>
                                            <tr>
                                                <td colSpan="4" className="text-right"><strong>Discount</strong></td>
                                                <td>{formatRupiah(props.orderSummary.discount)}</td>
                                            </tr>
                                            <tr>
                                                <td colSpan="4" className="text-right"><strong>Total</strong></td>
                                                <td>{formatRupiah(props.orderSummary.pay_able)}</td>
                                            </tr>
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
                    <button className='btn btn-sm btn-warning ml-3'>Confirm</button> 
                </div>
            </Modal.Footer>
        </Modal>
    </>
    )
}

export default ShowOrderConfirmation