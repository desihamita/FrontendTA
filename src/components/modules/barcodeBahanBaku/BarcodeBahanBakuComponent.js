import React, { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Constants from '../../../Constants';
import { useReactToPrint } from 'react-to-print'
import BarcodeBahanBakuPage from './BarcodeBahanBakuPage';
import Breadcrumb from '../../partials/Breadcrumb';
import CardHeader from '../../partials/miniComponent/CardHeader';

const BarcodeBahanBakuComponent = () => {
    const [input, setInput] = useState({
        name: '',
        category_id: '',
        sub_category_id: '',
    });
    const componentRef = useRef();

    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [attributes, setAttributes] = useState([]);
    const [notFound, setNotFound] = useState(false);
    const [paperSize, setPaperSize] = useState({
        a4: {
            width: 595,
            height: 82
        }
    });

    const handleInput = (e) => {
        const { name, value } = e.target;
    
        if (name === 'category_id') {
            let category = categories.find(cat => cat.id === parseInt(value));
            if (category) {
                setInput(prevState => ({ ...prevState, category_name: category.name }));
                getSubCategories(category.id); 
            }
        }
    
        if (name === 'sub_category_id') {
            let subCategory = subCategories.find(sub => sub.id === parseInt(value));
            if (subCategory) {
                setInput(prevState => ({ ...prevState, sub_category_name: subCategory.name }));
            }
        }
    
        setInput(prevState => ({ ...prevState, [name]: value }));
    };

    const getCategories = useCallback(() => {
        axios.get(`${Constants.BASE_URL}/get-category-list`).then(res => {
          const activeCategories = res.data.filter(categories => categories.status === 1);
          setCategories(activeCategories)
        })
    },[]);

    const getSubCategories = (category_id) => {
        axios.get(`${Constants.BASE_URL}/get-sub-category-list/${category_id}`).then(res => {
            const activeSubCategories = res.data.filter(subCategories => subCategories.status === 1);
            setSubCategories(activeSubCategories);
        }).catch(error => {
            console.error('Error fetching sub categories:', error);
        });
    }

    const handleBahanBakuSearch = () => {
        setIsLoading(true);
        axios.get(`${Constants.BASE_URL}/get-bahan-baku-list-for-barcode`, {
            params: {
                name: input.name,
                category_name: input.category_name,
                sub_category_name: input.sub_category_name,
            }
        }).then(res => {
            setAttributes(res.data.data);
            setNotFound(res.data.data.length === 0); 
            setIsLoading(false);
        }).catch(error => {
            console.error('Error fetching data:', error);
            setIsLoading(false);
        });
    };

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    useEffect(() => {
        getCategories();
    }, [getCategories]);

    return (
        <>
            <div className="content-wrapper">
                <section className="content-header">
                    <Breadcrumb title="Generate and Print Barcode" breadcrumb="generate" />
                </section>
                <section className="content">
                    <div className="card">
                        <div className="card-header">
                        <CardHeader 
                            link={'/bahan-baku'} 
                            btnText="Kembali"
                            btn="btn btn-info"
                            icon="fas fa-backspace"
                        />
                        </div>
                        <div className="card-body">
                            <div className='row align-items-center'>
                                <div className="col-md-3">
                                    <label className='mt-4 mt-md-0'>Select Category</label>
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
                                    <label className='mt-4 mt-md-0'>Nama Bahan Baku</label>
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
                                        onClick={handleBahanBakuSearch}
                                        dangerouslySetInnerHTML={{ __html: isLoading ? '<span class="spinner-border spinner-border-sm" aria-hidden="true"></span> Loading...' : 'Search' }}
                                    />
                                </div>
                            </div>
                            {notFound && (
                                <div className="alert alert-warning mt-4">
                                    No results found for the given filters.
                                </div>
                            )}
                            <div className='print-area-parent' style={{ display: attributes.length > 0 ? 'block' : 'none' }}>
                                <button className="btn btn-primary mt-2 mb-3 float-right" onClick={handlePrint}>Print</button>
                                <div className='barcode-area-wrapper'>
                                    <BarcodeBahanBakuPage
                                        attributes={attributes}
                                        paperSize={paperSize}
                                        ref={componentRef}
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

export default BarcodeBahanBakuComponent;