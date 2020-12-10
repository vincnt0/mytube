import * as React from 'react';

import readme from '../../README.md';


export default function About(){
  return <div dangerouslySetInnerHTML={{__html: readme}} />;
}