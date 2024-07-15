async function handleDeleteTask(id, taskList){
   console.log(id);
   const response = fetch(`${import.meta.env.VITE_TASKS_URL}${id}`, {
     method: "DELETE",
   });
   console.log(response);
   if (!response.ok){
     alert("Item could not be deleted!");
   }
   for (let task in taskList){
    if(task._id === id){
        delete taskList[task]
        return
    }
   }
}

function handleEditTask(){

}

function handleSwitchTask(){

}

export {handleEditTask, handleDeleteTask, handleSwitchTask}