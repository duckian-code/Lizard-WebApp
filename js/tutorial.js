const overlay = document.getElementById('tutorial-popup');
const openBtn = document.getElementById('open-tutorial');
const closeBtn = document.getElementById('close-tutorial');

openBtn.addEventListener('click', () => {
    overlay.style.display = 'flex';
});

closeBtn.addEventListener('click', () => {
    overlay.style.display = 'none';
});

// function borrowed from online, will close tutorial on click outside of it
overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
        overlay.style.display = 'none';
    }
});