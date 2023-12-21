const handleCreateTaskButtonClick = async () => {
	if(!taskNameValue || taskNameValue.trim() === 0) {
		toastr.error("Empty 'Name' field.");
		return;
	}

	if(!taskDescriptionValue || taskDescriptionValue.trim() === 0) {
		toastr.error("Empty 'Description' field.");
		return;
	}

	createTaskButton.setAttribute("disabled", true);

	const response = await fetch("/api/tasks", {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			title: taskNameValue,
			description: taskDescriptionValue,
		}),
	});

	createTaskButton.removeAttribute("disabled");

	if(response.status !== 201) {
		const json = await response.json();

		toastr.error(json.message);
		return;
	}
	
	const tasksList = document.getElementById("tasks-list");
	tasksList.innerHTML += `
		<li>
			<div class="checkbox"></div>

			<strong>${taskNameValue}:&nbsp</strong>
			<span>${taskDescriptionValue}</span>
		</li>
	`;	

	taskNameInput.value = "";
	taskDescriptionInput.value = "";

	toastr.success("Task created.");
}

const handleLogoutButtonClick = () => {
	logoutButton.setAttribute("disabled", true);
	document.cookie = "@simpletodo:access-token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";

	window.location.href = "/";
	logoutButton.removeAttribute("disabled");
}

let taskNameValue = undefined;
const taskNameInput = document.getElementById("task-name-input");
taskNameInput.addEventListener("change", (event) => taskNameValue = event.target.value);

let taskDescriptionValue = undefined;
const taskDescriptionInput = document.getElementById("task-description-input");
taskDescriptionInput.addEventListener("change", (event) => taskDescriptionValue = event.target.value);

const logoutButton = document.getElementById("logout-button");
logoutButton.addEventListener("click", handleLogoutButtonClick);

const createTaskButton = document.getElementById("create-task-button");
createTaskButton.addEventListener("click", handleCreateTaskButtonClick);