import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../partials/Breadcrumb';
import axios from 'axios';
import Constants from '../../../Constants';

const Barcode = () => {
  const [input, setInput] = useState({
    name : '',
    category_id: '',
    sub_category_id: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [subCategories, setSubCategories] = useState([])
  const [producuts, setProducts] = useState([])

  const handleInput = (e) => {
    if (e.target.name === 'category_id') {
      let category_id = parseInt(e.target.value);
      if (!Number.isNaN(category_id)) {
        getSubCategories(e.target.value)
      }
    }
    setInput(prevState => ({...prevState, [e.target.name]: e.target.value}))
  }

  const getCategories = () => {
    axios.get(`${Constants.BASE_URL}/get-category-list`).then(res => {
      setCategories(res.data)
    })
  }
  
  const getSubCategories = (category_id) => {
    axios.get(`${Constants.BASE_URL}/get-sub-category-list/${category_id}`).then(res => {
      setSubCategories(res.data)
    })
  }

  const handleProductSearch = () => {
    axios.get(`${Constants.BASE_URL}/get-product-list-for-barcode?name=${input?.name}&category_id=${input?.category_id}&sub_category_id=${input?.sub_category_id}`).then(res => {
        setProducts(res.data.data)
      })
  }

  useEffect(() => {
    getCategories()
  })

  return (
    <>
      <div className="content-wrapper">
        <section className="content-header">
          <Breadcrumb title="Generate and Print Barcode" />
        </section>
        <section className="content">
          <div className="card">
            <div className="card-header">
              <button type="button" className="btn btn-success" data-card-widget="collapse" title="Collapse">
                Print
              </button>
            </div>
            <div className="card-body">
              <div className='row align-items-center'>
                <div className="col-md-3">
                <select
                        className='form-control'
                        name={'category_id'}
                        value={input.category_id}
                        onChange={handleInput}
                        placeholder={'Select product category'}
                      >
                        <option>Select Category</option>
                        {categories.map((category, index) => (
                            <option value={category.id} key={index}>{category.name}</option>
                        ))}
                      </select>
                </div>
                <div className="col-md-3">
                  <label className='mt-4 mt-md-0'>Select Sub Category</label>
                  <select
                    className='form-control'
                    name={'sub_category_id'}
                    value={input.sub_category_id}
                    onChange={handleInput}
                    placeholder={'Select product subcategory'}
                    disabled={input.category_id === undefined}
                  >
                    <option>Select Sub Category</option>
                    {subCategories.map((subCategory, index) => (
                        <option value={subCategory.id} key={index}>{subCategory.name}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4">
                  <label className='mt-4 mt-md-0'>Product Name</label>
                  <input
                    type="search"
                    name="name"
                    value={input.name}
                    onChange={handleInput}
                    className='form-control'
                    placeholder="Enter Product Name"
                  />
                </div>
                <div className="col-md-2 d-flex align-items-center">
                  <button 
                    className="btn btn-warning mt-4 w-100" 
                    onClick={handleProductSearch}
                    dangerouslySetInnerHTML={{ __html: isLoading ? '<span class="spinner-border spinner-border-sm" aria-hidden="true"></span> Loading...' : 'Search' }} 
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Barcode
