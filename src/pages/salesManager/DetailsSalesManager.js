import React from 'react'
import Modal from 'react-bootstrap/Modal'

const DetailsSalesManager = (props) => {
  return (
    <>
        <Modal
            {...props}
            size={props.size}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="sales_manager_details_modal">
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
                            <td>{props.sales.id}</td>
                        </tr>
                        <tr>
                            <th>Nama</th>
                            <td>{props.sales.name}</td>
                        </tr>
                        <tr>
                            <th>No Telepon</th>
                            <td>{props.sales.phone}</td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td>{props.sales.email}</td>
                        </tr>
                        <tr>
                            <th>Status</th>
                            <td>{props.sales.status}</td>
                        </tr>
                        <tr>
                            <th>Dibuat Oleh</th>
                            <td>{props.sales.created_by}</td>
                        </tr>
                        <tr>
                            <th>Dibuat</th>
                            <td>{props.sales.created_at}</td>
                        </tr>
                        <tr>
                            <th>Diubah</th>
                            <td>{props.sales.updated_at}</td>
                        </tr>
                        <tr>
                            <th>Alamat</th>
                            <td>
                                {
                                    `${props.sales.address?.address}
                                    ${props.sales.address?.division}
                                    ${props.sales.address?.district}
                                    ${props.sales.address?.subDistrict}
                                    ${props.sales.address?.area}
                                    ${props.sales.address?.landmark}`
                                }   
                            </td>
                        </tr>
                        <tr>
                            <th>Foto</th>
                            <td><img src={props.sales.photo} className='img-thumbnail' alt='Photo' /></td>
                        </tr>
                    </tbody>
                </table>
            </Modal.Body>
        </Modal>
    </>
  )
}

export default DetailsSalesManager