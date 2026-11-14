# Connect Cafe · 3D Virtual Library Cafe & Co-Working Lounge

**Connect Cafe** is an interactive, low-poly 3D virtual study cafe and co-working lounge built with **Three.js** and **Vite** (vanilla JavaScript). It blends the ambiance of a quiet, upscale study cafe with a scholarly library to help you focus, read, and listen alongside peers in deep work.

---

## ☕ Core Highlights

- **56 Cafe Tables with Both-Side Seating (112 Chairs)**: Face-to-face seating layout across East and West wings, accommodating over 100 patrons.
- **Formal Office Goer Dress Code**: Seated 3D avatars dressed in tailored executive wool suits, dress shirts, silk neckties, trousers, and glasses across finance, tech, quant, and legal disciplines.
- **88° Laptop Open Angle**: Detailed laptops with ultra-thin aluminum unibody bases, recessed keyboards, glass trackpads, and screens opened to an exact 88-degree viewing angle.
- **22 Locked Glass Bookcases with Big Clear Genre Names**:
  - Cabinets enclosed with translucent glass panes, brass lock escutcheons, and teardrop pulls.
  - Clear, prominent gold-bordered genre titles emblazoned directly on the glass.
  - Interactive book list with **Amazon Kindle affiliate links** (`connectcafe-20`) so patrons can purchase and study real-life editions at home.
- **6 Dedicated 3D Headphone Racks for Audiobooks**:
  - Full-height multi-tier listening fixtures flanking the South Promenade.
  - Multi-tier polished brass hanging rods carrying 12 pairs of over-ear studio headphones (padded leather headbands, brass gimbals, ear cushions, and coiled cables).
  - Lower analog Hi-Fi amplifier console with dual illuminated amber VU meters and rotary dials.
  - Overhead etched glass signs for all 6 curated genres:
    1. 💼 *Business & High Performance*
    2. 🤖 *AI, Tech & The Future*
    3. 📈 *Economics, Markets & Finance*
    4. 🏛️ *Philosophy & Mental Models*
    5. ⚛️ *Science, Cosmos & Biology*
    6. 🎙️ *Biographies & Masterminds*
  - Dual **runnable Audible and Amazon audiobook links** with a 30-day Audible free trial partner banner.
- **First-Person Walkaround Mode with Aim & Click Shelf Inspection**:
  - Seamless WASD / Arrow movement and sprint (`Shift`).
  - Dynamic crosshair targeting: looking at any bookcase, headphone rack, or desk transforms the reticle into an illuminated gold ring.
  - **Click or Press `E` / `F` / `Enter`** to open and inspect any shelf while walking around without losing your walk position!
- **Grand Espresso Bar**:
  - Commercial dual-group espresso machine with steam wands, grinder, stacked ceramic cups, pastry case with fresh croissants, and a chalkboard menu.
  - Illuminated brass 3D plaque emblazoned with **`☕ CONNECT CAFE ☕`**.
- **Focus Mechanics**:
  - Pomodoro focus timer with 25/5 intervals and chime notifications.
  - Procedural rain soundscape synthesized via Web Audio API.
  - Executive wardrobe customizer (suits, ties, hair colors).
  - Daily/weekly study hours tracker and executive desk notes with autosave.
  - 2D Floor Plan view toggle for quick navigation.

---

## 🚀 How to Run

### 1. Development Server (Vite HMR)

```bash
npm install
npm run dev
```

Open your browser to:
👉 **[http://localhost:5173](http://localhost:5173)**

### 2. Production Build

```bash
npm run build
npm run preview
```

### 3. Standalone Node.js Server

```bash
node server.js 8080
```

---

## 🎮 Controls & Shortcuts

| Action | Control |
| :--- | :--- |
| **Orbit Overview (Default)** | Left-click + drag to rotate camera, Right-click to pan, Scroll to zoom |
| **Walk Around Mode** | Click **"Walk around"** pill in top-left |
| **Locomotion** | `W`, `A`, `S`, `D` or Arrow Keys |
| **Sprint** | Hold `Shift` while moving |
| **Inspect Shelf / Headphone Rack** | Aim crosshair at any bookcase or rack, then **Left-Click** or press **`E`** |
| **Take a Seat** | Aim at any chair and **Left-Click** or press **`E`** |
| **Exit Walk Mode** | Press `Esc` or click **"Exit walk"** |
| **Toggle Rain Soundscape** | Click **"🌧 Rain: Off/On"** in the top header |
| **2D Floor Plan** | Click **"Simple 2D View"** in the top header |
| **Executive Wardrobe** | Click **"Wardrobe"** pill to customize suit, tie, and hair |

---

## 📂 Architecture

```
connect-cafe/
├── index.html              # Main application shell & modal dialogs
├── package.json            # Scripts and dependencies (Three.js, Vite)
├── vite.config.js          # Vite build configuration
├── src/
│   ├── main.js             # App entry point & animation loop
│   ├── scene.js            # Three.js scene, camera & ACESFilmic tone-mapped renderer
│   ├── lighting.js         # Moody cafe lighting, pointlights & sconces
│   ├── library.js          # Room architecture, espresso bar & central audio lounge
│   ├── furniture.js        # 56 tables, 112 chairs, 88° laptops & formal avatars
│   ├── books.js            # 22 locked glass bookcases & 6 3D headphone racks
│   ├── audiobooks.js       # Curated audiobook library & runnable Audible/Amazon links
│   ├── rain.js             # Arched windows with animated rain sliding droplets
│   ├── controls.js         # OrbitControls & PointerLockControls walk mode
│   ├── ui.js               # Modal dialogues, raycasting, and HUD interaction
│   ├── audio.js            # Synthesized rain soundscape & focus chime
│   ├── timer.js            # Study session state & local storage management
│   └── style.css           # Responsive cafe theme & interactive crosshair styles
```

---

## 📜 License

MIT License © Connect Cafe contributors.


