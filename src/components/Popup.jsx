import * as React from 'react';

import '../styles/styles.css';
import '../styles/popup.css';
import TempUnblocker from './settings/TempUnblocker';

export default function Popup(){
  return <>
    <header>
      <img src="/icons/icon.png" className="icon"></img>
      <h1>MyTube</h1>
    </header>

    <main>
      <div>
        <TempUnblocker/>
        <hr/>
      </div>
    </main>
  </>;
}