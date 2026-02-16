// ===============================
// SECURITY PROTECTION SYSTEM
// ===============================

const LOCK_TIME = 10 * 60 * 1000; // 10 minut
let isLocked = false;

// Lock Function
function lockPlatform() {
  if (isLocked) return;

  isLocked = true;
  const lockScreen = document.getElementById("lockScreen");
  lockScreen.style.display = "flex";

  const unlockTime = Date.now() + LOCK_TIME;
  localStorage.setItem("lockUntil", unlockTime);

  startCountdown(unlockTime);
}

// Countdown
function startCountdown(unlockTime) {
  const countdown = document.getElementById("countdown");

  const interval = setInterval(() => {
    const remaining = unlockTime - Date.now();

    if (remaining <= 0) {
      clearInterval(interval);
      localStorage.removeItem("lockUntil");
      document.getElementById("lockScreen").style.display = "none";
      isLocked = false;
      return;
    }

    const minutes = Math.floor(remaining / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);
    countdown.textContent = `${minutes}m ${seconds}s`;
  }, 1000);
}

// Check if previously locked
window.addEventListener("load", () => {
  const lockUntil = localStorage.getItem("lockUntil");
  if (lockUntil && Date.now() < lockUntil) {
    lockPlatform();
  }
});

// ===============================
// BLOCK COPY
// ===============================
document.addEventListener("copy", (e) => {
  e.preventDefault();
  lockPlatform();
});

document.addEventListener("cut", (e) => {
  e.preventDefault();
  lockPlatform();
});

// ===============================
// BLOCK RIGHT CLICK
// ===============================
document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  lockPlatform();
});

// ===============================
// BLOCK KEY SHORTCUTS
// ===============================
document.addEventListener("keydown", (e) => {
  // Ctrl + C
  if (e.ctrlKey && e.key.toLowerCase() === "c") {
    e.preventDefault();
    lockPlatform();
  }

  // Ctrl + U
  if (e.ctrlKey && e.key.toLowerCase() === "u") {
    e.preventDefault();
    lockPlatform();
  }

  // Ctrl + Shift + I (DevTools)
  if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "i") {
    e.preventDefault();
    lockPlatform();
  }

  // PrintScreen
  if (e.key === "PrintScreen") {
    navigator.clipboard.writeText("");
    lockPlatform();
  }
});

// ===============================
// DETECT DEVTOOLS
// ===============================
setInterval(() => {
  const widthThreshold = window.outerWidth - window.innerWidth > 160;
  const heightThreshold = window.outerHeight - window.innerHeight > 160;

  if (widthThreshold || heightThreshold) {
    lockPlatform();
  }
}, 1000);

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    lockPlatform();
  }
});
