import React, { useEffect } from "react";
import { Tasks, Squares } from "../components";
import { useNavigate } from "react-router-dom";

const Home = ({ loggedIn }) => {
    const [selected, setSelected] = React.useState(null);

    const navigate = useNavigate();


    useEffect(() => {
        if (!loggedIn) {
            navigate("/login");
        }
    }, [loggedIn]);

    return (
        <div className={`flex flex-col w-screen h-screen items-center justify-center space-y-4`}>
            <Tasks />
            <Squares />
        </div>
    );

};

export default Home;