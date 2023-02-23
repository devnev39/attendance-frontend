import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import App from './App';
import "./styles.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid rounded">
        <a className="navbar-brand" href="/">Attendance</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-link mx-3" href="/">Recognise</a>
            <a className="nav-link mx-3" href="/register">Register</a>
            <a className="nav-link mx-3" href='/manage'>Manage</a>
          </div>
        </div>
      </div>
    </nav>
    <App />
  </BrowserRouter>
);