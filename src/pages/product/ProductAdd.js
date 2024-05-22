/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from 'react'
import Breadcrumb from '../../components/partials/Breadcrumb'
import Swal from 'sweetalert2';
import Constants from '../../Constants';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductAdd = () => {
  const navigate = useNavigate()
  const [input, setInput] = useState({status: 1, })
  const [errors, setErrors] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const [categories, setCategories] = useState([])
  const [subCategories, setSubCategories] = useState([])
  const [brands, setBrands] = useState([])
  const [countries, setCountries] = useState([])
  const [providers, setProviders] = useState([])
  const [attributes, setAttributes] = useState([])

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
  
  const getCountries = () => {
    axios.get(`${Constants.BASE_URL}/get-country-list`).then(res => {
        setCountries(res.data)
    })
  }
  
  const handleInput = (e) => {
    if (e.target.name === 'name') {
        let slug = e.target.value
        slug = slug.toLowerCase()
        slug = slug.replaceAll(' ','-')
        setInput(prevState =>  ({...prevState, slug: slug}))
    } else if (e.target.name === 'category_id') {
        let category_id = parseInt(e.target.value)
        if(!Number.isNaN(category_id)) {
            getSubCategories(e.target.value)
        }
    }
    setInput(prevState => ({...prevState, [e.target.name] : e.target.value}));
  }

  const handlePhoto = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onloadend = () => {
        setInput(prevState => ({...prevState, logo: reader.result}));
        document.getElementById('fileLabel').innerText = file.name;
    };
    reader.readAsDataURL(file);
  };
  
  const handleProductCreate = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios.post(`${Constants.BASE_URL}/product`, input).then(res => {
        setIsLoading(false);
        Swal.fire({
            position: "top-end",
            icon: res.data.cls,
            title: res.data.msg,
            showConfirmButton: false,
            toast: true,
            timer: 1500
        });
        navigate('/product');
    }).catch(errors => {
        setIsLoading(false);
        if(errors.response.status === 422) {
          setErrors(errors.response.data.errors);
        }
    });
  };
  
  useEffect(() => {
    getCategories()
    getBrands()
    getCountries()
  }, [])

  return (
    <div className="content-wrapper">
        <section className="content-header">
            <Breadcrumb title="Add Product" breadcrumb="Form Data" />
        </section>
        <section className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card card-warning card-outline">
                            <form id="quickForm">
                                <div className="card-body row">
                                    <div className="form-group col-md-6">
                                        <label>Name</label>
                                        <input 
                                            type="text" 
                                            name="name"
                                            value={input.name}
                                            onChange={handleInput} 
                                            className={errors.name !== undefined ? 'form-control is-invalid ' : 'form-control'}
                                            placeholder="Enter Product Name" 
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
                                            type="text" 
                                            name="slug"
                                            value={input.slug}
                                            onChange={handleInput} 
                                            className={errors.slug !== undefined ? 'form-control is-invalid ' : 'form-control'}
                                            placeholder="Enter Product Name" 
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
                                        <label>Select Product Origin</label>
                                        <select 
                                            name={'country_id'}
                                            value={input.country_id}
                                            onChange={handleInput} 
                                            className={errors.country_id !== undefined ? 'form-control is-invalid ' : 'form-control'}
                                        >
                                            <option disabled selected>Select Product Origin</option>
                                            {countries.map((country, index) => (
                                                <option value={country.id} key={index}>{country.name}</option>
                                            ))}
                                        </select>
                                        {errors.country_id !== undefined && (
                                            <div className="invalid-feedback">
                                            {errors.country_id[0]}
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
                                        <label htmlFor="exampleInputFile">Photo</label>
                                        <div className="input-group">
                                            <div className="custom-file">
                                                <input type="file" name="photo" className="custom-file-input" id="exampleInputFile" onChange={handlePhoto} />
                                                <label id="fileLabel" className="custom-file-label" htmlFor="exampleInputFile">Choose file</label>
                                            </div>
                                            {errors.photo !== undefined && (
                                                <div className="invalid-feedback">
                                                    {errors.photo[0]}
                                                </div>
                                            )}
                                        </div>
                                        {input.photo && (
                                            <div className="card-body">
                                                <img className="img-fluid w-50 h-50" src={input.photo} alt="Photo" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <button className="btn btn-warning w-30" onClick={handleProductCreate} dangerouslySetInnerHTML={{__html: isLoading ? '<span class="spinner-border spinner-border-sm" aria-hidden="true"></span> Loading...' : 'Add Product'}} />
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
/*
  1. title
  2. slug
  3. description
  4. category_id
  5. sub_category_id
  6. status
  7. buying_price
  8. selling_price
  8. stock
  
*/
export default ProductAdd