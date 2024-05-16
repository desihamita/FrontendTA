import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../components/partials/Breadcrumb';
import CardHeader from '../../components/partials/miniComponent/CardHeader';
import axios from 'axios';
import Swal from 'sweetalert2';
import Constants from '../../Constants';
import CategoryPhotoModal from '../../components/partials/modal/CategoryPhotoModal';
import Pagination from 'react-js-pagination';
import { Link } from 'react-router-dom';
import CategoryDetailsModal from '../../components/partials/modal/CategoryDetailsModal';
import Loader from '../../components/partials/miniComponent/Loader';
import NoDataFound from '../../components/partials/miniComponent/NoDataFound';

const CategoryList = () => {
  const [input, setInput] = useState({
    order_by: 'serial',
    per_page: 10,
    direction: 'asc',
    search: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const [itemsCountPerPage, setItemsCountPerPage] = useState(0);
  const [totalItemsCount, setTotalItemsCount] = useState(1);
  const [startFrom, setStartFrom] = useState(1);
  const [activePage, setActivePage] = useState(1);
  const [modalShow, setModalShow] = useState(false);
  const [modalPhotoShow, setModalPhotoShow] = useState(false);
  const [categories, setCategories] = useState([]);
  const [modalPhoto, setModalPhoto] = useState('');

  const handleInput = (e) => {
    setInput(prevState => ({...prevState, [e.target.name]: e.target.value}));
  };

  const getCategories = (pageNumber = 1) => {
    setIsLoading(true);
    axios.get(`${Constants.BASE_URL}/category?page=${pageNumber}&search=${input.search}&order_by=${input.order_by}&per_page=${input.per_page}&direction=${input.direction}`)
        .then(res => {
            setCategories(res.data.data);
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

  const handleDetailsModal = (category) => {
    setCategory(category);
    setModalShow(true);
  };

  const handleCategoryDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Category will be deleted",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${Constants.BASE_URL}/category/${id}`).then(res => {
          Swal.fire({
            position: "top-end",
            icon: res.data.cls,
            title: res.data.msg,
            showConfirmButton: false,
            toast: true,
            timer: 1500
          });
          // Refresh the categories list
          getCategories(activePage);
        });
      }
    });
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <Breadcrumb title="Category List" breadcrumb="category" />
      </section>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card card-outline card-warning">
                <div className="card-header">
                  <div className="d-flex justify-content-between align-items-center">
                    <CardHeader add={'/category/create'} />
                  </div>
                </div>
                <div className="card-body">
                  <div className='search-area mb-2'>
                    <div className='row'>
                      <div className='col-md-3'>
                        <label className='w-100'>
                          <p className='mb-0'>Search :</p>
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
                          <p className='mb-0'>Order By :</p>
                          <select 
                            className='form-control select2'
                            name='order_by'
                            value={input.order_by}
                            onChange={handleInput}
                          >
                            <option value={'name'}>Name</option>
                            <option value={'created_at'}>Created At</option>
                            <option value={'updated_at'}>Updated At</option>
                            <option value={'serial'}>Serial</option>
                          </select>
                        </label>
                      </div>
                      <div className='col-md-2'>
                        <label className='w-100'>
                          <p className='mb-0'>Order Direction :</p>
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
                          <p className='mb-0'>Per Page :</p>
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
                        {/* Table Header */}
                        <thead>
                          <tr>
                            <th>SL</th>
                            <th>Name / Slug</th>
                            <th>Serial / Status</th>
                            <th>Photo</th>
                            <th>Created By</th>
                            <th>Date Time</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        {/* Table Body */}
                        <tbody>
                          {categories.length > 0 ? categories.map((category, index) => (
                            <tr key={index}>
                              <td>{startFrom + index}</td>
                              <td>
                                <p className="mb-0">Name : {category.name}</p>
                                <p className="text-success">Slug : {category.slug}</p>
                              </td>
                              <td>
                                <p className="mb-0">Serial : {category.serial}</p>
                                <p className="text-success">Status : {category.status}</p>
                              </td>
                              <td>
                                <img
                                  src={category.photo}
                                  alt={category.name}
                                  className="img-thumbnail table-image"
                                  width={75}
                                  style={{ cursor: 'pointer' }}
                                  onClick={() => handlePhotoModal(category.photo_full)}
                                />
                              </td>
                              <td>{category.created_by}</td>
                              <td>
                                <p className="mb-0">
                                  <small>Created : {category.created_at}</small>
                                </p>
                                <p className="text-success">
                                  <small>Updated : {category.updated_at}</small>
                                </p>
                              </td>
                              <td className='m-1'>
                                <button onClick={() => handleDetailsModal(category)} className='btn btn-info btn-sm my-1'><i className="fas fa-solid fa-eye"></i></button>
                                <Link to={`/category/edit/${category.id}`}><button className='btn btn-warning btn-sm my-1 mx-1'><i className="fas fa-solid fa-edit"></i></button></Link>
                                <button onClick={() => handleCategoryDelete(category.id)} className='btn btn-danger btn-sm my-1'><i className="fas fa-solid fa-trash"></i></button>
                              </td>
                            </tr>
                          )) : <NoDataFound/> }
                        </tbody>
                        {/* Table Footer */}
                        <tfoot>
                          <tr>
                            <th>SL</th>
                            <th>Name / Slug</th>
                            <th>Serial</th>
                            <th>Status</th>
                            <th>Created By</th>
                            <th>Date Time</th>
                            <th>Action</th>
                          </tr>
                        </tfoot>
                      </table>
                      {/* Category Photo Modal */}
                      <CategoryPhotoModal
                        show={modalPhotoShow}
                        onHide={() => setModalPhotoShow(false)}
                        title={'Category Photo'}
                        size={''}
                        photo={modalPhoto}
                      />

                      {/* Category Details Modal */}
                      <CategoryDetailsModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        title={'Category Details'}
                        size={''}
                        category={category}
                      />
                    </div>
                  }
                </div>
                {/* Pagination */}
                <div className="card-footer">
                  <div className="row">
                    <div className="col-sm-12 col-md-5">
                      <div className="data_tables_info">Showing {startFrom} to {startFrom + categories.length - 1} of {totalItemsCount} entries</div>
                    </div>
                    <div className="col-sm-12 col-md-7">
                      <nav className="pagination-sm">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CategoryList;
