import React from "react";

const AddTask = () => {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setOpen(false);
    }

    return (
        <div className={`px-10 py-3 border border-dashed border-1 rounded-md border-neutral-400 flex items-center justify-center transition`}>
            <button className="text-white text-xl transition hover:scale-105" onClick={handleClick}>+</button>

            {open && (
                <div className="absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="max-w-md bg-zinc-700 rounded shadow-md">
                        <div className="flex w-full relative justify-end pr-3 pt-1">
                            <button className="text-white text-xl transition hover:scale-105" onClick={() => setOpen(false)}>x</button>
                        </div>
                        <div className="pb-6 px-12">
                            <h2 className="text-xl font-bold text-center text-white">Add Task</h2>
                            <form>
                                <div className="mb-4">
                                    <label htmlFor="task" className="block text-sm font-medium text-white">
                                        Task
                                    </label>
                                    <input
                                        type="text"
                                        id="task"
                                        name="task"
                                        className="form-control w-full px-3 py-2 text-sm text-white bg-zinc-800 rounded border-0 shadow-sm focus:outline-none focus:ring focus:ring-green-300"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="toggleOption" className="flex items-center cursor-pointer">
                                        <div className="relative">
                                            {/* This is the toggle switch */}
                                            <input type="checkbox" id="toggleOption" className="sr-only peer" /> {/* Added peer class */}
                                            {/* Toggle background */}
                                            <div className="block bg-gray-600 w-12 h-6 rounded-full peer-checked:bg-green-600 transition-colors"></div> {/* Added peer-checked for bg */}
                                            {/* Toggle circle */}
                                            <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-6"></div> {/* Added peer-checked for translate */}
                                        </div>
                                        <div className="ml-3 text-sm font-medium text-white">
                                            Toggle Option
                                        </div>
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <button type="submit" className="w-full px-4 py-2 text-sm font-medium text-white bg-green-600 transition duration-500 rounded shadow-sm hover:bg-green-800 focus:outline-none focus:ring" onClick={handleSubmit}> Add Task</button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default AddTask;