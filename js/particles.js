/* ==========================================================================
   PARTICLES.JS - Interactive HTML5 Canvas Floating Particle Matrix
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // --- Particle Settings ---
    let particlesArray = [];
    const colors = ['#00E5FF', '#00BCD4', '#80FFFF'];
    const maxParticles = 65; // Density of particles
    
    // Mouse coords
    let mouse = {
        x: null,
        y: null,
        radius: 120 // Interaction distance
    };

    // Listen to mouse movement over the window
    window.addEventListener('mousemove', (event) => {
        // Adjust coordinate mapping for relative offset in canvas container
        const rect = canvas.getBoundingClientRect();
        mouse.x = event.clientX - rect.left;
        mouse.y = event.clientY - rect.top;
    });

    window.addEventListener('mouseout', () => {
        mouse.x = null;
        mouse.y = null;
    });

    // --- Resize Canvas ---
    const resizeCanvas = () => {
        const parent = canvas.parentElement;
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
        initParticles();
    };

    // --- Particle Class ---
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1; // Size 1-3px
            this.speedX = (Math.random() - 0.5) * 0.45; // Slow movement
            this.speedY = (Math.random() - 0.5) * 0.45;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.baseX = this.x;
            this.baseY = this.y;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 4;
            ctx.shadowColor = this.color;
            ctx.fill();
            ctx.shadowBlur = 0; // Reset shadow for line drawings
        }

        update() {
            // Collision detection with bounds
            if (this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX;
            if (this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY;

            // Move particle
            this.x += this.speedX;
            this.y += this.speedY;

            // Interaction with mouse cursor
            if (mouse.x !== null && mouse.y !== null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.hypot(dx, dy);
                
                if (distance < mouse.radius) {
                    // Push away from mouse
                    const force = (mouse.radius - distance) / mouse.radius;
                    const directionX = dx / distance;
                    const directionY = dy / distance;
                    this.x -= directionX * force * 3;
                    this.y -= directionY * force * 3;
                }
            }
        }
    }

    // --- Create Particle Array ---
    const initParticles = () => {
        particlesArray = [];
        for (let i = 0; i < maxParticles; i++) {
            particlesArray.push(new Particle());
        }
    };

    // --- Connect Particles with Lines ---
    const connectParticles = () => {
        let opacityValue = 1;
        const maxDist = 120; // Connecting distance

        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a + 1; b < particlesArray.length; b++) {
                let dx = particlesArray[a].x - particlesArray[b].x;
                let dy = particlesArray[a].y - particlesArray[b].y;
                let dist = Math.hypot(dx, dy);

                if (dist < maxDist) {
                    opacityValue = 1 - (dist / maxDist);
                    ctx.strokeStyle = `rgba(0, 229, 255, ${opacityValue * 0.12})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    };

    // --- Animation Loop ---
    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        
        connectParticles();
        requestAnimationFrame(animate);
    };

    // Listeners for resizing
    window.addEventListener('resize', resizeCanvas);
    
    // Initial run
    resizeCanvas();
    animate();
});
