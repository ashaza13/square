import React from "react";

const TaskUpdates = () => {
    return (
        <div className={`flex flex-col items-center justify-center bg-zinc-700 rounded-md shadow-md divide-y px-1`}>
            <button className="text-white h-full w-full px-4 text-3xl">
                <p className="transition hover:scale-125">+</p>
            </button>
            <button className="text-white h-full w-full px-4 text-3xl">
                <p className="transition hover:scale-125">-</p>
            </button>
        </div>
    );
}

export default TaskUpdates;