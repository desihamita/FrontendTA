import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';
import Constants from '../../Constants';
import Breadcrumb from '../../components/partials/Breadcrumb';
import CardHeader from '../../components/partials/miniComponent/CardHeader';
import Loader from '../../components/partials/miniComponent/Loader';
import NoDataFound from '../../components/partials/miniComponent/NoDataFound';
import ItemDetailsModal from './ItemDetailsModal';
import Swal from 'sweetalert2';
import GlobalFunction from '../../GlobalFunction';

const ListBarangKeluar = () => {
    const [input, setInput] = useState({
        order_by: 'created_at',
        per_page: 10,
        direction: 'asc',
        search: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [items, setItems] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const [itemsCountPerPage, setItemsCountPerPage] = useState(0);
    const [totalItemsCount, setTotalItemsCount] = useState(1);
    const [startFrom, setStartFrom] = useState(1);
    const [activePage, setActivePage] = useState(1);

    const handleInput = (e) => {
        setInput(prevState => ({...prevState, [e.target.name]: e.target.value}));
    };

    const getItems = (pageNumber = 1) => {
        setIsLoading(true);
        axios.get(`${Constants.BASE_URL}/outbound-items?page=${pageNumber}&search=${input.search}&order_by=${input.order_by}&per_page=${input.per_page}&direction=${input.direction}`)
            .then(res => {
                setItems(res.data.data);
                setItemsCountPerPage(res.data.meta.per_page);
                setStartFrom(res.data.meta.from);
                setTotalItemsCount(res.data.meta.total);
                setActivePage(res.data.meta.current_page);
                setIsLoading(false);
            });
    };

    const handleDetailsModal = (item) => {
        setSelectedItem(item);
        setModalShow(true);
    };

    const handleExport = () => {
      axios.get(`${Constants.BASE_URL}/export-items`, {
        responseType: 'blob',
      })
      .then(response => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'BarangKeluar.csv');
          document.body.appendChild(link);
          link.click();
      })
      .catch(error => {
          console.error('Error exporting orders:', error);
          Swal.fire({
              icon: 'error',
              title: 'Export Error',
              text: 'Failed to export orders. Please try again later.',
          });
      });
    }

    useEffect(() => {
        getItems();
    }, []);

    const isSales = GlobalFunction.isSales();

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <Breadcrumb title="Daftar Barang Keluar" breadcrumb="Barang Keluar" />
            </section>
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card card-outline card-warning">
                                <div className="card-header">
                                    <div className="d-flex justify-content-between align-items-center">
                                        {isSales && (
                                            <CardHeader 
                                                link={'/barang-keluar/create'} 
                                                btnText="Tambah Barang Keluar"
                                                btn="btn btn-warning"
                                                icon="fas fa-plus"
                                            />
                                        )}
                                        <button className="btn btn-success ml-2" onClick={handleExport}>
                                          <i className="fas fa-download"></i> Export
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className='search-area mb-2'>
                                        <div className='row'>
                                            <div className='col-md-3'>
                                                <label className='w-100'>
                                                    <p className='mb-0'>Search</p>
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
                                                    <p className='mb-0'>Order By</p>
                                                    <select 
                                                        className='form-control select2'
                                                        name='order_by'
                                                        value={input.order_by}
                                                        onChange={handleInput}
                                                    >
                                                      <option value={'created_at'}>Created At</option>
                                                      <option value={'updated_at'}>Updated At</option>
                                                    </select>
                                                </label>
                                            </div>
                                            <div className='col-md-2'>
                                                <label className='w-100'>
                                                    <p className='mb-0'>Order Direction</p>
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
                                                    <p className='mb-0'>Per Page</p>
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
                                                    <button className='btn btn-warning w-100' onClick={() => getItems(1)}>
                                                        <i className="fas fa-search"></i> Search
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {isLoading ? <Loader/> : 
                                        <div className="table-responsive">
                                            <table className="table table-hover table-striped table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Quantity</th>
                                                        <th>Date</th>
                                                        <th>Karyawan</th>
                                                        <th>Keterangan</th>
                                                        <th>Cafe</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {items.length > 0 ? items.map((item, index) => (
                                                        <tr key={index}>
                                                            <td>{startFrom + index}</td>
                                                            <td>{item.quantity} item</td>
                                                            <td>{item.date}</td>
                                                            <td>{item.sales_manager}</td>
                                                            <td>{item.keterangan}</td>
                                                            <td>{item.shop}</td>
                                                            <td>
                                                                <button onClick={() => handleDetailsModal(item)} className='btn btn-info btn-sm my-1'><i className="fas fa-solid fa-eye"></i></button>
                                                            </td>
                                                        </tr>
                                                    )) : <NoDataFound colSpan={7} /> 
                                                    }
                                                </tbody>
                                                <tfoot>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Quantity</th>
                                                        <th>Date</th>
                                                        <th>Karyawan</th>
                                                        <th>Keterangan</th>
                                                        <th>Toko</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                            <ItemDetailsModal
                                                show={modalShow}
                                                onHide={() => setModalShow(false)}
                                                title={'Item Details'}
                                                size={''}
                                                items={selectedItem || {}}
                                            />
                                        </div>
                                    }
                                </div>
                                {/* Pagination */}
                                <div className="card-footer d-flex justify-content-between align-items-center">
                                    <div className="data_tables_info">
                                        Showing {startFrom} to {startFrom + items.length - 1} of {totalItemsCount} entries
                                    </div>
                                    <nav className="pagination-sm ml-auto">
                                        <Pagination
                                            activePage={activePage}
                                            itemsCountPerPage={itemsCountPerPage}
                                            totalItemsCount={totalItemsCount}
                                            pageRangeDisplayed={10}
                                            onChange={getItems}
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
            </section>
        </div>
    )
}

export default ListBarangKeluar;
