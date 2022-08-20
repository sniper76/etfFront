import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import Stock from './Stock';

const Root = () => (
    <BrowserRouter>
        
        <Routes>
                  <Route path="/" element={<App />} />
                  <Route path="/stock" element={<Stock title="Stock" description="배당주보기" />} />
                  </Routes>
    </BrowserRouter>
);

export default Root;