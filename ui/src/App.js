import React from 'react';

import './App.css';
import SignIn from "./components/auth/SignIn";
import Header from "./components/header/Header";

function App() {
  return (
    <div className="App">
      <Header/>
      <SignIn/>
    </div>
  );
}

export default App;
