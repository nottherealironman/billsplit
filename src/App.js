// Packages import
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux'; 

// Components import 
import Routes from './components/Routes';
import store from './store';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './assets/css/Style.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Routes />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
