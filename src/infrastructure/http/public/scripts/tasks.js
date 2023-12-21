const handleLogoutButtonClick = () => {
	document.cookie = "@simpletodo:access-token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";

	window.location.href = "/";
}

const logoutButton = document.getElementById("logout-button");
logoutButton.addEventListener("click", handleLogoutButtonClick);