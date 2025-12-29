# 🐔 El Pollo Loco - Jump & Run Game

[![Play Now](https://img.shields.io/badge/Play-Now-brightgreen)](https://martin-frei.github.io/ElPolloLoco) | [![GitHub](https://img.shields.io/badge/View-Code-blue)](https://github.com/Martin-Frei/ElPolloLoco)

**JavaScript** • **HTML5 Canvas** • **CSS** • **OOP** • **Supabase** • **ES6 Modules**

A professional 2D platformer game built with vanilla JavaScript, featuring physics-based gameplay, animated sprites, and live highscore integration.

---

## ✨ Features

### 🎮 **Core Gameplay**
- **Physics-based movement** - Run, jump, throw with realistic physics
- **Combat System** - Bottle throwing & jump attacks on enemies
- **Enemy AI** - Normal/small chickens + intelligent endboss
- **Collectibles** - Strategic coin & bottle placement

### 🎨 **Visual & Audio**
- **Parallax Scrolling** - 4-layer background with clouds
- **Sprite Animations** - 50+ animations across characters & enemies
- **Audio System** - 10+ sound effects, 4 music tracks with dual volume control
- **Status Bars** - Health, bottles, coins, boss health with real-time updates

### 📊 **Game Systems**
- **Progressive Difficulty** - Level 1 (easy) → Level 2 (hardcore 2x speed)
- **Complex Scoring** - Multiplier system with time bonuses
- **Live Highscores** - Supabase integration with global leaderboard
- **Settings Persistence** - LocalStorage for audio & preferences
- **Multi-Screen UI** - Start, game, win, lose, scores, controls, settings

### 🏗️ **Architecture**
- **Object-Oriented Design** - Clean ES6 class hierarchy
- **Modular JavaScript** - ES6 imports/exports
- **Separation of Concerns** - Each class has single responsibility
- **Optimized Canvas Rendering** - Efficient draw cycles with camera system

---

## 🚀 Quick Start

### **Play Online**
Simply visit: **[https://martin-frei.github.io/ElPolloLoco](https://martin-frei.github.io/ElPolloLoco)**

### **Local Development**
```bash
# 1. Clone repository
git clone https://github.com/Martin-Frei/ElPolloLoco.git

# 2. Open in browser
open index.html

# OR use local server
python -m http.server 8000
# Visit: http://localhost:8000
```

**No build tools required!** Pure frontend JavaScript with ES6 modules.

---

## 🎯 How to Play

| Control | Action |
|---------|--------|
| ← → | Move left/right |
| SPACE | Jump (hold for higher jumps) |
| D | Throw bottle |

### 💡 Pro Tips
- Collect bottles (max 10) for the endboss fight
- Jump on chickens for instant kill (save health!)
- Collect all coins for maximum score multiplier
- Finish under 3 minutes for 1.5x time bonus
- Watch the boss health bar - appears when close

---

## 🏗️ Architecture

### Class Hierarchy
```
MovableObject (Base Class)
├── Character (Player with 5 animation states)
├── Chicken, Endboss (Enemy AI with behaviors)
├── Bottle, Coin, Cloud (Interactive Objects)
├── BackgroundObjects (Parallax layers)
└── Air (Background)
```

### System Design
- **World Class** - Canvas manager & game loop (60 FPS)
- **AudioManager** - Music/SFX with volume control
- **Level System** - Configurable level definitions
- **Collision Detection** - Custom hitbox offsets
- **Camera System** - Smooth following with boundaries
- **Keyboard Handler** - Responsive input system

### Design Patterns Used
- **Inheritance** - DRY code with base classes
- **Modularity** - ES6 module pattern
- **Observer Pattern** - Game state changes
- **Factory Pattern** - Level creation functions

---

## 📁 Project Structure
```
ElPolloLoco/
├── index.html              # Main HTML document
├── style.css              # Complete styling (350+ lines)
├── js/
│   ├── game.js           # Main game controller
│   ├── settings.js       # Settings management
│   ├── supabase-client.js # Highscore integration
│   ├── models/           # 12+ ES6 Classes
│   │   ├── movable-object.class.js  # Base class
│   │   ├── character.class.js       # Player (200+ lines)
│   │   ├── chicken.class.js         # Enemy AI
│   │   ├── endboss.class.js         # Boss with states
│   │   ├── world.class.js           # Canvas manager
│   │   ├── level.class.js           # Level structure
│   │   ├── audio-manager.class.js   # Sound system
│   │   ├── keyboard.class.js        # Input handling
│   │   ├── statusbar.class.js       # UI bars
│   │   ├── thrown-bottle.class.js   # Projectile physics
│   │   ├── bottle.class.js          # Collectible
│   │   ├── coin.class.js           # Collectible
│   │   ├── cloud.class.js          # Background
│   │   └── background-objects.class.js # Parallax
│   └── levels/           # Level configurations
│       ├── level1.js    # Introduction level (22 coins, 13 bottles)
│       └── level2.js    # Hardcore challenge (35 coins, 12 bottles)
├── img/                  # 100+ game assets
│   ├── 2_character_pepe/ # Character animations
│   ├── 3_enemies_chicken/ # Enemy sprites
│   ├── 5_background/     # Parallax layers
│   ├── 7_statusbars/     # UI elements
│   ├── 8_coin/          # Coin animations
│   └── 6_salsa_bottle/  # Bottle sprites
├── audio/               # 20+ sound files
├── impressum.html       # Legal notice (GDPR compliant)
├── datenschutz.html     # Privacy policy
└── README.md            # This file
```

---

## 🔧 Tech Stack

### Frontend
- **Vanilla JavaScript (ES6+)** - No frameworks
- **HTML5 Canvas API** - 2D rendering
- **CSS3** - Modern Flexbox/Grid layout
- **ES6 Modules** - Modular architecture

### Backend
- **Supabase** - PostgreSQL database for highscores
- **REST API** - For score submission/retrieval
- **Row Level Security** - Secure data access

### Development Tools
- **Visual Studio Code** - Primary IDE
- **Git & GitHub** - Version control
- **Browser DevTools** - Debugging & profiling
- **LocalStorage API** - Settings persistence

### Key JavaScript Features Used
- Classes & Inheritance
- Async/Await (Supabase calls)
- Event Listeners
- Canvas Context API
- setInterval/requestAnimationFrame
- Array methods (forEach, filter, map)
- ES6 Modules (import/export)

---

## 🎮 Game Design Details

### Level Progression

**Level 1: Introduction**
- Normal Chickens: Speed 0.3
- Small Chickens: Speed 0.5
- Endboss: Speed 0.5
- Difficulty: ⭐⭐☆☆☆ (Easy-Medium)
- 22 coins, 13 bottles
- Learning curve with balanced challenge

**Level 2: Hardcore Mode**
- Normal Chickens: Speed 0.6 (+100%)
- Small Chickens: Speed 1.0 (+100%)
- Endboss: Speed 0.8 (+60%)
- Difficulty: ⭐⭐⭐⭐⭐ (Hardcore)
- 35 coins, 12 bottles
- Double enemy count & density
- Extreme coin heights (y=40-200)

### Score Calculation
```javascript
// Complex formula includes:
score = (coins × 50) + (health × 3) + (bottles × 20) + timeBonus
score *= (1 + (coin% × health% × timeMultiplier × 0.5))
score += 500 // Level bonus

// Time multiplier:
// < 180s: 1.5x
// ≥ 180s: 1.0x
```

**Score Ranges:**
- 🏆 4,000-4,300: LEGENDARY
- ⭐ 3,000-3,999: EXCELLENT
- 👍 2,200-2,999: VERY GOOD
- 😊 1,700-2,199: GOOD
- 🤔 1,200-1,699: OKAY
- 😅 900-1,199: SURVIVOR

### Enemy Behavior
- **Normal Chickens**: Basic patrolling with collision detection
- **Small Chickens**: 2x faster movement, requires quick reflexes
- **Endboss**: Alert/Attack/Hurt/Dead states with distance-based AI

### Physics System
- **Gravity acceleration**: Realistic jump arcs
- **Jump velocity curves**: Hold for higher jumps
- **Projectile trajectories**: Bottle physics
- **Collision detection**: Custom hitbox offsets per character

---

## 🚀 Deployment

### Hosting
- **GitHub Pages** - Free static hosting
- **No server required** - Pure frontend application
- **Automatic deployment** - Push to main branch

### Supabase Setup
1. Create account at [supabase.com](https://supabase.com)
2. Create new project and database
3. Set up `highscores` table:
```sql
CREATE TABLE highscores (
  id BIGSERIAL PRIMARY KEY,
  player_name TEXT NOT NULL,
  score INTEGER NOT NULL,
  level INTEGER NOT NULL DEFAULT 1,
  coins_collected INTEGER DEFAULT 0,
  time_seconds INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_highscores_score ON highscores(score DESC);

-- Row Level Security
ALTER TABLE highscores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read highscores"
  ON highscores FOR SELECT USING (true);

CREATE POLICY "Anyone can insert highscores"
  ON highscores FOR INSERT WITH CHECK (true);
```

4. Get your **Publishable API Key** from Supabase
5. Add to `js/supabase-client.js`

### Environment
**No environment variables needed!** All client-side configuration.

---

## 🤝 Contributing

This is a learning project created during the Developer Akademie bootcamp. While not open for contributions, feedback and suggestions are always welcome!

**Found a bug?** Open an issue on GitHub!

---

## 📝 License

**Educational Project** - Created for learning purposes as part of the Developer Akademie Fullstack Web Development Bootcamp.

All game assets and design provided by Developer Akademie GmbH for educational use.

---

## 👤 Author

**Martin Freimuth**

📍 Rosenheim, Germany  
📧 mat.frei@gmx.de  
💼 [LinkedIn](https://linkedin.com/in/martin-freimuth)  
🐙 [GitHub](https://github.com/Martin-Frei)  
🌐 [Portfolio](https://martin-frei.github.io)

### Background
- 🎓 **Developer Akademie Graduate** - March 2026
- 💡 **Career Changer** - 20+ years business experience transitioning to web development
- 🎯 **Specializing in** modern JavaScript, fullstack development, and game programming

### Skills Demonstrated
- ✅ Vanilla JavaScript Mastery - No framework dependencies
- ✅ Object-Oriented Programming - Clean architecture
- ✅ Canvas API Proficiency - 2D game development
- ✅ Backend Integration - Supabase/REST APIs
- ✅ UI/UX Design - Multi-screen interface
- ✅ Game Design - Balancing & progression
- ✅ GDPR Compliance - Legal pages & privacy

---

## 🙏 Acknowledgments

- **Developer Akademie GmbH** - For the comprehensive curriculum and assets
- **Supabase** - For the excellent backend-as-a-service platform
- **Open Source Community** - For audio resources and inspiration

---

*"Built with passion during an intensive 6-month bootcamp. Every line of code represents hours of learning, debugging, and growth."*

---

**🎮 [Play the game](https://martin-frei.github.io/ElPolloLoco)**  
**💻 [View the code](https://github.com/Martin-Frei/ElPolloLoco)**