import React from 'react';
import ColorScheme from './ColorScheme.jsx';

const Styling = ({ html }) => {
  return (
    <>
      <ColorScheme />
      <div id='iframe' className='color-app' dangerouslySetInnerHTML={{ __html: html }}/>
    </>
  )
}

export default Styling;