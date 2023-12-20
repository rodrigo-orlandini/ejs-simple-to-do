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
};

let usernameValue = undefined;
const usernameInput = document.getElementById("username-input");
usernameInput.addEventListener("change", (event) => usernameValue = event.target.value);

let passwordValue = undefined;
const passwordInput = document.getElementById("password-input");
passwordInput.addEventListener("change", (event) => passwordValue = event.target.value);

const signUpButton = document.getElementById("sign-up-button");
signUpButton.addEventListener("click", handleSignUpButtonClick);

const githubButton = document.getElementById("github-button");
githubButton.addEventListener("click", handleGithubButtonClick);

const portfolioButton = document.getElementById("portfolio-button");
portfolioButton.addEventListener("click", handlePortfolioButtonClick);
