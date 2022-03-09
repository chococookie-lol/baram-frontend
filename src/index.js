import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Search from './component/Search';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route, HashRouter, } from "react-router-dom";
import Info from 'component/Info';

ReactDOM.render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<Search />}>
        <Route path="search">
          <Route path=":name" element={<Info />}/>
        </Route>
      </Route>
    </Routes>
  </HashRouter>,
  document.getElementById('root')
);

reportWebVitals();