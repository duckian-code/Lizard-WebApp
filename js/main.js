var countInc = 1;
var count = 0;

let addPointCost = 10;
let multPointCost = 100;
let autoLizardCost = 1000;
// starting 500 ms ahead so the first auto is exactly 5
let interval = 5500; // in ms, starts at 5
let timer;

const lizardbutton = document.getElementById('lizard-button');
const countDisplay = document.getElementById('count');
const addPointUpgBtn = document.getElementById('add-point-upgrade');
const multiPointUpgBtn = document.getElementById('mult-point-upgrade');
const autoLizardBtn = document.getElementById('auto-lizard');

document.addEventListener('DOMContentLoaded', function () {
	lizardbutton.addEventListener('click', function () {
		clickButton();
	});

	addPointUpgBtn.addEventListener('click', function() {
		if (count >= addPointCost) {
			countInc += 1;
			count -= addPointCost;
			countDisplay.innerHTML = count;
			addPointCost *= 2;
			// querySelector selects p element within button
			document.querySelector("#add-point-upgrade p").textContent = addPointCost;
		}
	});

	multiPointUpgBtn.addEventListener('click', function() {
		if (count >= multPointCost) {
			countInc *= 2;
			count -= multPointCost;
			countDisplay.innerHTML = count;
			multPointCost *= 2;
			document.querySelector("#mult-point-upgrade p").textContent = multPointCost;
		}
	});

	autoLizardBtn.addEventListener('click', function() {
		if (count >= autoLizardCost) {
			count -= autoLizardCost;
			autoLizardCost *= 2;
			countDisplay.innerHTML = count;
			// ensures the lowest the button can go is 200 ms
			interval = Math.max(200, interval - 500);
			startIncrement();
			document.querySelector("#auto-lizard p").textContent = autoLizardCost;
		}
	})
});

function startIncrement() {
	if (timer) {
		clearInterval(timer);
	}
	timer = setInterval(() => {
		clickButton();
	}, interval);
}

function clickButton() {
	count += countInc;
	countDisplay.innerHTML = count;
}