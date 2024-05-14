import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const CategoryDetailsModal = (props) => {
    return (
        <>
        <Modal
            {...props}
            size={props.size}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="category_details_modal">
                    {props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <table className='table table-hover table-striped table-bordered'>
                    <tbody>
                        <tr>
                            <th>ID</th>
                            <th>{props.category.id}</th>
                        </tr>
                        <tr>
                            <th>Name</th>
                            <th>{props.category.name}</th>
                        </tr>
                        <tr>
                            <th>Slug</th>
                            <th>{props.category.slug}</th>
                        </tr>
                        <tr>
                            <th>Description</th>
                            <th>{props.category.description}</th>
                        </tr>
                        <tr>
                            <th>Serial</th>
                            <th>{props.category.serial}</th>
                        </tr>
                        <tr>
                            <th>Status</th>
                            <th>{props.category.status}</th>
                        </tr>
                        <tr>
                            <th>Created By</th>
                            <th>{props.category.created_by}</th>
                        </tr>
                        <tr>
                            <th>Created At</th>
                            <th>{props.category.created_at}</th>
                        </tr>
                        <tr>
                            <th>Updated At</th>
                            <th>{props.category.updated_at}</th>
                        </tr>
                        <tr>
                            <th>Photo</th>
                            <th><img src={props.category.photo} className='img-thumbnail' alt='Photo' /></th>
                        </tr>
                    </tbody>
                </table>
            </Modal.Body>
        </Modal>
        </>
    )
}

export default CategoryDetailsModal
