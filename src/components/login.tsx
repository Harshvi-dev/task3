import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login : React.FC = () => {
    const navigate = useNavigate();
    const[userName,setUserName]=useState<string>('')
  const[password,setPassword]=useState<string>('')
  const getValue = (e:React.ChangeEvent<HTMLInputElement>) =>{
    if (e.target.id == "name") {
      setUserName(e.target.value)
    }else{
      setPassword(e.target.value)
    }
  }
  const logIn = (e:React.MouseEvent<HTMLButtonElement>) =>{
    console.log(`userName : ${userName} password : ${password}`)
    if (userName!= '' && password!='') {
      if (userName == 'harshvi' && password=='harshu' ) {
        navigate('/home')
      }else{
        alert('enter the valid data')
      }
    }else{
        alert('enter the data')
    }
  }
  return (
    <>
  <section className="text-center">
    <div
      className="p-5 bg-image"
      style={{
        backgroundImage:
          'url("https://mdbootstrap.com/img/new/textures/full/171.jpg")',
        height: 300
      }}
    />
    <div
      className="card mx-4 mx-md-5 shadow-5-strong"
      style={{
        marginTop: "-100px",
        background: "hsla(0, 0%, 100%, 0.8)",
        backdropFilter: "blur(30px)"
      }}
    >
      <div className="card-body py-5 px-md-5">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-8">
            <h2 className="fw-bold mb-5">LogIn</h2>
            <form>
             
              <label className="form-label" htmlFor="form3Example3">
                  UserName : 
                </label>
              <div className="form-outline mb-4">
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  onChange={getValue}
                />
                
              </div>
              <label className="form-label" htmlFor="form3Example4">
                  Password
                </label>
              <div className="form-outline mb-4">
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  onChange={getValue}
                />
                
              </div>
                        
              <button onClick={logIn} className="btn btn-primary btn-block mb-4">
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</>

  )
}

export default Login