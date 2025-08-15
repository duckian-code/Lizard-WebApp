var countInc = 1;

var count = 0;

function onLizardClick(){
	count += countInc;
	const countDisplay = document.getElementById('count');
	countDisplay.innerHTML = count;
}

document.addEventListener('DOMContentLoaded', function () {
	const lizardbutton = document.getElementById('lizard-button');

	lizardbutton.addEventListener('click', onLizardClick);
	
});