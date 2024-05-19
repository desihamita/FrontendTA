import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Constants from '../../Constants';
import Swal from 'sweetalert2';
import Breadcrumb from '../../components/partials/Breadcrumb';

const AddSuplier = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
        name: '',
        slug: '',
        serial: '',
        status: 1,
        description: '',
        photo: ''
  });
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [subDistrict, setSubDistricts] = useState([]);
  const [area, setAreas] = useState([]);

  const getDevisions = () => {
    axios.get(`${Constants.BASE_URL}/divisions`).then(res => {
        setDivisions(res.data);
    })
  }

  const getDistricts = (division_id) => {
    axios.get(`${Constants.BASE_URL}/districts/${division_id}`).then(res => {
        setDistricts(res.data);
    })
  }

  const handleInput = (e) => {
    if(e.target.name == 'division_id') {
        getDistricts(e.target.value)
    }
    setInput(prevState => ({...prevState, [e.target.name] : e.target.value}));
  }

  const handleLogo = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onloadend = () => {
        setInput(prevState => ({...prevState, photo: reader.result}));
        document.getElementById('fileLabel').innerText = file.name;
    };
    reader.readAsDataURL(file);
  };

  const handleSupplierCreate = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios.post(`${Constants.BASE_URL}/supplier`, input).then(res => {
        setIsLoading(false);
        Swal.fire({
            position: "top-end",
            icon: res.data.cls,
            title: res.data.msg,
            showConfirmButton: false,
            toast: true,
            timer: 1500
        });
        navigate('/supplier');
    }).catch(errors => {
        setIsLoading(false);
        if(errors.response.status === 422) {
          setErrors(errors.response.data.errors);
        }
    });
  };

  useEffect(() => {
    getDevisions();
    getDistricts();
  });

  return (
    <div className="content-wrapper">
        <section className="content-header">
            <Breadcrumb title="Add Supplier" breadcrumb="Form Data" />
        </section>
        <section className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card card-warning card-outline">
                            <form id="quickForm">
                                <div className="card-body">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="card card-warning">
                                                <div class="card-header">
                                                    <h3 class="card-title">Supplier Details</h3>
                                                </div>
                                                <form>
                                                    <div className="card-body">
                                                        <div className="form-group">
                                                            <label>Company Name</label>
                                                            <input 
                                                                type="text" 
                                                                name="name"
                                                                value={input.company_name}
                                                                onChange={handleInput} 
                                                                className={errors.company_name !== undefined ? 'form-control is-invalid ' : 'form-control'}
                                                                placeholder="Enter Supplier Company Name" 
                                                            />
                                                            {errors.company_name !== undefined && (
                                                                <div className="invalid-feedback">
                                                                {errors.company_name[0]}
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Phone</label>
                                                            <input 
                                                                type="text" 
                                                                name="phone"
                                                                value={input.phone}
                                                                onChange={handleInput} 
                                                                className={errors.phone !== undefined ? 'form-control is-invalid ' : 'form-control'}
                                                                placeholder="Enter Supplier Phone Number" 
                                                            />
                                                            {errors.phone !== undefined && (
                                                                <div className="invalid-feedback">
                                                                {errors.phone[0]}
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Email Address</label>
                                                            <input 
                                                                type="text" 
                                                                name="email"
                                                                value={input.email}
                                                                onChange={handleInput} 
                                                                className={errors.email !== undefined ? 'form-control is-invalid ' : 'form-control'}
                                                                placeholder="Enter Supplier Email Address" 
                                                            />
                                                            {errors.email !== undefined && (
                                                                <div className="invalid-feedback">
                                                                {errors.email[0]}
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
                                                                placeholder="Select Supplier Status"
                                                            >
                                                                <option disabled={true}>Select Supplier Status</option>
                                                                <option value={1}>Active</option>
                                                                <option value={2}>Inactive</option>
                                                            </select>
                                                            {errors.status !== undefined && (
                                                                <div className="invalid-feedback">
                                                                {errors.status[0]}
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Details</label>
                                                            <textarea 
                                                                name="details"
                                                                value={input.details}
                                                                onChange={handleInput} 
                                                                className={errors.details !== undefined ? 'form-control is-invalid ' : 'form-control'}
                                                                placeholder="Enter Supplier Details" 
                                                            />
                                                            {errors.details !== undefined && (
                                                                <div className="invalid-feedback">
                                                                {errors.details[0]}
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputFile">Logo</label>
                                                            <div className="input-group">
                                                                <div className="custom-file">
                                                                    <input type="file" name="photo" className="custom-file-input" id="exampleInputFile" onChange={handleLogo} />
                                                                    <label id="fileLabel" className="custom-file-label" htmlFor="exampleInputFile">Choose file</label>
                                                                </div>
                                                                {errors.logo !== undefined && (
                                                                    <div className="invalid-feedback">
                                                                        {errors.logo[0]}
                                                                    </div>
                                                                )}
                                                            </div>
                                                            {input.logo && (
                                                                <div className="card-body">
                                                                    <img className="img-fluid w-50 h-50" src={input.logo} alt="Logo" />
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="card card-warning">
                                                <div class="card-header">
                                                    <h3 class="card-title">Supplier Address</h3>
                                                </div>
                                                <form>
                                                    <div className="card-body">
                                                        <div className="form-group">
                                                            <label>Address <small>(House/Road/village etc)</small></label>
                                                            <input 
                                                                type="text" 
                                                                name="address"
                                                                value={input.address}
                                                                onChange={handleInput} 
                                                                className={errors.address !== undefined ? 'form-control is-invalid ' : 'form-control'}
                                                                placeholder="Enter Supplier Company Name" 
                                                            />
                                                            {errors.address !== undefined && (
                                                                <div className="invalid-feedback">
                                                                {errors.address[0]}
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="row">
                                                            <div className='col-md-6'>
                                                                <div className='form-group'>
                                                                    <label>Province</label>
                                                                    <select
                                                                        name='division'
                                                                        value={input.division}
                                                                        onChange={handleInput}
                                                                        className={errors.division !== undefined ? 'form-control select2 is-invalid ' : 'form-control'}
                                                                    >
                                                                        <option disabled>Select Province</option>
                                                                        {divisions.map((division, index) => (
                                                                            <option key={index} value={division.id}>{division.name}</option>
                                                                        ))}
                                                                    </select>
                                                                    {errors.status !== undefined && (
                                                                        <div className="invalid-feedback">
                                                                        {errors.status[0]}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className='col-md-6'>
                                                                <div className='form-group'>
                                                                    <label>City/District</label>
                                                                    <select
                                                                        name='district'
                                                                        value={input.district}
                                                                        onChange={handleInput}
                                                                        className={errors.district !== undefined ? 'form-control select2 is-invalid ' : 'form-control'}
                                                                    >
                                                                        <option disabled>Select city/district</option>
                                                                        {districts.map((district, index) => (
                                                                            <option key={index} value={district.id}>{district.name}</option>
                                                                        ))}
                                                                    </select>
                                                                    {errors.district !== undefined && (
                                                                        <div className="invalid-feedback">
                                                                            {errors.district[0]}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='row'>
                                                            <div className='col-md-6'>
                                                                <div className='form-group'>
                                                                    <label>Sub District</label>
                                                                    <select
                                                                        name='sub_district'
                                                                        value={input.sub_district}
                                                                        onChange={handleInput}
                                                                        className={errors.sub_district !== undefined ? 'form-control select2 is-invalid ' : 'form-control'}
                                                                    >
                                                                        <option disabled>Select Sub District</option>
                                                                    </select>
                                                                    {errors.sub_district !== undefined && (
                                                                        <div className="invalid-feedback">
                                                                            {errors.sub_district[0]}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className='col-md-6'>
                                                                <div className='form-group'>
                                                                    <label>Postal Code</label>
                                                                    <select
                                                                        name='area'
                                                                        value={input.area}
                                                                        onChange={handleInput}
                                                                        className={errors.area !== undefined ? 'form-control select2 is-invalid ' : 'form-control'}
                                                                    >
                                                                        <option disabled>Select Area</option>
                                                                    </select>
                                                                    {errors.area !== undefined && (
                                                                        <div className="invalid-feedback">
                                                                            {errors.area[0]}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Landmark</label>
                                                            <input 
                                                                type="text" 
                                                                name="landmark"
                                                                value={input.landmark}
                                                                onChange={handleInput} 
                                                                className={errors.landmark !== undefined ? 'form-control is-invalid ' : 'form-control'}
                                                                placeholder="Enter Supplier Company Name" 
                                                            />
                                                            {errors.landmark !== undefined && (
                                                                <div className="invalid-feedback">
                                                                {errors.landmark[0]}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <div className='row justify-content-center'>
                                        <button className="btn btn-warning pr-5 pl-5" onClick={handleSupplierCreate} dangerouslySetInnerHTML={{__html: isLoading ? '<span class="spinner-border spinner-border-sm" aria-hidden="true"></span> Loading...' : 'Add Supplier'}} />
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

export default AddSuplier
