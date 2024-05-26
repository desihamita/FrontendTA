import React from 'react'
import Modal from 'react-bootstrap/Modal'

const DetailsSupplier = (props) => {
  return (
    <>
        <Modal
            {...props}
            size={props.size}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="supplier_details_modal">
                    {props.title}
                </Modal.Title>
                <button className="close" onClick={props.onHide}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </Modal.Header>
            <Modal.Body>
                <table className='table table-hover table-lg table-striped table-bordered'>
                    <tbody>
                        <tr>
                            <th>ID</th>
                            <td>{props.supplier.id}</td>
                        </tr>
                        <tr>
                            <th>Name</th>
                            <td>{props.supplier.name}</td>
                        </tr>
                        <tr>
                            <th>Phone</th>
                            <td>{props.supplier.phone}</td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td>{props.supplier.email}</td>
                        </tr>
                        <tr>
                            <th>Status</th>
                            <td>{props.supplier.status}</td>
                        </tr>
                        <tr>
                            <th>Created By</th>
                            <td>{props.supplier.created_by}</td>
                        </tr>
                        <tr>
                            <th>Created At</th>
                            <td>{props.supplier.created_at}</td>
                        </tr>
                        <tr>
                            <th>Updated At</th>
                            <td>{props.supplier.updated_at}</td>
                        </tr>
                        <tr>
                            <th>Address</th>
                            <td>
                                {
                                    `${props.supplier.address?.address}
                                    ${props.supplier.address?.division}
                                    ${props.supplier.address?.district}
                                    ${props.supplier.address?.subDistrict}
                                    ${props.supplier.address?.area}
                                    ${props.supplier.address?.landmark}`
                                }   
                            </td>
                        </tr>
                        <tr>
                            <th>Logo</th>
                            <td><img src={props.supplier.logo} className='img-thumbnail' alt='Logo' /></td>
                        </tr>
                    </tbody>
                </table>
            </Modal.Body>
        </Modal>
    </>
  )
}

export default DetailsSupplier