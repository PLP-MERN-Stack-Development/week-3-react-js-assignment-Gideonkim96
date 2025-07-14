import { useLocalStorage } from "../hooks/useLocalStorage";
import { useState } from "react";
import Button from "../components/Button";

export default function Tasks() {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("All");

  function addTask() {
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
    setNewTask("");
  }

  function toggleComplete(id) {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  }

  function deleteTask(id) {
    setTasks(tasks.filter(t => t.id !== id));
  }

  const filtered = tasks.filter(t =>
    filter === "All" ? true :
    filter === "Active" ? !t.completed :
    t.completed
  );

  return (
    <div>
      <h1 className="text-2xl mb-4">Task Manager</h1>

      <input
        className="border p-2 mr-2"
        placeholder="Add new task..."
        value={newTask}
        onChange={e => setNewTask(e.target.value)}
      />
      <Button onClick={addTask}>Add Task</Button>

      <div className="my-4 space-x-2">
        <Button onClick={() => setFilter("All")}>All</Button>
        <Button variant="secondary" onClick={() => setFilter("Active")}>Active</Button>
        <Button variant="secondary" onClick={() => setFilter("Completed")}>Completed</Button>
      </div>

      <ul>
        {filtered.map(task => (
          <li key={task.id} className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-2 mb-2 rounded">
            <span className={task.completed ? "line-through" : ""}>{task.text}</span>
            <div className="space-x-2">
              <Button variant="secondary" onClick={() => toggleComplete(task.id)}>✔️</Button>
              <Button variant="danger" onClick={() => deleteTask(task.id)}>🗑️</Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}