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

async function handleEditTask(taskData, setTaskData, taskList, setTaskList){
  try {
    const {dueDate, estimatedDuration, personAssigned} = taskData
    const payload = {dueDate, estimatedDuration, personAssigned}
    console.log("payload  " + JSON.stringify(payload))
    const response = await fetch(`${import.meta.env.VITE_TASKS_URL}${taskData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      console.log(taskData);

      console.log(response);
      // console.log(taskData);
      // console.log(data);
      console.log(taskList);
      setTaskList((prevTaskList) => prevTaskList.filter((task) => task._id != taskData._id));
      setTaskList((prevTaskList) => [...prevTaskList, taskData]);
      alert("Task Successfully Updated.");

    } catch (err) {
      console.error(err);
    }
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
        isComplete: !isComplete, 
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