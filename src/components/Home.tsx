import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home : React.FC = () => {
    const navigate = useNavigate()
    const navigateToProduct = () =>{
        navigate('/product')
    }
  return (
    <>
       <label> This is the Home page </label>
       <br/>
       <button type="button" className="btn btn-primary" onClick={navigateToProduct}>go to product</button>
    </>
  )
}

export default Home