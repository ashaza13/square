import React from "react";

const AddTask = () => {
    return (
        <div className={`px-10 py-3 border border-dashed border-1 rounded-md border-neutral-400 flex items-center justify-center transition hover:scale-105`}>
            <button className="text-white text-xl transition hover:scale-105">+</button>
        </div>
    );
};

export default AddTask;