/* ============================================================
   LDR ROMANTIC ANNIVERSARY SURPRISE - JAVASCRIPT
   ============================================================ */

/**
 * 🛠️ CONFIGURATION AREA
 * Customize these values easily to match your story!
 */
const CONFIG = {
  // ✏️ YOUR NAMES — Change these!
  partnerName: "[ Her Name ]",
  senderName: "[ Your Name ] ❤️",

  // 📍 LOCATIONS (not used visually now, kept for reference)
  myLocation: "[ Your City ]",
  herLocation: "[ Her City ]",

  // 📅 DATE YOU FIRST MET / STARTED DATING
  relationshipStartDate: "2025-10-03T00:00:00",

  // 🎵 Song chorus start (seconds) — don't change unless you want a different start point
  songStartTimestamp: 38,

  // 🖼️ REACTION GIFs — swap URLs if you want different GIFs
  gifs: {
    initial: "https://media.giphy.com/media/cLS1cfxvGOPVpf9g3y/giphy.gif",
    crying: "https://media.giphy.com/media/OPU6wzx8JrHna/giphy.gif",
    celebration: "https://media.giphy.com/media/gDfteqLchLcRTtjAD7/giphy.gif"
  },

  // 💬 NO BUTTON POPUP — escalating "Are you sure?" messages (edit freely!)
  // These show one-by-one inside the popup each time she clicks "Still No"
  noMessages: [
    "No 🙈",
    "[ Your funny No message #2 ]",
    "[ Your funny No message #3 ]",
    "[ Your funny No message #4 ]",
    "[ Your funny No message #5 ]",
    "[ Your funny No message #6 ]"
  ],

  // 🏮 SKY LANTERNS — 5 future wishes/dreams (shown when she taps each lantern)
  lanternWishes: {
    1: {
      title: "Lantern 1 Title",
      text: "Write"
    },
    2: {
      title: "Lantern 2 Title",
      text: "Write"
    },
    3: {
      title: "Lantern 3 Title",
      text: "Write"
    },
    4: {
      title: "Lantern 4 Title",
      text: "Write"
    },
    5: {
      title: "Lantern 5 Title",
      text: "Write"
    }
  },

  // 💖 LOVE JAR — reasons you love her (she pulls one at random each tap)
  jarReasons: [
    "[ Reason 1 — e.g. The way you laugh at my bad jokes 😂 ]",
    "[ Reason 2 — e.g. How you say good morning every single day ☀️ ]",
    "[ Reason 3 — write something personal! ]",
    "[ Reason 4 ]",
    "[ Reason 5 ]",
    "[ Reason 6 ]",
    "[ Reason 7 ]",
    "[ Reason 8 ]",
    "[ Reason 9 ]",
    "[ Reason 10 ]"
  ]
};

// State Variables
let noCount = 0;
let yesScale = 1;
let isMusicPlaying = false;
let isVoiceNotePlaying = false;
let timerInterval = null;

// DOM Elements
const gameScreen = document.getElementById("gameScreen");
const celebrationScreen = document.getElementById("celebrationScreen");
const questionGif = document.getElementById("questionGif");
const celebrateGif = document.getElementById("celebrateGif");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const musicToggle = document.getElementById("musicToggle");
const musicLabel = document.getElementById("musicLabel");
const bgMusic = document.getElementById("bgMusic");
const showerBtn = document.getElementById("confettiShowerBtn");
const heartsContainer = document.getElementById("hearts-bg");
const myLocationSpan = document.getElementById("myLocation");
const herLocationSpan = document.getElementById("herLocation");

// Voice Note Elements
const voiceNoteAudio = document.getElementById("voiceNoteAudio");
const cassettePlayer = document.querySelector(".cassette-player");
const cassettePlayBtn = document.getElementById("cassettePlayBtn");
const playIcon = document.getElementById("playIcon");
const playBtnText = document.getElementById("playBtnText");
const audioProgress = document.getElementById("audioProgress");
const currentTimeEl = document.getElementById("currentTime");
const totalTimeEl = document.getElementById("totalTime");

// ==========================================
// 1. INITIAL SETUP
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  if (myLocationSpan) myLocationSpan.textContent = CONFIG.myLocation;
  if (herLocationSpan) herLocationSpan.textContent = CONFIG.herLocation;

  initFloatingHearts();
  setupNoButtonBehavior();
  setupYesButtonBehavior();

  setupVirtualHug();
  setupMessageInABottle();
  setupCassettePlayer();
  setupSkyLanterns();
  setupScratchCard();
  setupLoveJar();
  setupMusic();

  if (showerBtn) {
    showerBtn.addEventListener("click", () => {
      triggerGrandConfetti();
      playChimeSound();
    });
  }
});

