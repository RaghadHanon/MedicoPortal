import React from 'react'
import logo from '../../../public/logo.png'
import { NavLink } from 'react-router-dom'
function Login() {
  return (
   <div><section className="">
    <div className="container py-5 h-100 d-flex justify-content-center align-items-center">
      <div className="row d-flex justify-content-center align-items-center ">
        <div className="col col-xl-10">
          <div className="card" style={{borderRadius: '1rem'}}>
            <div className="row g-0">
              
              <div className="col-md-6 w-100 col-lg-7 d-flex align-items-center">
                <div className="card-body p-4 p-lg-5 text-black">
                  <form>
                    <div className="d-flex flex-column align-items-center mb-3 justify-content-center">
                      <img className="fas fa-cubes fa-2x me-3" src={logo} style={{width: '40%'}} />
                      <h5 className="mb-3 pb-3 d-flex justify-content-center align-items-center text-center" style={{color: "var(--color1)"}}>Welcome back! <br/> Log In to your account</h5>
                    </div>                    
                    <div data-mdb-input-init className="form-outline mb-4 ">
                    <label className="form-label" htmlFor="form2Example17" style={{color: "var(--color1)"}}>Email address</label>
                      <input type="email" id="form2Example17" className="form-control form-control-lg" />
                    </div>
                    <div data-mdb-input-init className="form-outline mb-4">
                    <label className="form-label" htmlFor="form2Example27" style={{color: "var(--color1)"}}>Password</label>
                    <input type="password" id="form2Example27" className="form-control form-control-lg" />
                    </div>
                    <div className="pt-1 mb-4 d-flex align-items-center justify-content-center">
                      <button data-mdb-button-init data-mdb-ripple-init className="btn btn-dark btn-lg btn-block" type="button" style={{background: "var(--color1)"}}>Login</button>
                    </div>
                    <div className='w-100 text-center'>
                    <a className="small text-muted" href="#!">Forgot password?</a>
                    <p className="mb-5 pb-lg-2" style={{color: "var(--color1)"}}>Don't have an account? <NavLink to="/Register" style={{color: '#393f81'}}>Register here</NavLink></p>
                    </div>
                    
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section></div>

  )
}

export default Login