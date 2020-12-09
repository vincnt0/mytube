import * as React from 'react';

import ContentWrapper from './ContentWrapper';
import readme from '../../README.md';


export default function About(){
  return <ContentWrapper>
    <div dangerouslySetInnerHTML={{__html: readme}} />
  </ContentWrapper>
}