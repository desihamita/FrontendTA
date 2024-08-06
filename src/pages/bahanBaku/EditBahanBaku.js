import React, { useEffect, useState } from 'react'
import Breadcrumb from '../../components/partials/Breadcrumb'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Constants from '../../Constants';
import Swal from 'sweetalert2';
import CardHeader from '../../components/partials/miniComponent/CardHeader';

const EditBahanBaku = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [input, setInput] = useState({
        status: 1,
        name: '',
        slug: '',
        category_id: '',
        sub_category_id: '',
        brand_id: '',
        supplier_id: '',
        price: '',
        stock: '',
        description: '',
        sku: '',
        photo: '',
        photo_preview: '',
    });
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [suppliers, setSuppliers] = useState([]);

    const getAttribute = async () => {
        try {
            const res = await axios.get(`${Constants.BASE_URL}/attribute/${params.id}`);
            setInput(res.data.edit); 
            getSubCategories(res.data.edit.sub_category_id);
        } catch (error) {
            console.error('Error fetching attribute:', error);
        }
    };

    const getBrands = async () => {
        try {
            const res = await axios.get(`${Constants.BASE_URL}/get-brand-list`);
            setBrands(res.data);
        } catch (error) {
            console.error('Error fetching brands:', error);
        }
    };

    const getSuppliers = async () => {
        try {
            const res = await axios.get(`${Constants.BASE_URL}/get-supplier-list`);
            setSuppliers(res.data);
        } catch (error) {
            console.error('Error fetching suppliers:', error);
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
        const { name, value } = e.target;
        let newValue = value;

        if (name === 'brand_id' || name === 'supplier_id' || name === 'category_id' || name === 'sub_category_id') {
            newValue = parseInt(value, 10);
        }

        if (name === 'name') {
            const slug = value.toLowerCase().replaceAll(' ', '-');
            setInput((prevState) => ({ ...prevState, slug }));
        }

        setInput((prevState) => ({ ...prevState, [name]: newValue }));
    };

    const handlePhoto = (e) => {
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.onloadend = () => {
            setInput((prevState) => ({ ...prevState, photo: reader.result }));
            //document.getElementById('fileLabel').innerText = file.name;
        };
        reader.readAsDataURL(file);
    };

    const handleAttributeUpdate = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await axios.put(`${Constants.BASE_URL}/attribute/${params.id}`, input);
            setIsLoading(false);
            Swal.fire({
                position: 'top-end',
                icon: res.data.cls,
                title: res.data.msg,
                showConfirmButton: false,
                toast: true,
                timer: 1500,
            });
            if (res.data.flag === undefined) {
                navigate('/bahan-baku');
            }
        } catch (error) {
            setIsLoading(false);
            if (error.response.status === 422) {
                setErrors(error.response.data.errors);
            }
        }
    };

    useEffect(() => {
        getAttribute();
        getCategories();
        getSuppliers();
        getBrands();
    }, []);


    return (
    <div className="content-wrapper">
        <section className="content-header">
            <Breadcrumb title="Ubah Bahan Baku" breadcrumb="Form Data" />
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
                                            className={errors.name != undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                                            type={'text'}
                                            name={'name'}
                                            value={input.name}
                                            onChange={handleInput}
                                            placeholder={'Enter Nama Bahan Baku'}
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
                                            placeholder={'Enter Slug Bahan Baku'}
                                        />
                                        {errors.slug !== undefined && (
                                            <div className="invalid-feedback">
                                                {errors.slug[0]}
                                            </div>
                                        )}
                                    </div>
                                    <div className="form-group col-md-6 ">
                                        <label>Kategori</label>
                                        <select
                                            name={'category_id'}
                                            value={input.category_id}
                                            onChange={handleInput}
                                            className={errors.category_id !== undefined ? 'form-control is-invalid ' : 'form-control'}
                                        >
                                            <option disabled selected>Pilih Kategori</option>
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
                                        <label>Sub Kategori</label>
                                        <select
                                            name={'sub_category_id'}
                                            value={input.sub_category_id}
                                            onChange={handleInput}
                                            className={errors.sub_category_id !== undefined ? 'form-control is-invalid ' : 'form-control'}
                                            disabled={input.category_id === undefined}
                                        >
                                            <option disabled selected>Pilih Sub Kategori</option>
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
                                        <label>Merek</label>
                                        <select
                                            name={'brand_id'}
                                            value={input.brand_id}
                                            onChange={handleInput}
                                            className={errors.brand_id !== undefined ? 'form-control is-invalid ' : 'form-control'}
                                        >
                                            <option disabled selected>Pilih Merek</option>
                                            {brands.map((brand, index) => (
                                                <option value={brand.id} key={index}>{brand.name}</option>
                                            ))}
                                        </select>
                                        { errors.brand_id !== undefined && (
                                            <div className="invalid-feedback">
                                                {errors.brand_id[0]}
                                            </div>
                                        )}
                                    </div>
                                    <div className="form-group col-md-6 ">
                                        <label>Pemasok</label>
                                        <select
                                            name={'supplier_id'}
                                            value={input.supplier_id}
                                            onChange={handleInput}
                                            className={errors.supplier_id !== undefined ? 'form-control is-invalid ' : 'form-control'}
                                        >
                                            <option disabled selected>Pilih Pemasok</option>
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
                                    <div className="form-group col-md-6">
                                        <label>Harga</label>
                                        <input
                                            className={errors.price !== undefined ? 'form-control is-invalid' : 'form-control'}
                                            type={'number'}
                                            name={'price'}
                                            value={input.price}
                                            onChange={handleInput}
                                            placeholder={'Enter Harga Bahan Baku'}
                                        />
                                        {errors.price && (
                                            <div className="invalid-feedback">
                                            {errors.price[0]}
                                            </div>
                                        )}
                                    </div>
                                    <div className="form-group col-md-6 ">
                                        <label>Stok</label>
                                        <input
                                            className={errors.stock != undefined ? 'form-control is-invalid' : 'form-control'}
                                            type={'number'}
                                            name={'stock'}
                                            value={input.stock}
                                            onChange={handleInput}
                                            placeholder={'Enter Stok Bahan Baku'}
                                        />
                                        {errors.stock !== undefined && (
                                            <div className="invalid-feedback">
                                            {errors.stock[0]}
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
                                            placeholder="Enter Keterangan Bahan Baku" 
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
                                        <label>Foto</label>
                                        <input type="file" name="photo" className={errors.photo !== undefined ? 'form-control select2 is-invalid ' : 'form-control'} onChange={handlePhoto} />

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
                                            link={'/bahan-baku'} 
                                            btnText="Batal"
                                            btn="btn btn-info"
                                        />
                                        <button className="btn btn-warning w-30" onClick={handleAttributeUpdate} dangerouslySetInnerHTML={{__html: isLoading ? '<span class="spinner-border spinner-border-sm" aria-hidden="true"></span> Loading...' : 'Ubah Bahan Baku'}} />
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

export default EditBahanBaku