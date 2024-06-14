import React, { useState } from 'react'
import { Breadcrumb } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import Constants from '../../Constants'
import axios from 'axios'

const OrderDetails = () => {
  const params = useParams()
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState([]);

  const getOrderDetails  = () => {
    setIsLoading(true);
    axios.get(`${Constants.BASE_URL}/order/${params.id}`).then(res => {
        setOrder(res.data.data)
        setIsLoading(false)
    });
  };

  return (
    <>
        <div className="content-wrapper">
        <section className="content-header">
            <Breadcrumb title="Order Details" breadcrumb="Form Data" />
        </section>
        <section className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card card-warning card-outline">
                            
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
    </>
  )
}

export default OrderDetails