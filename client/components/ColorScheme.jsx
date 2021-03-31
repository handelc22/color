import React from 'react';

class ColorScheme extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: []
    }
    this.onClick = this.onClick.bind(this);
    this.generateRandomColor = this.generateRandomColor.bind(this);
  }

  generateRandomColor() {
    var randomColor = Math.floor(Math.random()*16777215).toString(16);
    this.setState({ colors: [randomColor] });
  }

  onClick() {
    this.generateRandomColor();
    document.querySelector('#iframe div').style.background = 'red';
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