// ==========================================
// 2. "NO" BUTTON → "ARE YOU SURE?" POPUP LOOP
// ==========================================

// Escalating messages shown each time she clicks No in the popup
const sureMessages = [
  { msg: "Are you sure? 🥺", sub: "Think carefully Punchaa 💔" },
  { msg: "Really really sure? 😭", sub: "Because I'll be devastated bonikki..." },
  { msg: "Still saying no?? 😤", sub: "Think again Suranganawii 💸" },
  { msg: "I'm running out of begging words 😩", sub: "Just click YES already! 👇" },
  { msg: "Error 404: 'No' not found 🤖", sub: "Please select a valid option ✅" },
  { msg: "You're STILL clicking No? 😂", sub: "Okay at this point I respect it 💀" },
  { msg: "Fine. Last chance. 👀", sub: "Choose wisely, Wasthu 🥹" },
  { msg: "I will cry. Seriously. 😢", sub: "Don't make me cry Patto 🌏💔" },
  { msg: "...Are you sure though? 🥺", sub: "This loop never ends 😈" },
];

let sureCount = 0;

function setupNoButtonBehavior() {
  noBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    openSurePopup();
  });
  noBtn.addEventListener("touchend", (e) => {
    e.preventDefault();
    e.stopPropagation();
    openSurePopup();
  }, { passive: false });
}

function openSurePopup() {
  const overlay = document.getElementById("areYouSureOverlay");
  const msgEl = document.getElementById("sureMessage");
  const subEl = document.getElementById("sureSubMessage");
  const sureYesBtn = document.getElementById("sureYesBtn");
  const sureNoBtn = document.getElementById("sureNoBtn");
  const modal = overlay.querySelector(".sure-modal");

  // Helper: update message text with a little shake animation
  function updateMessage() {
    const step = sureMessages[Math.min(sureCount, sureMessages.length - 1)];
    msgEl.textContent = step.msg;
    subEl.textContent = step.sub;

    // Shake the modal to show the message changed
    modal.animate([
      { transform: "translateX(0)" },
      { transform: "translateX(-10px)" },
      { transform: "translateX(10px)" },
      { transform: "translateX(-8px)" },
      { transform: "translateX(8px)" },
      { transform: "translateX(0)" }
    ], { duration: 380, easing: "ease-out" });
  }

  // Show popup (only animate open on first show)
  if (overlay.style.display !== "flex") {
    overlay.style.display = "flex";
    modal.style.animation = "none";
    modal.offsetHeight;
    modal.style.animation = "";
  }

  updateMessage();

  // YES inside popup → trigger the real YES flow
  sureYesBtn.onclick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    overlay.style.display = "none";
    sureCount = 0;
    yesBtn.click();
  };

  // NO inside popup → stays open! Just update to next message
  sureNoBtn.onclick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    sureCount++;
    updateMessage();
  };
}

// ==========================================
// 3. "YES" BUTTON CLICKED - THE REVEAL
// ==========================================
function setupYesButtonBehavior() {
  yesBtn.addEventListener("click", () => {
    playCelebrationJingle();
    triggerGrandConfetti();
    playMusic();

    gameScreen.classList.remove("active");
    gameScreen.style.display = "none";
    noBtn.style.display = "none";

    celebrationScreen.style.display = "flex";
    setTimeout(() => {
      celebrationScreen.classList.add("active");
      window.scrollTo({ top: 0, behavior: "smooth" });
      initScratchCanvas();
    }, 50);

    startRelationshipTimer();
  });
}

