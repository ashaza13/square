import React from "react";

const TaskCardSkeleton = () => {
    return (
        <div className="flex px-3 py-3 border border-1 rounded-md border-neutral-400 bg-zinc-700 shadow-md items-center justify-center grid grid-cols-2">
            <div className="h-3 bg-gray-600 rounded col-span-2 animate-pulse"></div>
        </div>
    );
};

export default TaskCardSkeleton;