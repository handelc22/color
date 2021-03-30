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
        <div id='header' className='color-app'>
          <i className='color-app fas fa-palette'></i>
          <h1 className='color-app name'>{name}</h1>
        </div>
        <div id='fade' className='color-app'></div>
      </>
    );
  }
}

export default Header;
