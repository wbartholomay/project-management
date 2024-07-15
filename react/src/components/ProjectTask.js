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
    const response = await fetch(`${import.meta.env.VITE_TASKS_URL}${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify({
        isComplete: true, 
      }),
    });
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

async function handleAddTask(taskData, setTaskData){

    try {
    const response = await fetch(`${import.meta.env.VITE_TASKS_URL}${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      const data = await response.json();
      console.log(data);
      alert("Task Successfully Added.");
      setTaskData({
        name: "",
        manager: user.username,
        teamMembers: [user.username],
        teamSize: 0,
        budget: 0,
        workload: 1,
        daysToComplete: -1,
      });
    } catch (err) {
      console.error(err);
    }
}

export {handleEditTask, handleDeleteTask, handleSwitchTask, handleAddTask}