// ==========================================
// 3B. RUNAWAY "HAPPY ANNIVERSARY" TITLE
// "Happy Anniversary" text flies around the screen to different random positions
// ==========================================
function setupRunawayAnniversaryTitle() {
  const titleEl = document.getElementById("mainQuestion");
  if (!titleEl) return;

  // How often it moves (ms)
  const INTERVAL = 2200;
  // Positions it drifts through — random within safe screen bounds
  let moveTimer = null;

  function getRandomPos() {
    const maxX = window.innerWidth - titleEl.offsetWidth - 20;
    const maxY = window.innerHeight - titleEl.offsetHeight - 20;
    const x = Math.max(10, Math.floor(Math.random() * maxX));
    const y = Math.max(10, Math.floor(Math.random() * maxY));
    return { x, y };
  }

  function moveTitle() {
    const { x, y } = getRandomPos();
    titleEl.style.position = "fixed";
    titleEl.style.left = x + "px";
    titleEl.style.top = y + "px";
    titleEl.style.zIndex = "500";
    titleEl.style.transition = "left 0.9s cubic-bezier(0.25,0.46,0.45,0.94), top 0.9s cubic-bezier(0.25,0.46,0.45,0.94)";
    titleEl.style.maxWidth = "90vw";
    titleEl.style.cursor = "default";
  }

  // Start moving after 1.5 s so user sees the title first
  setTimeout(() => {
    // Position initially somewhere visible
    moveTitle();
    moveTimer = setInterval(moveTitle, INTERVAL);
  }, 1500);

  // Stop roaming once YES is clicked (cleanup)
  document.getElementById("yesBtn").addEventListener("click", () => {
    clearInterval(moveTimer);
    // Reset style so title stays in hero card properly
    titleEl.style.position = "";
    titleEl.style.left = "";
    titleEl.style.top = "";
    titleEl.style.transition = "";
    titleEl.style.zIndex = "";
    titleEl.style.maxWidth = "";
  }, { once: true });
}

// ==========================================
// 4. LIVE RELATIONSHIP TIMER
// ==========================================
function startRelationshipTimer() {
  const startDate = new Date("2025-10-03T00:00:00").getTime();

  function updateTimer() {
    const now = new Date().getTime();
    const difference = now - startDate;

    if (difference <= 0) return;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById("daysCount").textContent = String(days).padStart(2, "0");
    document.getElementById("hoursCount").textContent = String(hours).padStart(2, "0");
    document.getElementById("minsCount").textContent = String(minutes).padStart(2, "0");
    document.getElementById("secsCount").textContent = String(seconds).padStart(2, "0");

    // Update footer with a sweet days-together message
    const footer = document.getElementById("timerFooter");
    if (footer) {
      footer.textContent = `That's ${days} beautiful days together — and every single one has been worth it 💕`;
    }
  }

  updateTimer();
  timerInterval = setInterval(updateTimer, 1000);
}

