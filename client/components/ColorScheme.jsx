import React from 'react';

class ColorScheme extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectors: [],
      colors: []
    }
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    var randomColor = Math.floor(Math.random()*16777215).toString(16);
    this.setState({ colors: [randomColor], selectors: ['div'] });
    var timeout = () => {
      for (var i = 0; i < this.state.selectors.length; i++) {
        document.querySelectorAll(`#iframe ${this.state.selectors[i]}`).forEach(element => element.style.background = `#${this.state.colors[i]}`);
      }
    }
    setTimeout(timeout, 0);
  }

  render() {
    return (
      <>
      {this.state.colors.map(color => {
        return <div style={{ backgroundColor: `#${color}` }} key={color} className='color-app swatch'>{color}</div>
      })}
      <button className='color-app' onClick={this.onClick}>Generate Color Scheme</button>
      </>
    )
  }
}

export default ColorScheme;