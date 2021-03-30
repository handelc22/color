import React from 'react';
import { Link } from 'react-router-dom';

const EnterURL = ({ onChange, onSubmit }) => {
  return (
    <div id='enter-url'>
      <div>Enter the URL of the site you would like to style:</div>
      <input type='' onChange={onChange}></input>
      <Link className='button' to='/style' onClick={onSubmit}>Enter</Link>
    </div>
  )
}

export default EnterURL;