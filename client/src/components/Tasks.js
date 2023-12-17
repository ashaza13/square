import React from "react";
import { TaskCard, AddTask } from "./index";

const Tasks = () => {
    return (
        <div className={`flex grid grid-cols-2 gap-4 md:grid-cols-4`}>
            <TaskCard />
            {Array(7).fill().map((_, i) => (
                <AddTask key={i} />
            ))}
        </div>
    );
};

export default Tasks;