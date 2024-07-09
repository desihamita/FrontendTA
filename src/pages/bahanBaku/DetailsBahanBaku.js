import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../components/partials/Breadcrumb';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Constants from '../../Constants';
import GlobalFunction from '../../GlobalFunction';
import CardHeader from '../../components/partials/miniComponent/CardHeader';

const DetailsBahanBaku = () => {
  const params = useParams();
  const [attributes, setAttributes] = useState({
    edit: {},
    details: {}
  });
  const [isLoading, setIsLoading] = useState(false);

  const getAttributes = () => {
    setIsLoading(true);
    axios.get(`${Constants.BASE_URL}/attribute/${params.id}`)
      .then(res => {
        setAttributes(res.data.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching attribute details:', error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getAttributes();
  }, []);

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <Breadcrumb title="Detail Bahan Baku" breadcrumb="Form Data" />
      </section>
      <section className="content">
        <div className="card">
          <div className="card-header">
            <CardHeader
              link={'/bahan-baku'}
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
                          <td>{attributes.details.name}</td>
                        </tr>
                        <tr>
                          <th>Slug</th>
                          <td>{attributes.details.slug}</td>
                        </tr>
                        <tr>
                          <th>Status</th>
                          <td>{attributes.details.status}</td>
                        </tr>
                        <tr>
                          <th>Category</th>
                          <td>
                            {GlobalFunction.isAdmin() ? (
                              <Link to={'/category'}>{attributes.details.category}</Link>
                            ) : (
                              attributes.details.category
                            )}
                          </td>
                        </tr>
                        <tr>
                          <th>Sub Category</th>
                          <td>
                            {GlobalFunction.isAdmin() ? (
                              <Link to={'/sub-category'}>{attributes.details.sub_category}</Link>
                            ) : (
                              attributes.details.sub_category
                            )}
                          </td>
                        </tr>
                        <tr>
                          <th>Brand</th>
                          <td>
                            {GlobalFunction.isAdmin() ? (
                              <Link to={'/brand'}>{attributes.details.brand}</Link>
                            ) : (
                              attributes.details.brand
                            )}
                          </td>
                        </tr>
                        <tr>
                          <th>Supplier</th>
                          <td>
                            {GlobalFunction.isAdmin() ? (
                              <Link to={'/supplier'}>{attributes.details.supplier}</Link>
                            ) : (
                              attributes.details.supplier
                            )}
                          </td>
                        </tr>
                        <tr>
                          <th>Created At</th>
                          <td>{attributes.details.created_at}</td>
                        </tr>
                        <tr>
                          <th>Updated At</th>
                          <td>{attributes.details.updated_at}</td>
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
                          <th>SKU</th>
                          <td>{attributes.details.sku}</td>
                        </tr>
                        <tr>
                          <th>Price</th>
                          <td>{attributes.details.price}</td>
                        </tr>
                        <tr>
                          <th>Stock</th>
                          <td>{attributes.details.stock}</td>
                        </tr>
                        <tr>
                          <th>Created By</th>
                          <td>{attributes.details.created_by}</td>
                        </tr>
                        <tr>
                          <th>Updated By</th>
                          <td>{attributes.details.updated_by}</td>
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
  );
};

export default DetailsBahanBaku;
