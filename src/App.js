import React from 'react';
import { Route, Routes } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Home from './pages/Home';

const App = () => {
  return (
    <div className="container mx-auto px-[100px] my-[60px]">
      <Toaster position="top-center" reverseOrder={true} />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </div>
  );
};

export default App;