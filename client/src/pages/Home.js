import React from "react";
import { Tasks, Squares } from "../components";

const Home = () => {
    const [selected, setSelected] = React.useState(null);

    return (
        <div className={`flex flex-col w-screen h-screen items-center justify-center space-y-4`}>
            <Tasks />
            <Squares />  
        </div>
    );
};

export default Home;