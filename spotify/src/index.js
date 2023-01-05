import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router-dom"
import Model from './Model';
const model = new Model();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<BrowserRouter>
    <App model={model}/>
</BrowserRouter>
);


