import React from "react";

const TaskCard = () => {
    return (
        <div className={`px-10 py-3 border border-1 rounded-md border-neutral-400 bg-zinc-700 transition shadow-md hover:scale-105`}>
            <p className="text-white text-xl">Task 1</p>
        </div>
    );
};

export default TaskCard;