import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Constants from '../../Constants';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '../../components/partials/Breadcrumb';
import CardHeader from '../../components/partials/miniComponent/CardHeader';

const EditSubCategory = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [input, setInput] = useState({
        name: '',
        slug: '',
        serial: '',
        status: 1,
        description: '',
        photo: '',
        category_id: ''
    });
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState([]);

    const getCategory = () => {
        axios.get(`${Constants.BASE_URL}/sub-category/${params.id}`).then(res => {
            setInput(res.data.data);
        });
    };

    const getCategories = () => {
        axios.get(`${Constants.BASE_URL}/get-category-list`).then(res => {
            setCategories(res.data);
        });
    };

    const handleInput = (e) => {
        if (e.target.name === 'name') {
            let slug = e.target.value;
            slug = slug.toLowerCase();
            slug = slug.replaceAll(' ', '-');
            setInput(prevState => ({ ...prevState, slug: slug }));
        }
        setInput(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
    };

    const handlePhoto = (e) => {
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.onloadend = () => {
            setInput(prevState => ({ ...prevState, photo: reader.result }));
        };
        reader.readAsDataURL(file);
    };

    const handleCategoryUpdate = (e) => {
        e.preventDefault();
        setIsLoading(true);

        const selectedCategory = categories.find(category => category.id === parseInt(input.category_id));
        
        if (selectedCategory) {
            const inputData = {
                ...input,
                category_name: selectedCategory.name
            };
            axios.put(`${Constants.BASE_URL}/sub-category/${params.id}`, inputData).then(res => {
                setIsLoading(false);
                Swal.fire({
                    position: "top-end",
                    icon: res.data.cls,
                    title: res.data.msg,
                    showConfirmButton: false,
                    toast: true,
                    timer: 3000
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
        getCategory();
        getCategories();
    }, []);

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <Breadcrumb title="Ubah Sub Kategori" breadcrumb="Form Data" />
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
                                                className={errors.category_id ? 'form-control is-invalid' : 'form-control'}
                                                placeholder="Select Category" 
                                            >
                                                <option value="" disabled>Pilih Kategori</option>
                                                {categories.map((category) => (
                                                    <option key={category.id} value={category.id}>{category.name}</option>
                                                ))}
                                            </select>
                                            {errors.category_id && (
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
                                                className={errors.name ? 'form-control is-invalid' : 'form-control'}
                                                placeholder="Enter Nama Sub Kategori" 
                                            />
                                            {errors.name && (
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
                                                className={errors.slug ? 'form-control is-invalid' : 'form-control'}
                                                placeholder="Enter Slug Sub Kategori" 
                                            />
                                            {errors.slug && (
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
                                                className={errors.serial ? 'form-control is-invalid' : 'form-control'}
                                                placeholder="Enter Serial Sub Kategori" 
                                            />
                                            {errors.serial && (
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
                                                className={errors.status ? 'form-control is-invalid' : 'form-control'}
                                                placeholder="Select Category Status"
                                            >
                                                <option value="" disabled>Pilih Status</option>
                                                <option value={1}>Active</option>
                                                <option value={2}>Inactive</option>
                                            </select>
                                            {errors.status && (
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
                                                className={errors.description ? 'form-control is-invalid' : 'form-control'}
                                                placeholder="Enter Keterangan Sub Kategori" 
                                            />
                                            {errors.description && (
                                                <div className="invalid-feedback">
                                                    {errors.description[0]}
                                                </div>
                                            )}
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="exampleInputFile">Foto</label>
                                            <input 
                                                type="file" 
                                                name="photo" 
                                                className={errors.photo ? 'form-control is-invalid' : 'form-control'} 
                                                onChange={handlePhoto} 
                                            />
                                            {errors.photo && (
                                                <div className="invalid-feedback">
                                                    {errors.photo[0]}
                                                </div>
                                            )}
                                            {(input.photo || input.photo_preview) && (
                                                <div className="card-body">
                                                    <img className="img-fluid w-50 h-50" src={input.photo || input.photo_preview} alt="Photo" />
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
                                            <button 
                                                className="btn btn-warning w-30" 
                                                onClick={handleCategoryUpdate} 
                                                disabled={isLoading}
                                            >
                                                {isLoading ? <span className="spinner-border spinner-border-sm" aria-hidden="true"></span> : 'Ubah Sub Kategori'}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default EditSubCategory;
