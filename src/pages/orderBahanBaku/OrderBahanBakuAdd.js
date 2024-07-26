import React, { useEffect, useState } from 'react'
import Breadcrumb from '../../components/partials/Breadcrumb'
import axios from 'axios';
import Constants from '../../Constants';
import Swal from 'sweetalert2';
import GlobalFunction from '../../GlobalFunction';
import ShowOrderConfirmation from './ShowOrderConfirmation';
import { useNavigate } from 'react-router-dom';
import NoDataFound from '../../components/partials/miniComponent/NoDataFound';
import CardHeader from '../../components/partials/miniComponent/CardHeader';

const OrderBahanBakuAdd = () => {
    const navigate = useNavigate()
    const [input, setInput] = useState({
        order_by: 'created_at',
        per_page: 10,
        direction: 'asc',
        search: ''
    });
    const [attributes, setAttributes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [modalShow, setModalShow] = React.useState(false);
    const [paymentMethods, setPaymentMethods] = useState([]);

    const [supplierInput, setSupplierInput] = useState('');
    const [suppliers, setSuppliers] = useState([]);
    const [orders, setOrders] = useState({});
    const [carts, setCarts] = useState({});

    const [itemsCountPerPage, setItemsCountPerPage] = useState(0);
    const [totalItemsCount, setTotalItemsCount] = useState(1);
    const [startFrom, setStartFrom] = useState(1);
    const [activePage, setActivePage] = useState(1);

    const [orderSummary, setOrderSummary] = useState({
        items: 0,
        amount: 0,
        pay_able: 0,
        supplier: '',
        supplier_id: 0,
        paid_amount: 0,
        due_amount: 0,
        payment_method_id: 1,
        trxIngredients_id: '',
    });

    const handleInput = (e) => {
        setInput((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    };

    const handleSelectSupplier = (supplier) => {
        setOrders((prevState) => ({ ...prevState, supplier_id: supplier.id }));
        setOrderSummary((prevState) => ({
            ...prevState,
            supplier: supplier.name,
            supplierPhone: supplier.phone,
            supplier_id: supplier.id
        }));
    };

    const handleSupplierSearch = (e) => {
        setSupplierInput(e.target.value);
        getSuppliers(e.target.value);
    };

    const getSuppliers = () => {
        setIsLoading(true);
        axios.get(`${Constants.BASE_URL}/supplier?&search=${supplierInput}`)
            .then((res) => {
                setSuppliers(res.data.data);
                setIsLoading(false);
            });
    };

    const getAttributes = (pageNumber = 1) => {
        setIsLoading(true);
        axios.get(`${Constants.BASE_URL}/attribute?page=${pageNumber}&search=${input.search}&order_by=${input.order_by}&per_page=${input.per_page}&direction=${input.direction}`)
            .then((res) => {
                setAttributes(res.data.data);
                setItemsCountPerPage(res.data.meta.per_page);
                setStartFrom(res.data.meta.from);
                setTotalItemsCount(res.data.meta.total);
                setActivePage(res.data.meta.current_page);
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong while fetching attributes!',
                });
                console.error('Error fetching attributes:', error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const handleCart = (id) => {
        const selectedAttribute = attributes.find((attribute) => attribute.id === id);
        if (selectedAttribute) {
            setCarts((prevState) => {
                const currentCart = prevState[id];
                if (currentCart) {
                    if (currentCart.stock > currentCart.quantity) {
                        return {
                            ...prevState,
                            [id]: {
                                ...currentCart,
                                quantity: currentCart.quantity + 1
                            }
                        };
                    }
                } else {
                    return {
                        ...prevState,
                        [id]: {
                            ...selectedAttribute,
                            quantity: 1
                        }
                    };
                }
                return prevState;
            });
        }
    };

    const handleRemoveCart = (id) => {
        setCarts((prevCarts) => {
            const currentQuantity = prevCarts[id]?.quantity || 0;
            if (currentQuantity > 1) {
                return {
                    ...prevCarts,
                    [id]: {
                        ...prevCarts[id],
                        quantity: currentQuantity - 1
                    }
                };
            } else {
                const { [id]: _, ...rest } = prevCarts;
                return rest;
            }
        });
    };

    const handleIncrease = (id) => {
        setCarts((prevState) => ({
            ...prevState,
            [id]: {
                ...prevState[id],
                quantity: prevState[id].quantity + 1
            }
        }));
    };

    const handleDecrease = (id) => {
        setCarts((prevState) => {
            const currentItem = prevState[id];
            if (currentItem && currentItem.quantity > 1) {
                return {
                    ...prevState,
                    [id]: {
                        ...currentItem,
                        quantity: currentItem.quantity - 1
                    }
                };
            }
            return prevState;
        });
    };

    const calculateOrderSummary = () => {
        let items = 0;
        let amount = 0;
        let pay_able = 0;
    
        Object.keys(carts).forEach((key) => {
            items += carts[key].quantity;
            amount += carts[key].price * carts[key].quantity;
            pay_able += carts[key].price * carts[key].quantity;
        });
    
        setOrderSummary((prevState) => ({
            ...prevState,
            items,
            amount: amount,
            pay_able: pay_able,
            paid_amount: pay_able,
        }));
    };

    const handleOrderSummaryInput = (e) => {
        const { name, value } = e.target;
        setOrderSummary((prevState) => {
            if (name === 'paid_amount' && prevState.pay_able >= value) {
                return {
                    ...prevState,
                    paid_amount: parseFloat(value).toFixed(2),
                    due_amount: (prevState.pay_able - value).toFixed(2),
                };
            } else if (name === 'payment_method_id') {
                return {
                    ...prevState,
                    payment_method_id: value,
                    trxIngredients_id: value == 1 ? '' : prevState.trxIngredients_id,
                };
            } else if (name === 'trxIngredients_id') {
                return {
                    ...prevState,
                    trxIngredients_id: value,
                };
            }
            return prevState;
        });
    };

    const getPaymentMethods = () => {
        axios.get(`${Constants.BASE_URL}/get-payment-methods`).then((res) => {
          setPaymentMethods(res.data);
        }).catch((error) => {
          console.error('Error fetching payment methods:', error);
        });
    }

    const handleOrderPlace = () => {
        setIsLoading(true)
        axios.post(`${Constants.BASE_URL}/order-bahan-baku`, {carts: carts, 'order_summary' : orderSummary}).then((res) => {
        Swal.fire({
            position: "top-end",
            icon: res.data.cls,
            title: res.data.msg,
            showConfirmButton: false,
            toast: true,
            timer: 1500
        });

        if(res.data.flag != undefined) {
            setModalShow(false)
            navigate(`/order-bahan-baku/details/${res.data.order_id}`) 
        }
        setIsLoading(false);
        });
    }
    
    useEffect(() => {
        getAttributes();
        getPaymentMethods();
    }, []);

    useEffect(() => {
        calculateOrderSummary();
    }, [carts]);

    return (
    <>
        <div className="content-wrapper">
            <section className="content-header">
                <Breadcrumb title="Buat Pesanan" breadcrumb="Form Data" />
            </section>
            <section className="content">
                <div className="container-fluid">
                    <div className="card card-warning card-outline">
                        <div className="card-header">
                            <CardHeader
                                link={'/order-bahan-baku'} 
                                btnText="Cancel"              
                                btn="btn btn-info"
                                icon="fas fa-backspace"
                            />
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="card card-orange card-outline">
                                        <div className="card-header">
                                            <h5>Daftar Bahan Baku</h5>
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
                                                        <button onClick={() => getAttributes()} className="btn btn-lg btn-warning">
                                                            <i className="fa fa-search" />
                                                        </button>
                                                    </div>
                                                </div>
                                                {attributes.map((attribute, index) => (
                                                    <div
                                                        key={index}
                                                        className="attachment-block border-bottom align-items-center py-2"
                                                        style={{ backgroundColor: 'transparent', border: 'none' }}
                                                    >
                                                        <div className='py-2'>
                                                            <button className='btn btn-xs btn-success m-1'><i className='fas fa-solid fa-eye'></i></button>
                                                            <button className='btn btn-xs btn-primary m-1' onClick={() => handleCart(attribute.id)}><i className='fas fa-solid fa-plus'></i></button>
                                                        </div>
                                                        <img className="attachment-img" src={attribute.photo} alt={attribute.name} />
                                                        <div className="attachment-pushed">
                                                            <h4 className="attachment-heading text-orange">{attribute.name}</h4>
                                                            <div className="attachment-text">
                                                                <p className="mb-0"><small>Harga : {attribute.sku}</small></p>
                                                                <p className="mb-0"><small>SKU : {attribute.sku}</small></p>
                                                                <p className="mb-0"><small>Stok : {attribute.stock}</small></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
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
                                                <p className='pb-2'><strong className='pr-2'>Pemasok :</strong><span className='text-orange text-bold'>{orderSummary.supplier}</span></p>
                                                <table className='table table-sm table-hover table-striped table-bordered'>
                                                    <tbody>
                                                        <tr>
                                                            <th>Total Barang</th>
                                                            <td className='text-right'>{orderSummary.items}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Harga</th>
                                                            <td className='text-right'>{GlobalFunction.formatRupiah(orderSummary.amount)}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Pembayaran</th>
                                                            <td className='text-right'>{GlobalFunction.formatRupiah(orderSummary.amount)}</td>
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
                                                            <p className="mb-0">Harga : <small>{carts[key].price}</small></p>
                                                            <p className="mb-0"><small>SKU : {carts[key].sku} </small></p>
                                                            <p className="mb-0"><small>Stok : {carts[key].stock}</small></p>
                                                            <p className="pt-3"><span className='pr-2'> Kuantitas :</span>
                                                                <div className="btn-group">
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
                                                                        className="btn btn-primary btn-sm"
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
                                            <h5>Daftar Pemasok</h5>
                                        </div>
                                        <div className="card-body">
                                            <div className="form-group">
                                                <div className="input-group input-group-lg">
                                                    <input
                                                        className="form-control form-control-lg"
                                                        type='search'
                                                        name='search'
                                                        value={supplierInput}
                                                        onChange={handleSupplierSearch}
                                                        onKeyUp={getSuppliers}
                                                        placeholder='Search'
                                                    />
                                                    <div className="input-group-append">
                                                        <button onClick={getSuppliers} className="btn btn-lg btn-warning">
                                                            <i className="fa fa-search" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <ul className='list-unstyled ml-2'>
                                                {suppliers.map((supplier, index) => (
                                                    <li
                                                        className={orderSummary.supplier_id == supplier.id ? 'text-success text-bold px-2' : 'px-2'}
                                                        key={index}
                                                        onClick={() => handleSelectSupplier(supplier)}
                                                    >
                                                        {supplier.name} - {supplier.phone}
                                                    </li>
                                                ))}
                                            </ul>
                                            <div className='d-grid mt-4'>
                                                <button 
                                                    disabled={orderSummary.items == 0 || orderSummary.supplier_id == 0} 
                                                    onClick={() => setModalShow(true)} 
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
        <ShowOrderConfirmation
            show={modalShow}
            onHide={() => setModalShow(false)}
            orderSummary={orderSummary}
            carts={carts}
            is_loading={isLoading}
            handleOrderPlace={handleOrderPlace}
            handleOrderSummaryInput={handleOrderSummaryInput}
            paymentMethods={paymentMethods}
        />
    </>
    )
}

export default OrderBahanBakuAdd;
