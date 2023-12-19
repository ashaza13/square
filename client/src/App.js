import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home, Login, Register } from './pages';
import styles from './style';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);

  return (
    <div className={``}>
      <Routes>
        <Route exact path='/' element={<Home loggedIn={loggedIn} />} />
        <Route exact path='/login' element={<Login setLoggedIn={setLoggedIn} />} />
        <Route exact path='/register' element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
