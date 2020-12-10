import * as React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import ContentWrapper from './ContentWrapper';

import TimeBlockerSettings from './settings/TimeBlocker';
import GeneralSettings from './settings/General';
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
                  <Link to={rootUrl + "/"}>General</Link>
                </li>
                <li>
                  <Link to={rootUrl + "/timeblocker"}>Timed Blocker</Link>
                </li>
                <li>
                  <Link to={rootUrl + "/about"}>About</Link>
                </li>
              </ul>
            </nav>

            {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
            <Switch>
              <ContentWrapper>
                <Route path={rootUrl + "/about"}        component={About} />
                <Route path={rootUrl + "/timeblocker"}  component={TimeBlockerSettings} />
                <Route path={rootUrl + "/"} exact       component={GeneralSettings} />
              </ContentWrapper>
            </Switch>
          </div>
        </Router>

      </main>
    </>
  );
}