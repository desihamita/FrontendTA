import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Constants from '../../Constants';
import axios from 'axios';
import Swal from 'sweetalert2';
import Breadcrumb from '../../components/partials/Breadcrumb';
import CardHeader from '../../components/partials/miniComponent/CardHeader';

const AddBrand = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState({
          name: '',
          slug: '',
          serial: '',
          status: 1,
          description: '',
          logo: ''
    });
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
  
    const handleInput = (e) => {
      if (e.target.name === 'name') {
          let slug = e.target.value
          slug = slug.toLowerCase()
          slug = slug.replaceAll(' ','-')
          setInput(prevState =>  ({...prevState, slug: slug}))
      }
      setInput(prevState => ({...prevState, [e.target.name] : e.target.value}));
    }
  
    const handleLogo = (e) => {
      let file = e.target.files[0];
      let reader = new FileReader();
      reader.onloadend = () => {
          setInput(prevState => ({...prevState, logo: reader.result}));
          document.getElementById('fileLabel').innerText = file.name;
      };
      reader.readAsDataURL(file);
    };
  
    const handleBrandCreate = (e) => {
      e.preventDefault();
      setIsLoading(true);
      axios.post(`${Constants.BASE_URL}/brand`, input).then(res => {
          setIsLoading(false);
          Swal.fire({
              position: "top-end",
              icon: res.data.cls,
              title: res.data.msg,
              showConfirmButton: false,
              toast: true,
              timer: 1500
          });
          navigate('/brand');
      }).catch(errors => {
          setIsLoading(false);
          if(errors.response.status === 422) {
            setErrors(errors.response.data.errors);
          }
      });
    };
    return (
    <div className="content-wrapper">
        <section className="content-header">
            <Breadcrumb title="Tambah Merek" breadcrumb="Form Data" />
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
                                            type="text" 
                                            name="name"
                                            value={input.name}
                                            onChange={handleInput} 
                                            className={errors.name !== undefined ? 'form-control is-invalid ' : 'form-control'}
                                            placeholder="Enter Nama Merek" 
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
                                            placeholder="Enter Slug Merek" 
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
                                            placeholder="Enter Serial Merek" 
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
                                            <option disabled={true}>Pilih Status</option>
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
                                            placeholder="Enter Keterangan Merek" 
                                        />
                                        {errors.description !== undefined && (
                                            <div className="invalid-feedback">
                                            {errors.description[0]}
                                            </div>
                                        )}
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Logo</label>
                                        <input type="file" name="logo" className={errors.logo !== undefined ? 'form-control is-invalid' : 'form-control'} onChange={handleLogo} />
                                        {errors.logo !== undefined && (
                                            <div className="invalid-feedback">
                                                {errors.logo[0]}
                                            </div>
                                        )}

                                        {input.logo && (
                                            <div className="card-body">
                                                <img className="img-fluid w-50 h-50" src={input.logo} alt="logo" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <div className="row justify-content-center">
                                        <CardHeader 
                                            link={'/brand'} 
                                            btnText="Batal"
                                            btn="btn btn-info"
                                        />
                                        <button className="btn btn-warning w-30" onClick={handleBrandCreate} dangerouslySetInnerHTML={{__html: isLoading ? '<span class="spinner-border spinner-border-sm" aria-hidden="true"></span> Loading...' : 'Tambah Merek'}} />
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

export default AddBrand
