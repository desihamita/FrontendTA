import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Constants from '../../Constants'
import Swal from 'sweetalert2'
import $ from 'jquery';
import './style.css';
import Breadcrumb from '../../components/partials/Breadcrumb'

const EditProductPhoto = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [photos, setPhotos] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [progress, setProgress] = useState(0)

    const handlePhotoUpload = async () => {
        setIsLoading(true);
        const formData = new FormData();
        photos.forEach((photo, index) => {
            formData.append('photos[]', photo.file);
            formData.append(`is_primary[${index}]`, photo.is_primary);
        });

        try {
            const res = await axios.post(`${Constants.BASE_URL}/product-photo-upload/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    setProgress(progress)
                }
            });
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
        } catch (error) {
            setIsLoading(false);
            console.error('Error uploading photos:', error);
        }
    }

    const handlePhotoUploadInput = (e) => {
        const files = Array.from(e.target.files);
        const newPhotos = files.map((file, index) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotos(prevState => ([
                    ...prevState,
                    { photo: reader.result, file, is_primary: prevState.length === 0 && index === 0 ? 1 : 0 }
                ]));
            }
            reader.readAsDataURL(file);
            return { photo: '', file, is_primary: 0 };
        });
        setPhotos(prevState => [...prevState, ...newPhotos]);
    }

    const handlePrimaryPhoto = (key) => {
        setPhotos(prevState => (
            prevState.map((photo, index) => ({
                ...photo,
                is_primary: index === key ? 1 : 0,
            }))
        ));
    }

    const handlePhotoInputField = () => {
        $('#photo_input').trigger('click');
    }

    useEffect(() => {
        console.log(photos);
    }, [photos]);

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <Breadcrumb title="Ubah Foto Produk" breadcrumb="Form Data" />
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
                                name="photos" 
                                id="photo_input"
                                className='d-none' 
                                multiple
                                accept='image/png, image/jpeg, image/jpg, image/webp'
                                onChange={handlePhotoUploadInput}
                            />
                            <div className='filter-container p-0 row'>
                                {photos.map((photo, index) => (
                                    <div className='filtr-item col-sm-2 my-2' key={index}>
                                        <img 
                                            onClick={() => handlePrimaryPhoto(index)} 
                                            src={photo.photo} 
                                            className={photo.is_primary === 1 ? 'primary-photo img-fluid mb-2 preview-photo' : 'img-fluid mb-2 preview-photo'} 
                                            alt='preview' 
                                        />
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
    )
}

export default EditProductPhoto
