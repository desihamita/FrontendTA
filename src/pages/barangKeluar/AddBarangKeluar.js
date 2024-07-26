import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Constants from '../../Constants';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/partials/Breadcrumb';
import CardHeader from '../../components/partials/miniComponent/CardHeader';

const AddBarangKeluar = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState({
      date: new Date().toISOString().split('T')[0] // Set default date to today
    });
  
    const [errors, setErrors] = useState([]);  
    const [isLoading, setIsLoading] = useState(false);
    const [salesManagers, setSalesManagers] = useState([]);
    const [attributes, setAttributes] = useState([]);
    const [shops, setShops] = useState([]);
    const [selectedAttributeStock, setSelectedAttributeStock] = useState(0);
  
    const getSalesManagers = () => {
      axios.get(`${Constants.BASE_URL}/get-sales-manager-list`).then(res => {
          setSalesManagers(res.data)
      })
    }
  
    const getAttributes = () => {
      axios.get(`${Constants.BASE_URL}/get-attribute-list`).then(res => {
          setAttributes(res.data)
      })
    }
  
    const getShops = () => {
      axios.get(`${Constants.BASE_URL}/get-shop-list`).then(res => {
          setShops(res.data)
      })
    }
  
    const handleInput = (e) => {
      if (e.target.name === 'attribute_id') {
        const selectedAttribute = attributes.find(attr => attr.id === parseInt(e.target.value));
        if (selectedAttribute) {
          console.log(selectedAttribute.stock);
          setSelectedAttributeStock(selectedAttribute.stock);
        }
      }
  
      if (e.target.name === 'name') {
          let slug = e.target.value
          slug = slug.toLowerCase()
          slug = slug.replaceAll(' ','-')
          setInput(prevState =>  ({...prevState, slug: slug}))
      }
      setInput(prevState => ({...prevState, [e.target.name] : e.target.value}));
    }
  
    const handleQuantityInput = (e) => {
      const value = parseInt(e.target.value);
      if (value > selectedAttributeStock) {
        e.target.value = selectedAttributeStock;
        setInput(prevState => ({...prevState, quantity: selectedAttributeStock}));
      } else {
        setInput(prevState => ({...prevState, quantity: value}));
      }
    }
  
    const handleBarangKeluarCreate = (e) => {
      e.preventDefault();
      
      if (parseInt(input.quantity) > selectedAttributeStock) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Kuantitas tidak boleh lebih dari stok atribut',
        });
        return;
      }
  
      setIsLoading(true);
      axios.post(`${Constants.BASE_URL}/outbound-items`, input)
          .then(res => {
              setIsLoading(false)
              Swal.fire({
                  position: "top-end",
                  icon: res.data.cls,
                  title: res.data.msg,
                  showConfirmButton: false,
                  toast: true,
                  timer: 1500
              });
              const updatedAttribute = attributes.find(attr => attr.id === input.attribute_id);
              if (updatedAttribute) {
                  updatedAttribute.stock -= input.quantity;
                  setAttributes([...attributes]);
              }
              navigate('/barang-keluar');
          })
          .catch(errors => {
              setIsLoading(false);
              if(errors.response.status === 422) {
                  setErrors(errors.response.data.errors);
              }
          });
      };
  
    useEffect(() => {
      getSalesManagers();
      getAttributes();
      getShops();
    }, []);

  return (
    <div className="content-wrapper">
        <section className="content-header">
            <Breadcrumb title="Tambah Data Barang Keluar" breadcrumb="Form Data" />
        </section>
        <section className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card card-warning card-outline">
                            <form id="quickForm">
                                <div className="card-body row">
                                    <div className="form-group col-md-6">
                                        <label>Pilih Produk</label>
                                        <select 
                                            name="attribute_id"
                                            value={input.attribute_id}
                                            onChange={handleInput} 
                                            className={errors.attribute_id ? 'form-control is-invalid ' : 'form-control'}
                                            placeholder="Select Category" 
                                        >
                                            <option value="" disabled selected>Pilih Produk</option>
                                            {attributes.map((attribute) => (
                                                <option value={attribute.id} key={attribute.id}>{attribute.name}</option>
                                            ))}
                                        </select>
                                        {errors.attribute_id && (
                                            <div className="invalid-feedback">
                                            {errors.attribute_id[0]}
                                            </div>
                                        )}
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Karyawan</label>
                                        <select 
                                            name="sales_manager_id"
                                            value={input.sales_manager_id}
                                            onChange={handleInput} 
                                            className={errors.sales_manager_id ? 'form-control is-invalid ' : 'form-control'}
                                        >
                                            <option value="" disabled selected>Pilih Karyawan</option>
                                            {salesManagers.map((salesManager) => (
                                                <option value={salesManager.id} key={salesManager.id}>{salesManager.name}</option>
                                            ))}
                                        </select>
                                        {errors.sales_manager_id && (
                                            <div className="invalid-feedback">
                                            {errors.sales_manager_id[0]}
                                            </div>
                                        )}
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Kafe</label>
                                        <select 
                                            name="shop_id"
                                            value={input.shop_id}
                                            onChange={handleInput} 
                                            className={errors.shop_id ? 'form-control is-invalid ' : 'form-control'}
                                        >
                                            <option value="" disabled selected>Pilih Kafe</option>
                                            {shops.map((shop) => (
                                                <option value={shop.id} key={shop.id}>{shop.name}</option>
                                            ))}
                                        </select>
                                        {errors.shop_id && (
                                            <div className="invalid-feedback">
                                            {errors.shop_id[0]}
                                            </div>
                                        )}
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Kuantitas</label>
                                        <input 
                                            type="number" 
                                            name="quantity"
                                            value={input.quantity}
                                            onChange={handleInput} 
                                            onInput={handleQuantityInput}
                                            className={errors.quantity ? 'form-control is-invalid ' : 'form-control'}
                                            placeholder="Enter Kuantitas Barang Keluar" 
                                        />
                                        {errors.quantity && (
                                            <div className="invalid-feedback">
                                            {errors.quantity[0]}
                                            </div>
                                        )}
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Tanggal Barang Keluar</label>
                                        <input
                                            className={errors.date ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                                            type='date'
                                            name='date'
                                            value={input.date || new Date().toISOString().split('T')[0]}
                                            onChange={handleInput}
                                            placeholder={'Enter Discount Start Date'}
                                            disabled
                                        />
                                        {errors.date && (
                                            <div className="invalid-feedback">
                                            {errors.date[0]}
                                            </div>
                                        )}
                                    </div>
                                    <div className="form-group col-md-6 ">
                                        <label>Keterangan</label>
                                        <textarea 
                                            name="keterangan"
                                            value={input.keterangan}
                                            onChange={handleInput} 
                                            className={errors.keterangan ? 'form-control is-invalid ' : 'form-control'}
                                            placeholder="Enter Sub Category Description" 
                                        />
                                        {errors.keterangan && (
                                            <div className="invalid-feedback">
                                            {errors.keterangan[0]}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <div className='row justify-content-center'>
                                        <CardHeader 
                                            link={'/barang-keluar'} 
                                            btnText="Batal"
                                            btn="btn btn-info"
                                        />
                                        <button className="btn btn-warning w-30" onClick={handleBarangKeluarCreate} dangerouslySetInnerHTML={{__html: isLoading ? '<span class="spinner-border spinner-border-sm" aria-hidden="true"></span> Loading...' : 'Tambah Barang Keluar'}} />
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

export default AddBarangKeluar;
