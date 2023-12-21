import React, { useEffect } from "react";
import { TaskCard, AddTask, TaskCardSkeleton } from "./index";
import Cookie from 'js-cookie';

const Tasks = ({tasks, setTasks, loading, selected, setSelected }) => {

    const uid = JSON.parse(Cookie.get('auth'))._id;

    const addTask = (newTask) => {
        setTasks(prevTasks => [...prevTasks, newTask]);
    };

    return (
        <div className={`flex grid grid-cols-2 gap-4 md:grid-cols-4`}>
            {tasks.map((task) => (
                loading ? <TaskCardSkeleton key={task._id} /> : <TaskCard key={task._id} name={task.taskName} task={task} selected={selected} onSelect={setSelected} />
            ))}
            
            {tasks.length != 8 && Array(8 - tasks.length).fill().map((_, i) => (
                <AddTask key={i} addTask={addTask} />
            ))}
        </div>
    );
};

export default Tasks;