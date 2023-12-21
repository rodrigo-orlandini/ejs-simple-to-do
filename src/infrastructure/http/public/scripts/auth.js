const handleGithubButtonClick = () => {
  window.open(
    'https://github.com/rodrigo-orlandini/ejs-simple-to-do',
    '_blank',
  );
};

const handlePortfolioButtonClick = () => {
	window.open(
    'https://rodrigoorlandini.vercel.app/',
    '_blank',
  );
};

const handleSignUpButtonClick = async () => {
	if(!usernameValue || usernameValue.trim() === 0) {
		toastr.error("Empty 'Username' field.");
		return;
	}

	if(!passwordValue || passwordValue.trim() === 0) {
		toastr.error("Empty 'Password' field.");
		return;
	}

	signUpButton.setAttribute("disabled", true);

	const response = await fetch("/users", {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			username: usernameValue,
			password: passwordValue,
		}),
	});

	signUpButton.removeAttribute("disabled");
	
	if(response.status !== 201) {
		const json = await response.json();

		toastr.error(json.message);
		return;
	}

	toastr.success("User created!");
};

const handleLoginButtonClick = async () => {
	if(!usernameValue || usernameValue.trim() === 0) {
		toastr.error("Empty 'Username' field.");
		return;
	}

	if(!passwordValue || passwordValue.trim() === 0) {
		toastr.error("Empty 'Password' field.");
		return;
	}

	loginButton.setAttribute("disabled", true);

	const response = await fetch("/users/login", {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			username: usernameValue,
			password: passwordValue,
		}),
	});

	loginButton.removeAttribute("disabled");
	
	const json = await response.json();

	if(response.status !== 200) {
		document.cookie = "@simpletodo:access-token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/"
		toastr.error(json.message);
		return;
	}

	const currentTimestamp = Date.now();
	const tomorrowTimestamp = currentTimestamp + (1000 * 60 * 60 * 24); // + 1 day
	const tomorrow = new Date(tomorrowTimestamp);

	document.cookie = `@simpletodo:access-token=${json.accessToken}; expires=${tomorrow.toUTCString()}; path=/` 

	usernameInput.value = "";
	passwordInput.value = "";

	toastr.success("Login successfully.");

	window.location.href = "/tasks";
}

let usernameValue = undefined;
const usernameInput = document.getElementById("username-input");
usernameInput.addEventListener("change", (event) => usernameValue = event.target.value);

let passwordValue = undefined;
const passwordInput = document.getElementById("password-input");
passwordInput.addEventListener("change", (event) => passwordValue = event.target.value);

const signUpButton = document.getElementById("sign-up-button");
signUpButton.addEventListener("click", handleSignUpButtonClick);

const loginButton = document.getElementById("login-button");
loginButton.addEventListener("click", handleLoginButtonClick);

const githubButton = document.getElementById("github-button");
githubButton.addEventListener("click", handleGithubButtonClick);

const portfolioButton = document.getElementById("portfolio-button");
portfolioButton.addEventListener("click", handlePortfolioButtonClick);
