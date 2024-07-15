async function handleDeleteTask(id, setTaskList) {
  console.log(id);
  
  try {
    const response = await fetch(`${import.meta.env.VITE_TASKS_URL}${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Delete request failed:', errorText);
      alert("Item could not be deleted!");
      return;
    }

    setTaskList((prevTaskList) => 
        prevTaskList.filter((task) => task._id !== id)
    );
  } catch (error) {
    console.error('Error during fetch:', error);
    alert("An error occurred while trying to delete the item!");
  }
}


function handleEditTask(){

}

async function handleSwitchTask(id, task, taskList, setTaskList){
  console.log(id);
  
  try {
    const isComplete = task.isComplete;
    console.log(task)
    console.log(isComplete)
    const response = await fetch(`${import.meta.env.VITE_TASKS_URL}${id}`, {
      method: "PUT",
      body: {
        "isComplete": !isComplete,
      },
    });
    console.log(await response.text())
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Put request failed:", errorText);
      alert("Item could not be changed!");
      return;
    }

    setTaskList((taskList) =>
      taskList.map((t) =>
        t._id === id ? { ...t, isComplete: !isComplete } : t
      )
    );
  } catch (error) {
    console.error("Error during fetch:", error);
    alert("An error occurred while trying to delete the item!");
  }

}

export {handleEditTask, handleDeleteTask, handleSwitchTask}