import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../components/partials/Breadcrumb';
import Constants from '../../Constants';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AddCustomer from '../../components/partials/modal/AddCustomer';
import ShowOrderConfirmation from '../../components/partials/modal/ShowOrderConfirmation';
import GlobalFunction from '../../GlobalFunction';
import NoDataFound from '../../components/partials/miniComponent/NoDataFound';

const AddOrder = () => {
  const navigate = useNavigate()
  const [input, setInput] = useState({
    order_by: 'created_at',
    per_page: 10,
    direction: 'asc',
    search: ''
  });

  const [customerInput, setCustomerInput] = useState('');
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState({});
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [carts, setCarts] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [showOrderConfirmationModel, setShowOrderConfirmationModel] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);

  const [itemsCountPerPage, setItemsCountPerPage] = useState(0);
  const [totalItemsCount, setTotalItemsCount] = useState(1);
  const [startFrom, setStartFrom] = useState(1);
  const [activePage, setActivePage] = useState(1);

  const [orderSummary, setOrderSummary] = useState({
    items: 0,
    amount: 0,
    discount: 0,
    pay_able: 0,
    customer: '',
    customer_id: 0,
    paid_amount: 0,
    due_amount: 0,
    payment_method_id: 1,
    trx_id: '',
  });

  const getPaymentMethods = () => {
    axios.get(`${Constants.BASE_URL}/get-payment-methods`).then((res) => {
      setPaymentMethods(res.data);
    }).catch((error) => {
      console.error('Error fetching payment methods:', error);
    });
  }

  const handleOrderPlace = () => {
    setIsLoading(true)
    axios.post(`${Constants.BASE_URL}/order`, {carts: carts, 'order_summary' : orderSummary}).then((res) => {
      Swal.fire({
        position: "top-end",
        icon: res.data.cls,
        title: res.data.msg,
        showConfirmButton: false,
        toast: true,
        timer: 1500
      });

      if(res.data.flag != undefined) {
        setShowOrderConfirmationModel(false)
        navigate(`/order/details/${res.data.order_id}`) 
      }
      setIsLoading(false);
    });
  }

  const handleSelectCustomer = (customer) => () => {
    setOrders(prevState => ({ ...prevState, customer_id: customer.id }));
    setOrderSummary(prevState => ({ ...prevState, customer: `${customer.name}` }));
    setOrderSummary(prevState => ({ ...prevState, customer_id: customer.id }));
  }

  const handleCustomerSearch = (e) => {
    setCustomerInput(e.target.value);
    getCustomers(e.target.value);
  }

  const getCustomers = () => {
    setIsLoading(true);
    axios.get(`${Constants.BASE_URL}/customer?&search=${customerInput}`).then((res) => {
      setCustomers(res.data);
      setIsLoading(false);
    });
  }
  
  const handleIncrease = (id) => {
    if(carts[id].stock > carts[id].quantity) {
      setCarts(prevState => ({
        ...prevState,
        [id]:{
          ...prevState[id], quantity: carts[id].quantity + 1
        }
      }))
    }
  }

  const handleDecrease = (id) => {
    if(carts[id].quantity > 1) {
      setCarts(prevState => ({
        ...prevState,
        [id]:{
          ...prevState[id], quantity: carts[id].quantity - 1
        }
      }))
    }
  }

  const handleInput = (e) => {
    setInput((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleCart = (id) => {
    products.map((product, index) => {
      if(product.id == id) {
        if (carts[id] == undefined) {
          setCarts(prevState => ({...prevState, [id] : product}))
          setCarts(prevState => ({
            ...prevState,
            [id]:{
              ...prevState[id], quantity: 1
            }
          }))
        } else {
          if(carts[id].stock > carts[id].quantity) {
            setCarts(prevState => ({
              ...prevState,
              [id]:{
                ...prevState[id], quantity: carts[id].quantity + 1
              }
            }))
          }
        }
      }
    })
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

  const calculateOrderSummary = () => {
    let items = 0;
    let amount = 0;
    let discount = 0;
    let pay_able = 0;
    let paid_amount = 0;

    Object.keys(carts).map((key) => {
      items += carts[key].quantity;
      amount += carts[key].original_price * carts[key].quantity;
      discount += carts[key].sell_price.discount * carts[key].quantity;
      pay_able += carts[key].sell_price.price * carts[key].quantity;
    });

    setOrderSummary(prevState => ({
      ...prevState,
      items: items,
      amount: amount,
      discount: discount,
      pay_able: pay_able,
      paid_amount: pay_able,
    }));
  }

  const handleOrderSummaryInput = (e) => {
    if(e.target.name == 'paid_amount' && orderSummary.pay_able >= e.target.value) {
      setOrderSummary(prevState => ({
        ...prevState,
        paid_amount: e.target.value,
        due_amount: orderSummary.pay_able - e.target.value,
      }));
    } else if(e.target.name == 'payment_method_id') {
      setOrderSummary(prevState => ({
        ...prevState,
        payment_method_id: e.target.value,
      }));
      if(e.traget.value == 1) {
        setOrderSummary(prevState => ({
          ...prevState,
          trx_id: '',
        }));
      }
    } else if(e.target.name == 'trx_id') {
      setOrderSummary(prevState => ({
        ...prevState,
        trx_id: e.target.value,
      }));
    }
  }

  useEffect(() => {
    getProducts();
    getPaymentMethods();
  }, []);

  useEffect(() => {
    calculateOrderSummary();
  }, [carts]);

  return (
    <>
      <div className="content-wrapper">
        <section className="content-header">
          <Breadcrumb title="Buat Pesanan Produk" breadcrumb="Form Data" />
        </section>
        <section className="content">
          <div className="container-fluid">
            <div className="card card-warning card-outline">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-4">
                    <div className="card card-orange card-outline">
                      <div className="card-header">
                        <h5>Daftar Produk</h5>
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
                              <button onClick={() => getProducts()} className="btn btn-lg btn-warning">
                                <i className="fa fa-search" />
                              </button>
                            </div>
                          </div>
                        </div>
                        {products.map((product, index) => (
                          <div
                            key={index}
                            className="attachment-block border-bottom align-items-center py-2"
                            style={{ backgroundColor: 'transparent', border: 'none' }}
                          >
                            <div className='py-2'>
                              <button className='btn btn-xs btn-success m-1'><i className='fas fa-solid fa-eye'></i></button>
                              <button className='btn btn-xs btn-primary m-1' onClick={() => handleCart(product.id)}><i className='fas fa-solid fa-plus'></i></button>
                            </div>
                            <img className="attachment-img" src={product.photo} alt={product.name} />
                            <div className="attachment-pushed">
                              <h4 className="attachment-heading text-orange">{product.name}</h4>
                              <div className="attachment-text">
                                <p className="mb-0">Harga Asli : <small>{product.price}</small></p>

                                <p className="mb-0">Harga Jual : <small>{product.sell_price.symbol} {GlobalFunction.formatRupiah(product.sell_price.price)} | Discount : {product.sell_price.symbol} {GlobalFunction.formatRupiah(product.sell_price.discount)}</small></p>

                                <p className="mb-0"><small>SKU : {product.sku} | Stok : {product.stock}</small></p>
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
                        <h5>Pesanan</h5>
                      </div>
                      <div className="card-body">
                        <div className='order-summary'>
                          <p className='pb-2'><strong className='pr-2'>Pelanggan :</strong><span className='text-orange text-bold'>{orderSummary.customer}</span></p>
                          <table className='table table-sm table-hover table-striped table-bordered'>
                            <tbody>
                              <tr>
                                <th>Total Barang</th>
                                <td className='text-right'>{orderSummary.items}</td>
                              </tr>
                              <tr>
                                <th>Harga Asli</th>
                                <td className='text-right'>{GlobalFunction.formatRupiah(orderSummary.amount)}</td>
                              </tr>
                              <tr>
                                <th>Diskon</th>
                                <td className='text-right'>{GlobalFunction.formatRupiah(orderSummary.discount)}</td>
                              </tr>
                              <tr>
                                <th>Pembayaran</th>
                                <td className='text-right'>{GlobalFunction.formatRupiah(orderSummary.pay_able)}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        {Object.keys(carts).map((key) => (
                          <div
                            key={key}
                            className="attachment-block border-bottom align-items-center py-2"
                            style={{ backgroundColor: 'transparent', border: 'none' }}
                          >
                            <div className='py-2'>
                              <button className='btn btn-xs btn-info m-1'><i className='fas fa-solid fa-eye'></i></button>
                              <button className='btn btn-xs btn-danger m-1' onClick={() => handleRemoveCart(key)}><i className="fas fa-solid fa-times"></i></button>
                            </div>
                            <img className="attachment-img" src={carts[key].photo} alt={carts[key].name} />
                            <div className="attachment-pushed">
                              <h4 className="attachment-heading text-orange">{carts[key].name}</h4>
                              <div className="attachment-text">
                                <p className="mb-0">Harga Asli : <small>{carts[key].price}</small></p>

                                <p className="mb-0">Harga Jual : <small>{carts[key].sell_price.symbol} {carts[key].sell_price.price} | Discount : {carts[key].sell_price.symbol} {carts[key].sell_price.discount}</small></p>

                                <p className="mb-0"><small>SKU : {carts[key].sku} | Stok : {carts[key].stock}</small></p>
                                <p className="pt-3"><span className='pr-2'> Kuantitas :</span>
                                  <div class="btn-group">
                                    <button 
                                      onClick={() => handleDecrease(carts[key].id)} 
                                      className={ 
                                        carts[key].quantity <= 1
                                        ? "btn btn-primary btn-sm disabled"
                                        : "btn btn-primary btn-sm"
                                      }
                                    >
                                      <i className="fas fa-solid fa-minus"></i>
                                    </button>
                                    
                                    <span className='pr-2 pl-2'>{carts[key].quantity}</span>

                                    <button 
                                      onClick={() => handleIncrease(carts[key].id)} 
                                      className={ 
                                        carts[key].stock <= carts[key].quantity
                                        ? "btn btn-primary btn-sm disabled"
                                        : "btn btn-primary btn-sm"
                                      }
                                    >
                                      <i className="fas fa-solid fa-plus"></i>
                                    </button>
                                  </div>
                                </p>
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
                        <div className='d-flex justify-content-between'>
                          <h5>Daftar Pelanggan</h5>
                          <button onClick={() => setModalShow(true)} className='btn btn-sm btn-success'><i className='fas fa-solid fa-plus'></i></button>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="form-group">
                          <div className="input-group input-group-lg">
                            <input
                              className="form-control form-control-lg"
                              type='search'
                              name='search'
                              value={customerInput}
                              onChange={handleCustomerSearch}
                              onKeyUp={getCustomers}
                              placeholder='Search'
                            />
                            <div className="input-group-append">
                              <button onClick={getCustomers} className="btn btn-lg btn-warning">
                                <i className="fa fa-search" />
                              </button>
                            </div>
                          </div>
                        </div>
                        <ul className='list-unstyled ml-2'>
                          {customers.map((customer, index) => (
                            <li className={orderSummary.customer_id == customer.id ? 'text-success text-bold px-2' : 'px-2'} key={index} onClick={handleSelectCustomer(customer)}>{customer.name}</li>
                          ))}
                        </ul>
                        <div className='d-grid mt-4'>
                          <button 
                            disabled={orderSummary.items == 0 || orderSummary.customer_id == 0} 
                            onClick={() => setShowOrderConfirmationModel(true)} 
                            className='btn btn-warning w-100'
                          >
                              Pesan Ditempat
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <AddCustomer
        show={modalShow}
        onHide={() => setModalShow(false)}
        setModalShow={setModalShow}
      />
      <ShowOrderConfirmation
        show={showOrderConfirmationModel}
        onHide={() => setShowOrderConfirmationModel(false)}
        orderSummary={orderSummary}
        carts={carts}
        is_loading={isLoading}
        handleOrderPlace={handleOrderPlace}
        handleOrderSummaryInput={handleOrderSummaryInput}
        paymentMethods={paymentMethods}
      />
    </>
  );
};

export default AddOrder;