import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../components/partials/Breadcrumb';
import './style.css';
import $ from 'jquery';
import axios from 'axios';
import Constants from '../../Constants';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';

const AddProductPhoto = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [photos, setPhotos] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [progress, setProgress] = useState(0)

    const handlePhotoUpload = (e) => {
        setIsLoading(true);
        axios.post(`${Constants.BASE_URL}/product-photo-upload/${params.id}`, {photos}, {
            onUploadProgress: (progressEvent) => {
                const progress = Math.round((progressEvent.loaded * 100)/progressEvent.total )
                setProgress(progress)
            }
        }).then(res => {
            setIsLoading(false);
            Swal.fire({
                position: "top-end",
                icon: res.data.cls,
                title: res.data.msg,
                showConfirmButton: false,
                toast: true,
                timer: 1500
            });
            navigate('/product');
        });
    }

    const handlePhotoUploadInput = (e) => {
        let images = e.target.files;
        for (let i = 0; i < images.length; i++) {
            let reader = new FileReader();
            reader.onloadend = () => {
                setPhotos(prevState => ({
                    ...prevState,
                    [i]: {
                        ...prevState[i], photo: reader.result,
                        ...prevState[i], is_primary: i === 0 ? 1 : 0,
                    }
                }))
            }
            reader.readAsDataURL(images[i]);
        }
    }

    const handlePrimaryPhoto = (key) => {
        for (let i = 0; i < Object.keys(photos).length; i++) {
            setPhotos(prevState => ({
                ...prevState,
                [i]: {
                    ...prevState[key], is_primary: i === key ? 1 : 0,
                }
            }))
        }
    }

    const handlePhotoInputField = () => {
        $('#photo_input').trigger('click');
    }

    useEffect(() => {
        console.log(photos)
    },[photos])

    return (
    <div className="content-wrapper">
        <section className="content-header">
            <Breadcrumb title="Add Product Photo" breadcrumb="Form Data" />
        </section>
        <section className="content">
            <div className="container-fluid">
                <div className="card card-warning card-outline">
                    <div className="card-body">
                        <div className='product_photo_container'>
                            <div className='icon' onClick={handlePhotoInputField}>
                                <i className='fas fa-solid fa-camera fa-2x'></i>
                            </div>
                        </div>
                        <input 
                            type="file" 
                            name="logo" 
                            id="photo_input"
                            className='d-none' 
                            multiple
                            accept='image/png, image/jpeg, image/jpg, image/webp'
                            onChange={handlePhotoUploadInput}
                        />
                        <div className='filter-container p-0 row'>
                            {Object.keys(photos).map((key) => (
                                <div className='filtr-item col-sm-2 my-2' key={key}>
                                    <img onClick={() => handlePrimaryPhoto(key)} src={photos[key].photo} className={photos[key].is_primary === 1 ? 'primary-photo img-fluid mb-2 preview-photo' : 'img-fluid mb-2 preview-photo'} alt='preview' />
                                </div>
                            ))}
                        </div>
                        <div className='row'>
                            <div className='col-md-9'>
                                <div className='progress' style={{ display: `${progress < 1 ? 'none' : 'block'}`}}>
                                    <div className='progress-bar progress-bar-striped progress-bar-animated' style={{ width: `${progress}%` }}>
                                        {`${progress}%`}
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-3 text-end'>
                                <button className="btn btn-warning" disabled={isLoading} onClick={handlePhotoUpload} dangerouslySetInnerHTML={{ __html: isLoading ? '<span class="spinner-border spinner-border-sm" aria-hidden="true"></span> Loading...' : 'Upload Photo' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>    
    );
}

export default AddProductPhoto;
