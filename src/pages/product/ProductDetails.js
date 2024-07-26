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
  const [products, setProducts] = useState({
    edit: {},
    details: {}
  });
  const [isLoading, setIsLoading] = useState(false)

  const getProducts = (id) => {
    setIsLoading(true);
    axios.get(`${Constants.BASE_URL}/product/${params.id}`)
    .then(res => {
        setProducts(res.data);
        setIsLoading(false);
    })
    .catch(error => {
      console.error('Error fetching product details:', error);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getProducts()
  }, []);

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <Breadcrumb title="Detail Produk" breadcrumb="detail" />
      </section>
      <section className="content">
        <div className="card">
          <div className="card-header">
            <CardHeader 
              link={'/product'} 
              btnText="Batal"
              btn="btn btn-info"
              icon="fas fa-backspace"
            />
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h4>Informasi Dasar</h4>
                  </div>
                  <div className="card-body">
                    <table className="table table-hover table-striped table-bordered">
                      <tbody>
                        <tr>
                          <th>Nama</th>
                          <td>{products.details.name}</td>
                        </tr>
                        <tr>
                          <th>Slug</th>
                          <td>{products.details.slug}</td>
                        </tr>
                        <tr>
                          <th>SKU</th>
                          <td>{products.details.sku}</td>
                        </tr>
                        <tr>
                          <th>Status</th>
                          <td>{products.details.status}</td>
                        </tr>
                        <tr>
                          <th>Kategori</th>
                          <td>{GlobalFunction.isAdmin() ? <Link to={'/category'}>{products.details.category}</Link> : products.details.category}</td>
                        </tr>
                        <tr>
                          <th>Sub Kategori</th>
                          <td>{GlobalFunction.isAdmin() ? <Link to={'/sub-category'}>{products.details.sub_category}</Link> : products.sub_category}</td>
                        </tr>
                        <tr>
                          <th>Dibuat Oleh</th>
                          <td>{products.details.created_by}</td>
                        </tr>
                        <tr>
                          <th>Diupdate Oleh</th>
                          <td>{products.details.updated_by}</td>
                        </tr>
                        <tr>
                          <th>Dibuat</th>
                          <td>{products.details.created_at}</td>
                        </tr>
                        <tr>
                          <th>Diubah</th>
                          <td>{products.details.updated_at}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h4>Harga & Stok</h4>
                  </div>
                  <div className="card-body">
                    <table className="table table-hover table-striped table-bordered">
                      <tbody>
                        <tr>
                          <th>Biaya</th>
                          <td>{products.details.cost}</td>
                        </tr>
                        <tr>
                          <th>Harga Jual Asli</th>
                          <td>{products.details.price}</td>
                        </tr>
                        <tr>
                          <th>Harga Jual Setelah diskon</th>
                          <td>{products.details.sell_price?.price}</td>
                        </tr>
                        <tr>
                          <th>Diskon</th>
                          <td>{products?.details.sell_price?.discount}</td>
                        </tr>
                        <tr>
                          <th>Diskon Persen</th>
                          <td>{products.details.discount_percent}</td>
                        </tr>
                        <tr>
                          <th>Diskon Tetap</th>
                          <td>{products?.details.discount_fixed}</td>
                        </tr>
                        <tr>
                          <th>Diskon Mulai</th>
                          <td>{products.details.discount_start}</td>
                        </tr>
                        <tr>
                          <th>Diskon Akhir</th>
                          <td>{products.details.discount_end}</td>
                        </tr>
                        <tr>
                          <th>Diskon Sisa Hari</th>
                          <td>{products.details.discount_remaining_days} Hari</td>
                        </tr>
                        <tr>
                          <th>Stok</th>
                          <td>{products.details.stock}</td>
                        </tr>
                        <tr>
                          <th>Keuntungan</th>
                          <td>{products.details.profit}</td>
                        </tr>
                        <tr>
                          <th>Persentase Keuntungan</th>
                          <td>{products.details.profit_percentage}%</td>
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