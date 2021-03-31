import React from 'react';

class ColorScheme extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectors: [],
      colors: [],
      backgroundOrText: [],
      locks: []
    }
    this.onClick = this.onClick.bind(this);
    this.getRandomColor = this.getRandomColor.bind(this);
    this.updateIframe = this.updateIframe.bind(this);
    this.changeLock = this.changeLock.bind(this);
    this.radioChange = this.radioChange.bind(this);
  }

  componentDidMount() {
    var randomColor = this.getRandomColor();
    this.setState({ colors: [randomColor, 'fff'], selectors: ['body, body *', 'body, body *'], backgroundOrText: ['background', 'text'], locks: [false, true] });
    this.updateIframe();
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  changeLock(e) {
    var index = Number(e.target.getAttribute('index'));
    var newLocks = this.state.locks;
    newLocks[index] = !this.state.locks[index];
    this.setState({ locks: newLocks });
  }

  updateIframe() {
    var { selectors, colors, backgroundOrText, locks } = this.state;
    var refreshIframe = () => {
      for (var i = 0; i < selectors.length; i++) {
        if (selectors[i] === 'body, body *') {
          if (backgroundOrText[i] === 'background') {
            document.querySelectorAll('#iframe, #iframe *').forEach(element => element.style.setProperty('background', `#${this.state.colors[i]}`, 'important'));
          } else {
            document.querySelectorAll('#iframe, #iframe *').forEach(element => element.style.setProperty('color', `#${this.state.colors[i]}`, 'important'));
          }
        } else {
          if (backgroundOrText[i] === 'background') {
            document.querySelectorAll(`#iframe ${this.state.selectors[i]}`).forEach(element => element.style.setProperty('background', `#${this.state.colors[i]}`, 'important'));
          } else {
            document.querySelectorAll(`#iframe ${this.state.selectors[i]}`).forEach(element => element.style.setProperty('color', `#${this.state.colors[i]}`, 'important'));
          }
        }
      }
    }
    setTimeout(refreshIframe, 0);
  }

  onClick() {
    var newColors = this.state.colors.map((color, index) => {
      if (!this.state.locks[index]) {
        return this.getRandomColor();
      }
      return color;
    })
    this.setState({ colors: newColors });
    this.updateIframe();
  }

  radioChange(e) {
    var newBackgroundOrText = this.state.backgroundOrText;
    newBackgroundOrText[Number(e.target.name)] = e.target.value;
    this.setState({ backgroundOrText: newBackgroundOrText });
  }

  render() {
    return (
      <div className='color-app color-row'>
        {this.state.colors.map((color, index) => {
          return (
            <div className='color-app swatch' key={index}>
              <div className='color-app selector'>{this.state.selectors[index]}</div>

              <div className='color-app color' style={{ backgroundColor: `#${color}` }} key={color}>{`#${color}`}</div>

              <div className='color-app radio'>
                <input type='radio' id='background' name={index} value='background' checked={this.state.backgroundOrText[index] === 'background'}className='color-app' onChange={this.radioChange}/>
                <label for='background'>background</label>
                <br/>
                <input type='radio' id='text' name={index} value='text' checked={this.state.backgroundOrText[index] === 'text'} className='color-app' onChange={this.radioChange}/>
                <label for='text'>text</label>
                <br/>
              </div>

              {this.state.locks[index] ? <i className="color-app fas fa-lock" index={index} onClick={this.changeLock}></i> : <i className="color-app fas fa-lock-open" index={index} onClick={this.changeLock}></i>}
            </div>
          )
        })}
        <button className='color-app add-swatch'>+</button>
        <button className='color-app generate-colors' onClick={this.onClick}>Generate Color Scheme</button>
      </div>
    )
  }
}

export default ColorScheme;