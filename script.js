// Hamburger toggle
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
});

// Scroll animation (Intersection Observer)
const sections = document.querySelectorAll("section");
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
        }
    });
}, {
    threshold: 0.2
});
sections.forEach(section => observer.observe(section));

// View All Button for Student Cards (Toggle Show/Hide)
const viewBtn = document.getElementById("view-all-btn");
const hiddenCards = document.querySelectorAll(".student-card.hidden");

if (viewBtn) {
    viewBtn.addEventListener("click", () => {
        // Check if the button currently says "View All"
        if (viewBtn.textContent === "View All") {
            // --- VIEW ALL LOGIC ---
            hiddenCards.forEach(card => card.style.display = "grid"); 
            viewBtn.textContent = "Hide All";
        } else {
            // --- HIDE ALL LOGIC ---
            hiddenCards.forEach(card => card.style.display = "none");
            viewBtn.textContent = "View All";
        }
    });
}


// --- VIDEO CAROUSEL LOGIC ---

// Declare these globally for use in both carousel and mute/autoplay sections
// ... (Hamburger, Scroll, and View All logic remain unchanged above) ...


// --- VIDEO CAROUSEL LOGIC ---

const slider = document.querySelector('.review-slider');
const allVideos = document.querySelectorAll('.reel-video');
const prevBtn = document.getElementById('prev-review-btn');
const nextBtn = document.getElementById('next-review-btn');
const totalVideos = allVideos.length;
let currentIndex = 0; // Tracks the currently visible video index

// ------------------------------------
// Core function to update the carousel position and video state
// ------------------------------------
function updateCarousel() {
    if (!slider || totalVideos === 0) return;

    // 1. Calculate Shift: Get the current visible width of the slider container
    const videoWidth = slider.clientWidth; 
    const offset = -currentIndex * videoWidth; 
    
    // Apply the shift, ensuring we round the value for pixel-perfect alignment
    // This still uses translateX to move the container, which is the most efficient way.
    slider.style.transform = `translateX(${Math.round(offset)}px)`;

    // 2. Control Buttons: Disable/Enable buttons based on current index
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === totalVideos - 1;

    // 3. Control Video Playback: Pause all, then play the active one
    // This section uses the "ID" (index) to explicitly control playback
    allVideos.forEach((video, index) => {
        const videoId = `video-${index}`; // Construct the unique ID
        
        if (index === currentIndex) {
            // Video is active
            video.muted = true; 
            video.play().catch(err => console.log(`Autoplay blocked for ${videoId}:`, err));
            // You can optionally add a class here if needed, e.g., video.classList.add('active-video');
        } else {
            // Video is inactive
            video.pause();
            // You can optionally remove a class here, e.g., video.classList.remove('active-video');
        }
    });
}

// ------------------------------------
// Event Listeners for Navigation
// ------------------------------------
if (slider && totalVideos > 0 && prevBtn && nextBtn) {
    // Next Button Click
    nextBtn.addEventListener('click', () => {
        if (currentIndex < totalVideos - 1) {
            currentIndex++;
            updateCarousel();
        }
    });

    // Previous Button Click
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    // Initialize carousel on load and resize
    window.addEventListener('load', updateCarousel);
    window.addEventListener('resize', updateCarousel);
}


// ------------------------------------
// Video Mute/Unmute Toggle (Clicking the video)
// ------------------------------------
allVideos.forEach(video => {
    // Add click listener to toggle mute/unmute
    video.addEventListener("click", () => {
        video.muted = !video.muted;
    });
});