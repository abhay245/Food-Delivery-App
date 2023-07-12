import React from 'react'
import signImg from '../components/sign.svg'
import { Link } from 'react-router-dom'
export const Landing = () => {
  return (
    <>
    <div className='container vh-100 d-flex'>

    <div className='container w-50  d-flex justify-content-center align-items-center'>
        <div>
          <h3>Food Express</h3>
          <p className='desc'>
          Introducing our convenient food delivery app, designed to satisfy your cravings effortlessly. 
          With our app, you can browse through a diverse selection of delicious meals from various restaurants,
           all in one place. Simply choose your favorite dishes, customize your order, and sit back as our reliable 
           delivery service brings the food right to your doorstep
          </p>
          <Link to='/register'>
          <button type="button" class="btn btn-primary" data-toggle="button" aria-pressed="false">
            Login/Register
          </button>
          </Link>
      </div>
    </div>
    <div className='container w-50 h-full d-none d-md-block justify-content-center align-items-center'>
        <img src={signImg} alt='sign in' style={{width:'100%', height:'100%'}}/>
        </div>
    </div>
    </>
  )
}
