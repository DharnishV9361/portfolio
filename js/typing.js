/* ==========================================================================
   TYPING.JS - Typewriter Text Effect for Hero Headlines
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const textElement = document.getElementById('typing-text');
    if (!textElement) return;

    // --- Typing Words Setup ---
    const words = [
        'AI Engineer',
        'Machine Learning Engineer',
        'Computer Vision Developer',
        'Backend AI Developer'
    ];
    
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    // --- Typewriter Function ---
    const typeEffect = () => {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            // Remove character
            textElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Deleting is faster
        } else {
            // Add character
            textElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // Normal typing speed
        }

        // --- State Checks ---
        if (!isDeleting && charIndex === currentWord.length) {
            // Word fully typed, pause before deleting
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Word fully deleted, move to next word
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 400; // Pause before typing next word
        }

        setTimeout(typeEffect, typingSpeed);
    };

    // Start effect
    setTimeout(typeEffect, 1500);
});
