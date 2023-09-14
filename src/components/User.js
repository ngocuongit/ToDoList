import React from 'react'

import logo from '../img/logo.png'

const User = () => {
  return (
    <div className='user'>
    
        <img className='user-logo' src={logo} alt="logo"/>
      <div className='user-info'>
        <p className='user-name'>Ngo Cuong</p>
        <a href='#' className='user-link'>Logout!</a>
      </div>

    </div>
  )
}

export default User