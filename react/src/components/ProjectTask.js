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

async function handleAddTask(taskData, setTaskData, taskList, setTaskList){

    try {
    const response = await fetch(`${import.meta.env.VITE_TASKS_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      const data = await response.json();
      taskData["_id"] = data.insertedId;
      console.log(taskData)
      console.log(data);
      setTaskList((taskList) =>[...taskList, taskData])
      alert("Task Successfully Added.");

      setTaskData({
        name: "",
        description: "",
        isComplete: false,
        dueDate: "",
        estimatedDuration: 0,
      });


    } catch (err) {
      console.error(err);
    }
}

export {handleEditTask, handleDeleteTask, handleSwitchTask, handleAddTask}