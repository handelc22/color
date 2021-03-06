import React from 'react';
import $ from 'jquery';
import ColorScheme from './ColorScheme.jsx';

class Styling extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    setTimeout(() => {
      var find = $('*').each(function(index) {
        if ($(this).css('position') === 'fixed') {
          var top = $(this).css('top');
          $(this).css({'top': `calc(${top} + 272px)`});
        }
      });
    }, 0);
  }

  render() {
    return (
      <>
        <ColorScheme html={this.props.html}/>
        <div id='iframe' className='color-app' dangerouslySetInnerHTML={{ __html: this.props.html }}/>
      </>
    )
  }
}

export default Styling;