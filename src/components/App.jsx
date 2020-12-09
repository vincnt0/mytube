import * as React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Settings from './Settings';
import About from './About';

import "../styles/styles.css";

export default function App({rootUrl}) {
  return (
    <>
      <header>
        <img src="/icons/icon.png" className="icon"></img>
        <h1>MyTube</h1>
      </header>
      <main>
        
        <Router>
          <div className="main">
            <nav className="nav-drawer">
              <ul className="nav-list">
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
              <Route path={rootUrl + "/about"}  component={About} />
              <Route path={rootUrl + "/"}       component={Settings} />
            </Switch>
          </div>
        </Router>

      </main>
    </>
  );
}