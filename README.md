# 🌍❤️ Long Distance Relationship (LDR) Anniversary Surprise

A deeply emotional, creative, and interactive web experience designed specifically for long-distance couples where distance feels like nothing and love takes center stage.

---

## ✨ Features

1. **The Runaway "NO" Button (Playful Intro):**
   - Teleports away when hovered or touched on mobile.
   - Pleading messages ("Don't break my heart across the miles! 😭", "I'll order your favorite food! 🍕🧋").
   - Cute crying GIF reaction.
   - "YES" button grows irresistibly big.

2. **The Big Reveal (When YES is Clicked):**
   - **✈️ LDR Flight Path Banner:** Animated airplane flying between your two locations across the miles under the same moon.
   - **⏱️ Live Togetherness Counter:** Real-time ticker counting Days, Hours, Minutes, and Seconds together.
   - **🫂 Virtual Hug Simulator (Touch & Feel):** Press and hold the glowing thumb pad for 3 seconds. Pulses with heartbeat sound effects, mobile haptic vibrations, and delivers an emotional hug confirmation!
   - **🍾 Message in a Bottle (Ocean Waves):** A stylized glass bottle floating on sea waves. Tapping it plays a cork pop sound and unrolls an antique parchment love letter carried across the oceans!
   - **📼 Retro Cassette / Voice Note Player:** 90s vintage cassette player with spinning spools and equalizer bars. Put on earphones and press play to listen to your voice note message!
   - **🏮 Floating Sky Lanterns (Tangled Style):** Golden lanterns drifting into the night sky. Tap any lantern to illuminate a wish/dream for our future reunion!
   - **🎫 Secret Gold Scratch Card:** Rub with finger/mouse to scratch off the metallic gold foil and reveal your sacred reunion promise!
   - **🫙 The Glowing Love Jar:** Tap to pull out 15+ randomized, deeply touching reasons why you love her across the distance.
   - **💌 Handwritten Love Letter Card:** Elegant wax seal letter expressing gratitude for her trust, patience, and love.

---

## 🚀 How to Run & Preview

### Local Preview
Open your browser and navigate to:
👉 **[http://localhost:3000](http://localhost:3000)** (or double-click `index.html`).

---

## 🛠️ How to Customize for Her

### 1. Names, Locations & Dates
Open [script.js](file:///c:/Users/liyan/Documents/antigravity/calm-hubble/script.js) and look at the `CONFIG` section:
```javascript
const CONFIG = {
  partnerName: "Her Name",
  senderName: "Your Name ❤️",

  // Locations for the flight banner (e.g. "Colombo 📍" and "London 📍")
  myLocation: "Your City 📍",
  herLocation: "Her City 📍",

  // Relationship Start Date (YYYY-MM-DDTHH:MM:SS)
  relationshipStartDate: "2023-11-15T00:00:00",
  ...
};
```

### 2. Put Your Real Voice Note
- Record a short voice message on your phone (e.g. 30 seconds saying Happy Anniversary).
- Save it inside this project folder as `voicenote.mp3`.
- In [index.html](file:///c:/Users/liyan/Documents/antigravity/calm-hubble/index.html) around line 33:
  ```html
  <audio id="voiceNoteAudio" preload="auto">
    <source src="voicenote.mp3" type="audio/mp3">
  </audio>
  ```

---

## 🌐 How to Send It to Her Phone (Free)

1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag and drop this folder (`calm-hubble`) into the box.
3. You get a live link (e.g., `https://our-ldr-anniversary.netlify.app`)!
4. Send it to her on WhatsApp or generate a QR code! 🎁
