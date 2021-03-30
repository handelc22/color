import React from 'react';
import { Link } from 'react-router-dom';

const EnterURL = ({ onChange, onSubmit }) => {
  return (
    <div id='enter-url' className='color-app'>
      <div className='color-app'>Enter the URL of the site you would like to style:</div>
      <input className='color-app' type='' onChange={onChange}></input>
      <Link className='color-app button' to='/style' onClick={onSubmit}>Enter</Link>
    </div>
  )
}

export default EnterURL;