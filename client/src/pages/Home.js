import React, { useEffect } from "react";
import Cookies from 'js-cookie';
import { Tasks, Squares } from "../components";
import { useNavigate } from "react-router-dom";

const initializeYearData = (year) => {
    // Check if it's a leap year
    const isLeapYear = new Date(year, 1, 29).getMonth() === 1;
    const daysInYear = isLeapYear ? 366 : 365;

    let currentDate = new Date(year, 0, 1); // Start from January 1st
    const yearData = [];

    for (let i = 0; i < daysInYear; i++) {
        const monthIndex = currentDate.getMonth();
        const dayIndex = currentDate.getDate() - 1; // getDay() returns 0-6 for day of the week

        // Initialize the month if it doesn't exist
        if (!yearData[monthIndex]) {
            yearData[monthIndex] = { days: [] };
        }

        // Add the day, you can add your logic here for active days
        yearData[monthIndex].days.push({
            date: new Date(currentDate),
            active: 0 // Randomly mark some days as active, for example
        });

        // Move to the next day
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return yearData;
};

const yearData = initializeYearData(2023);


const Home = ({ loggedIn }) => {
    const isAuthenticated = !!Cookies.get('auth');
    const [selected, setSelected] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [tasks, setTasks] = React.useState([]);

    const navigate = useNavigate();

    const handleSelected = (task) => {

        for (let i = 0; i < task.dates.length; i++) {
            const date = new Date(task.dates[i].date);
            const monthIndex = date.getMonth();
            const dayIndex = date.getDate() - 1;

            yearData[monthIndex].days[dayIndex].active = task.dates[i].count;
        }

        setSelected(task);
    }

    useEffect(() => {
        if (isAuthenticated) {
            setLoading(true);

            const uid = JSON.parse(Cookies.get('auth'))._id;

            fetch(`/tasks/${uid}`)
                .then((res) => res.json())
                .then((data) => {
                    setTasks(data);
                    setLoading(false);

                    if (data.length != 0) {
                        handleSelected(data[0]);
                    }
                })
                .catch((err) => console.log(err));
        }
    }, []);

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
            <h1 className={`text-4xl text-white`}>Little things add up!</h1>
            <Tasks tasks={tasks} setTasks={setTasks} loading={loading} selected={selected} setSelected={handleSelected} />
            <Squares task={selected} yearData={yearData} />
            <button onClick={handleLogout} className={`px-4 py-2 rounded-md bg-red-500 text-white`}>Logout</button>
        </div>
    );

};

export default Home;