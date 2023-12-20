import React, { useEffect } from "react";
import Cookies from 'js-cookie';
import { Tasks, Squares } from "../components";
import { useNavigate } from "react-router-dom";

const Home = ({ loggedIn }) => {
    const isAuthenticated = !!Cookies.get('auth');
    const [selected, setSelected] = React.useState(null);

    const navigate = useNavigate();

    const handleLogout = () => {
        Cookies.remove('auth');
        navigate('/login');
    };

    if (!isAuthenticated) {
        navigate('/login');
        return null;
    }

    return (
        <div className={`flex flex-col w-screen h-screen items-center justify-center space-y-4`}>
            <button onClick={handleLogout} className={`px-4 py-2 rounded-md bg-red-500 text-white`}>Logout</button>
            <Tasks />
            <Squares />
        </div>
    );

};

export default Home;