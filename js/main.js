document.addEventListener('DOMContentLoaded', function () {
	const lizardbutton = document.getElementById('lizard-button');
	const countDisplay = document.getElementById('count')
	let count = 0;

	lizardbutton.addEventListener('click', function () {
		count += 1;
		countDisplay.innerHTML = count;
	});
});