import React from "react";
import { Month } from "./index";

const monthAbbreviations = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const days = "1"

const YearGrid = ({ yearData }) => {
    return (
        <div className="rounded-md flex flex-col bg-zinc-700 shadow-md px-2 py-2 md:px-4 md:py-4 justify-center">
            <div className="flex flex-row items-center justify-between py-1">
                <p className="text-white text-xs md:text-md">999 Consecutive Days</p>
                <p className="text-white text-xs">Total Active Days: {days}</p>
            </div>
            <div className="sm:flex sm:overflow-x-auto md:grid md:gap-1 md:grid-cols-6">
                {yearData.map((month, index) => (
                    // Pass the month abbreviation using the index
                    <Month key={index} days={month.days} name={monthAbbreviations[index]} />
                ))}
            </div>
        </div>
    );
}

export default YearGrid;