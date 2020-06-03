const currency_one = document.getElementById("currency_one");
const amount_one = document.getElementById("amount_one");
const currency_two = document.getElementById("currency_two");
const amount_two = document.getElementById("amount_two");
const swap = document.getElementById("swap");
const rateEl = document.getElementById("rate");

function calculate() {
	let currency_one_value = currency_one.value;
	let currency_two_value = currency_two.value;

	fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one_value}`)
		.then((res) => res.json())
		.then((data) => {
			let rate = data.rates[currency_two_value];
			amount_two.value = (amount_one.value * rate).toFixed(2);
			rateEl.innerText = `1 ${currency_one.value} = ${currency_two.value} ${rate}`;
		});
}

//Event Listeners
currency_one.addEventListener("change", calculate);
amount_one.addEventListener("input", calculate);
currency_two.addEventListener("change", calculate);
amount_two.addEventListener("input", calculate);

swap.addEventListener("click", function () {
	let temp = currency_one.value;
	currency_one.value = currency_two.value;
	currency_two.value = temp;
	calculate();
});

calculate();
