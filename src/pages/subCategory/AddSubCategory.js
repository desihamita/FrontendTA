import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Constants from '../../Constants';
import axios from 'axios';
import Swal from 'sweetalert2';
import Breadcrumb from '../../components/partials/Breadcrumb';
import CardHeader from '../../components/partials/miniComponent/CardHeader';

const AddSubCategory = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
        status: 1,
        name: '',
        slug: '',
        serial: '',
        description: '',
        photo: ''
  });
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const getCategories = () => {
    axios.get(`${Constants.BASE_URL}/get-category-list`).then(res => {
        setCategories(res.data)
    })
  }

  const handleInput = (e) => {
    if (e.target.name === 'name') {
        let slug = e.target.value
        slug = slug.toLowerCase()
        slug = slug.replaceAll(' ','-')
        setInput(prevState =>  ({...prevState, slug: slug}))
    }
    setInput(prevState => ({...prevState, [e.target.name] : e.target.value}));
  }

  const handlePhoto = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onloadend = () => {
        setInput(prevState => ({...prevState, photo: reader.result}));
    };
    reader.readAsDataURL(file);
  };

  const handleCategoryCreate = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const selectedCategory = categories.find(category => category.id === parseInt(input.category_id));
    
    if (selectedCategory) {
        const inputData = {
            ...input,
            category_name: selectedCategory.name
        };

        axios.post(`${Constants.BASE_URL}/sub-category`, inputData).then(res => {
            setIsLoading(false);
            Swal.fire({
                position: "top-end",
                icon: res.data.cls,
                title: res.data.msg,
                showConfirmButton: false,
                toast: true,
                timer: 1500
            });
            navigate('/sub-category');
        }).catch(errors => {
            setIsLoading(false);
            if (errors.response.status === 422) {
                setErrors(errors.response.data.errors);
            }
        });
    }
};


  useEffect(() => {
    getCategories()
  }, []);

  return (
    <div className="content-wrapper">
        <section className="content-header">
            <Breadcrumb title="Tambah Sub Kategori" breadcrumb="Form Data" />
        </section>
        <section className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card card-warning card-outline">
                            <form id="quickForm">
                                <div className="card-body row">
                                    <div className="form-group col-md-6">
                                        <label>Kategori</label>
                                        <select 
                                            name="category_id"
                                            value={input.category_id}
                                            onChange={handleInput} 
                                            className={errors.category_id !== undefined ? 'form-control is-invalid ' : 'form-control'}
                                            placeholder="Select Category" 
                                        >
                                            <option value="" disabled selected>Pilih Kategori</option>
                                            {categories.map((category) => (
                                                <option value={category.id}>{category.name}</option>
                                            ))}
                                        </select>
                                        {errors.category_id !== undefined && (
                                            <div className="invalid-feedback">
                                            {errors.category_id[0]}
                                            </div>
                                        )}
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Nama</label>
                                        <input 
                                            type="text" 
                                            name="name"
                                            value={input.name}
                                            onChange={handleInput} 
                                            className={errors.name !== undefined ? 'form-control is-invalid ' : 'form-control'}
                                            placeholder="Enter Nama Sub Kategori" 
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
                                            placeholder="Enter Slug Sub Kategori" 
                                        />
                                        {errors.slug !== undefined && (
                                            <div className="invalid-feedback">
                                            {errors.slug[0]}
                                            </div>
                                        )}
                                    </div>
                                    <div className="form-group col-md-6 ">
                                        <label>Serial</label>
                                        <input 
                                            type="number" 
                                            name="serial"
                                            value={input.serial}
                                            onChange={handleInput} 
                                            className={errors.serial !== undefined ? 'form-control is-invalid ' : 'form-control'}
                                            placeholder="Enter Serial Sub Kategori" 
                                        />
                                        {errors.serial !== undefined && (
                                            <div className="invalid-feedback">
                                            {errors.serial[0]}
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
                                        <label>Keterangan</label>
                                        <textarea 
                                            name="description"
                                            value={input.description}
                                            onChange={handleInput} 
                                            className={errors.description !== undefined ? 'form-control is-invalid ' : 'form-control'}
                                            placeholder="Enter Keterangan Sub Kategori" 
                                        />
                                        {errors.description !== undefined && (
                                            <div className="invalid-feedback">
                                            {errors.description[0]}
                                            </div>
                                        )}
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Foto</label>
                                        <input type="file" name="photo" className={errors.photo !== undefined ? 'form-control is-invalid ' : 'form-control'}onChange={handlePhoto} />
                                        {errors.photo !== undefined && (
                                            <div className="invalid-feedback">
                                                {errors.photo[0]}
                                            </div>
                                        )}
                                        {input.photo && (
                                            <div className="card-body">
                                                <img className="img-fluid w-50 h-50" src={input.photo} alt="Photo" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <div className="row justify-content-center">
                                        <CardHeader 
                                            link={'/sub-category'} 
                                            btnText="Batal"
                                            btn="btn btn-info"
                                        />
                                        <button className="btn btn-warning w-30" onClick={handleCategoryCreate} dangerouslySetInnerHTML={{__html: isLoading ? '<span class="spinner-border spinner-border-sm" aria-hidden="true"></span> Loading...' : 'Tambah Sub Kategori'}} />
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

export default AddSubCategory
