import React from "react";
import { toast } from "react-toastify";

const TaskUpdates = ({task}) => {

    const handleAdd = (e) => {
        e.preventDefault();

        const date = new Date().toISOString().slice(0, 10);

        const id = task._id;

        // Send a PUT request to the server

        fetch(`/tasks/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ date }),
        })
            .then((res) => {
                // If successful, process the response
                if (res.ok) {
                    toast.success("Task updated successfully");
                    return res.json(); // Parse the JSON response
                }

                // Handle other non-success cases
                throw new Error("Unable to update task");
            })
            .then((data) => {
                // Handle the response data
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className={`flex flex-col items-center justify-center bg-zinc-700 rounded-md shadow-md divide-y px-1`}>
            <button className="text-white h-full w-full px-4 text-3xl" onClick={handleAdd} >
                <p className="transition hover:scale-125">+</p>
            </button>
            <button className="text-white h-full w-full px-4 text-3xl">
                <p className="transition hover:scale-125">-</p>
            </button>
        </div>
    );
}

export default TaskUpdates;