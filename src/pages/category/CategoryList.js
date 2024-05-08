import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../components/partials/Breadcrumb'
import CardHeader from '../../components/partials/miniComponent/CardHeader';
import axios from 'axios';
import Constants from '../../Constants';
import CategoryPhotoModal from '../../components/partials/modal/CategoryPhotoModal';

const CategoryList = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [categories, setCategories] = useState([])
  const [modalPhoto, setModalPhoto] = useState('');

  const getCategories = () => {
    axios.get(`${Constants.BASE_URL}/category`).then(res => {
      setCategories(res.data.data)
    })
  }

  const handlePhotoModal = (photo) => {
    setModalPhoto(photo)
    setModalShow(true)
  } 

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <Breadcrumb title="Category List" breadcrumb="category"/>
      </section>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card card-outline card-warning">
                <div className="card-header">
                  <CardHeader add={'/category/create'} />
                </div>
                <div className="card-body">
                  <div className='table-responsive'>
                    <table className='table table-hover table-striped table-bordered'>
                      <thead>
                        <tr>
                          <th>SL</th>
                          <th>Name / SLug</th>
                          <th>Serial / Status</th>
                          <th>Photo</th>
                          <th>Created By</th>
                          <th>Date Time</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {categories.map((category, index) => (
                          <tr>
                            <td>{++index}</td>
                            <td>
                              <p className='mb-0'>Name : {category.name}</p>
                              <p className='text-success'>Slug : {category.slug}</p>
                            </td>
                            <td>
                              <p className='mb-0'>Serial : {category.serial}</p>
                              <p className='text-success'>Status : {category.status}</p>
                            </td>
                            <td>
                              <img src={category.photo} alt={category.name} className='img-thumbnail table-image' width={75} style={{cursor: 'pointer'}} onClick={() => handlePhotoModal(category.photo_full)} />
                            </td>
                            <td>{category.created_by}</td>
                            <td>
                              <p className='mb-0'><small>Created : {category.created_at}</small></p>
                              <p className='text-success'><small>Updated : {category.updated_at}</small></p>
                            </td>
                            <td>as</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <th>SL</th>
                          <th>Name / SLug</th>
                          <th>Serial</th>
                          <th>Status</th>
                          <th>Created By</th>
                          <th>Date Time</th>
                          <th>Action</th>
                        </tr>
                      </tfoot>
                    </table>
                    <CategoryPhotoModal
                      show={modalShow}
                      onHide={() => setModalShow(false)}
                      title={'Category Photo'}
                      photo={modalPhoto}
                    />
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

export default CategoryList
