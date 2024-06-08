import React, { useEffect, useState} from 'react'
import axios from 'axios'
import Logo from '../assets/img/logo12.png'
import Constants from '../Constants'

const Login = () => {
  const [input, setInput] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInput = (e) => setInput(prevState => ({...prevState, [e.target.name] : e.target.value}));

  const handleLogin = () => {
    setIsLoading(true)
    axios.post(`${Constants.BASE_URL}/login`, input).then(res => {
      localStorage.email = res.data.email
      localStorage.name = res.data.name
      localStorage.photo = res.data.photo
      localStorage.phone = res.data.phone
      localStorage.token = res.data.token
      localStorage.role = res.data.role
      setIsLoading(false)
      window.location.reload()
    }).catch(errors => {
      setIsLoading(false)
      if(errors.response.status === 422) {
        setErrors(errors.response.data.errors)
      }
    })
  }
  return (
    <div className="hold-transition login-page">
      <div className="login-box">
        <div className="card card-outline card-warning" style={{ boxShadow: '0px 7px 10px #6c757d' }}>
          <div className="card-header text-center" >
            <img src={Logo} alt='logo' className='img-fluid' />
          </div>
          <div className="card-body">
            <p className="login-box-msg">Sign in to start your session</p>
            <div className="input-group mb-3">
              <input 
                type="email" 
                name={'email'}
                value={input.email}
                onChange={handleInput}
                className={errors.email !== undefined ? 'form-control is-invalid' : "form-control"}
                placeholder="Email"
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-envelope" />
                </div>
              </div>
              {errors.email !== undefined && (
                <div className="invalid-feedback">
                  {errors.email[0]}
                </div>
              )}
            </div>
            <div className="input-group mb-3">
              <input 
                type="password" 
                name={'password'}
                value={input.password}
                onChange={handleInput}
                className={errors.password !== undefined ? 'form-control is-invalid' : 'form-control'}
                placeholder="Password" 
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-lock" />
                </div>
              </div>
              {errors.password !== undefined && (
                <div className="invalid-feedback">
                  {errors.password[0]}
                </div>
              )}
            </div>
            <div className="input-group mb-3">
              <select 
                name={'user_type'}
                value={input.user_type}
                onChange={handleInput}
                className={errors.user_type !== undefined ? 'form-control is-invalid' : 'form-control'}
                placeholder="Login As" 
              >
                <option value="" disabled={true} selected>Select Role</option>
                <option value={1}>Admin</option>
                <option value={2}>Sales Manager</option>
              </select>
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-user" />
                </div>
              </div>
              {errors.user_type !== undefined && (
                <div className="invalid-feedback">
                  {errors.user_type[0]}
                </div>
              )}
            </div>
            <div className="row">
              <div className="col-12">
                <button 
                onClick={handleLogin} 
                type="submit" 
                className="btn btn-warning btn-block" 
                dangerouslySetInnerHTML={{__html: isLoading ? '<span class="spinner-border spinner-border-sm" aria-hidden="true"></span> Login...' : 'login'}}></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
