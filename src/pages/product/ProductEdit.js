import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../components/partials/Breadcrumb';
import Swal from 'sweetalert2';
import Constants from '../../Constants';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import CardHeader from '../../components/partials/miniComponent/CardHeader';

const ProductEdit = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    status: 1,
    category_id: '',
    sub_category_id: '',
  })
  
  const [attribute_input, setAttribute_input] = useState({})
  const [errors, setErrors] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const [categories, setCategories] = useState([])
  const [subCategories, setSubCategories] = useState([])


  const getProduct = async () => {
    try {
        const res = await axios.get(`${Constants.BASE_URL}/product/${params.id}`);
        setInput(res.data.edit); 
        getSubCategories(res.data.edit.sub_category_id);
    } catch (error) {
        console.error('Error fetching attribute:', error);
    }
};

  const getCategories = async () => {
    try {
        const res = await axios.get(`${Constants.BASE_URL}/get-category-list`);
        setCategories(res.data);
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
  };

  const getSubCategories = async (category_id) => {
    try {
        const res = await axios.get(`${Constants.BASE_URL}/get-sub-category-list/${category_id}`);
        setSubCategories(res.data);
    } catch (error) {
        console.error('Error fetching sub categories:', error);
    }
  };

  const handleInput = (e) => {
    if (e.target.name === 'name') {
      let slug = e.target.value
      slug = slug.toLowerCase()
      slug = slug.replaceAll(' ', '-')
      setInput(prevState => ({...prevState, slug: slug}))
    } else if (e.target.name === 'category_id') {
      let category_id = parseInt(e.target.value);
      if (!Number.isNaN(category_id)) {
        getSubCategories(e.target.value)
      }
    }

    setInput(prevState => ({...prevState, [e.target.name]: e.target.value}))
  }

  const handlePhoto = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onloadend = () => {
        setInput((prevState) => ({ ...prevState, photo: reader.result }));
        document.getElementById('fileLabel').innerText = file.name;
    };
    reader.readAsDataURL(file);
  };
  
  const handleProductUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.put(`${Constants.BASE_URL}/product/${params.id}`, input);
      setIsLoading(false);
      Swal.fire({
        position: 'top-end',
        icon: res.data.cls,
        title: res.data.msg,
        showConfirmButton: false,
        toast: true,
        timer: 1500,
      });
      navigate('/product');
    } catch (errors) {
      setIsLoading(false);
      if (errors.response.status === 422) {
        setErrors(errors.response.data.errors);
      }
    }
  };

  useEffect(() => {
    getProduct()
    getCategories()
  }, []);

  useEffect(()=>{
    setInput(prevState => ({...prevState, attributes: attribute_input}))
  }, [attribute_input])

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <Breadcrumb title="Ubah Produk" breadcrumb="Form Data" />
      </section>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="card card-warning card-outline">
                <div className="card-header">
                  <CardHeader 
                    link={'/product'} 
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
                        className={errors.name !== undefined ? 'form-control  is-invalid' : 'form-control '}
                        type={'text'}
                        name={'name'}
                        value={input.name}
                        onChange={handleInput}
                        placeholder={'Enter Product name'}
                      />
                      {errors.name && (
                        <div className="invalid-feedback">
                          {errors.name[0]}
                        </div>
                      )}
                    </div>
                    <div className="form-group col-md-6">
                      <label>Slug</label>
                      <input
                        className={errors.slug !== undefined ? 'form-control  is-invalid' : 'form-control '}
                        type={'text'}
                        name={'slug'}
                        value={input.slug}
                        onChange={handleInput}
                        placeholder={'Enter Product slug'}
                      />
                      {errors.slug && (
                        <div className="invalid-feedback">
                          {errors.slug[0]}
                        </div>
                      )}
                    </div>
                    <div className="form-group col-md-6">
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
                    <div className="form-group col-md-6">
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
                    <div className="form-group col-md-6">
                      <label>Status</label>
                      <select
                        className={errors.status !== undefined ? 'form-control is-invalid' : 'form-control'}
                        name={'status'}
                        value={input.status}
                        onChange={handleInput}
                        placeholder={'Select product status'}
                      >
                        <option value={1}>Active</option>
                        <option value={0}>Inactive</option>
                      </select>
                      {errors.status && (
                        <div className="invalid-feedback">
                          {errors.status[0]}
                        </div>
                      )}
                    </div>
                    <div className="form-group col-md-6">
                      <label>Cost</label>
                      <input
                          className={errors.cost !== undefined ? 'form-control is-invalid' : 'form-control'}
                          type={'number'}
                          name={'cost'}
                          value={input.cost}
                          onChange={handleInput}
                          placeholder={'Enter Product cost'}
                      />
                      {errors.cost && (
                        <div className="invalid-feedback">
                          {errors.cost[0]}
                        </div>
                      )}
                    </div>
                    <div className="form-group col-md-6">
                      <label>Price</label>
                      <input
                        className={errors.price !== undefined ? 'form-control is-invalid' : 'form-control'}
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
                    <div className="form-group col-md-6">
                      <label>Discount %</label>
                      <input
                        className={errors.discount_percent !== undefined ? 'form-control is-invalid' : 'form-control mt-2'}
                        type={'number'}
                        name={'discount_percent'}
                        value={input.discount_percent}
                        onChange={handleInput}
                        placeholder={'Enter Product Discount (%)'}
                      />
                      {errors.discount_percent && (
                        <div className="invalid-feedback">
                          {errors.discount_percent[0]}
                        </div>
                      )}
                    </div>
                    <div className="form-group col-md-6">
                      <label>Discount Fixed Amount</label>
                      <input
                        className={errors.discount_fixed !== undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                        type={'number'}
                        name={'discount_fixed'}
                        value={input.discount_fixed}
                        onChange={handleInput}
                        placeholder={'Enter Product Discount Fixed'}
                      />
                      {errors.discount_fixed && (
                        <div className="invalid-feedback">
                          {errors.discount_fixed[0]}
                        </div>
                      )}
                    </div>
                    <div className="form-group col-md-6">
                      <label>Discount Start Date</label>
                      <input
                        className={errors.discount_start !== undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                        type={'datetime-local'}
                        name={'discount_start'}
                        value={input.discount_start}
                        onChange={handleInput}
                        placeholder={'Enter Discount Start Date'}
                      />
                      {errors.discount_start && (
                        <div className="invalid-feedback">
                          {errors.discount_start[0]}
                        </div>
                      )}
                    </div>
                    <div className="form-group col-md-6">
                      <label>Discount End Date</label>
                      <input
                        className={errors.discount_end !== undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                        type={'datetime-local'}
                        name={'discount_end'}
                        value={input.discount_end}
                        onChange={handleInput}
                        placeholder={'Enter Discount End Date'}
                      />
                      {errors.discount_end && (
                        <div className="invalid-feedback">
                          {errors.discount_end[0]}
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
                        readOnly
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
                      <div className="form-group col-md-6">
                        <label htmlFor="exampleInputFile">Photo</label>
                        <div className="input-group">
                          <div className="custom-file">
                            <input type="file" name="photo" className="custom-file-input" id="exampleInputFile" onChange={handlePhoto} />
                            <label id="fileLabel" className="custom-file-label" htmlFor="exampleInputFile">Choose file</label>
                          </div>
                          {errors.photo && <div className="invalid-feedback">{errors.photo[0]}</div>}
                        </div>
                        {(input.photo || input.photo_preview !== undefined) && (
                          <div className="card-body">
                            <img className="img-fluid w-50 h-50" src={input.photo === undefined ? input.photo_preview : input.photo} alt="Photo" />
                          </div>
                        )}
                      </div>
                  </div>
                  <div className="card-footer">
                    <button className={'btn btn-warning'} onClick={handleProductUpdate}
                      dangerouslySetInnerHTML={{__html: isLoading ? '<span class="spinner-border spinner-border-sm" aria-hidden="true"></span> Loading...' : 'Next'}}
                    />
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

export default ProductEdit