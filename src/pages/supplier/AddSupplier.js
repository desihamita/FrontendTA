import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Constants from '../../Constants';
import Swal from 'sweetalert2';
import Breadcrumb from '../../components/partials/Breadcrumb';
import Select from 'react-select';
import CardHeader from '../../components/partials/miniComponent/CardHeader';

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
  const [subDistricts, setSubDistricts] = useState([]);
  const [areas, setAreas] = useState([]);

  const getDivisions = async () => {
    try {
      const res = await axios.get(`${Constants.BASE_URL}/divisions`);
      setDivisions(res.data);
    } catch (error) {
      console.error('Failed to fetch divisions:', error);
    }
  };

  const getDistricts = async (division_id) => {
    try {
      const res = await axios.get(`${Constants.BASE_URL}/districts/${division_id}`);
      setDistricts(res.data);
    } catch (error) {
      console.error('Failed to fetch districts:', error);
    }
  };

  const getSubDistricts = async (district_id) => {
    try {
      const res = await axios.get(`${Constants.BASE_URL}/sub-districts/${district_id}`);
      setSubDistricts(res.data);
    } catch (error) {
      console.error('Failed to fetch sub-districts:', error);
    }
  };

  const getAreas = async (sub_district_id) => {
    try {
      const res = await axios.get(`${Constants.BASE_URL}/areas/${sub_district_id}`);
      setAreas(res.data);
    } catch (error) {
      console.error('Failed to fetch areas:', error);
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prevState) => ({ ...prevState, [name]: value }));

    if (name === 'division_id') {
      setDistricts([]);
      setSubDistricts([]);
      setAreas([]);
      if (value) getDistricts(value);
    } else if (name === 'district_id') {
      setSubDistricts([]);
      setAreas([]);
      if (value) getSubDistricts(value);
    } else if (name === 'sub_district_id') {
      setAreas([]);
      if (value) getAreas(value);
    }
  };

  const handleLogo = (e) => {
    let file = e.target.files[0];
    if (file) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setInput((prevState) => ({ ...prevState, logo: reader.result }));
        document.getElementById('fileLabel').innerText = file.name;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSupplierCreate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(`${Constants.BASE_URL}/supplier`, input);
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
        navigate('/supplier');
      }
    } catch (errors) {
      setIsLoading(false);
      if (errors.response.status === 422) {
        setErrors(errors.response.data.errors);
      }
    }
  };

  useEffect(() => {
    getDivisions();
  }, []);

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
                <div className="card-header">
                  <CardHeader 
                    link={'/supplier'} 
                    btnText="Cancel"
                    btn="btn btn-info"
                    icon="fas fa-backspace"
                  />
                </div>
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
                                className={errors.name ? 'form-control is-invalid' : 'form-control'}
                                placeholder="Enter Supplier Company Name"
                              />
                              {errors.name && <div className="invalid-feedback">{errors.name[0]}</div>}
                            </div>
                            <div className="form-group">
                              <label>Phone</label>
                              <input
                                type="text"
                                name="phone"
                                value={input.phone}
                                onChange={handleInput}
                                className={errors.phone ? 'form-control is-invalid' : 'form-control'}
                                placeholder="Enter Supplier Phone Number"
                              />
                              {errors.phone && <div className="invalid-feedback">{errors.phone[0]}</div>}
                            </div>
                            <div className="form-group">
                              <label>Email Address</label>
                              <input
                                type="text"
                                name="email"
                                value={input.email}
                                onChange={handleInput}
                                className={errors.email ? 'form-control is-invalid' : 'form-control'}
                                placeholder="Enter Supplier Email Address"
                              />
                              {errors.email && <div className="invalid-feedback">{errors.email[0]}</div>}
                            </div>
                            <div className="form-group">
                              <label>Status</label>
                              <select
                                name="status"
                                value={input.status}
                                onChange={handleInput}
                                className={errors.status ? 'form-control select2 is-invalid' : 'form-control'}
                              >
                                <option value="" disabled>Select Supplier Status</option>
                                <option value={1}>Active</option>
                                <option value={0}>Inactive</option>
                              </select>
                              {errors.status && <div className="invalid-feedback">{errors.status[0]}</div>}
                            </div>
                            <div className="form-group">
                              <label>Details</label>
                              <textarea
                                name="details"
                                value={input.details}
                                onChange={handleInput}
                                className={errors.details ? 'form-control is-invalid' : 'form-control'}
                                placeholder="Enter Supplier Details"
                              />
                              {errors.details && <div className="invalid-feedback">{errors.details[0]}</div>}
                            </div>
                            <div className="form-group">
                              <label htmlFor="exampleInputFile">Logo</label>
                              <div className="input-group">
                                <div className="custom-file">
                                  <input type="file" name="logo" className="custom-file-input" id="exampleInputFile" onChange={handleLogo} />
                                  <label id="fileLabel" className="custom-file-label" htmlFor="exampleInputFile">Choose file</label>
                                </div>
                                {errors.logo && <div className="invalid-feedback">{errors.logo[0]}</div>}
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
                                className={errors.address ? 'form-control is-invalid' : 'form-control'}
                                placeholder="Enter Supplier Address"
                              />
                              {errors.address && <div className="invalid-feedback">{errors.address[0]}</div>}
                            </div>
                            <div className="row">
                              <div className='col-md-6'>
                                <div className='form-group'>
                                  <label>Province</label>
                                  <select
                                    name="division_id"
                                    value={input.division_id}
                                    onChange={handleInput}
                                    className={errors.division_id ? 'form-control select2 is-invalid' : 'form-control'}
                                  >
                                    <option disabled>Select Province</option>
                                    {divisions.map((division, index) => (
                                      <option key={index} value={division.id}>{division.name}</option>
                                    ))}
                                  </select>
                                  {errors.division_id && <div className="invalid-feedback">{errors.division_id[0]}</div>}
                                </div>
                              </div>
                              <div className='col-md-6'>
                                <div className='form-group'>
                                  <label>District</label>
                                  <select
                                    name="district_id"
                                    value={input.district_id}
                                    onChange={handleInput}
                                    className={errors.district_id ? 'form-control select2 is-invalid' : 'form-control'}
                                    disabled={districts.length < 1}
                                  >
                                    <option disabled>Select city/district</option>
                                    {districts.map((district, index) => (
                                      <option key={index} value={district.id}>{district.name}</option>
                                    ))}
                                  </select>
                                  {errors.district_id && <div className="invalid-feedback">{errors.district_id[0]}</div>}
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className='col-md-6'>
                                <div className='form-group'>
                                  <label>Sub District</label>
                                  <select
                                    name="sub_district_id"
                                    value={input.sub_district_id}
                                    onChange={handleInput}
                                    className={errors.sub_district_id ? 'form-control select2 is-invalid' : 'form-control'}
                                    disabled={subDistricts.length < 1}
                                  >
                                    <option disabled>Select sub district</option>
                                    {subDistricts.map((subDistrict, index) => (
                                      <option key={index} value={subDistrict.id}>{subDistrict.name}</option>
                                    ))}
                                  </select>
                                  {errors.sub_district_id && <div className="invalid-feedback">{errors.sub_district_id[0]}</div>}
                                </div>
                              </div>
                              <div className='col-md-6'>
                                <div className='form-group'>
                                  <label>Postal Code</label>
                                  <select
                                    name="area_id"
                                    value={input.area_id}
                                    onChange={handleInput}
                                    className={errors.area_id ? 'form-control select2 is-invalid' : 'form-control'}
                                    disabled={areas.length < 1}
                                  >
                                    <option disabled>Select Postal Code</option>
                                    {areas.map((area, index) => (
                                      <option key={index} value={area.id}>{area.name}</option>
                                    ))}
                                  </select>
                                  {errors.area_id && <div className="invalid-feedback">{errors.area_id[0]}</div>}
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
                                className={errors.landmark ? 'form-control is-invalid' : 'form-control'}
                                placeholder="Enter Supplier Landmark"
                              />
                              {errors.landmark && <div className="invalid-feedback">{errors.landmark[0]}</div>}
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-footer">
                  <div className='row justify-content-center'>
                    <button className="btn btn-warning pr-5 pl-5" onClick={handleSupplierCreate} dangerouslySetInnerHTML={{ __html: isLoading ? '<span class="spinner-border spinner-border-sm" aria-hidden="true"></span> Loading...' : 'Add Supplier' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddSupplier;
