import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar';
import Streams from './components/Streams';
import Chat from './components/Chat';
import Menu from './components/Menu';
import Routes from './routes';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="content">
          <Navbar />
          <Routes />
          <Streams />
        </div>
        <Menu />
        {/* <Chat /> */}
        <ToastContainer closeOnClick={false} autoClose={false} />
      </div>
    )
  }
}

export default App;
