import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Constants from '../../Constants';
import Swal from 'sweetalert2';
import Breadcrumb from '../../components/partials/Breadcrumb';
import CardHeader from '../../components/partials/miniComponent/CardHeader';
import Loader from '../../components/partials/miniComponent/Loader';
import { Link } from 'react-router-dom';
import NoDataFound from '../../components/partials/miniComponent/NoDataFound';
import CategoryPhotoModal from '../../components/partials/modal/CategoryPhotoModal';
import CategoryDetailsModal from '../../components/partials/modal/CategoryDetailsModal';
import Pagination from 'react-js-pagination';

const ListBrand = () => {
    const [input, setInput] = useState({
        order_by: 'serial',
        per_page: 10,
        direction: 'asc',
        search: ''
    })
    const [isLoading, setIsLoading] = useState(false);
    const [brand, setBrand] = useState([])
    const [brands, setBrands] = useState([])
    const [columns, setColumns] = useState([])

    const [itemsCountPerPage, setItemsCountPerPage] = useState(0)
    const [totalItemsCount, setTotalItemsCount] = useState(1)
    const [startFrom, setStartFrom] = useState(1)
    const [activePage, setActivePage] = useState(1)

    const [modalShow, setModalShow] = useState(false)
    const [modalPhotoShow, setModalPhotoShow] = useState(false)
    const [modalPhoto, setModalPhoto] = useState('')
    
    const handleInput = (e) => {
        setInput(prevState => ({...prevState, [e.target.name]: e.target.value}));
    };
    
    const getCategories = (pageNumber = 1) => {
        setIsLoading(true);
        axios.get(`${Constants.BASE_URL}/brand?page=${pageNumber}&search=${input.search}&order_by=${input.order_by}&per_page=${input.per_page}&direction=${input.direction}`)
        .then(res => {
            setBrands(res.data.data);
            setItemsCountPerPage(res.data.meta.per_page);
            setStartFrom(res.data.meta.from);
            setTotalItemsCount(res.data.meta.total);
            setActivePage(res.data.meta.current_page);
            setIsLoading(false);
        });
    };
    
    const handlePhotoModal = (photo) => {
        setModalPhoto(photo);
        setModalPhotoShow(true);
    };
    
    const handleDetailsModal = (brand) => {
        setBrand(brand);
        setModalShow(true);
    };
    
    const handleBrandDelete = (id) => {
        Swal.fire({
          title: "Apa kamu yakin?",
          text: "Merek akan dihapus",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ya, Hapus!"
        }).then((result) => {
          if (result.isConfirmed) {
            axios.delete(`${Constants.BASE_URL}/brand/${id}`).then(res => {
              Swal.fire({
                position: "top-end",
                icon: res.data.cls,
                title: res.data.msg,
                showConfirmButton: false,
                toast: true,
                timer: 1500
              });
              getCategories(activePage);
            });
          }
        });
    }

    const getColumns = () => {
      axios.get(`${Constants.BASE_URL}/get-brand-column`).then(res => {
          setColumns(res.data)
      });
    }
    
    useEffect(() => {
        getCategories()
        getColumns()
    }, []);

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <Breadcrumb title="Daftar Merek" breadcrumb="merek" />
      </section>
      <section className="content">
        <div className="card">
          <div className="card-header">
            <CardHeader 
              link={'/brand/create'} 
              btnText="Tambah Merek"
              btn="btn btn-warning"
              icon="fas fa-plus"
            />
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
                      <option value={'serial'}>Serial</option>
                      <option value={'name'}>Name</option>
                      <option value={'created_at'}>Created At</option>
                      <option value={'updated_at'}>Updated At</option>
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
                    <button className='btn btn-warning w-100' onClick={() => getCategories(1)}>
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
                      <th>Nama / Slug</th>
                      <th>Serial / Status</th>
                      <th>Foto</th>
                      <th>Dibuat Oleh</th>
                      <th>Tanggal / Waktu</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {brands.length > 0 ? brands.map((brand, index) => (
                      <tr key={index}>
                        <td>{startFrom + index}</td>
                        <td>
                          <p className="mb-0">Nama : {brand.name}</p>
                          <p className="text-success">Slug : {brand.slug}</p>
                        </td>
                        <td>
                          <p className="mb-0">Serial : {brand.serial}</p>
                          <p className="text-success">Status : {brand.status}</p>
                        </td>
                        <td>
                          <img
                            src={brand.photo}
                            alt={brand.name}
                            className="img-thumbnail table-image"
                            width={75}
                            style={{ cursor: 'pointer' }}
                            onClick={() => handlePhotoModal(brand.photo_full)}
                          />
                        </td>
                        <td>{brand.created_by}</td>
                        <td>
                          <p className="mb-0">
                            <small>Dibuat : {brand.created_at}</small>
                          </p>
                          <p className="text-success">
                            <small>Diubah : {brand.updated_at}</small>
                          </p>
                        </td>
                        <td className='m-1'>
                          <button onClick={() => handleDetailsModal(brand)} className='btn btn-info btn-sm my-1'><i className="fas fa-solid fa-eye"></i></button>
                          
                          <Link to={`/brand/edit/${brand.id}`}><button className='btn btn-warning btn-sm my-1 mx-1'><i className="fas fa-solid fa-edit"></i></button></Link>
                          
                          <button onClick={() => handleBrandDelete(brand.id)} className='btn btn-danger btn-sm my-1'><i className="fas fa-solid fa-trash"></i></button>
                        </td>
                      </tr>
                    )) : <NoDataFound colSpan={7} /> }
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>No</th>
                      <th>Nama / Slug</th>
                      <th>Serial / Status</th>
                      <th>Foto</th>
                      <th>Dibuat Oleh</th>
                      <th>Tanggal / Waktu</th>
                      <th>Aksi</th>
                    </tr>
                  </tfoot>
                </table>
                <CategoryPhotoModal
                  show={modalPhotoShow}
                  onHide={() => setModalPhotoShow(false)}
                  title={'Logo Merek'}
                  size={''}
                  photo={modalPhoto}
                />
                <CategoryDetailsModal
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                  title={'Details Merek'}
                  size={''}
                  category={brand}
                />
              </div>
            }
          </div>
          <div className="card-footer d-flex justify-content-between align-items-center">
            <div className="data_tables_info">
              Showing {startFrom} to {startFrom + brands.length - 1} of {totalItemsCount} entries
            </div>
            <nav className="pagination-sm ml-auto">
              <Pagination
                activePage={activePage}
                itemsCountPerPage={itemsCountPerPage}
                totalItemsCount={totalItemsCount}
                pageRangeDisplayed={10}
                onChange={getCategories}
                nextPageText={'Next'}
                prevPageText={'Previous'}
                itemClass="page-item"
                linkClass="page-link"
              />
            </nav>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ListBrand
