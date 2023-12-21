import React from "react";

const TaskCard = ({ name, task, selected, onSelect }) => {
    const [open, setOpen] = React.useState(false);
    const isSelected = selected?._id === task._id;

    const handleClick = () => {
        onSelect(task);
        setOpen(true);
    }



    return (
        <div className={`flex px-10 bg-zinc-700 py-3 border border-1 rounded-md border-neutral-400 transition shadow-md items-center justify-center ${isSelected ? 'scale-105' : "scale-100"}`} onClick={handleClick}>
            <p className="text-white text-xl">{name}</p>
        </div>
    );
};

export default TaskCard;