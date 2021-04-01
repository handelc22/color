import React from 'react';
import axios from 'axios';

class ColorScheme extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectors: [],
      colors: [],
      backgroundOrText: [],
      locks: [],
      selectorIndexChanging: null,
      colorIndexChanging: null,
      mode: 'monochrome',
    }
    this.onClick = this.onClick.bind(this);
    this.getRandomColor = this.getRandomColor.bind(this);
    this.updateIframe = this.updateIframe.bind(this);
    this.changeLock = this.changeLock.bind(this);
    this.radioChange = this.radioChange.bind(this);
    this.changeSelector = this.changeSelector.bind(this);
    this.changeColor = this.changeColor.bind(this);
    this.addSwatch = this.addSwatch.bind(this);
    this.closeSwatch = this.closeSwatch.bind(this);
    this.changeMode = this.changeMode.bind(this);
  }

  componentDidMount() {
    window.addEventListener('click', (e) => {
      if (this.state.selectorIndexChanging !== null) {
        var selectorChanging = document.querySelector(`.color-app.selector.index${this.state.selectorIndexChanging}`);
        if (e.target !== selectorChanging) {
          var newSelectors = this.state.selectors;
          newSelectors[Number(this.state.selectorIndexChanging)] = selectorChanging.innerHTML;
          this.setState({ selectors: newSelectors, selectorIndexChanging: null });
        }
      }
      if (this.state.colorIndexChanging !== null) {
        var colorChanging = document.querySelector(`.color-app.color.index${this.state.colorIndexChanging}`);
        if (e.target !== colorChanging) {
          var newColors = this.state.colors;
          console.log('test:', colorChanging.innerHTML);
          newColors[Number(this.state.colorIndexChanging)] = colorChanging.innerHTML;
          this.setState({ colors: newColors, colorIndexChanging: null });
        }
      }
    });
  }

  componentDidUpdate() {
    this.updateIframe();
  }

  updateIframe() {
    var { selectors, colors, backgroundOrText, locks } = this.state;
    var refreshIframe = () => {
      for (var i = 0; i < selectors.length; i++) {
        if (selectors[i] === 'body, body *') {
          if (backgroundOrText[i] === 'background') {
            document.querySelectorAll('#iframe, #iframe *').forEach(element => element.style.setProperty('background', this.state.colors[i], 'important'));
          } else {
            document.querySelectorAll('#iframe, #iframe *').forEach(element => element.style.setProperty('color', this.state.colors[i], 'important'));
          }
        } else {
          if (backgroundOrText[i] === 'background') {
            document.querySelectorAll(`#iframe ${this.state.selectors[i]}`).forEach(element => element.style.setProperty('background', this.state.colors[i], 'important'));
          } else {
            document.querySelectorAll(`#iframe ${this.state.selectors[i]}`).forEach(element => element.style.setProperty('color', this.state.colors[i], 'important'));
          }
        }
      }
    }
    setTimeout(refreshIframe, 0);
  }

  addSwatch() {
    var { colors, selectors, backgroundOrText, locks } = this.state;
    var randomColor = `#${this.getRandomColor()}`;
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

  onClick() {
    var mode = this.state.mode;
    var count = this.state.locks.filter(lock => !lock).length;
    var seed;
    var seedIndex = this.state.locks.reduce((seedIndex, lock, index) => {
      if (lock && !seedIndex) {
        return index;
      }
      return seedIndex;
    }, '');
    if (seedIndex === '') {
      seed = this.getRandomColor();
    } else {
      seed = this.state.colors[seedIndex].slice(1);
    }
    const data = { seed, mode, count };
    axios({
      method: 'post',
      url: 'http://localhost:2000/colors',
      data
    })
    .then(response => {
      var newColors = response.data.colors.map(color => {
        return color.hex.value;
      })
      var colorIndex = 0;
      var colors = this.state.colors.map((color, index) => {
        if (!this.state.locks[index]) {
          colorIndex++;
          return newColors[colorIndex - 1];
        }
        return color;
      })
      return this.setState({ colors });
    })
    .then(() => {
      this.updateIframe();
    })
    .catch(err => {
      console.error(err);
    })
  }

  radioChange(e) {
    var newBackgroundOrText = this.state.backgroundOrText;
    newBackgroundOrText[Number(e.target.name)] = e.target.value;
    this.setState({ backgroundOrText: newBackgroundOrText });
  }

  changeSelector(e) {
    var index = Number(e.target.getAttribute('index'));
    this.setState({ selectorIndexChanging: index });
  }

  changeColor(e) {
    var index = Number(e.target.getAttribute('index'));
    this.setState({ colorIndexChanging: index });
  }

  closeSwatch(e) {
    var index = Number(e.target.getAttribute('index'));
    var newSelectors = this.state.selectors;
    newSelectors.splice(index, 1);
    var newColors = this.state.colors;
    newColors.splice(index, 1);
    var newBackgroundOrText = this.state.backgroundOrText;
    newBackgroundOrText.splice(index, 1);
    var newLocks = this.state.locks;
    newLocks.splice(index, 1);
    this.setState({ selectors: newSelectors, colors: newColors, backgroundOrText: newBackgroundOrText, locks: newLocks });
  }

  changeMode(e) {
    this.setState({ mode: e.target.value });
  }

  render() {
    return (
      <div className='color-app color-row'>
        <span className='color-app mode-span'>mode: </span>
        <select className='color-app mode' name='mode' id='mode' onChange={this.changeMode}>
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
              <div contentEditable='true' suppressContentEditableWarning='true' onClick={this.changeSelector} index={index} className={`color-app selector index${index}`}>{this.state.selectors[index]}</div>

              <button index={index} className='color-app close-swatch' onClick={this.closeSwatch}>X</button>

              <div contentEditable='true' suppressContentEditableWarning='true' index={index} onClick={this.changeColor} className={`color-app color index${index}`} style={{ backgroundColor: color }} key={color}>{color}</div>

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