import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HeaderComponent from './components/HeaderComponent';
import Settings from './views/Settings';
import ViewMode from './views/ViewMode';


function App() {

  return (
    <div className='App'>
    <BrowserRouter>
    <HeaderComponent/>

          <Routes>
            <Route path="/" element= {<ViewMode/>}/>
            <Route path="/Settings" element={<Settings />}/>
          </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
