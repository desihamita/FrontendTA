import axios from 'axios';
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Constants from '../../../Constants';
import Swal from 'sweetalert2';
import { Navigate } from 'react-router-dom';

const AddCustomer = ({setModalShow, ...props}) => {
    const [input, setInput] = useState({});
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleInput = (e) => {
        setInput((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    };

    const handleCustomerCreate = (e) => {
        e.preventDefault(e)
        setIsLoading(true)
        axios.post(`${Constants.BASE_URL}/customer`, input).then(res => {
          setIsLoading(false)
          Swal.fire({
            position: 'top-end',
            icon: res.data.cls,
            title: res.data.msg,
            showConfirmButton: false,
            toast: true,
            timer: 1500
          });
          setModalShow(false);
        }).catch(errors => {
          setIsLoading(false)
          if (errors.response.status === 422) {
            setErrors(errors.response.data.errors)
          }
        })
    }
    
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
                Add Customer
                </Modal.Title>
                <button className="close" onClick={props.onHide}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </Modal.Header>
            <Modal.Body>
                <div className="form-group col-md-6">
                    <label>Name</label>
                    <input
                        className={errors.name !== undefined ? 'form-control  is-invalid' : 'form-control '}
                        type={'text'}
                        name={'name'}
                        value={input.name}
                        onChange={handleInput}
                        placeholder={'Enter Customer name'}
                    />
                    {errors.name && (
                    <div className="invalid-feedback">
                        {errors.name[0]}
                    </div>
                    )}
                </div>
                <div className="form-group col-md-6">
                    <label>Phone</label>
                    <input
                        className={errors.phone !== undefined ? 'form-control  is-invalid' : 'form-control '}
                        type={'text'}
                        name={'phone'}
                        value={input.phone}
                        onChange={handleInput}
                        placeholder={'Enter Customer phone'}
                    />
                    {errors.phone && (
                    <div className="invalid-feedback">
                        {errors.phone[0]}
                    </div>
                    )}
                </div>
                <div className="form-group col-md-6">
                    <label>Email</label>
                    <input
                        className={errors.email !== undefined ? 'form-control  is-invalid' : 'form-control '}
                        type={'text'}
                        name={'email'}
                        value={input.email}
                        onChange={handleInput}
                        placeholder={'Enter Customer email'}
                    />
                    {errors.email && (
                    <div className="invalid-feedback">
                        {errors.email[0]}
                    </div>
                    )}
                </div>
                <button 
                    className={'btn btn-warning'} 
                    onClick={handleCustomerCreate}
                    dangerouslySetInnerHTML={{__html: isLoading ? '<span class="spinner-border spinner-border-sm" aria-hidden="true"></span> Loading...' : 'Add Customer'}}
                />
            </Modal.Body>
        </Modal>
    </>
    )
}

export default AddCustomer