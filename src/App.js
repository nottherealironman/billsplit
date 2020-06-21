// Packages import
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux'; 
// Components import 
import Login from './components/Login';
import Signup from './components/Signup';
import store from './store';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Route exact path='/' component={Login}/>
          <Route exact path='/signup' component={Signup}/>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
