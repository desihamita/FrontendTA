import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../components/partials/Breadcrumb';
import Constants from '../../Constants';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const AddOrder = () => {
  const [input, setInput] = useState({
    order_by: 'created_at',
    per_page: 10,
    direction: 'asc',
    search: ''
  });

  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const [itemsCountPerPage, setItemsCountPerPage] = useState(0);
  const [totalItemsCount, setTotalItemsCount] = useState(1);
  const [startFrom, setStartFrom] = useState(1);
  const [activePage, setActivePage] = useState(1);
  const [carts, setCarts] = useState({});
  const [orderSummary, setOrderSummary] = useState({
    items : 0,
    amount : 0,
    discount : 0,
    pay_able : 0,
  });

  const handleInput = (e) => {
    setInput((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleCart = (id) => {
    setCarts(prevCarts => {
      const product = products.find(product => product.id === id);
      const currentQuantity = prevCarts[id]?.quantity || 0;
      const newQuantity = currentQuantity + 1;
      return { ...prevCarts, [id]: { ...product, quantity: newQuantity } };
    });
  };

  const handleRemoveCart = (id) => {
    setCarts(prevCarts => {
      const currentQuantity = prevCarts[id]?.quantity || 0;
      if (currentQuantity > 1) {
        return { ...prevCarts, [id]: { ...prevCarts[id], quantity: currentQuantity - 1 } };
      } else {
        const copy = { ...prevCarts };
        delete copy[id];
        return copy;
      }
    });
  };

  const getProducts = (pageNumber = 1) => {
    setIsLoading(true);
    axios.get(`${Constants.BASE_URL}/product?page=${pageNumber}&search=${input.search}&order_by=${input.order_by}&per_page=${input.per_page}&direction=${input.direction}`)
      .then((res) => {
        setProducts(res.data.data);
        setItemsCountPerPage(res.data.meta.per_page);
        setStartFrom(res.data.meta.from);
        setTotalItemsCount(res.data.meta.total);
        setActivePage(res.data.meta.current_page);
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong while fetching products!',
        });
        console.error('Error fetching products:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    let items = 0;
    let amount = 0;
    let discount = 0;
    let pay_able = 0;
    Object.values(carts).forEach(cartItem => {
      items += cartItem.quantity;
      amount += cartItem.original_price * cartItem.quantity;
      discount += cartItem.sell_price.discount * cartItem.quantity;
      pay_able += cartItem.sell_price.price * cartItem.quantity;
    });
    setOrderSummary({
      items,
      amount,
      discount,
      pay_able,
    });
  }, [carts]);

  return (
    <>
      <div className="content-wrapper">
        <section className="content-header">
          <Breadcrumb title="Create Order" breadcrumb="Form Data" />
        </section>
        <section className="content">
          <div className="container-fluid">
            <div className="card card-warning card-outline">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-4">
                    <div className="card card-orange card-outline" >
                      <div className="card-header">
                        <h5>Product List</h5>
                      </div>
                      <div className="card-body">
                        <div className="form-group">
                          <div className="input-group input-group-lg">
                            <input 
                              className="form-control form-control-lg" 
                              type='search'
                              name='search'
                              value={input.search}
                              onChange={handleInput}
                              placeholder='Search'
                            />
                            <div className="input-group-append">
                              <button onClick={getProducts} className="btn btn-lg btn-default">
                                <i className="fa fa-search" />
                              </button>
                            </div>
                          </div>
                        </div>
                        {products.map((product, index) => (
                          <div 
                            key={index} 
                            className="attachment-block border-bottom align-items-center py-2" 
                            style={{backgroundColor : 'transparent', border: 'none'}}
                          >
                            <div className='py-2'>
                              <button className='btn btn-xs btn-success m-1'><i className='fas fa-solid fa-eye'></i></button>
                              <button className='btn btn-xs btn-primary m-1' onClick={() => handleCart(product.id)}><i className='fas fa-solid fa-plus'></i></button>
                            </div>
                            <img className="attachment-img" src={product.primary_photo} alt={product.name} />
                            <div className="attachment-pushed">
                              <h4 className="attachment-heading text-orange">{product.name}</h4>
                              <div className="attachment-text">
                                <p className="mb-0">Original Price : <small>{product.price}</small></p>

                                <p className="mb-0">Sell Price : <small>{product.sell_price.symbol} {product.sell_price.price} | Discount : {product.sell_price.symbol} {product.sell_price.discount}</small></p>

                                <p className="mb-0"><small>SKU : {product.sku} | Stock : {product.stock}</small></p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card card-orange card-outline">
                      <div className="card-header">
                        <h5>Cart</h5>
                      </div>
                      <div className="card-body">
                        <div className='order-summary'>
                          <table className='table table-sm table-hover table-striped table-bordered'>
                            <tbody>
                              <tr>
                                <th>Total Items</th>
                                <td className='text-right'>{orderSummary.items}</td>
                              </tr>
                              <tr>
                                <th>Original Price</th>
                                <td className='text-right'>Rp.{orderSummary.amount}</td>
                              </tr>
                              <tr>
                                <th>Discount</th>
                                <td className='text-right'>- Rp.{orderSummary.discount}</td>
                              </tr>
                              <tr>
                                <th>Payable</th>
                                <td className='text-right'>- Rp.{orderSummary.pay_able}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        {Object.keys(carts).map((key) => (
                          <div 
                          key={key} 
                          className="attachment-block border-bottom align-items-center py-2" 
                          style={{backgroundColor : 'transparent', border: 'none'}}
                        >
                          <div className='py-2'>
                            <button className='btn btn-xs btn-info m-1'><i className='fas fa-solid fa-eye'></i></button>
                            <button className='btn btn-xs btn-danger m-1' onClick={() => handleRemoveCart(key)}><i class="fas fa-solid fa-times"></i></button>
                          </div>
                          <img className="attachment-img" src={carts[key].primary_photo} alt={carts[key].name} />
                          <div className="attachment-pushed">
                            <h4 className="attachment-heading text-orange">{carts[key].name}</h4>
                            <div className="attachment-text">
                              <p className="mb-0">Original Price : <small>{carts[key].price}</small></p>

                              <p className="mb-0">Sell Price : <small>{carts[key].sell_price.symbol} {carts[key].sell_price.price} | Discount : {carts[key].sell_price.symbol} {carts[key].sell_price.discount}</small></p>

                              <p className="mb-0"><small>SKU : {carts[key].sku} | Stock : {carts[key].stock}</small></p>
                              <p className="mb-0"><small>Quantity : {carts[key].quantity}</small></p>
                            </div>
                          </div>
                        </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card card-orange card-outline">
                      <div className="card-header">
                        <h5>User List</h5>
                      </div>
                      <div className="card-body"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AddOrder;
