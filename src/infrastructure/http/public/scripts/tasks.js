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

	const tasksList = document.getElementById("tasks-list");
	tasksList.innerHTML += `
		<li>
			<div class="checkbox"></div>

			<strong>${taskNameValue}:&nbsp</strong>
			<span>${taskDescriptionValue}</span>
		</li>
	`;	

	createTaskButton.removeAttribute("disabled");

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