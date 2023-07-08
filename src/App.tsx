import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginForm from "./components/LoginForm/LoginForm";
import Layout from "./components/Layout/Layout";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Layout/>}>
                  <Route path="login" element={<LoginForm/>}/>
              </Route>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
