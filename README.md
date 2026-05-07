# PAPOI — Intelligent Waste Management Platform

> **Plataforma de Análisis y Predicción para la Optimización Inteligente de Residuos Sólidos en Bogotá**

A functional mobile app mockup for intelligent solid waste management in Bogotá, Colombia. Built as an academic project for systems engineering at Universidad Piloto de Colombia.

---

## Features

### Recycler Role
- Route progress tracking with pending stops
- Interactive map with color-coded waste containers (recyclable vs. non-recyclable)
- Critical route points highlighted in red
- Collection history with real COP prices per material (cardboard, plastic, metal, glass)
- CO₂ avoided calculation per session
- Earnings summary with daily subtotals

### Transporter Role
- Fleet dashboard with active/pending/completed routes
- Route selector dropdown with per-route map rendering
- Interactive container map — tap any point for details
- Fleet status panel with load capacity, fuel level and estimated ETA to next stop
- Daily history with estimated COP value and CO₂ avoided per route

### General
- Role-based login (Recycler / Transporter)
- Mobile-first responsive design (full screen on mobile, iPhone shell on desktop)
- Animated bottom navigation with custom icon set
- Real-time clock in status bar
- Custom PAPOI logo — leaf formed by connected network nodes

---

## Project Structure

```
papoi_project/
├── index.html          # Entry point — links all files
├── app.jsx             # All React components and app logic
├── styles.css          # App styles, layout and phone shell
├── leaflet.css         # Leaflet map styles
├── assets/             # Custom icons and logo (PNG/SVG)
│   ├── logo.svg
│   ├── casa.png
│   ├── mapas-y-banderas.png
│   ├── Reciclaje.svg
│   ├── usuario.png
│   ├── autobus.png
│   ├── CamionReciclaje.svg
│   ├── carreteras.png
│   ├── equilibrio.png
│   ├── hucha.png
│   ├── reciclar.png
│   └── compartimiento.png
└── libs/               # Local libraries (not bundled via npm)
    ├── react.js
    ├── react-dom.js
    ├── leaflet.js
    └── babel.min.js
```

---

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| React (local) | UI components and state management |
| Leaflet.js | Interactive maps |
| Babel (local) | JSX transpilation in browser |
| OSRM | Road-following route calculation |
| CartoDB Tiles | Map tile provider |
| HTML / CSS / JS | Base structure and styling |

> No npm, no Node.js, no build step required. All libraries are loaded locally.

---

## How to Run

1. Clone the repository
   ```bash
   git clone https://github.com/YOUR_USERNAME/papoi-mockup.git
   ```

2. Open the project folder in VS Code

3. Install the **Live Server** extension by Ritwick Dey

4. Right-click `index.html` → **Open with Live Server**

5. The app opens in your browser at `http://localhost:5500`

> The map requires an internet connection to load CartoDB tiles. Everything else works offline.

### Demo Credentials

| Role | Username | Password |
|------|----------|----------|
| Recycler | `reciclador` | `1234` |
| Transporter | `transportista` | `1234` |

---

## Development Notes

The initial codebase was generated using **Claude** (Anthropic) as a design and development assistant. From that starting point, I iteratively modified, extended and refined the code — adjusting logic, UI components, data structures, map behavior, icon system, color scheme and overall user experience — to reach the final result. All modifications, decisions and design choices were made and validated by me throughout the process.

---