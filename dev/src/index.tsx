import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import '@patternfly/patternfly/patternfly.css';
import '@patternfly/patternfly/patternfly-charts.css';
import '@patternfly/patternfly/patternfly-charts-theme-dark.css';
import '@patternfly/patternfly/patternfly-addons.css';
import './index.css';

ReactDOM.render( <React.StrictMode>
    <App />
  </React.StrictMode>, document.getElementById('root') as HTMLElement);

