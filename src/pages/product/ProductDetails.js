import React, { useEffect, useState } from 'react'
import Breadcrumb from '../../components/partials/Breadcrumb'
import CardHeader from '../../components/partials/miniComponent/CardHeader'
import Constants from '../../Constants'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import GlobalFunction from '../../GlobalFunction'

const ProductDetails = () => {
  const params = useParams();
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const getProducts = (id) => {
    setIsLoading(true);
    axios.get(`${Constants.BASE_URL}/product/${params.id}`)
    .then(res => {
        setProducts(res.data.data);
        setIsLoading(false);
    });
  };

  useEffect(() => {
    getProducts()
  }, []);

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <Breadcrumb title="Product Details" breadcrumb="product details" />
      </section>
      <section className="content">
        <div className="card">
          <div className="card-header">
            <CardHeader 
              link={'/product'} 
              btnText="Cancel"
              btn="btn btn-info"
              icon="fas fa-backspace"
            />
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h4>Basic Information</h4>
                  </div>
                  <div className="card-body">
                    <table className="table table-hover table-striped table-bordered">
                      <tbody>
                        <tr>
                          <th>Title</th>
                          <td>{products?.name}</td>
                        </tr>
                        <tr>
                          <th>Slug</th>
                          <td>{products?.slug}</td>
                        </tr>
                        <tr>
                          <th>SKU</th>
                          <td>{products.sku}</td>
                        </tr>
                        <tr>
                          <th>Status</th>
                          <td>{products.status}</td>
                        </tr>
                        <tr>
                          <th>Category</th>
                          <td>{GlobalFunction.isAdmin() ? <Link to={'/category'}>{products?.category}</Link> : products?.category}</td>
                        </tr>
                        <tr>
                          <th>Sub Category</th>
                          <td>{GlobalFunction.isAdmin() ? <Link to={'/sub-category'}>{products?.sub_category}</Link> : products?.sub_category}</td>
                        </tr>
                        <tr>
                          <th>Created By</th>
                          <td>{products?.created_by}</td>
                        </tr>
                        <tr>
                          <th>Updated By</th>
                          <td>{products?.updated_by}</td>
                        </tr>
                        <tr>
                          <th>Created At</th>
                          <td>{products?.created_at}</td>
                        </tr>
                        <tr>
                          <th>Updated At</th>
                          <td>{products?.updated_at}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h4>Price & Stock</h4>
                  </div>
                  <div className="card-body">
                    <table className="table table-hover table-striped table-bordered">
                      <tbody>
                        <tr>
                          <th>Cost</th>
                          <td>{products.cost}</td>
                        </tr>
                        <tr>
                          <th>Original Sale Price</th>
                          <td>{products.price}</td>
                        </tr>
                        <tr>
                          <th>Sale Price</th>
                          <td>{products.sell_price?.price}</td>
                        </tr>
                        <tr>
                          <th>Discount</th>
                          <td>{products?.sell_price?.discount}</td>
                        </tr>
                        <tr>
                          <th>Discount Percent</th>
                          <td>{products.discount_percent}</td>
                        </tr>
                        <tr>
                          <th>Discount Fixed</th>
                          <td>{products?.discount_fixed}</td>
                        </tr>
                        <tr>
                          <th>Discount Start</th>
                          <td>{products.discount_start}</td>
                        </tr>
                        <tr>
                          <th>Discount End</th>
                          <td>{products.discount_end}</td>
                        </tr>
                        <tr>
                          <th>Discount Remaining Days</th>
                          <td>{products.discount_remaining_days} Days</td>
                        </tr>
                        <tr>
                          <th>Stock</th>
                          <td>{products.stock}</td>
                        </tr>
                        <tr>
                          <th>Profit</th>
                          <td>{products.profit}</td>
                        </tr>
                        <tr>
                          <th>Profit Percentage</th>
                          <td>{products.profit_precentage}%</td>
                        </tr>
                      </tbody>
                    </table>
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

export default ProductDetails