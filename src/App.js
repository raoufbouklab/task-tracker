import "./style.css";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

function App() {
  const [showAdd, setShowAdd] = useState(false);
  const [tasks, setTasks] = useState([]);

  //Fetch Tasks from server
  useEffect(() => {
    const fetchTasks = async () => {
      await fetch("http://localhost:3004/tasks")
        .then((response) => response.json())
        .then((data) => setTasks(data))
        .catch((error) => console.log(error));
    };
    fetchTasks();
  }, []);

  //Add task
  const onAdd = async (task) => {
    const response = await fetch("http://localhost:3004/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });
    const data = await response.json();
    setTasks([...tasks, data]);

    /* const id = Math.floor(Math.random() * 1000) + 1;
    const newTask = { id, ...task };
    console.log(newTask);
    setTasks([...tasks, newTask]); */
  };

  //Detete task
  const onDelete = async (id) => {
    await fetch(`http://localhost:3004/tasks/${id}`, {
      method: "DELETE",
    });
    setTasks(tasks.filter((task) => task.id !== id));
  };

  //Toggle reminder
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:3004/tasks/${id}`);
    const data = await res.json();
    return data;
  };

  const onToggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const response = await fetch(`http://localhost:3004/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updTask),
    });
    const data = await response.json();
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };

  //Toggle Show Add button
  const onShowAdd = () => {
    setShowAdd(!showAdd);
  };

  return (
    <div className="container">
      <Header title="Task Tracker" showAdd={showAdd} onShowAdd={onShowAdd} />
      {showAdd && <AddTask onAdd={onAdd} />}
      {tasks.length > 0 ? (
        <Tasks
          tasks={tasks}
          onDelete={onDelete}
          onToggleReminder={onToggleReminder}
        />
      ) : (
        "No tasks to show"
      )}
    </div>
  );
}

export default App;
