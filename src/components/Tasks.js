import Task from "./Task";

const Tasks = ({ tasks, onDelete, onToggleReminder }) => {
  return (
    <>
      {tasks.map((task, index) => (
        <Task
          key={index}
          task={task}
          onDelete={onDelete}
          onToggleReminder={onToggleReminder}
        />
      ))}
    </>
  );
};

export default Tasks;
