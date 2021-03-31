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
    this.changeSelector = this.changeSelector.bind(this);
    this.addSwatch = this.addSwatch.bind(this);
  }

  componentDidUpdate() {
    this.updateIframe();
  }

  addSwatch() {
    var { colors, selectors, backgroundOrText, locks } = this.state;
    var randomColor = this.getRandomColor();
    var newColors = colors;
    newColors.push(randomColor);
    var newSelectors = selectors;
    newSelectors.push('body, body *');
    var newBackgroundOrText = backgroundOrText;
    newBackgroundOrText.push('background');
    var newLocks = locks;
    newLocks.push(false);
    this.setState({ colors: newColors, selectors: newSelectors, backgroundOrText: newBackgroundOrText, locks: newLocks });
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

  changeSelector(e) {
    var index = Number(e.target.getAttribute('index'));
    var newSelectors = this.state.selectors;
    newSelectors[index] = e.target.innerHTML;
    this.setState({ selectors: newSelectors });
  }

  render() {
    return (
      <div className='color-app color-row'>
        <span className='color-app mode-span'>mode: </span>
        <select className='color-app mode' name='mode' id='mode'>
          <option value='monochrome'>monochrome</option>
          <option value='monochrome-dark'>monochrome-dark</option>
          <option value='monochrome-light'>monochrome-light</option>
          <option value='analogic'>analogic</option>
          <option value='complement'>complement</option>
          <option value='analogic-complement'>analogic-complement</option>
          <option value='triad'>triad</option>
          <option value='quad'>quad</option>
        </select>

        <button className='color-app generate-colors' onClick={this.onClick}>Generate Color Scheme</button>

        {this.state.colors.map((color, index) => {
          return (
            <div className='color-app swatch' key={index}>
              <div contentEditable='true' onKeyDown={this.changeSelector} index={index} className='color-app selector'>{this.state.selectors[index]}</div>

              <div contentEditable='true' className='color-app color' style={{ backgroundColor: `#${color}` }} key={color}>{`#${color}`}</div>

              <div className='color-app radio'>
                <input type='radio' id='background' name={index} value='background' checked={this.state.backgroundOrText[index] === 'background'}className='color-app' onChange={this.radioChange}/>
                <label htmlFor='background'>background</label>
                <br/>
                <input type='radio' id='text' name={index} value='text' checked={this.state.backgroundOrText[index] === 'text'} className='color-app' onChange={this.radioChange}/>
                <label htmlFor='text'>text</label>
                <br/>
              </div>

              {this.state.locks[index] ? <i className="color-app fas fa-lock" index={index} onClick={this.changeLock}></i> : <i className="color-app fas fa-lock-open" index={index} onClick={this.changeLock}></i>}
            </div>
          )
        })}
        <button onClick={this.addSwatch} className='color-app add-swatch'>
          + Add Color
        </button>
      </div>
    )
  }
}

export default ColorScheme;