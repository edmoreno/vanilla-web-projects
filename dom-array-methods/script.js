const main = document.getElementById("main");
const addUserBtn = document.getElementById("addUser");
const doubleMoneyBtn = document.getElementById("doubleMoney");
const showMillionairesBtn = document.getElementById("showMillionaires");
const sortRichestBtn = document.getElementById("sortRichest");
// const calculateWealthBtn = document.getElementById("calculateWealth");

let data = [];

addRandomUser();
addRandomUser();
addRandomUser();

//Get a new person from the random user API
async function addRandomUser() {
	const res = await fetch("https://randomuser.me/api");
	const data = await res.json();

	const user = data.results[0];

	const newUser = {
		name: `${user.name.first} ${user.name.last}`,
		wealth: Math.floor(Math.random() * 1000000),
	};

	addUser(newUser);
}

//Given a user object, add that user to the user array
function addUser(user) {
	data.push(user);
	updateDOM();
}

//Double wealth value for all users in the data array
function doubleMoney() {
	data = data.map((item) => {
		return { ...item, wealth: 2 * item.wealth };
	});
	updateDOM();
}

function showMillionaires() {
	data = data.filter((item) => item.wealth > 1000000);
	updateDOM();
}

function sortRichest() {
	data = data.sort((a, b) => b.wealth - a.wealth);
	updateDOM();
}

//Update DOM with the current information in the user data array
function updateDOM() {
	main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";

	data.forEach((user) => {
		const element = document.createElement("div");
		element.classList.add("person");
		element.innerHTML = `<strong>${user.name}</strong> $${formatMoney(
			user.wealth
		)}`;
		main.appendChild(element);
	});

	let total = data.reduce((acc, item) => acc + item.wealth, 0);

	const element = document.createElement("h3");
	// element.classList.add("total");
	element.innerHTML = `<strong>Total Wealth</strong> $${formatMoney(total)}`;
	main.appendChild(element);
}

//Format a value as $XX.XX format
function formatMoney(value) {
	return value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

//Event Listeners
addUserBtn.addEventListener("click", addRandomUser);
doubleMoneyBtn.addEventListener("click", doubleMoney);
showMillionairesBtn.addEventListener("click", showMillionaires);
sortRichestBtn.addEventListener("click", sortRichest);
