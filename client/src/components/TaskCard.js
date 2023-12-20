import React from "react";

const TaskCard = ({name, task}) => {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    }



    return (
        <div className={`flex px-10 py-3 border border-1 rounded-md border-neutral-400 bg-zinc-700 transition shadow-md items-center justify-center`} onClick={handleClick}>
            <p className="text-white text-xl">{name}</p>
        </div>
    );
};

export default TaskCard;