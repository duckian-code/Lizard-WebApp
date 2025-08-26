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
const options = document.getElementById("game-options-area");
const toggleBtn = document.getElementById("toggle-options");
const area = document.getElementById("achievement-area");
const popup = document.createElement("div");
// upgrade level tracking variables
const addLvlTxt = document.getElementById("addLvl");
const multLvlTxt = document.getElementById("multLvl");
const autoLvlTxt = document.getElementById("autoLvl");
let addLvl = 1;
let multLvl = 1;
let autoLvl = 1;


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
			addLvl++;
			addLvlTxt.textContent = addLvl.toString();
		}
	});

	multiPointUpgBtn.addEventListener('click', function() {
		if (count >= multPointCost) {
			countInc *= 2;
			count -= multPointCost;
			countDisplay.innerHTML = count;
			multPointCost *= 2;
			document.querySelector("#mult-point-upgrade p").textContent = multPointCost;
			multLvl++;
			multLvlTxt.textContent = multLvl.toString();
		}
	});

	autoLizardBtn.addEventListener('click', function() {
		if (count >= autoLizardCost) {
			let maxSpeed = 200;
			interval = Math.max(maxSpeed, interval - 500);
			if (interval == maxSpeed) {
				autoLvlTxt.textContent = "MAX LEVEL";
				autoLvlTxt.classList.add("rainbow");
				document.querySelector("#auto-lizard p").textContent = "-------";
				return;
			}
			count -= autoLizardCost;
			autoLizardCost *= 2;
			countDisplay.innerHTML = count;
			// ensures the lowest the button can go is 200 ms
			startIncrement();
			document.querySelector("#auto-lizard p").textContent = autoLizardCost;
			autoLvl++;
			autoLvlTxt.textContent = autoLvl.toString();
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

toggleBtn.addEventListener("click", () => {
  options.classList.toggle("show");
});

// THIS IS THE CODE NEEDED TO SHOW A POPUP ACHIEVEMENT 
function showAchievement(text) {
  const popup = document.createElement("div");
  popup.className = "achievement";
  popup.textContent = text;
  area.appendChild(popup);

  setTimeout(() => popup.remove(), 4000);
}
//WHEN YOU WANT TO CALL THE FUNCTION ABOVE IT SHOULD LOOK LIKE THIS:
//showAchievement("Achievement Unlocked: First Steps!");
//THIS IS THE END OF THE ACHIEVMENT CODE

//CALL THIS FUNCTION WHEN REBIRTH IS UNLOCKED:
function unlockRebirth() {
    document.getElementById("rebirth").style.display = "inline-block";
}
