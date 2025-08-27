let timer;
const DEFAULT_GAMESTATE = {
	countInc: 1,
	count: 0,
	addPointCost: 10,
	multPointCost: 100,
	autoLizardCost: 1000,
	// starting 500 ms ahead so the first auto is exactly 5
 // in ms, starts at 5
	interval: 5500,
	addLvl: 1,
	multLvl: 1,
	autoLvl: 1,
	cps: 0
}
let gameState = structuredClone(DEFAULT_GAMESTATE);
const saveButton = document.getElementById('save-game');
const loadButton = document.getElementById('load-game');
const newGameButton = document.getElementById('new-game');
//const restartButton = document.getElementById('restart');
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
const cpsTxt = document.getElementById("cps");

function startIncrement() {
	console.log(gameState.interval);
	if (timer) {
		clearInterval(timer);
	}
	timer = setInterval(() => {
		clickButton();
	}, gameState.interval);
}

function clickButton() {
	gameState.count += gameState.countInc;
	countDisplay.textContent = gameState.count;
}

function updateCPS() {
	gameState.cps = 1000 / gameState.interval;
	// console.log("interval: " + interval);
	// console.log("CPS: " + cps);
	cpsTxt.textContent = truncateNumber(gameState.cps);
}

document.addEventListener('DOMContentLoaded', function () {
	loadGame();
	lizardbutton.addEventListener('click', function () {
		clickButton();
	});
	saveButton.addEventListener('click', saveGame);
	loadButton.addEventListener('click', loadGame);
	newGameButton.addEventListener('click', newGame);
	addPointUpgBtn.addEventListener('click', function() {
		if (gameState.count >= gameState.addPointCost) {
			gameState.countInc += 1;
			gameState.count -= gameState.addPointCost;
			countDisplay.innerHTML = gameState.count;
			gameState.addPointCost *= 2;
			// querySelector selects p element within button
			document.querySelector("#add-point-upgrade p").textContent = gameState.addPointCost;
			gameState.addLvl++;
			addLvlTxt.textContent = gameState.addLvl.toString();
		}
	});

	multiPointUpgBtn.addEventListener('click', function() {
		if (gameState.count >= gameState.multPointCost) {
			gameState.countInc *= 2;
			gameState.count -= gameState.multPointCost;
			countDisplay.innerHTML = gameState.count;
			gameState.multPointCost *= 2;
			document.querySelector("#mult-point-upgrade p").textContent = gameState.multPointCost;
			gameState.multLvl++;
			multLvlTxt.textContent = gameState.multLvl.toString();
		}
	});

	autoLizardBtn.addEventListener('click', function() {
		if (gameState.count >= gameState.autoLizardCost) {
			let maxSpeed = 200;
			gameState.interval = Math.max(maxSpeed, gameState.interval - 500);
			if (gameState.interval == maxSpeed) {
				autoLvlTxt.textContent = "MAX LEVEL";
				startIncrement();
				autoLvlTxt.classList.add("rainbow");
				document.querySelector("#auto-lizard p").textContent = "-------";
				updateCPS();
				autoLizardBtn.disabled = true;
				return;
			}

			gameState.count -= gameState.autoLizardCost;
			gameState.autoLizardCost *= 2;
			countDisplay.innerHTML = gameState.count;
			// ensures the lowest the button can go is 200 ms
			startIncrement();
			document.querySelector("#auto-lizard p").textContent = gameState.autoLizardCost;
			gameState.autoLvl++;
			autoLvlTxt.textContent = gameState.autoLvl.toString();
		}
	})
});

function refreshGameState(){
	countDisplay.innerHTML = gameState.count;
	autoLvlTxt.textContent = gameState.autoLvl.toString();
	multLvlTxt.textContent = gameState.multLvl.toString();
	addLvlTxt.textContent = gameState.addLvl.toString();
	document.querySelector("#auto-lizard p").textContent = gameState.autoLizardCost;
	document.querySelector("#mult-point-upgrade p").textContent = gameState.multPointCost;
	document.querySelector("#add-point-upgrade p").textContent = gameState.addPointCost;
}

function newGame(){
	localStorage.clear();
	gameState = structuredClone(DEFAULT_GAMESTATE);
	refreshGameState();
	console.log("New Game Started!");
}

function saveGame(){
	localStorage.setItem("gameState", JSON.stringify(gameState));
	console.log("Game Is Saved!");
}

function loadGame(){
	const data = localStorage.getItem("gameState");
	if (data){
		gameState = JSON.parse(data);
		refreshGameState();
		console.log("Latest Game Loaded!");
	}

function truncateNumber(num) {
	return Math.trunc(num * 100) / 100;
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
}
