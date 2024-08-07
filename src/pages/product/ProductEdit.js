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
        //document.getElementById('fileLabel').innerText = file.name;
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
                <form id="quickForm">
                  <div className="card-body row">
                    <div className="form-group col-md-6">
                      <label>Nama</label>
                      <input
                        className={errors.name !== undefined ? 'form-control  is-invalid' : 'form-control '}
                        type={'text'}
                        name={'name'}
                        value={input.name}
                        onChange={handleInput}
                        placeholder={'Enter Nama Produk'}
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
                        placeholder={'Enter Slug Produk'}
                      />
                      {errors.slug && (
                        <div className="invalid-feedback">
                          {errors.slug[0]}
                        </div>
                      )}
                    </div>
                    <div className="form-group col-md-6">
                      <label>Kategori</label>
                      <select
                        className={errors.category_id !== undefined ? 'form-control  is-invalid' : 'form-control '}
                        name={'category_id'}
                        value={input.category_id}
                        onChange={handleInput}
                      >
                        <option>Pilih Kategori</option>
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
                      <label>Sub Kategori</label>
                      <select
                        className={errors.sub_category_id !== undefined ? 'form-control is-invalid' : 'form-control '}
                        name={'sub_category_id'}
                        value={input.sub_category_id}
                        onChange={handleInput}
                        disabled={input.category_id === undefined}
                      >
                        <option>Pilih Sub Kategori</option>
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
                      <label>Biaya</label>
                      <input
                          className={errors.cost !== undefined ? 'form-control is-invalid' : 'form-control'}
                          type={'number'}
                          name={'cost'}
                          value={input.cost}
                          onChange={handleInput}
                          placeholder={'Enter Biaya Produk'}
                      />
                      {errors.cost && (
                        <div className="invalid-feedback">
                          {errors.cost[0]}
                        </div>
                      )}
                    </div>
                    <div className="form-group col-md-6">
                      <label>Harga</label>
                      <input
                        className={errors.price !== undefined ? 'form-control is-invalid' : 'form-control'}
                        type={'number'}
                        name={'price'}
                        value={input.price}
                        onChange={handleInput}
                        placeholder={'Enter Harga Produk'}
                      />
                      {errors.price && (
                        <div className="invalid-feedback">
                          {errors.price[0]}
                        </div>
                      )}
                    </div>
                    <div className="form-group col-md-6">
                      <label>Diskon %</label>
                      <input
                        className={errors.discount_percent !== undefined ? 'form-control is-invalid' : 'form-control '}
                        type={'number'}
                        name={'discount_percent'}
                        value={input.discount_percent}
                        onChange={handleInput}
                        placeholder={'Enter Diskon (%) Produk'}
                      />
                      {errors.discount_percent && (
                        <div className="invalid-feedback">
                          {errors.discount_percent[0]}
                        </div>
                      )}
                    </div>
                    <div className="form-group col-md-6">
                      <label>Jumlah Tetap Diskon</label>
                      <input
                        className={errors.discount_fixed !== undefined ? 'form-control  is-invalid' : 'form-control '}
                        type={'number'}
                        name={'discount_fixed'}
                        value={input.discount_fixed}
                        onChange={handleInput}
                        placeholder={'Enter Jumlah Tetap Diskon Produk'}
                      />
                      {errors.discount_fixed && (
                        <div className="invalid-feedback">
                          {errors.discount_fixed[0]}
                        </div>
                      )}
                    </div>
                    <div className="form-group col-md-6">
                      <label>Diskon Dimulai</label>
                      <input
                        className={errors.discount_start !== undefined ? 'form-control  is-invalid' : 'form-control '}
                        type={'datetime-local'}
                        name={'discount_start'}
                        value={input.discount_start}
                        onChange={handleInput}
                        placeholder={'Enter Diskon Dimulai'}
                      />
                      {errors.discount_start && (
                        <div className="invalid-feedback">
                          {errors.discount_start[0]}
                        </div>
                      )}
                    </div>
                    <div className="form-group col-md-6">
                      <label>Diskon Berakhir</label>
                      <input
                        className={errors.discount_end !== undefined ? 'form-control  is-invalid' : 'form-control '}
                        type={'datetime-local'}
                        name={'discount_end'}
                        value={input.discount_end}
                        onChange={handleInput}
                        placeholder={'Enter Diskon Berakhir'}
                      />
                      {errors.discount_end && (
                        <div className="invalid-feedback">
                          {errors.discount_end[0]}
                        </div>
                      )}
                    </div>
                    <div className="form-group col-md-6">
                      <label>Stok Produk</label>
                      <input
                        className={errors.stock !== undefined ? 'form-control  is-invalid' : 'form-control '}
                        type={'number'}
                        name={'stock'}
                        value={input.stock}
                        onChange={handleInput}
                        placeholder={'Enter Stok Produk'}
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
                        className={errors.sku !== undefined ? 'form-control  is-invalid' : 'form-control '}
                        type={'text'}
                        name={'sku'}
                        value={input.sku}
                        onChange={handleInput}
                        readOnly
                        placeholder={'Enter SKU Produk'}
                      />
                      {errors.sku && (
                        <div className="invalid-feedback">
                          {errors.sku[0]}
                        </div>
                      )}
                    </div>
                    <div className="form-group col-md-6">
                      <label>Keterangan</label>
                      <textarea
                        className={errors.description !== undefined ? 'form-control  is-invalid' : 'form-control '}
                        name={'description'}
                        value={input.description}
                        onChange={handleInput}
                        placeholder={'Enter Keterangan Produk'}
                      />
                      {errors.description && (
                        <div className="invalid-feedback">
                          {errors.description[0]}
                        </div>
                      )}
                    </div>
                      <div className="form-group col-md-6">
                        <label>Foto</label>
                        <input type="file" name="photo" className={errors.photo !== undefined ? 'form-control is-invalid' : 'form-control '} onChange={handlePhoto} />
                        {errors.photo && <div className="invalid-feedback">{errors.photo[0]}</div>}
                        
                        {(input.photo || input.photo_preview !== undefined) && (
                          <div className="card-body">
                            <img className="img-fluid w-50 h-50" src={input.photo === undefined ? input.photo_preview : input.photo} alt="Photo" />
                          </div>
                        )}
                      </div>
                  </div>
                  <div className="card-footer">
                    <div className="row justify-content-center">
                      <CardHeader 
                        link={'/product'} 
                        btnText="Batal"
                        btn="btn btn-info"
                      />
                      <button className={'btn btn-warning'} onClick={handleProductUpdate}
                        dangerouslySetInnerHTML={{__html: isLoading ? '<span class="spinner-border spinner-border-sm" aria-hidden="true"></span> Loading...' : 'Ubah Produk'}}
                      />
                    </div>
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