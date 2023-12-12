import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './components/app';

const root = document.getElementById('root');
const rootContainer = createRoot(root);

rootContainer.render(<App />);