import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home, Login, Register } from './pages';
import styles from './style';

function App() {
  return (
    <div className={`${styles.marginX}`}>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/register' element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
