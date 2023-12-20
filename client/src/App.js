import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home, Login, Register } from './pages';
import styles from './style';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);

  return (
    <div className={``}>
      <Routes>
        <Route exact path='/' element={<Home loggedIn={loggedIn} />} />
        <Route exact path='/login' element={<Login setLoggedIn={setLoggedIn} />} />
        <Route exact path='/register' element={<Register />} />
      </Routes>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={true}
        draggable={true}
        pauseOnHover={true}
      />
    </div>
  );
}

export default App;
