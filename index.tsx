import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Local Fonts
import '@fontsource/noto-sans-jp/300.css';
import '@fontsource/noto-sans-jp/400.css';
import '@fontsource/noto-sans-jp/500.css';
import '@fontsource/noto-sans-jp/700.css';
import '@fontsource/zen-old-mincho/400.css';
import '@fontsource/zen-old-mincho/500.css';
import '@fontsource/zen-old-mincho/600.css';
import '@fontsource/zen-old-mincho/700.css';
import '@fontsource/zen-old-mincho/900.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);