import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Constants from '../../Constants'
import Swal from 'sweetalert2'
import Breadcrumb from '../../components/partials/Breadcrumb'
import Select from 'react-select'

const AddSupplier = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    status: 1, 
    division_id: 0,
    district_id: 0,
    sub_district_id: 0,
    area_id: 0,
});
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [subDistrict, setSubDistricts] = useState([]);
  const [areas, setAreas] = useState([]);

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
  
  const getSubDistricts = (district_id) => {
    axios.get(`${Constants.BASE_URL}/sub-districts/${district_id}`).then(res => {
        setSubDistricts(res.data);
    })
  }

  const getAreas = (sub_district_id) => {
    axios.get(`${Constants.BASE_URL}/areas/${sub_district_id}`).then(res => {
        setAreas(res.data);
    })
  }

  const handleInput = (e) => {
    if(e.target.name === 'division_id') {
        setDistricts([])
        setSubDistricts([])
        setAreas([])
        let division_id = parseInt(e.target.value)
        if(!Number.isNaN(division_id)) {
            getDistricts(e.target.value)
        }
    } else if (e.target.name === 'district_id') {
        setSubDistricts([])
        setAreas([])
        let district_id = parseInt(e.target.value)
        if(!Number.isNaN(district_id)) {
            getSubDistricts(e.target.value)
        }
    } else if (e.target.name === 'sub_district_id') {
        setAreas([])
        let sub_district_id = parseInt(e.target.value)
        if(!Number.isNaN(sub_district_id)) {
            getAreas(e.target.value)
        }
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
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="card card-warning">
                                            <div className="card-header">
                                                <h3 className="card-title">Supplier Details</h3>
                                            </div>
                                            <form>
                                                <div className="card-body">
                                                    <div className="form-group">
                                                        <label>Company Name</label>
                                                        <input 
                                                            type="text" 
                                                            name="name"
                                                            value={input.name}
                                                            onChange={handleInput} 
                                                            className={errors.name !== undefined ? 'form-control is-invalid ' : 'form-control'}
                                                            placeholder="Enter Supplier Company Name" 
                                                        />
                                                        {errors.name !== undefined && (
                                                            <div className="invalid-feedback">
                                                            {errors.name[0]}
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
                                                            <option value="" disabled>Select Supplier Status</option>
                                                            <option value={1}>Active</option>
                                                            <option value={0}>Inactive</option>
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
                                                                <input type="file" name="logo" className="custom-file-input" id="exampleInputFile" onChange={handleLogo} />
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
                                                                <img className="img-fluid w-50 h-50" src={input.logo} alt="logo" />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="card card-warning">
                                            <div className="card-header">
                                                <h3 className="card-title">Supplier Address</h3>
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
                                                                    name='division_id'
                                                                    value={input.division_id}
                                                                    onChange={handleInput}
                                                                    className={errors.division_id !== undefined ? 'form-control select2 is-invalid ' : 'form-control'}
                                                                >
                                                                    <option disabled>Select Province</option>
                                                                    {divisions.map((division, index) => (
                                                                        <option key={index} value={division.id}>{division.name}</option>
                                                                    ))}
                                                                </select>
                                                                {errors.division_id !== undefined && (
                                                                    <div className="invalid-feedback">
                                                                    {errors.division_id[0]}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className='col-md-6'>
                                                            <div className='form-group'>
                                                                <label>District</label>
                                                                <select
                                                                    name='district_id'
                                                                    value={input.district_id}
                                                                    onChange={handleInput}
                                                                    className={errors.district_id !== undefined ? 'form-control select2 is-invalid ' : 'form-control'}
                                                                    disabled={Object.keys(districts).length < 1}
                                                                >
                                                                    <option disabled>Select city/district</option>
                                                                    {districts.map((district, index) => (
                                                                        <option key={index} value={district.id}>{district.name}</option>
                                                                    ))}
                                                                </select>
                                                                {errors.district_id !== undefined && (
                                                                    <div className="invalid-feedback">
                                                                        {errors.district_id[0]}
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
                                                                    name='sub_district_id'
                                                                    value={input.sub_district_id}
                                                                    onChange={handleInput}
                                                                    className={errors.sub_district_id !== undefined ? 'form-control select2 is-invalid ' : 'form-control'}
                                                                    disabled={Object.keys(subDistrict).length < 1}
                                                                >
                                                                    <option disabled>Select sub district</option>
                                                                    {subDistrict.map((subDistrict, index) => (
                                                                        <option key={index} value={subDistrict.id}>{subDistrict.name}</option>
                                                                    ))}
                                                                </select>
                                                                {errors.sub_district_id !== undefined && (
                                                                    <div className="invalid-feedback">
                                                                        {errors.sub_district_id[0]}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className='col-md-6'>
                                                            <div className='form-group'>
                                                                <label>Postal Code</label>
                                                                <select
                                                                    name='area_id'
                                                                    value={input.area_id}
                                                                    onChange={handleInput}
                                                                    className={errors.area_id !== undefined ? 'form-control select2 is-invalid ' : 'form-control'}
                                                                    disabled={Object.keys(areas).length < 1}
                                                                >
                                                                    <option disabled>Select Postal Code</option>
                                                                    {areas.map((area, index) => (
                                                                        <option key={index} value={area.id}>{area.name}</option>
                                                                    ))}
                                                                </select>
                                                                {errors.area_id !== undefined && (
                                                                    <div className="invalid-feedback">
                                                                        {errors.area_id[0]}
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
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default AddSupplier
