import React, { useEffect, useState } from 'react'
import Pagination from 'react-js-pagination'
import DetailsSupplier from '../supplier/DetailsSupplier'
import CategoryPhotoModal from '../../components/partials/modal/CategoryPhotoModal'
import { Link } from 'react-router-dom'
import NoDataFound from '../../components/partials/miniComponent/NoDataFound'
import Loader from '../../components/partials/miniComponent/Loader'
import CardHeader from '../../components/partials/miniComponent/CardHeader'
import Breadcrumb from '../../components/partials/Breadcrumb'
import axios from 'axios'
import Constants from '../../Constants'
import Swal from 'sweetalert2'
import DetailsSalesManager from './DetailsSalesManager'

const ListSalesManager = () => {
    const [input, setInput] = useState({
        order_by: 'created_at',
        per_page: 10,
        direction: 'desc',
        search: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [salesManager, setSalesManager] = useState([]);
    const [itemsCountPerPage, setItemsCountPerPage] = useState(0);
    const [totalItemsCount, setTotalItemsCount] = useState(1);
    const [startFrom, setStartFrom] = useState(1);
    const [activePage, setActivePage] = useState(1);
    const [modalShow, setModalShow] = useState(false);
    const [modalLogoShow, setModalLogoShow] = useState(false);
    const [salesManagers, setSalesManagers] = useState([]);
    const [modalLogo, setModalLogo] = useState('');

    const handleInput = (e) => {
        setInput(prevState => ({...prevState, [e.target.name]: e.target.value}));
    };

    const getSalesManagers = (pageNumber = 1) => {
        setIsLoading(true);
        axios.get(`${Constants.BASE_URL}/sales-manager?page=${pageNumber}&search=${input.search}&order_by=${input.order_by}&per_page=${input.per_page}&direction=${input.direction}`)
            .then(res => {
            const { data, meta } = res.data;
            if (data && meta) {
                setSalesManagers(data);
                setItemsCountPerPage(meta.per_page);
                setStartFrom(meta.from);
                setTotalItemsCount(meta.total);
                setActivePage(meta.current_page);
            } 
            setIsLoading(false);
        })
        .catch(error => {
            setIsLoading(false);
        });
    };

    const handleLogoModal = (logo) => {
        setModalLogo(logo);
        setModalLogoShow(true);
    };

    const handleDetailsModal = (sales_manager) => {
        setSalesManager(sales_manager);
        setModalShow(true);
    };

    const handleSalesManagerDelete = (id) => {
        Swal.fire({
          title: "Apa kamu yakin?",
          text: "Karyawan akan dihapus",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ya, Hapus!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${Constants.BASE_URL}/sales-manager/${id}`).then(res => {
                    Swal.fire({
                        position: "top-end",
                        icon: res.data.cls,
                        title: res.data.msg,
                        showConfirmButton: false,
                        toast: true,
                        timer: 1500
                    });
                    getSalesManagers(activePage);
                });
            }
        });
    };

    useEffect(() => {
        getSalesManagers();
    }, []);

    return (
    <div className="content-wrapper">
      <section className="content-header">
        <Breadcrumb title="Daftar Karyawan" breadcrumb="karyawan" />
      </section>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card card-outline card-warning">
                <div className="card-header">
                  <div className="d-flex justify-content-between align-items-center">
                    <CardHeader 
                      link={'/sales-manager/create'} 
                      btnText="Tambah Karyawan"
                      btn="btn btn-warning"
                      icon="fas fa-plus"
                    />
                  </div>
                </div>
                <div className="card-body">
                  <div className='search-area mb-2'>
                    <div className='row'>
                      <div className='col-md-3'>
                        <label className='w-100'>
                          <p className='mb-0'>Search</p>
                          <input 
                            className='form-control'
                            type='search'
                            name='search'
                            value={input.search}
                            onChange={handleInput}
                            placeholder='Search'
                          />
                        </label>
                      </div>
                      <div className='col-md-3'>
                        <label className='w-100'>
                          <p className='mb-0'>Order By</p>
                          <select 
                            className='form-control select2'
                            name='order_by'
                            value={input.order_by}
                            onChange={handleInput}
                          >
                            <option value={'name'}>Name</option>
                            <option value={'created_at'}>Created At</option>
                            <option value={'updated_at'}>Updated At</option>
                            <option value={'phone'}>Phone</option>
                            <option value={'email'}>Email</option>
                          </select>
                        </label>
                      </div>
                      <div className='col-md-2'>
                        <label className='w-100'>
                          <p className='mb-0'>Order Direction</p>
                          <select 
                            className='form-control select2'
                            name='direction'
                            value={input.direction}
                            onChange={handleInput}
                          >
                            <option value={'asc'}>ASC</option>
                            <option value={'desc'}>DESC</option>
                          </select>
                        </label>
                      </div>
                      <div className='col-md-2'>
                        <label className='w-100'>
                          <p className='mb-0'>Per Page</p>
                          <select 
                            className='form-control select2'
                            name='per_page'
                            value={input.per_page}
                            onChange={handleInput}
                          >
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                          </select>
                        </label>
                      </div>
                      <div className='col-md-2'>
                        <div className='d-grid mt-4'>
                          <button className='btn btn-warning w-100' onClick={() => getSalesManagers(1)}>
                            <i className="fas fa-search"></i> Search
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {isLoading ? <Loader/> : 
                    <div className="table-responsive">
                      <table className="table table-hover table-striped table-bordered">
                        <thead>
                          <tr>
                            <th>No</th>
                            <th>Nama</th>
                            <th>No.Tlp / Email</th>
                            <th>Status</th>
                            <th>Foto</th>
                            <th>Dibuat Oleh</th>
                            <th>Tanggal / Waktu</th>
                            <th>Aksi</th>
                          </tr>
                        </thead>
                        <tbody>
                          {salesManagers.length > 0 ? salesManagers.map((salesManager, index) => (
                            <tr key={index}>
                              <td>{startFrom + index}</td>
                              <td>{salesManager.name}</td>
                              <td>
                                <p className="mb-0">Email : {salesManager.email}</p>
                                <p className="text-success">No.Tlp : {salesManager.phone}</p>
                              </td>
                              <td>
                                <p className="mb-0">Status : {salesManager.status}</p>
                              </td>
                              <td>
                                <img
                                  src={salesManager.photo}
                                  alt={salesManager.name}
                                  className="img-thumbnail table-image"
                                  width={75}
                                  style={{ cursor: 'pointer' }}
                                  onClick={() => handleLogoModal(salesManager.photo_full)}
                                />
                              </td>
                              <td>{salesManager.created_by}</td>
                              <td>
                                <p className="mb-0">
                                  <small>Dibuat : {salesManager.created_at}</small>
                                </p>
                                <p className="text-success">
                                  <small>Diubah : {salesManager.updated_at}</small>
                                </p>
                              </td>
                              <td className='m-1'>
                                <button onClick={() => handleDetailsModal(salesManager)} className='btn btn-info btn-sm my-1'><i className="fas fa-solid fa-eye"></i></button>
                                
                                <Link to={`/sales-manager/edit/${salesManager.id}`}><button className='btn btn-warning btn-sm my-1 mx-1'><i className="fas fa-solid fa-edit"></i></button></Link>
                                
                                <button onClick={() => handleSalesManagerDelete(salesManager.id)} className='btn btn-danger btn-sm my-1'><i className="fas fa-solid fa-trash"></i></button>
                              </td>
                            </tr>
                          )) : <NoDataFound colSpan={8} /> }
                        </tbody>
                        <tfoot>
                          <tr>
                            <th>No</th>
                            <th>Nama</th>
                            <th>No.Tlp / Email</th>
                            <th>Status</th>
                            <th>Foto</th>
                            <th>Dibuat Oleh</th>
                            <th>Tanggal / Waktu</th>
                            <th>Aksi</th>
                          </tr>
                        </tfoot>
                      </table>
                      <CategoryPhotoModal
                        show={modalLogoShow}
                        onHide={() => setModalLogoShow(false)}
                        title={'Foto Karyawan'}
                        size={'800'}
                        photo={modalLogo}
                      />
                      <DetailsSalesManager
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        title={'Detail Karyawan'}
                        size={''}
                        sales={salesManager}
                      />
                    </div>
                  }
                </div>
                <div className="card-footer d-flex justify-content-between align-items-center">
                  <div className="data_tables_info">
                      Showing {startFrom} to {startFrom + salesManagers.length - 1} of {totalItemsCount} entries
                  </div>
                  <nav className="pagination-sm ml-auto">
                      <Pagination
                      activePage={activePage}
                      itemsCountPerPage={itemsCountPerPage}
                      totalItemsCount={totalItemsCount}
                      pageRangeDisplayed={10}
                      onChange={getSalesManagers}
                      nextPageText={'Next'}
                      prevPageText={'Previous'}
                      itemClass="page-item"
                      linkClass="page-link"
                      />
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ListSalesManager