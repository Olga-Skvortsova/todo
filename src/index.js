/* import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app'

ReactDOM.render(<App />, document.getElementById('root'));  */

import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './components/app';

const root = document.getElementById('root');
const rootContainer = createRoot(root);

rootContainer.render(<App />);