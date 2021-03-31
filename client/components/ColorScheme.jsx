import React from 'react';

class ColorScheme extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectors: [],
      colors: []
    }
    this.onClick = this.onClick.bind(this);
    this.getRandomColor = this.getRandomColor.bind(this);
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  onClick() {
    var randomColor = this.getRandomColor();
    this.setState({ colors: [randomColor], selectors: ['*'] });
    var timeout = () => {
      for (var i = 0; i < this.state.selectors.length; i++) {
        document.querySelectorAll(`#iframe, #iframe ${this.state.selectors[i]}`).forEach(element => element.style.setProperty('background', `#${this.state.colors[i]}`, 'important'));
      }
    }
    setTimeout(timeout, 0);
  }

  render() {
    return (
      <>
      {this.state.colors.map((color, index) => {
        return (
          <div key={index}>
            <div>{this.state.selectors[index]}</div>
            <div style={{ backgroundColor: `#${color}` }} key={color} className='color-app swatch'>{color}</div>
          </div>
        )
      })}
      <button className='color-app' onClick={this.onClick}>Generate Color Scheme</button>
      </>
    )
  }
}

export default ColorScheme;