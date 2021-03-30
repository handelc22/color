import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';

import Header from './components/Header.jsx';
import EnterURL from './components/EnterURL.jsx';
import Styling from './components/Styling.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      URL: '',
      html: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ URL: e.target.value });
  }

  onSubmit() {
    axios({
      method: 'post',
      url: '/',
      data: {
        url: JSON.stringify(this.state.URL)
      }
    })
    .then(response => {
      return this.setState({ html: response.data });
    })
    .catch(err => {
      console.error(err);
    })
  }

  render() {
    return (
      <Router>
        <Header />
        <Switch>
          <Route exact path='/'>
            <EnterURL onChange={this.onChange} onSubmit={this.onSubmit}/>
          </Route>
          <Route path='/style'>
            <Styling html={this.state.html}/>
          </Route>
        </Switch>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));