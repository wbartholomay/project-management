async function handleDeleteTask(id, taskList, setTaskList) {
  console.log(id);
  
  try {
    const response = await fetch(`${import.meta.env.VITE_TASKS_URL}${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorText = await response.text(); // or response.json() if your server responds with JSON
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

function handleSwitchTask(){

}

export {handleEditTask, handleDeleteTask, handleSwitchTask}