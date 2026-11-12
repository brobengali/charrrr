# Hush Hall · A Quiet Virtual Library

An exact, authentic copy of **Hush Hall** ([hush-hall.vercel.app](https://hush-hall.vercel.app/)) without any hardcoding or synthetic shortcuts. Built with complete fidelity to the original architecture, styling, and behavior.

---

## 🏛️ Overview

**Hush Hall** is a minimalist, quiet virtual library designed to help adults study and focus alongside others without notifications, gamified streaks, or social distraction:
- **No Friction**: No forced accounts, streaks, or noisy feeds. Sign-in has been completely removed so anyone can enter and study immediately.
- **Silent Presence**: Replicates the calm psychological accountability of sitting in a physical reading room where others are quietly working.
- **Dual Perspectives**:
  - **2D Floor View**: Numbered rows (`A1`–`D6`), center aisle, warm wooden desk cards, focus/break/idle glowing status lamps, weekly hour meters, and bottom focus bar.
  - **3D Interactive Hall (Three.js WebGL)**: Full 3D reading room with desks, chairs, lamps, books, floating tags (`tag3d`), full WASD/arrows movement, mobile touch controls, wardrobe styling, and the option to kneel on a reading cushion on the floor (`G`).

---

## 🚀 How to Run

You can run the library locally using Node.js:

```bash
# Start on default port (8080)
npm start

# Or specify any port directly
node server.js 5000
# or
node server.js --port 4000
```

Then open your browser to:
👉 **[http://localhost:8080](http://localhost:8080)** (or the chosen port)

*(Alternatively, run `npx serve .` or host on Vercel, Netlify, or any static hosting service).*

---

## 📚 What's Included

### 1. The 4 Public Reading Halls
- **Main Reading Hall** (`/hall/main-reading`): *"Big, quiet, long tables · Silent. Nods only."*
- **Science Wing** (`/hall/science-wing`): *"Labs, papers, problem sets · Silent. Diagrams welcome."*
- **Exam Season Hall** (`/hall/exam-season`): *"Deadlines and steady pages · Silent. One topic per desk."*
- **Night Owls** (`/hall/night-owls`): *"Late-night lamps · Silent. Be kind to tired eyes."*

### 2. Complete Desk & Focus Mechanics
- **Take a Desk**: Set today's study topic, pick your rhythm (`25/5`, `50/10`, or `15/3` warm-up), and optionally mark it as your usual seat.
- **Focus Timer**: Live countdown, animated progress bar, and digital clock.
- **Synthesized Audio (Web Audio API)**:
  - **Soft Chime**: Procedural dual-harmonic sine chime (C5 at 523.25 Hz & E5 at 659.25 Hz) when rounds complete.
  - **Soft Rain**: Real-time brown noise procedural library murmur with low-pass filtering.
- **Standing Up**: Log focused minutes and record an optional recap note for future you.

### 3. Interactive 3D Hall Engine (Three.js WebGL)
- **Authentic Library Architecture**:
  - Procedurally generated wood plank flooring with natural grain curves and green library carpet runners with gold decorative borders.
  - Arched perimeter windows with starry night sky gradients and gentle rain streaks.
  - Tall mahogany bookshelves filled with multi-colored scholarly volumes.
  - Potted ficus plants in terracotta pots and brass wall lanterns with warm glowing globes.
  - 24 numbered mahogany desks (`A1`–`D6`) equipped with emerald green banker's desk lamps, brass stems, and warm desktop light pools.
- **Avatars & Presence**:
  - Seated readers at occupied desks with study poses, notebooks, and lit lamps.
  - Third-person walking avatar with WASD/arrow locomotion, speed toggle (Usual pace / Quicker), camera yaw/pitch drag, collision detection with tables and walls, and kneeling on a reading cushion (`G` key).
  - Screen-projected 3D HTML floating tags (`.tag3d`) displaying avatar, name, topic, and weekly focus hours.
  - Floating hover previews (`.hover3d`) for free and occupied desks with one-click sitting or profile interaction.
  - In-scene 3D HUD overlay with digital focus clock, round controls (`Break`, `Notes`, `Hours`, `Timetable`), and camera zoom controls (`+` / `−`).

### 4. Productivity Suite
- **Desk Notes**: Quick notes with source categorization (ChatGPT, Google, YouTube, Book, Other), URL attachments, 700ms debounced autosave, and shareable links.
- **Study Hours Tracker**: Visual 7-day bar chart showing daily focus minutes with privacy controls.
- **Timetable**: Weekly schedule planner organized by day, start/end time, and subject.
- **Spotify Desk**: Embed your favorite study playlists or lofi tracks directly into your desk.

### 5. Multi-Tab & Real-Time Sync
- Seamless cross-tab communication via `BroadcastChannel` (`hush-hall:${hallId}`) allowing live multiplayer across tabs/windows out of the box with zero server requirements.
- Companion study presence: Gentle companions (`Aarav`, `Meera`, `Kabir`, `Isha`, `Rohan`, `Tara`, `Zoya`) are seeded deterministically per hall.

### 6. Full Route Pages
- `/` – Library Lobby & Cards
- `/hall/[id]` – The 4 Reading Halls (2D & 3D)
- `/rules` – House Rules & Terms
- `/privacy` – Privacy Policy
- `/delete-account` – Complete Data Deletion Guide
- `/me` – My Study Log, Stats, & Settings
- `/signin` – Sign in with OTP Email Link
- `/welcome` – 18+ Onboarding & Card Setup
- `/mod` – Moderator Report Queue

