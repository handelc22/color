import React from 'react';

const Styling = ({ html }) => {
  return (
    <div dangerouslySetInnerHTML={{ __html: html }}/>
  )
}

export default Styling;