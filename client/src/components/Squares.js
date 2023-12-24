import React from "react";
import { YearGrid, TaskUpdates } from "./index";


const Squares = ( {task, yearData} ) => {
    return (
        <div className={`flex flex-row space-x-4`}>
            <YearGrid yearData={yearData} />
            <TaskUpdates task={task} />
        </div>
    );
};

export default Squares;