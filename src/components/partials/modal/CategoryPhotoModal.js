import React from 'react'
import Modal from 'react-bootstrap/Modal';

const CategoryPhotoModal = (props) => {
    return (
        <>
        <Modal
            {...props}
            size={props.size}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.title}
                </Modal.Title>
                <button className="close" onClick={props.onHide}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </Modal.Header>
            <Modal.Body>
                <img src={props.photo} className='img-thumbnail' alt='Photo' />
            </Modal.Body>
        </Modal>
        </>
    )
}

export default CategoryPhotoModal
