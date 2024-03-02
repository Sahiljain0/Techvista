import React, { useState } from "react";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskName, setEditTaskName] = useState("");

  const generateUniqueId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  const handleInputChange = (e) => {
    setTaskInput(e.target.value);
  };

  const handleAddTask = () => {
    if (taskInput.trim() !== "") {
      const newTask = {
        id: generateUniqueId(),
        name: taskInput.trim(),
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setTaskInput("");
    }
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleToggleCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleEditTask = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    setEditTaskId(id);
    setEditTaskName(taskToEdit.name);
  };

  const handleUpdateTask = () => {
    const updatedTasks = tasks.map((task) =>
      task.id === editTaskId ? { ...task, name: editTaskName } : task
    );
    setTasks(updatedTasks);
    setEditTaskId(null);
    setEditTaskName("");
  };

  return (
    <div className="bg-black h-96 overflow-y-auto text-white p-4 w-[500px] px-10 rounded-xl z-index-20 border-gray-200 border-2 relative">
      <h1 className="text-2xl mb-4 font-bold">Task Manager</h1>
      <div className="flex items-center gap-4 mb-4">
        <input
          type="text"
          value={taskInput}
          onChange={handleInputChange}
          className="bg-white text-black rounded-md p-2 flex-grow"
          placeholder="Enter task..."
        />
        <button
          onClick={handleAddTask}
          className="bg-red-500 text-white rounded-full p-2 ml-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </button>
      </div>
      {tasks.map((task) => (
        <div className="flex justify-between gap-9 w-full items-center">
          <div
            key={task.id}
            className={`flex items-center w-full bg-gray-900 text-white rounded-md p-2 mb-2 ${
              task.completed && "bg-blue-900"
            }`}
          >
            <div className="flex items-center flex-grow">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleCompletion(task.id)}
                className="mr-2 rounded-full border-gray-400 border-2 h-6 w-6"
              />
              {editTaskId === task.id ? (
                <input
                  type="text"
                  value={editTaskName}
                  onChange={(e) => setEditTaskName(e.target.value)}
                  className="flex-grow mr-2 bg-white text-black rounded-md p-1"
                />
              ) : (
                <span className="flex-grow">{task.name}</span>
              )}
            </div>
            {editTaskId === task.id ? (
              <button onClick={handleUpdateTask} className="mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </button>
            ) : (
              <button
                onClick={() => handleEditTask(task.id)}
                className="mr-2 flex items-center justify-center rounded-full w-8 h-8 border-white border"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l-4-4h8l-4 4zm0 0l-4-4h8l-4 4zm-4-4v-6m8 6v-6"
                  />
                </svg>
              </button>
            )}
          </div>
          <button
            onClick={() => handleDeleteTask(task.id)}
            className="flex items-center justify-center rounded-full w-8 h-8 bg-white text-black"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
};

export default TaskManager;
