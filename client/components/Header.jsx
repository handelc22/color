import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const name = '<color>'
    return (
      <>
        <div id='header'>
          <i className='fas fa-palette'></i>
          <h1>{name}</h1>
        </div>
        <div id='fade'></div>
      </>
    );
  }
}

export default Header;
