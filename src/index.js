import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './component/App';
import Search from './component/Search';
import Result from './component/Result';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route, HashRouter, } from "react-router-dom";

ReactDOM.render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<Search />}>
        <Route path="search">
          <Route path=":name" element={<Result />}/>
        </Route>
      </Route>
    </Routes>
  </HashRouter>,
  document.getElementById('root')
);

reportWebVitals();