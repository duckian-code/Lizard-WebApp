let timer;

const gameState = {
	countInc: 1,
	count: 0,
	addPointCost: 10,
	multPointCost: 100,
	autoLizardCost: 1000,
	// starting 500 ms ahead so the first auto is exactly 5
 // in ms, starts at 5
	interval: 5500
}
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
		if (gameState.count >= gameState.addPointCost) {
			gameState.countInc += 1;
			gameState.count -= gameState.addPointCost;
			countDisplay.innerHTML = gameState.count;
			gameState.addPointCost *= 2;
			// querySelector selects p element within button
			document.querySelector("#add-point-upgrade p").textContent = gameState.addPointCost;
			addLvl++;
			addLvlTxt.textContent = addLvl.toString();
		}
	});

	multiPointUpgBtn.addEventListener('click', function() {
		if (gameState.count >= gameState.multPointCost) {
			gameState.countInc *= 2;
			gameState.count -= gameState.multPointCost;
			countDisplay.innerHTML = gameState.count;
			gameState.multPointCost *= 2;
			document.querySelector("#mult-point-upgrade p").textContent = gameState.multPointCost;
			multLvl++;
			multLvlTxt.textContent = multLvl.toString();
		}
	});

	autoLizardBtn.addEventListener('click', function() {
		if (gameState.count >= gameState.autoLizardCost) {
			let maxSpeed = 200;
			gameState.interval = Math.max(maxSpeed, gameState.interval - 500);
			if (gameState.interval == maxSpeed) {
				autoLvlTxt.textContent = "MAX LEVEL";
				autoLvlTxt.classList.add("rainbow");
				document.querySelector("#auto-lizard p").textContent = "-------";
				return;
			}
			gameState.count -= gameState.autoLizardCost;
			gameState.autoLizardCost *= 2;
			countDisplay.innerHTML = gameState.count;
			// ensures the lowest the button can go is 200 ms
			startIncrement();
			document.querySelector("#auto-lizard p").textContent = gameState.autoLizardCost;
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
	}, gameState.interval);
}

function clickButton() {
	gameState.count += gameState.countInc;
	countDisplay.innerHTML = gameState.count;
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
