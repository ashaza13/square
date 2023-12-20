import React, { useEffect } from "react";
import { TaskCard, AddTask } from "./index";
import { Spinner } from "./index";
import Cookie from 'js-cookie';

const Tasks = () => {
    const [tasks, setTasks] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    const uid = JSON.parse(Cookie.get('auth'))._id;


    useEffect(() => {
        setLoading(true);

        fetch(`/tasks/${uid}`)
            .then((res) => res.json())
            .then((data) => {
                setTasks(data);
                setLoading(false);
            })
            .catch((err) => console.log(err));
    }, []);

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className={`flex grid grid-cols-2 gap-4 md:grid-cols-4`}>
            {tasks.map((task) => (
                <TaskCard key={task._id} name={task.taskName} task={task} />
            ))}
            
            {tasks.length != 8 && Array(8 - tasks.length).fill().map((_, i) => (
                <AddTask key={i} />
            ))}
        </div>
    );
};

export default Tasks;