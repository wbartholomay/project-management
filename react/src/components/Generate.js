const generateTime = async (event) => {
  //generates predicted completion time, opens popup window and displays it there
  event.preventDefault();
  try {
    const response = await fetch("http://localhost:3000/predictTime", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectData),
    });

    const data = await response.json();
    const prediction = parseInt(data.daysToComplete);
    setProjectData({
      ...projectData,
      daysToComplete: prediction,
    });
  } catch (err) {
    console.log(err);
  }
};

export default generateTime;
