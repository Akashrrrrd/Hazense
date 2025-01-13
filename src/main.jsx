import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// Create root container
const container = document.getElementById('root');
const root = createRoot(container);

// Render with error boundary wrapper
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);