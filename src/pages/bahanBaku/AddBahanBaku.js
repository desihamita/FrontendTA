import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Constants from '../../Constants'
import Swal from 'sweetalert2'
import Breadcrumb from '../../components/partials/Breadcrumb'
import CardHeader from '../../components/partials/miniComponent/CardHeader'

const AddBahanBaku = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState({ status: 1 })
    const [errors, setErrors] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [categories, setCategories] = useState([])
    const [subCategories, setSubCategories] = useState([])
    const [brands, setBrands] = useState([])
    const [suppliers, setSuppliers] = useState([])

    const getSuppliers = () => {
        axios.get(`${Constants.BASE_URL}/get-supplier-list`).then(res => {
            setSuppliers(res.data)
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

    const generateSku = (category_id, brand_id) => {
        const category = categories.find(cat => cat.id === category_id)
        const brand = brands.find(br => br.id === brand_id)

        const categoryCode = category ? category.name.slice(0, 2).toUpperCase() : 'C'
        const brandCode = brand ? brand.name.slice(0, 2).toUpperCase() : 'B'
        const uniqueIdentifier = Math.random().toString(36).substring(2, 7).toUpperCase()

        return `${categoryCode}${brandCode}-${uniqueIdentifier}`
    }

    const handleInput = (e) => {
        if (e.target.name == 'name') {
            let slug = e.target.value
            slug = slug.toLowerCase()
            slug = slug.replaceAll(' ', '-')
            setInput(prevState => ({ ...prevState, slug: slug }))
        } else if (e.target.name == 'category_id') {
            let category_id = parseInt(e.target.value);
            if (!Number.isNaN(category_id)) {
                getSubCategories(e.target.value)
            }
        }

        if (['category_id', 'brand_id'].includes(e.target.name)) {
            const category_id = e.target.name === 'category_id' ? parseInt(e.target.value) : input.category_id
            const brand_id = e.target.name === 'brand_id' ? parseInt(e.target.value) : input.brand_id
            const sku = generateSku(category_id, brand_id)
            setInput(prevState => ({ ...prevState, sku }))
        }

        setInput(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
    }

    const handlePhoto = (e) => {
        let file = e.target.files[0];
        if (file) {
          let reader = new FileReader();
          reader.onloadend = () => {
            setInput((prevState) => ({ ...prevState, photo: reader.result }));
            document.getElementById('fileLabel').innerText = file.name;
          };
          reader.readAsDataURL(file);
        }
      };

    const handleAttributeCreate = (e) => {
        e.preventDefault();
        setIsLoading(true)
        axios.post(`${Constants.BASE_URL}/attribute`, input).then(res => {
            setIsLoading(false)
            Swal.fire({
                position: 'top-end',
                icon: res.data.cls,
                title: res.data.msg,
                showConfirmButton: false,
                toast: true,
                timer: 1500
            })
            navigate('/bahan-baku')
        }).catch(errors => {
            setIsLoading(false)
            if (errors.response.status == 422) {
                setErrors(errors.response.data.errors)
            }
        })
    }

    useEffect(() => {
        getCategories()
        getBrands()
        getSuppliers()
    }, []);

    useEffect(() => {
        if (input.category_id && input.brand_id) {
            const sku = generateSku(input.category_id, input.brand_id)
            setInput(prevState => ({ ...prevState, sku }))
        }
    }, [categories, brands, input.category_id, input.brand_id])

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <Breadcrumb title="Tambah Bahan Baku" breadcrumb="Form Data" />
            </section>
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card card-warning card-outline">
                                <div className="card-header">
                                    <CardHeader 
                                        link={'/bahan-baku'} 
                                        btnText="Cancel"
                                        btn="btn btn-info"
                                        icon="fas fa-backspace"
                                    />
                                </div>
                                <form id="quickForm">
                                    <div className="card-body row">
                                        <div className="form-group col-md-6">
                                            <label>Name</label>
                                            <input
                                                className={errors.name != undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                                                type={'text'}
                                                name={'name'}
                                                value={input.name}
                                                onChange={handleInput}
                                                placeholder={'Enter Product name'}
                                            />
                                            {errors.name !== undefined && (
                                                <div className="invalid-feedback">
                                                    {errors.name[0]}
                                                </div>
                                            )}
                                        </div>
                                        <div className="form-group col-md-6 ">
                                            <label>Slug</label>
                                            <input
                                                className={errors.slug != undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                                                type={'text'}
                                                name={'slug'}
                                                value={input.slug}
                                                onChange={handleInput}
                                                placeholder={'Enter Product slug'}
                                            />
                                            {errors.slug !== undefined && (
                                                <div className="invalid-feedback">
                                                    {errors.slug[0]}
                                                </div>
                                            )}
                                        </div>
                                        <div className="form-group col-md-6 ">
                                            <label>Select Category</label>
                                            <select
                                                name={'category_id'}
                                                value={input.category_id}
                                                onChange={handleInput}
                                                className={errors.category_id !== undefined ? 'form-control is-invalid ' : 'form-control'}
                                            >
                                                <option disabled selected>Select Category Name</option>
                                                {categories.map((category, index) => (
                                                    <option value={category.id} key={index}>{category.name}</option>
                                                ))}
                                            </select>
                                            {errors.category_id !== undefined && (
                                                <div className="invalid-feedback">
                                                    {errors.category_id[0]}
                                                </div>
                                            )}
                                        </div>
                                        <div className="form-group col-md-6 ">
                                            <label>Select Sub Category</label>
                                            <select
                                                name={'sub_category_id'}
                                                value={input.sub_category_id}
                                                onChange={handleInput}
                                                className={errors.sub_category_id !== undefined ? 'form-control is-invalid ' : 'form-control'}
                                                disabled={input.category_id === undefined}
                                            >
                                                <option disabled selected>Select Sub Category</option>
                                                {subCategories.map((subCategory, index) => (
                                                    <option value={subCategory.id} key={index}>{subCategory.name}</option>
                                                ))}
                                            </select>
                                            {errors.sub_category_id !== undefined && (
                                                <div className="invalid-feedback">
                                                    {errors.sub_category_id[0]}
                                                </div>
                                            )}
                                        </div>
                                        <div className="form-group col-md-6 ">
                                            <label>Select Brands</label>
                                            <select
                                                name={'brand_id'}
                                                value={input.brand_id}
                                                onChange={handleInput}
                                                className={errors.brand_id !== undefined ? 'form-control is-invalid ' : 'form-control'}
                                            >
                                                <option disabled selected>Select Brand Name</option>
                                                {brands.map((brand, index) => (
                                                    <option value={brand.id} key={index}>{brand.name}</option>
                                                ))}
                                            </select>
                                            {errors.brand_id !== undefined && (
                                                <div className="invalid-feedback">
                                                    {errors.brand_id[0]}
                                                </div>
                                            )}
                                        </div>
                                        <div className="form-group col-md-6 ">
                                            <label>Select Supplier</label>
                                            <select
                                                name={'supplier_id'}
                                                value={input.supplier_id}
                                                onChange={handleInput}
                                                className={errors.supplier_id !== undefined ? 'form-control is-invalid ' : 'form-control'}
                                            >
                                                <option disabled selected>Select Product Origin</option>
                                                {suppliers.map((supplier, index) => (
                                                    <option value={supplier.id} key={index}>{supplier.name}</option>
                                                ))}
                                            </select>
                                            {errors.country_id !== undefined && (
                                                <div className="invalid-feedback">
                                                    {errors.country_id[0]}
                                                </div>
                                            )}
                                        </div>
                                        <div className="form-group col-md-6 ">
                                            <label>Price</label>
                                            <input
                                                className={errors.price != undefined ? 'form-control is-invalid' : 'form-control'}
                                                type={'number'}
                                                name={'price'}
                                                value={input.price}
                                                onChange={handleInput}
                                                placeholder={'Enter Product Price'}
                                            />
                                            {errors.price !== undefined && (
                                                <div className="invalid-feedback">
                                                {errors.price[0]}
                                                </div>
                                            )}
                                        </div>
                                        <div className="form-group col-md-6 ">
                                            <label>Stock</label>
                                            <input
                                                className={errors.stock != undefined ? 'form-control is-invalid' : 'form-control'}
                                                type={'number'}
                                                name={'stock'}
                                                value={input.stock}
                                                onChange={handleInput}
                                                placeholder={'Enter Product Stock'}
                                            />
                                            {errors.stock !== undefined && (
                                                <div className="invalid-feedback">
                                                {errors.stock[0]}
                                                </div>
                                            )}
                                        </div>
                                        <div className="form-group col-md-6 ">
                                            <label>Description</label>
                                            <textarea 
                                                name="description"
                                                value={input.description}
                                                onChange={handleInput} 
                                                className={errors.description !== undefined ? 'form-control is-invalid ' : 'form-control'}
                                                placeholder="Enter Product Description" 
                                            />
                                            {errors.description !== undefined && (
                                                <div className="invalid-feedback">
                                                {errors.description[0]}
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
                                                readOnly
                                                placeholder={'SKU'}
                                            />
                                            {errors.sku !== undefined && (
                                                <div className="invalid-feedback">
                                                    {errors.sku[0]}
                                                </div>
                                            )}
                                        </div>
                                        <div className="form-group col-md-6 ">
                                            <label>Status</label>
                                            <select
                                                name='status'
                                                value={input.status}
                                                onChange={handleInput}
                                                className={errors.status !== undefined ? 'form-control select2 is-invalid ' : 'form-control'}
                                            >
                                                <option disabled={true}>Select Product Status</option>
                                                <option value={1}>Active</option>
                                                <option value={2}>Inactive</option>
                                            </select>
                                            {errors.status !== undefined && (
                                                <div className="invalid-feedback">
                                                {errors.status[0]}
                                                </div>
                                            )}
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="exampleInputFile">Photo</label>
                                            <div className="input-group">
                                                <div className="custom-file">
                                                <input type="file" name="photo" className="custom-file-input" id="exampleInputFile" onChange={handlePhoto} />
                                                <label id="fileLabel" className="custom-file-label" htmlFor="exampleInputFile">Choose file</label>
                                                </div>
                                                {errors.photo && <div className="invalid-feedback">{errors.photo[0]}</div>}
                                            </div>
                                            {input.photo && (
                                                <div className="card-body">
                                                    <img className="img-fluid w-50 h-50" src={input.photo} alt="photo" />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <button className="btn btn-warning w-30" onClick={handleAttributeCreate} dangerouslySetInnerHTML={{__html: isLoading ? '<span class="spinner-border spinner-border-sm" aria-hidden="true"></span> Loading...' : 'Add Ingredients'}} />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AddBahanBaku
