import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Constants from '../../Constants'
import Swal from 'sweetalert2'
import Modal from 'react-bootstrap/Modal'
import { useNavigate } from 'react-router-dom'

const ModalAddAttribute = () => {
  const navigate = useNavigate()
  const [input, setInput] = useState({ name: '', status: 1 })
  const [errors, setErrors] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [modalShow, setModalShow] = useState(false)

  const [categories, setCategories] = useState([])
  const [subCategories, setSubCategories] = useState([])  
  const [brands, setBrands] = useState([])
  const [suppliers, setSuppliers] = useState([])
  const [attributes, setAttributes] = useState([])

  const getAttributes = () => {
    axios.get(`${Constants.BASE_URL}/get-attribute-list`).then(res => {
        setAttributes(res.data)
    })
  }

  const getCategories = () => {
    axios.get(`${Constants.BASE_URL}/get-category-list`).then(res => {
        setCategories(res.data)
    })
  }

  const getBrands = () => {
    axios.get(`${Constants.BASE_URL}/get-brand-list`).then(res => {
        setBrands(res.data)
    })
  }

  const getSubCategories = (category_id) => {
    axios.get(`${Constants.BASE_URL}/get-sub-category-list/${category_id}`).then(res => {
        setSubCategories(res.data)
    })
  }

  const getSuppliers = () => {
    axios.get(`${Constants.BASE_URL}/get-supplier-list`).then(res => {
        setSuppliers(res.data)
    })
  }

  const handleInput = (e) => {
    if (e.target.name == 'name') {
        let slug = e.target.value
        slug = slug.toLowerCase()
        slug = slug.replaceAll(' ', '-')
        setInput(prevState => ({...prevState, slug: slug}))
    } else if (e.target.name == 'category_id') {
        let category_id = parseInt(e.target.value);
        if (!Number.isNaN(category_id)) {
            getSubCategories(e.target.value)
        }
    }
    setInput(prevState => ({...prevState, [e.target.name]: e.target.value}))
  }

  const handleAttributeCreate = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios.post(`${Constants.BASE_URL}/attribute`, input).then(res => {
        setIsLoading(false);
        Swal.fire({
            position: "top-end",
            icon: res.data.cls,
            title: res.data.msg,
            showConfirmButton: false,
            toast: true,
            timer: 1500
        });
        setErrors([]);
        setInput({ name: '', status: 1 });
        setModalShow(false);
        getAttributes();
        navigate('/product-attribute');
    }).catch(errors => {
        setIsLoading(false);
        if (errors.response && errors.response.status === 422) {
            setErrors(errors.response.data.errors);
        }
    });
  };

  useEffect(() => {
    getCategories()
    getBrands()
    getSuppliers()
  }, [])

  return (
    <Modal
        centered
        show={modalShow}
        onHide={() => setModalShow(false)}
        closeButton="true"
    >
        <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
            Add Ingredients
        </Modal.Title>
        <button className="close" onClick={() => setModalShow(false)}>
            <span aria-hidden="true">&times;</span>
        </button>
        </Modal.Header>
        <Modal.Body>
        <div className="form-group">
            <label>Name</label>
            <input 
                type="text" 
                name="name"
                value={input.name}
                onChange={handleInput} 
                className={errors.name !== undefined ? 'form-control is-invalid ' : 'form-control'}
                placeholder="Enter Product Attribute Name" 
            />
            {errors.name !== undefined && (
                <div className="invalid-feedback">
                {errors.name[0]}
                </div>
            )}
        </div>
        <div className="form-group">
            <label>Price</label>
            <input
            className={errors.price !== undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
            type={'number'}
            name={'price'}
            value={input.price}
            onChange={handleInput}
            placeholder={'Enter Product Price'}
            />
            {errors.price && (
            <div className="invalid-feedback">
                {errors.price[0]}
            </div>
            )}
        </div>
        <div className="form-group">
            <label>Select Category</label>
            <select
            className={errors.category_id !== undefined ? 'form-control  is-invalid' : 'form-control '}
            name={'category_id'}
            value={input.category_id}
            onChange={handleInput}
            placeholder={'Select product category'}
            >
            <option>Select Category</option>
            {categories.map((category, index) => (
                <option value={category.id} key={index}>{category.name}</option>
            ))}

            </select>
            {errors.category_id && (
            <div className="invalid-feedback">
                {errors.category_id[0]}
            </div>
            )}
        </div>
        <div className="form-group">
            <label>Select Sub Category</label>
            <select
            className={errors.sub_category_id !== undefined ? 'form-control is-invalid' : 'form-control '}
            name={'sub_category_id'}
            value={input.sub_category_id}
            onChange={handleInput}
            placeholder={'Select product sub category'}
            disabled={input.category_id === undefined}
            >
            <option>Select Sub Category</option>
            {subCategories.map((sub_category, index) => (
                <option value={sub_category.id} key={index}>{sub_category.name}</option>
            ))}
            </select>
            {errors.sub_category_id && (
            <div className="invalid-feedback">
                {errors.sub_category_id[0]}
            </div>
            )}
        </div>
        <div className="form-group">
            <label>Select Brands</label>
            <select
            className={errors.brand_id !== undefined ? 'form-control is-invalid' : 'form-control'}
            name={'brand_id'}
            value={input.brand_id}
            onChange={handleInput}
            placeholder={'Select product brand'}
            >
            <option>Select Brand</option>
            {brands.map((brand, index) => (
                <option value={brand.id} key={index}>{brand.name}</option>
            ))}
            </select>
            {errors.brand_id && (
            <div className="invalid-feedback">
                {errors.brand_id[0]}
            </div>
            )}
        </div>
        <div className="form-group">
            <label>Supplier</label>
            <select
            className={errors.supplier_id !== undefined ? 'form-control  is-invalid' : 'form-control '}
            name={'supplier_id'}
            value={input.supplier_id}
            onChange={handleInput}
            placeholder={'Select product supplier'}
            >
            <option>Select Product Supplier</option>
            {suppliers.map((supplier, index) => (
                <option value={supplier.id}
                        key={index}>{supplier.name} - {supplier.phone}</option>
            ))}
            </select>
            {errors.supplier_id && (
            <div className="invalid-feedback">
                {errors.supplier_id[0]}
            </div>
            )}
        </div>
        <div className="form-group">
            <label>Status</label>
            <select
                name='status'
                value={input.status}
                onChange={handleInput}
                className={errors.status !== undefined ? 'form-control select2 is-invalid ' : 'form-control'}
                placeholder="Select Product Attribute Status"
            >
                <option value="" disabled>Select Attribute Status</option>
                <option value={1}>Active</option>
                <option value={2}>Inactive</option>
            </select>
            {errors.status && (
            <div className="invalid-feedback">
                {errors.status[0]}
            </div>
            )}
        </div>
        
        <div className="form-group col-md-6">
            <label>Product Stock</label>
            <input
            className={errors.stock !== undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
            type={'number'}
            name={'stock'}
            value={input.stock}
            onChange={handleInput}
            placeholder={'Enter Product Stock'}
            />
            {errors.stock && (
            <div className="invalid-feedback">
                {errors.stock[0]}
            </div>
            )}
        </div>
        <div className="form-group col-md-6">
            <label>SKU</label>
            <input
            className={errors.sku !== undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
            type={'text'}
            name={'sku'}
            value={input.sku}
            onChange={handleInput}
            placeholder={'Enter Product SKU'}
            />
            {errors.sku && (
            <div className="invalid-feedback">
                {errors.sku[0]}
            </div>
            )}
        </div>
        <div className="form-group col-md-6">
            <label>Description</label>
            <textarea
            className={errors.description !== undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
            name={'description'}
            value={input.description}
            onChange={handleInput}
            placeholder={'Enter product description'}
            />
            {errors.description && (
            <div className="invalid-feedback">
                {errors.description[0]}
            </div>
            )}
        </div>
        <div className="modal-footer justify-content-between">
            <button className="btn btn-warning" onClick={() => handleAttributeCreate()} dangerouslySetInnerHTML={{__html: isLoading ? '<span class="spinner-border spinner-border-sm" aria-hidden="true"></span> Loading...' : `Add Ingredients` }}/>
        </div>
        </Modal.Body>
    </Modal>
  )
}

export default ModalAddAttribute