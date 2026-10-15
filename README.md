# Dharnish V - AI & ML Engineer Premium Portfolio

A world-class, handcrafted premium portfolio website designed specifically for an AI and Machine Learning Engineer. It features a modern, responsive, and glassmorphic dark-and-cyan theme.

Built using **HTML5, CSS3, and Vanilla JavaScript** — without any external frameworks (Bootstrap, Tailwind, React, etc.).

---

## 🎨 Theme Details
- **Primary Color**: `#00E5FF` (Cyan)
- **Secondary Cyan**: `#00BCD4`
- **Accent**: `#80FFFF`
- **Background**: `#050B13`
- **Cards**: `#101A27`
- **Text**: `#FFFFFF`
- **Subtext**: `#A8B2C1`

---

## 🛠️ Key Features
- **Fixed Left Sidebar Layout**: Stay-fixed sidebar navigation (occupies ~20% width) with vertical layout, profile image, name, role, and active section spy highlighters.
- **Responsive Navigation Drawer**: Fades into a mobile menu toggle drawer on screens under `1024px`.
- **Custom Cursor Glow Effect**: Radial glow gradient that tracks the mouse position smoothly.
- **HTML5 Canvas Particle Matrix**: Slow-drifting network nodes in the Hero section background that respond to mouse proximity.
- **Dynamic Academic Chart**: Built on Chart.js, visualizing academic SGPA progress with interactive Line/Bar toggles and gradient designs.
- **Skills Animation**: Interactive, responsive skill cards containing progress indicators that animate dynamically when scrolled into view.
- **Projects Showcase**: Premium project cards with technology badges and custom responsive inline SVG graphics.
- **Full SEO & Accessibility Setup**: Descriptive titles, semantic tag structuring, responsive viewport parameters, and clean structured layout hierarchy.

---

## 📂 Folder Structure
```
dharnish-portfolio/
│
├── index.html            # Main site layout and content
│
├── css/
│     ├── global.css      # Variables, resets, scroll progress, loader, and cursor glow
│     ├── components.css  # Buttons, glass cards, badges, timelines, form inputs
│     ├── sections.css    # Sidebar, hero, about, academic, skills, projects layout
│     ├── animations.css  # Keyframes, fade-ins, reveals, and delays
│     └── responsive.css  # Tablet & Mobile drawer toggles and grid stacks
│
├── js/
│     ├── script.js       # Core loader, active nav spy, and skill trigger scroll animations
│     ├── charts.js       # Chart.js line and bar configuration and toggles
│     ├── particles.js    # Canvas particle engine and mouse physics
│     └── typing.js       # Typewriter headline cycle script
│
└── assets/
      ├── images/
      │      └── profile.jpg     # Professional profile image
      └── resume/
             └── Dharnish_V.pdf  # Downloadable PDF resume
```

---

## 🚀 How to Run Locally
1. Simply double-click the `index.html` file to open it in any web browser.
2. Alternatively, run a local development server for testing:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using NodeJS
   npx http-server
   ```
3. Open `http://localhost:8000` (or the server's designated port) in your browser.
