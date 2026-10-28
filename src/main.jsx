// Import React so this file can render JSX.
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './style.css';

// Find the root element in index.html and display the App inside it.
createRoot(document.getElementById('root')).render(<App />);