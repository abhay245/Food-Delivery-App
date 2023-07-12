import React from 'react'
import error from '../background/error.svg'
export const Error = () => {
  return (
    <div className='container w-50 h-full d-none d-md-block'>
    <img src={error} alt='sign in' style={{width:'100%', height:'100%'}}/>
    </div>
  )
}
