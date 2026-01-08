// Persistent Main Cursor
const cursorContainer = document.getElementById('cursor-container');
const mainCursor = document.createElement('div');
mainCursor.classList.add('main-cursor');
cursorContainer.appendChild(mainCursor);

document.addEventListener('mousemove', function (e) {
    // Update main cursor position
    mainCursor.style.left = e.clientX + 'px';
    mainCursor.style.top = e.clientY + 'px';

    // Create trail
    const trail = document.createElement('div');
    trail.classList.add('cursor-trail');
    trail.style.left = e.clientX + 'px';
    trail.style.top = e.clientY + 'px';
    cursorContainer.appendChild(trail);

    // Remove trail element after animation
    setTimeout(() => {
        trail.remove();
    }, 500);
});

// Hide/Show cursor when leaving/entering the window
document.addEventListener('mouseleave', () => {
    mainCursor.style.display = 'none';
});

document.addEventListener('mouseenter', () => {
    mainCursor.style.display = 'block';
});

// Audio Logic
const bgMusic = new Audio('assets/sfx/bg_music.mp3');
bgMusic.loop = true;
bgMusic.volume = 0.6;

const clickSFX = new Audio('assets/sfx/click_sfx.mp3');
clickSFX.volume = 0.3;

let musicStarted = false;

function startMusic() {
    if (!musicStarted) {
        bgMusic.play().catch(e => console.log("Audio play blocked until interaction"));
        musicStarted = true;
    }
}

function playClickSFX() {
    // Reset and play to allow rapid clicks
    clickSFX.currentTime = 0;
    clickSFX.play().catch(e => console.log("Audio play blocked"));
}

// Play music on first interaction
document.addEventListener('click', startMusic, { once: true });

// Play click SFX on interactive elements
document.addEventListener('click', function (e) {
    const target = e.target;
    // Check if clicked element is a link, button, or has a pointer cursor
    if (target.tagName === 'A' || target.tagName === 'BUTTON' || window.getComputedStyle(target).cursor === 'pointer') {
        playClickSFX();
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Dynamic Background Logic
const agentImages = [
    'assets/images/chamber.png',
    'assets/images/jett.png',
    'assets/images/neon.png',
    'assets/images/reyna.png',
    'assets/images/tejo.png',
    'assets/images/sage.png',
    'assets/images/clove.webp'
];

const bgContainer = document.getElementById('background-container');

function changeBackground() {
    // Randomly select an image
    const randomIndex = Math.floor(Math.random() * agentImages.length);
    const selectedImage = agentImages[randomIndex];

    // Create new image element
    const img = document.createElement('img');
    img.src = selectedImage;
    img.classList.add('bg-agent');

    // Handle image load error (hide if not found)
    img.onerror = function () {
        this.style.display = 'none';
    };

    bgContainer.appendChild(img);

    // Fade in
    setTimeout(() => {
        img.classList.add('active');
    }, 100);

    // Remove old images
    const oldImages = bgContainer.querySelectorAll('.bg-agent:not(:last-child)');
    oldImages.forEach(oldImg => {
        oldImg.classList.remove('active');
        setTimeout(() => {
            oldImg.remove();
        }, 2000); // Wait for fade out transition
    });
}

// Initial call
changeBackground();

// Change every 6 seconds
setInterval(changeBackground, 6000);
