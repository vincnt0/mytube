import * as React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Settings from './Settings';

import "../styles/styles.css";

export default function App({rootUrl}) {
  return (
    <>
      <header>
        <img src="/icons/icon.png" class="icon"></img>
        <h1>MyTube</h1>
      </header>
      <main>
        
        <Router>
          <div class="main">
            <nav class="nav-drawer">
              <ul class="nav-list">
                <li>
                  <Link to={rootUrl + "/"}>Settings</Link>
                </li>
                <li>
                  <Link to={rootUrl + "/about"}>About</Link>
                </li>
              </ul>
            </nav>

            {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
            <Switch>
              <Route path={rootUrl + "/about"}>
                <div>About</div>
              </Route>
              <Route path={rootUrl + "/"}>
                <Settings />
              </Route>
            </Switch>
          </div>
        </Router>

      </main>
    </>
  );
}