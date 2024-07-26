import React from 'react';
import Modal from 'react-bootstrap/Modal';

const ItemDetailsModal = (props) => {
    const { items = {} } = props;

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
                                <td>{items.id}</td>
                            </tr>
                            <tr>
                                <th>Kuantitas</th>
                                <td>{items.quantity }</td>
                            </tr>
                            <tr>
                                <th>Tanggal</th>
                                <td>{items.date }</td>
                            </tr>
                            <tr>
                                <th>Keterangan</th>
                                <td>{items.keterangan }</td>
                            </tr>
                            <tr>
                                <th>Karyawan</th>
                                <td>{items.sales_manager }</td>
                            </tr>
                            <tr>
                                <th>Kafe</th>
                                <td>{items.shop }</td>
                            </tr>
                        </tbody>
                    </table>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ItemDetailsModal;
