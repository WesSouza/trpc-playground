import './main.css';

import { createRoot } from 'react-dom/client';

import { App } from './App.js';

const appEl = document.querySelector('#app');
if (appEl) {
  const root = createRoot(appEl);
  root.render(<App />);
}