// ==========================================
// 5. VIRTUAL HUG TOUCH & FEEL SIMULATOR
// ==========================================
function setupVirtualHug() {
  const hugPad = document.getElementById("hugPad");
  const hugCircle = document.querySelector(".progress-ring-circle");
  const hugFeedback = document.getElementById("hugFeedback");
  const hugInstruction = document.getElementById("hugInstruction");

  if (!hugPad || !hugCircle) return;

  const totalLength = 390;
  hugCircle.style.strokeDasharray = `${totalLength}`;
  hugCircle.style.strokeDashoffset = `${totalLength}`;

  let hugTimer = null;
  let progress = 0;
  let isEmbracing = false;
  const duration = 1800; // 1.8 seconds smooth embrace
  const step = 30;

  function triggerHugEmbrace(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (isEmbracing) return;

    isEmbracing = true;
    progress = 0;
    hugPad.classList.add("pressing");
    hugCircle.style.strokeDashoffset = `${totalLength}`;
    hugInstruction.textContent = "Hold tight... Embracing you warmly across the miles 💕";
    hugFeedback.style.display = "none";

    if (navigator.vibrate) navigator.vibrate([100, 50, 100, 50, 100]);
    playHeartbeatSound();

    clearInterval(hugTimer);
    hugTimer = setInterval(() => {
      progress += step;
      const offset = totalLength - (progress / duration) * totalLength;
      hugCircle.style.strokeDashoffset = Math.max(0, offset);

      if (progress % 500 < step) {
        playHeartbeatSound();
        if (navigator.vibrate) navigator.vibrate(60);
      }

      if (progress >= duration) {
        completeHug();
      }
    }, step);
  }

  function completeHug() {
    clearInterval(hugTimer);
    hugCircle.style.strokeDashoffset = 0;
    hugPad.classList.remove("pressing");
    hugInstruction.textContent = "Tap again anytime you miss me 🫂❤️";
    hugFeedback.style.display = "block";

    playCelebrationJingle();
    triggerContinuousHugCelebration();

    if (navigator.vibrate) navigator.vibrate([200, 80, 200, 80, 400]);

    setTimeout(() => {
      isEmbracing = false;
    }, 3000);
  }

  function triggerContinuousHugCelebration() {
    if (!window.confetti) return;

    const end = Date.now() + 3500; // 3.5 seconds continuous celebration stream
    const colors = ["#ff2e63", "#ff758c", "#ffd1dc", "#ffb703", "#ffffff", "#e60039"];

    (function frame() {
      // Left side fountain
      window.confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.65 },
        colors: colors
      });
      // Right side fountain
      window.confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.65 },
        colors: colors
      });
      // Center rain / sprinkle
      window.confetti({
        particleCount: 3,
        spread: 90,
        origin: { x: 0.5, y: 0.55 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }

  hugPad.addEventListener("click", triggerHugEmbrace);
  hugPad.addEventListener("touchstart", triggerHugEmbrace, { passive: false });
}

// ==========================================
// 6. FEATURE: MESSAGE IN A BOTTLE 🍾
// ==========================================
function setupMessageInABottle() {
  const bottle = document.getElementById("oceanBottle");
  const modal = document.getElementById("bottleModal");
  const modalClose = document.getElementById("bottleModalClose");
  const cork = document.getElementById("bottleCork");

  if (!bottle || !modal) return;

  bottle.addEventListener("click", () => {
    // Play cork pop sound
    playCorkPopSound();

    // Animate cork popping
    if (cork) {
      cork.style.transform = "translateY(-30px) rotate(25deg)";
    }

    // Sparkles
    if (window.confetti) {
      window.confetti({
        particleCount: 30,
        spread: 60,
        colors: ["#74c69d", "#b7e4c7", "#ffffff", "#ffd166"]
      });
    }

    // Open parchment modal after short delay
    setTimeout(() => {
      modal.classList.add("open");
    }, 300);
  });

  function closeModal() {
    modal.classList.remove("open");
    if (cork) cork.style.transform = "none";
  }

  modalClose.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
}

// ==========================================
// 7. FEATURE: RETRO CASSETTE / VOICE NOTE 📼
// ==========================================
function setupCassettePlayer() {
  if (!cassettePlayBtn || !voiceNoteAudio) return;

  cassettePlayBtn.addEventListener("click", () => {
    if (isVoiceNotePlaying) {
      pauseVoiceNote();
      if (isMusicPlaying) playMusic();
    } else {
      if (bgMusic) bgMusic.pause();
      playVoiceNote();
    }
  });

  voiceNoteAudio.addEventListener("timeupdate", () => {
    const current = voiceNoteAudio.currentTime;
    const total = voiceNoteAudio.duration || 30;
    const pct = (current / total) * 100;
    if (audioProgress) audioProgress.style.width = `${pct}%`;

    if (currentTimeEl) currentTimeEl.textContent = formatTime(current);
    if (totalTimeEl && !isNaN(total)) totalTimeEl.textContent = formatTime(total);
  });

  voiceNoteAudio.addEventListener("ended", () => {
    pauseVoiceNote();
    if (isMusicPlaying) playMusic();
    if (audioProgress) audioProgress.style.width = "0%";
  });

  // Click on progress bar to seek
  const progressBarContainer = document.querySelector(".audio-progress-bar");
  if (progressBarContainer) {
    progressBarContainer.addEventListener("click", (e) => {
      const rect = progressBarContainer.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      if (voiceNoteAudio.duration) {
        voiceNoteAudio.currentTime = pos * voiceNoteAudio.duration;
      }
    });
  }
}

function playVoiceNote() {
  voiceNoteAudio.play().then(() => {
    isVoiceNotePlaying = true;
    cassettePlayer.classList.add("playing");
    playIcon.className = "fa-solid fa-pause";
    playBtnText.textContent = "Pause Voice Note";
  }).catch(() => {
    console.log("Audio playback was blocked.");
  });
}

function pauseVoiceNote() {
  voiceNoteAudio.pause();
  isVoiceNotePlaying = false;
  cassettePlayer.classList.remove("playing");
  playIcon.className = "fa-solid fa-play";
  playBtnText.textContent = "Play Voice Note";
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${String(secs).padStart(2, "0")}`;
}

// ==========================================
// 8. FEATURE: FLOATING SKY LANTERNS 🏮
// ==========================================
function setupSkyLanterns() {
  const lanterns = document.querySelectorAll(".lantern");
  const wishTitle = document.getElementById("wishTitle");
  const wishText = document.getElementById("wishText");
  const wishRevealBox = document.getElementById("wishRevealBox");

  lanterns.forEach((lantern) => {
    lantern.addEventListener("click", () => {
      const wishId = lantern.getAttribute("data-wish");
      const wishData = CONFIG.lanternWishes[wishId];

      if (wishData) {
        playChimeSound();

        // Golden spark burst
        if (window.confetti) {
          const rect = lantern.getBoundingClientRect();
          const x = (rect.left + rect.width / 2) / window.innerWidth;
          const y = (rect.top + rect.height / 2) / window.innerHeight;
          window.confetti({
            particleCount: 30,
            spread: 60,
            origin: { x, y },
            colors: ["#ffd166", "#f4a261", "#ffeedd"]
          });
        }

        wishTitle.textContent = wishData.title;
        wishText.textContent = wishData.text;

        wishRevealBox.animate([
          { transform: "scale(0.96)", opacity: 0.7 },
          { transform: "scale(1.02)", opacity: 1 },
          { transform: "scale(1)", opacity: 1 }
        ], { duration: 300 });
      }
    });
  });
}

// ==========================================
// 9. MYSTERY GOLD SCRATCH CARD
// ==========================================
function setupScratchCard() { }

function initScratchCanvas() {
  const canvas = document.getElementById("scratchCanvas");
  if (!canvas) return;

  const container = canvas.parentElement;
  canvas.width = container.offsetWidth;
  canvas.height = container.offsetHeight;

  const ctx = canvas.getContext("2d");

  const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  grad.addColorStop(0, "#d4af37");
  grad.addColorStop(0.3, "#f3e5ab");
  grad.addColorStop(0.6, "#c59b27");
  grad.addColorStop(1, "#f9d423");

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#5c3d11";
  ctx.font = "bold 16px Poppins, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("✨ SCRATCH WITH FINGER ✨", canvas.width / 2, canvas.height / 2 - 8);
  ctx.font = "12px Poppins, sans-serif";
  ctx.fillText("to reveal my sacred anniversary promise", canvas.width / 2, canvas.height / 2 + 16);

  let isScratching = false;
  let scratchedPixels = 0;

  function scratch(e) {
    if (!isScratching) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 24, 0, Math.PI * 2);
    ctx.fill();

    scratchedPixels++;
    if (scratchedPixels % 20 === 0) checkScratchPercentage();
  }

  function checkScratchPercentage() {
    try {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imgData.data;
      let transparentCount = 0;
      for (let i = 3; i < pixels.length; i += 16) {
        if (pixels[i] === 0) transparentCount++;
      }
      const totalSampled = pixels.length / 16;
      if (transparentCount / totalSampled > 0.45) {
        canvas.style.transition = "opacity 0.6s ease";
        canvas.style.opacity = "0";
        setTimeout(() => { canvas.style.display = "none"; }, 600);
        triggerGrandConfetti();
        playChimeSound();
      }
    } catch (err) { }
  }

  canvas.addEventListener("mousedown", (e) => { isScratching = true; scratch(e); });
  window.addEventListener("mouseup", () => { isScratching = false; });
  canvas.addEventListener("mousemove", scratch);

  canvas.addEventListener("touchstart", (e) => { isScratching = true; scratch(e); });
  window.addEventListener("touchend", () => { isScratching = false; });
  canvas.addEventListener("touchmove", scratch);
}

// ==========================================
// 10. THE GLOWING LOVE JAR
// ==========================================
function setupLoveJar() {
  const drawBtn = document.getElementById("drawReasonBtn");
  const noteText = document.getElementById("noteText");
  const jarGraphic = document.getElementById("jarGraphic");
  let lastIndex = -1;

  if (!drawBtn) return;

  drawBtn.addEventListener("click", () => {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * CONFIG.jarReasons.length);
    } while (randomIndex === lastIndex && CONFIG.jarReasons.length > 1);

    lastIndex = randomIndex;
    const reason = CONFIG.jarReasons[randomIndex];

    jarGraphic.animate([
      { transform: "rotate(0deg)" },
      { transform: "rotate(-6deg)" },
      { transform: "rotate(6deg)" },
      { transform: "rotate(0deg)" }
    ], { duration: 300 });

    const drawnNote = document.getElementById("drawnNote");
    drawnNote.animate([
      { transform: "scale(0.95)", opacity: 0.5 },
      { transform: "scale(1.02)", opacity: 1 },
      { transform: "scale(1)", opacity: 1 }
    ], { duration: 300 });

    noteText.textContent = `"${reason}"`;
    playPopSound();
  });
}

// ==========================================
// 11. MUSIC CONTROLLER
// ==========================================
function setupMusic() {
  musicToggle.addEventListener("click", () => {
    if (isMusicPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  });
}

function playMusic() {
  if (bgMusic) {
    // Jump straight to the chorus: "යළි හමුවෙන්නේ කෙදිනද අපි..."
    if (bgMusic.currentTime < 2) {
      bgMusic.currentTime = CONFIG.songStartTimestamp;
    }
    bgMusic.play().then(() => {
      isMusicPlaying = true;
      musicToggle.classList.add("playing");
      musicLabel.textContent = "Play Music: On 🎵";
    }).catch(() => {
      console.log("Audio autoplay prevented by browser.");
    });
  }
}

function pauseMusic() {
  if (bgMusic) bgMusic.pause();
  isMusicPlaying = false;
  musicToggle.classList.remove("playing");
  musicLabel.textContent = "Play Music: Off 🔇";
}

// ==========================================
// 12. CONFETTI BURST EFFECTS
// ==========================================
function triggerGrandConfetti() {
  if (!window.confetti) return;

  const count = 180;
  const defaults = { origin: { y: 0.7 } };

  function fire(particleRatio, opts) {
    window.confetti({ ...defaults, ...opts, particleCount: Math.floor(count * particleRatio) });
  }

  fire(0.25, { spread: 26, startVelocity: 55, colors: ["#ff2e63", "#ff758c", "#ffffff"] });
  fire(0.2, { spread: 60, colors: ["#ff4b72", "#ffd166", "#06d6a0"] });
  fire(0.35, { spread: 100, decay: 0.91, scalar: 1.1, colors: ["#ff2e63", "#ffe6ec", "#ffb703"] });
  fire(0.2, { spread: 120, startVelocity: 40, colors: ["#ff758c", "#ffccd5"] });
}

// ==========================================
// 13. SYNTHESIZED SOUND EFFECTS (WEB AUDIO API)
// ==========================================
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playTone(freq, type, duration, delay = 0) {
  setTimeout(() => {
    try {
      if (audioCtx.state === "suspended") audioCtx.resume();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) { }
  }, delay);
}

function playCelebrationJingle() {
  playTone(523.25, "triangle", 0.3, 0);    // C5
  playTone(659.25, "triangle", 0.3, 100);  // E5
  playTone(783.99, "triangle", 0.3, 200);  // G5
  playTone(1046.50, "sine", 0.6, 300);    // C6
}

function playHeartbeatSound() {
  playTone(90, "sine", 0.12, 0);
  playTone(70, "sine", 0.15, 140);
}

function playPopSound() {
  playTone(880, "sine", 0.15, 0);
  playTone(1320, "sine", 0.15, 60);
}

function playCorkPopSound() {
  // Bottle cork pop synth: quick pitch ramp down
  try {
    if (audioCtx.state === "suspended") audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.frequency.setValueAtTime(600, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(140, audioCtx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.12);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.12);
  } catch (e) { }
}

function playChimeSound() {
  playTone(987.77, "sine", 0.4, 0);   // B5
  playTone(1318.51, "sine", 0.5, 120); // E6
}

// ==========================================
// 14. FLOATING HEARTS GENERATOR
// ==========================================
function initFloatingHearts() {
  if (!heartsContainer) return;

  const heartIcons = ["❤️", "💖", "💕", "🌸", "✨", "💗", "✈️"];

  function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("floating-heart");
    heart.textContent = heartIcons[Math.floor(Math.random() * heartIcons.length)];

    const startLeft = Math.random() * 100;
    const size = Math.random() * 16 + 14;
    const duration = Math.random() * 6 + 7;

    heart.style.left = `${startLeft}%`;
    heart.style.fontSize = `${size}px`;
    heart.style.animationDuration = `${duration}s`;

    heartsContainer.appendChild(heart);

    setTimeout(() => { heart.remove(); }, duration * 1000);
  }

  for (let i = 0; i < 12; i++) {
    setTimeout(createHeart, i * 400);
  }

  setInterval(createHeart, 900);
}
