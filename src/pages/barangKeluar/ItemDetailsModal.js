import React from 'react';
import Modal from 'react-bootstrap/Modal';

const ItemDetailsModal = (props) => {
    const { items = {} } = props; // Provide a default empty object if items is undefined

    return (
        <>
            <Modal
                {...props}
                size={props.size}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title id="item_details_modal">
                        {props.title}
                    </Modal.Title>
                    <button className="close" onClick={props.onHide}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <table className='table table-hover table-striped table-bordered'>
                        <tbody>
                            <tr>
                                <th>ID</th>
                                <td>{items.id || 'N/A'}</td>
                            </tr>
                            <tr>
                                <th>Quantity</th>
                                <td>{items.quantity || 'N/A'}</td>
                            </tr>
                            <tr>
                                <th>Date</th>
                                <td>{items.date || 'N/A'}</td>
                            </tr>
                            <tr>
                                <th>Keterangan</th>
                                <td>{items.keterangan || 'N/A'}</td>
                            </tr>
                            <tr>
                                <th>Karyawan</th>
                                <td>{items.sales_manager || 'N/A'}</td>
                            </tr>
                            <tr>
                                <th>Cafe</th>
                                <td>{items.shop || 'N/A'}</td>
                            </tr>
                        </tbody>
                    </table>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ItemDetailsModal;
