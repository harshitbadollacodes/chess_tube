import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import { StateProvider } from './context/StateContext';
import { AuthProvider } from './context/AuthContext';

ReactDOM.render(
  <StrictMode>
    <AuthProvider>
      <StateProvider>
        <Router>
          <App />
        </Router>
      </StateProvider>
    </AuthProvider>
  </StrictMode>,
  document.getElementById('root')
);