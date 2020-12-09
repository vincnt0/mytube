import * as React from 'react';

import '../styles/styles.css'

export default function ContentWrapper({children}){
  return (
    <div className="content-wrapper">
      { children }
    </div>
  )
}