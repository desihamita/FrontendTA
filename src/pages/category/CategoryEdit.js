import React, { useEffect, useState } from 'react'
import Breadcrumb from '../../components/partials/Breadcrumb'
import axios from 'axios'
import Constants from '../../Constants'
import Swal from 'sweetalert2'
import { useNavigate, useParams } from 'react-router-dom'
import CardHeader from '../../components/partials/miniComponent/CardHeader'

const CategoryEdit = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [input, setInput] = useState({
          name: '',
          slug: '',
          serial: '',
          status: 1,
          description: '',
          photo: ''
    });
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [category, setCategory] = useState([]);

    const getCategory = () => {
        axios.get(`${Constants.BASE_URL}/category/${params.id}`).then(res => {
            setInput(res.data.data)
        })
    }
  
    const handleInput = (e) => {
      if (e.target.name === 'name') {
          let slug = e.target.value
          slug = slug.toLowerCase()
          slug = slug.replaceAll(' ','-')
          setInput(prevState =>  ({...prevState, slug: slug}))
      }
      setInput(prevState => ({...prevState, [e.target.name] : e.target.value}));
    }
  
    const handlePhoto = (e) => {
      let file = e.target.files[0];
      let reader = new FileReader();
      reader.onloadend = () => {
          setInput(prevState => ({...prevState, photo: reader.result}));
          document.getElementById('fileLabel').innerText = file.name;
      };
      reader.readAsDataURL(file);
    };
  
    const handleCategoryUpdate = (e) => {
      e.preventDefault();
      setIsLoading(true);
      axios.put(`${Constants.BASE_URL}/category/${params.id}`, input).then(res => {
          setIsLoading(false);
          Swal.fire({
              position: "top-end",
              icon: res.data.cls,
              title: res.data.msg,
              showConfirmButton: false,
              toast: true,
              timer: 3000
          });
          navigate('/category');
      }).catch(errors => {
          setIsLoading(false);
          if(errors.response.status === 422) {
            setErrors(errors.response.data.errors);
          }
      });
    };

    useEffect(() => {
        getCategory()
    },[])
    
    return (
    <div className="content-wrapper">
        <section className="content-header">
            <Breadcrumb title="Category Edit" breadcrumb="Form Data" />
        </section>
        <section className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card card-warning card-outline">
                            <div className="card-header">
                                <CardHeader 
                                    link={'/category'} 
                                    btnText="Cancel"
                                    btn="btn btn-info"
                                    icon="fas fa-backspace"
                                />
                            </div>
                            <form id="quickForm">
                                <div className="card-body row">
                                    <div className="form-group col-md-6">
                                        <label>Category Name</label>
                                        <input 
                                            type="text" 
                                            name="name"
                                            value={input.name}
                                            onChange={handleInput} 
                                            className={errors.name !== undefined ? 'form-control is-invalid ' : 'form-control'}
                                            placeholder="Enter Category Name" 
                                        />
                                        {errors.name !== undefined && (
                                            <div className="invalid-feedback">
                                            {errors.name[0]}
                                            </div>
                                        )}
                                    </div>
                                    <div className="form-group col-md-6 ">
                                        <label>Category Slug</label>
                                        <input 
                                            type="text" 
                                            name="slug"
                                            value={input.slug}
                                            onChange={handleInput} 
                                            className={errors.slug !== undefined ? 'form-control is-invalid ' : 'form-control'}
                                            placeholder="Enter Category Name" 
                                        />
                                        {errors.slug !== undefined && (
                                            <div className="invalid-feedback">
                                            {errors.slug[0]}
                                            </div>
                                        )}
                                    </div>
                                    <div className="form-group col-md-6 ">
                                        <label>Serial</label>
                                        <input 
                                            type="number" 
                                            name="serial"
                                            value={input.serial}
                                            onChange={handleInput} 
                                            className={errors.serial !== undefined ? 'form-control is-invalid ' : 'form-control'}
                                            placeholder="Enter Category Serial" 
                                        />
                                        {errors.serial !== undefined && (
                                            <div className="invalid-feedback">
                                            {errors.serial[0]}
                                            </div>
                                        )}
                                    </div>
                                    <div className="form-group col-md-6 ">
                                        <label>Status</label>
                                        <select
                                            name='status'
                                            value={input.status}
                                            onChange={handleInput}
                                            className={errors.status !== undefined ? 'form-control select2 is-invalid ' : 'form-control'}
                                            placeholder="Select Category Status"
                                        >
                                            <option disabled={true}>Select Category Status</option>
                                            <option value={1}>Active</option>
                                            <option value={2}>Inactive</option>
                                        </select>
                                        {errors.status !== undefined && (
                                            <div className="invalid-feedback">
                                            {errors.status[0]}
                                            </div>
                                        )}
                                    </div>
                                    <div className="form-group col-md-6 ">
                                        <label>Description</label>
                                        <textarea 
                                            name="description"
                                            value={input.description}
                                            onChange={handleInput} 
                                            className={errors.description !== undefined ? 'form-control is-invalid ' : 'form-control'}
                                            placeholder="Enter Category Description" 
                                        />
                                        {errors.description !== undefined && (
                                            <div className="invalid-feedback">
                                            {errors.description[0]}
                                            </div>
                                        )}
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="exampleInputFile">File input</label>
                                        <div className="input-group">
                                            <div className="custom-file">
                                                <input type="file" name="photo" className="custom-file-input" id="exampleInputFile" onChange={handlePhoto} />
                                                <label id="fileLabel" className="custom-file-label" htmlFor="exampleInputFile">Choose file</label>
                                            </div>
                                            {errors.photo !== undefined && (
                                                <div className="invalid-feedback">
                                                    {errors.photo[0]}
                                                </div>
                                            )}
                                        </div>
                                        {(input.photo || input.photo_preview !== undefined) && (
                                            <div className="card-body">
                                                <img className="img-fluid w-50 h-50" src={input.photo === undefined ? input.photo_preview : input.photo} alt="Photo" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <button className="btn btn-warning w-30" onClick={handleCategoryUpdate} dangerouslySetInnerHTML={{__html: isLoading ? '<span class="spinner-border spinner-border-sm" aria-hidden="true"></span> Loading...' : 'Update Category'}} />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default CategoryEdit
