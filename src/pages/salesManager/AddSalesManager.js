import React, { useEffect, useState } from 'react'
import Breadcrumb from '../../components/partials/Breadcrumb'
import Swal from 'sweetalert2';
import axios from 'axios';
import Constants from '../../Constants';
import { useNavigate } from 'react-router-dom';
import CardHeader from '../../components/partials/miniComponent/CardHeader';

const AddSalesManager = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState({
      status: 1,
      division_id: "",
      district_id: "",
      sub_district_id: "",
      area_id: "",
    });
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [divisions, setDivisions] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [subDistricts, setSubDistricts] = useState([]);
    const [areas, setAreas] = useState([]);
    const [shops, setShops] = useState([]);

    const getShops = async () => {
        try {
          const res = await axios.get(`${Constants.BASE_URL}/get-shop-list`);
          setShops(res.data);
        } catch (error) {
          console.error('Failed to fetch divisions:', error);
        }
      };

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

    const handlePhoto = (e) => {
      let file = e.target.files[0];
      if (file) {
        let reader = new FileReader();
        reader.onloadend = () => {
          setInput((prevState) => ({ ...prevState, [e.target.name]: reader.result }));
          //document.getElementById('fileLabel').innerText = file.name;
        };
        reader.readAsDataURL(file);
      }
    };

    const handleSalesManagerCreate = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      try {
        const res = await axios.post(`${Constants.BASE_URL}/sales-manager`, input);
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
          navigate('/sales-manager');
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
      getShops();
    }, []);

    return (
    <div className="content-wrapper">
      <section className="content-header">
        <Breadcrumb title="Tambah Karyawan" breadcrumb="Form Data" />
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
                          <h3 className="card-title">Detail Karyawan</h3>
                        </div>
                        <form>
                          <div className="card-body">
                            <div className="form-group">
                              <label>Nama</label>
                              <input
                                type="text"
                                name="name"
                                value={input.name}
                                onChange={handleInput}
                                className={errors.name ? 'form-control is-invalid' : 'form-control'}
                                placeholder="Enter Nama Karyawan"
                              />
                              {errors.name && <div className="invalid-feedback">{errors.name[0]}</div>}
                            </div>
                            <div className="form-group">
                              <label>No.Telepon</label>
                              <input
                                type="text"
                                name="phone"
                                value={input.phone}
                                onChange={handleInput}
                                className={errors.phone ? 'form-control is-invalid' : 'form-control'}
                                placeholder="Enter No Telepon Karyawan"
                              />
                              {errors.phone && <div className="invalid-feedback">{errors.phone[0]}</div>}
                            </div>
                            <div className="form-group">
                              <label>Password</label>
                              <input
                                type='password'
                                name="password"
                                value={input.password}
                                onChange={handleInput}
                                className={errors.password ? 'form-control is-invalid' : 'form-control'}
                                placeholder="Enter Password Karyawan"
                              />
                              {errors.password && <div className="invalid-feedback">{errors.password[0]}</div>}
                            </div>
                            <div className="form-group">
                              <label>Email</label>
                              <input
                                type="text"
                                name="email"
                                value={input.email}
                                onChange={handleInput}
                                className={errors.email ? 'form-control is-invalid' : 'form-control'}
                                placeholder="Enter Email Karyawan"
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
                                <option value="" disabled={true} selected>Pilih Status Karyawan</option>
                                <option value={1}>Active</option>
                                <option value={0}>Inactive</option>
                              </select>
                              {errors.status && <div className="invalid-feedback">{errors.status[0]}</div>}
                            </div>
                            <div className="form-group">
                              <label>Kafe</label>
                              <select
                                name="shop_id"
                                value={input.shop_id}
                                onChange={handleInput}
                                className={errors.shop_id ? 'form-control select2 is-invalid' : 'form-control'}
                              >
                                <option value="" disabled={true} selected>Pilih Kafe</option>
                                {shops.map((shop, index) => (
                                    <option key={index} value={shop.id}>{shop.name}</option>
                                ))}
                              </select>
                              {errors.shop_id && <div className="invalid-feedback">{errors.shop_id[0]}</div>}
                            </div>
                            <div className="form-group">
                              <label>Bio</label>
                              <textarea
                                name="bio"
                                value={input.bio}
                                onChange={handleInput}
                                className={errors.bio ? 'form-control is-invalid' : 'form-control'}
                                placeholder="Enter Bio Karyawan"
                              />
                              {errors.bio && <div className="invalid-feedback">{errors.bio[0]}</div>}
                            </div>
                            <div className="form-group">
                              <label>Foto</label>
                              <input type="file" name="photo" className={errors.photo ? 'form-control is-invalid' : 'form-control'} onChange={handlePhoto} />
                              {errors.photo && <div className="invalid-feedback">{errors.photo[0]}</div>}
                              {input.photo && (
                                <div className="card-body">
                                  <img className="img-fluid w-50 h-50" src={input.photo} alt="photo" />
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
                          <h3 className="card-title">Alamat Karyawan</h3>
                        </div>
                        <form>
                          <div className="card-body">
                            <div className="form-group">
                              <label>Alamat <small>(Rumah/Jalan/desa dll)</small></label>
                              <input
                                type="text"
                                name="address"
                                value={input.address}
                                onChange={handleInput}
                                className={errors.address ? 'form-control is-invalid' : 'form-control'}
                                placeholder="Enter Alamat Karyawan"
                              />
                              {errors.address && <div className="invalid-feedback">{errors.address[0]}</div>}
                            </div>
                            <div className='form-group'>
                                <label>Provinsi</label>
                                <select
                                    name="division_id"
                                    value={input.division_id}
                                    onChange={handleInput}
                                    className={errors.division_id ? 'form-control select2 is-invalid' : 'form-control'}
                                >
                                    <option value="" disabled={true} selected>Pilih Provinsi</option>
                                    {divisions.map((division, index) => (
                                        <option key={index} value={division.id}>{division.name}</option>
                                    ))}
                                </select>
                                {errors.division_id && <div className="invalid-feedback">{errors.division_id[0]}</div>}
                            </div>
                            <div className='form-group'>
                                <label>Kabupaten / Kota</label>
                                <select
                                    name="district_id"
                                    value={input.district_id}
                                    onChange={handleInput}
                                    className={errors.district_id ? 'form-control select2 is-invalid' : 'form-control'}
                                    disabled={districts.length < 1}
                                >
                                    <option value="" disabled={true} selected>Pilih Kabupaten / Kota</option>
                                    {districts.map((district, index) => (
                                      <option key={index} value={district.id}>{district.name}</option>
                                    ))}
                                </select>
                                {errors.district_id && <div className="invalid-feedback">{errors.district_id[0]}</div>}
                            </div>
                            <div className='form-group'>
                                <label>Kecamatan</label>
                                <select
                                    name="sub_district_id"
                                    value={input.sub_district_id}
                                    onChange={handleInput}
                                    className={errors.sub_district_id ? 'form-control select2 is-invalid' : 'form-control'}
                                    disabled={subDistricts.length < 1}
                                >
                                    <option value="" disabled={true} selected>Pilih Kecamatan</option>
                                    {subDistricts.map((subDistrict, index) => (
                                      <option key={index} value={subDistrict.id}>{subDistrict.name}</option>
                                    ))}
                                </select>
                                {errors.sub_district_id && <div className="invalid-feedback">{errors.sub_district_id[0]}</div>}
                            </div>
                            <div className='form-group'>
                                <label>Kode Pos</label>
                                <select
                                    name="area_id"
                                    value={input.area_id}
                                    onChange={handleInput}
                                    className={errors.area_id ? 'form-control select2 is-invalid' : 'form-control'}
                                    disabled={areas.length < 1}
                                >
                                    <option value="" disabled={true} selected>Pilih Kode Pos</option>
                                    {areas.map((area, index) => (
                                      <option key={index} value={area.id}>{area.name}</option>
                                    ))}
                                </select>
                                {errors.area_id && <div className="invalid-feedback">{errors.area_id[0]}</div>}
                            </div>
                            <div className="form-group">
                              <label>Penunjuk/Penanda Jalan (Optional)</label>
                              <input
                                type="text"
                                name="landmark"
                                value={input.landmark}
                                onChange={handleInput}
                                className={errors.landmark ? 'form-control is-invalid' : 'form-control'}
                                placeholder="Enter Penunjuk/Penanda Jalan"
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
                    <CardHeader 
                      link={'/sales-manager'} 
                      btnText="Cancel"
                      btn="btn btn-info"
                      icon={false}
                    />
                    <button className="btn btn-warning pr-5 pl-5" onClick={handleSalesManagerCreate} dangerouslySetInnerHTML={{ __html: isLoading ? '<span class="spinner-border spinner-border-sm" aria-hidden="true"></span> Loading...' : 'Tambah Karyawan' }} />
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

export default AddSalesManager