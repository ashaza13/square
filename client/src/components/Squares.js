import React from "react";
import { YearGrid, TaskUpdates } from "./index";

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
            active: Math.random() < 0.3 // Randomly mark some days as active, for example
        });

        // Move to the next day
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return yearData;
};

const yearData = initializeYearData(2023);

const Squares = () => {
    return (
        <div className={`flex flex-row space-x-4`}>
            <YearGrid yearData={yearData} />
            <TaskUpdates />
        </div>
    );
};

export default Squares;