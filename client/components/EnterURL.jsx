import React from 'react';
import { Link } from 'react-router-dom';

const EnterURL = ({ onChange, onSubmit }) => {
  return (
    <form>
      <input type='' onChange={onChange}></input>
      <Link to='/style' onClick={onSubmit}>Submit</Link>
    </form>
  )
}

export default EnterURL;