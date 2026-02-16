// ============================================
// XAVFSIZLIK MODULI - TO'LIQ HIMOYA
// ============================================

(function () {
  "use strict";

  // Device va login ma'lumotlari
  const ALLOWED_DEVICES = [
    "web-platform-demo-1",
    "web-platform-demo-2",
    "web-platform-demo-3",
    "test-device-2024",
    "device-a1b2c3",
    "device-x9y8z7",
  ];

  const VALID_CREDENTIALS = {
    username: "student",
    password: "ic3gs6",
  };

  // Xavfsizlik monitoringi
  let securityViolations = 0;
  let loginAttempts = 0;
  let isBlocked = false;
  let blockEndTime = null;
  let lastActivityTime = Date.now();
  let devToolsOpen = false;
  let screenRecordingDetected = false;

  // ============================================
  // SAVOLLAR MA'LUMOTLAR BAZASI
  // ============================================

  const questions = {
    1: [
      // Level 1 - Computing Fundamentals
      // ... (savollar yuqoridagi kabi)
    ],
  };

  // ============================================
  // XAVFSIZLIK FUNKSIYALARI - BARCHA BRAUZERLAR UCHUN
  // ============================================

  // Login urinishlarini kuzatish
  function trackLoginAttempt() {
    const attempts = JSON.parse(sessionStorage.getItem("loginAttempts") || "0");
    const newAttempts = attempts + 1;
    sessionStorage.setItem("loginAttempts", newAttempts);

    if (newAttempts >= 3) {
      const blockUntil = Date.now() + 10 * 60 * 1000; // 10 daqiqa
      localStorage.setItem("loginBlocked", "true");
      localStorage.setItem("loginBlockUntil", blockUntil);
      showBlockScreen("Haddan tashqari ko'p noto'g'ri urinishlar", 10);
      return true;
    }
    return false;
  }

  // Login blokini tekshirish
  function checkLoginBlock() {
    if (localStorage.getItem("loginBlocked") === "true") {
      const blockUntil = parseInt(localStorage.getItem("loginBlockUntil"));
      if (Date.now() < blockUntil) {
        const remainingMinutes = Math.ceil((blockUntil - Date.now()) / 60000);
        showBlockScreen(
          "Haddan tashqari ko'p noto'g'ri urinishlar",
          remainingMinutes,
        );
        return true;
      } else {
        localStorage.removeItem("loginBlocked");
        localStorage.removeItem("loginBlockUntil");
        sessionStorage.removeItem("loginAttempts");
      }
    }
    return false;
  }

  // ============================================
  // NUSXA OLISHNI BLOKLASH - BARCHA QURILMALAR UCHUN
  // ============================================

  function preventCopyOnAllDevices() {
    // 1. Klaviatura hodisalarini bloklash
    document.addEventListener(
      "keydown",
      function (e) {
        if (
          !document.getElementById("test-section").classList.contains("active")
        )
          return;

        const key = e.key.toLowerCase();

        // Barcha brauzerlar uchun universal bloklash
        if (e.ctrlKey || e.metaKey) {
          // Ctrl+C, Ctrl+V, Ctrl+X, Ctrl+P, Ctrl+S, Ctrl+A
          if (
            key === "c" ||
            key === "v" ||
            key === "x" ||
            key === "p" ||
            key === "s" ||
            key === "a"
          ) {
            e.preventDefault();
            e.stopPropagation();
            logSecurityViolation("KEYBOARD_SHORTCUT_" + key.toUpperCase());
            showSecurityWarning("Bu amal taqiqlangan!");
            return false;
          }
        }

        // PrintScreen (barcha brauzerlar uchun)
        if (e.key === "PrintScreen" || e.keyCode === 44 || e.which === 44) {
          e.preventDefault();
          e.stopPropagation();
          logSecurityViolation("PRINT_SCREEN_ATTEMPT");
          showSecurityWarning("Screenshot olish taqiqlangan!");

          // Ekranni qoraytirish
          showScreenBlur();
          return false;
        }

        // F12 (Developer Tools)
        if (e.key === "F12" || e.keyCode === 123) {
          e.preventDefault();
          e.stopPropagation();
          logSecurityViolation("DEV_TOOLS_ATTEMPT");
          handleDevToolsOpen();
          return false;
        }
      },
      true,
    ); // Capture phase da bloklash

    // 2. Kontekst menyuni bloklash
    document.addEventListener(
      "contextmenu",
      function (e) {
        if (
          document.getElementById("test-section").classList.contains("active")
        ) {
          e.preventDefault();
          e.stopPropagation();
          logSecurityViolation("CONTEXT_MENU_ATTEMPT");
          showSecurityWarning("O'ng tugma bloklangan!");
          return false;
        }
      },
      true,
    );

    // 3. Nusxa olish hodisalarini bloklash
    document.addEventListener(
      "copy",
      function (e) {
        if (
          document.getElementById("test-section").classList.contains("active")
        ) {
          e.preventDefault();
          e.stopPropagation();
          logSecurityViolation("COPY_ATTEMPT");
          showSecurityWarning("Nusxa olish taqiqlangan!");
          return false;
        }
      },
      true,
    );

    document.addEventListener(
      "cut",
      function (e) {
        if (
          document.getElementById("test-section").classList.contains("active")
        ) {
          e.preventDefault();
          e.stopPropagation();
          logSecurityViolation("CUT_ATTEMPT");
          showSecurityWarning("Kesib olish taqiqlangan!");
          return false;
        }
      },
      true,
    );

    document.addEventListener(
      "paste",
      function (e) {
        if (
          document.getElementById("test-section").classList.contains("active")
        ) {
          e.preventDefault();
          e.stopPropagation();
          logSecurityViolation("PASTE_ATTEMPT");
          showSecurityWarning("Yopishtirish taqiqlangan!");
          return false;
        }
      },
      true,
    );

    // 4. Selektionni bloklash
    document.addEventListener(
      "selectstart",
      function (e) {
        if (
          document.getElementById("test-section").classList.contains("active")
        ) {
          e.preventDefault();
          e.stopPropagation();
          return false;
        }
      },
      true,
    );

    // 5. Drag & Drop ni bloklash
    document.addEventListener(
      "dragstart",
      function (e) {
        if (
          document.getElementById("test-section").classList.contains("active")
        ) {
          e.preventDefault();
          e.stopPropagation();
          return false;
        }
      },
      true,
    );

    // 6. CSS orqali selektionni bloklash
    const style = document.createElement("style");
    style.textContent = `
            .no-select {
                -webkit-user-select: none !important;
                -moz-user-select: none !important;
                -ms-user-select: none !important;
                user-select: none !important;
                -webkit-touch-callout: none !important;
                -webkit-tap-highlight-color: transparent !important;
            }
            
            .question-card, .option-item, .question-text, .options-container {
                -webkit-user-select: none !important;
                -moz-user-select: none !important;
                -ms-user-select: none !important;
                user-select: none !important;
            }
        `;
    document.head.appendChild(style);

    // Test section ga class qo'shish
    document.getElementById("test-section").classList.add("no-select");
  }

  // ============================================
  // SCREENSHOT DETEKSIYASI - MOBIL QURILMALAR UCHUN
  // ============================================

  function detectScreenshotOnMobile() {
    // Volume tugmalari kombinatsiyasini kuzatish (Android screenshot)
    let volumeDownPressed = false;
    let volumeUpPressed = false;
    let powerPressed = false;

    document.addEventListener("keydown", function (e) {
      if (!document.getElementById("test-section").classList.contains("active"))
        return;

      // Volume Down (Android screenshot)
      if (e.key === "VolumeDown" || e.keyCode === 175) {
        volumeDownPressed = true;
        setTimeout(() => (volumeDownPressed = false), 1000);
      }

      // Volume Up (iOS screenshot)
      if (e.key === "VolumeUp" || e.keyCode === 176) {
        volumeUpPressed = true;
        setTimeout(() => (volumeUpPressed = false), 1000);
      }

      // Power button (barcha qurilmalar)
      if (e.key === "Power" || e.keyCode === 152) {
        powerPressed = true;
        setTimeout(() => (powerPressed = false), 1000);
      }

      // Screenshot kombinatsiyalarini tekshirish
      if (
        (volumeDownPressed && powerPressed) ||
        (volumeUpPressed && powerPressed)
      ) {
        logSecurityViolation("MOBILE_SCREENSHOT_ATTEMPT");
        showSecurityWarning("Screenshot olish aniqlandi!");
        showScreenBlur();

        volumeDownPressed = false;
        volumeUpPressed = false;
        powerPressed = false;
      }
    });

    // Visibility change (iOS screenshot)
    document.addEventListener("visibilitychange", function () {
      if (
        document.hidden &&
        document.getElementById("test-section").classList.contains("active")
      ) {
        // Ekran o'chirilgan bo'lsa, screenshot bo'lishi mumkin
        setTimeout(() => {
          if (document.hidden) {
            logSecurityViolation("SCREENSHOT_VISIBILITY_CHANGE");
            showSecurityWarning("Screenshot olingan bo'lishi mumkin!");
          }
        }, 500);
      }
    });

    // Resize event (screenshot apps)
    let lastWidth = window.innerWidth;
    let lastHeight = window.innerHeight;

    setInterval(() => {
      if (!document.getElementById("test-section").classList.contains("active"))
        return;

      const currentWidth = window.innerWidth;
      const currentHeight = window.innerHeight;

      // Ekran o'lchami o'zgarsa (screenshot app ochilganda)
      if (
        Math.abs(currentWidth - lastWidth) > 50 ||
        Math.abs(currentHeight - lastHeight) > 50
      ) {
        logSecurityViolation("SCREEN_RESIZE");
        lastWidth = currentWidth;
        lastHeight = currentHeight;
      }
    }, 1000);
  }

  // ============================================
  // DEVELOPER TOOLS DETEKSIYASI - BARCHA BRAUZERLAR UCHUN
  // ============================================

  function detectDevTools() {
    let devToolsOpen = false;

    // 1. Element o'lchami orqali aniqlash
    const element = new Image();
    Object.defineProperty(element, "id", {
      get: function () {
        devToolsOpen = true;
        handleDevToolsOpen();
      },
    });

    setInterval(() => {
      if (!document.getElementById("test-section").classList.contains("active"))
        return;
      console.log(element);
    }, 1000);

    // 2. Console.log orqali aniqlash
    const checkDevTools = function () {
      const start = new Date();
      debugger;
      const end = new Date();

      if (end - start > 100) {
        devToolsOpen = true;
        handleDevToolsOpen();
      }
    };

    setInterval(checkDevTools, 2000);

    // 3. Ekran o'lchami orqali aniqlash
    setInterval(function () {
      if (!document.getElementById("test-section").classList.contains("active"))
        return;

      const widthThreshold = window.outerWidth - window.innerWidth > 160;
      const heightThreshold = window.outerHeight - window.innerHeight > 160;

      if (widthThreshold || heightThreshold) {
        if (!devToolsOpen) {
          devToolsOpen = true;
          handleDevToolsOpen();
        }
      } else {
        devToolsOpen = false;
      }
    }, 1000);
  }

  // Developer tools ochilganda
  function handleDevToolsOpen() {
    securityViolations += 2;
    logSecurityViolation("DEV_TOOLS_DETECTED");
    showSecurityWarning("Developer Tools aniqlandi!");

    // Ekranni xiralashtirish
    showScreenBlur();

    if (securityViolations >= 3) {
      blockUser("Developer tools dan foydalanish", 30); // 30 daqiqa blok
    }
  }

  // ============================================
  // EKRANNI HIMOYALASH FUNKSIYALARI
  // ============================================

  // Ekranni xiralashtirish (screenshot paytida)
  function showScreenBlur() {
    const blurDiv = document.createElement("div");
    blurDiv.className = "screen-blur";
    blurDiv.innerHTML = `
            <div class="blur-content">
                <i class="fas fa-shield-alt"></i>
                <h3>Xavfsizlik</h3>
                <p>Screenshot olish aniqlandi</p>
                <div class="blur-timer">2</div>
            </div>
        `;

    document.body.appendChild(blurDiv);

    let seconds = 2;
    const timer = setInterval(() => {
      seconds--;
      blurDiv.querySelector(".blur-timer").textContent = seconds;

      if (seconds <= 0) {
        clearInterval(timer);
        blurDiv.remove();
      }
    }, 1000);
  }

  // Xavfsizlik buzilishini qayd etish
  function logSecurityViolation(type) {
    securityViolations++;
    console.warn(`[SECURITY] ${type} - Violation #${securityViolations}`);

    const violations = JSON.parse(
      localStorage.getItem("securityViolations") || "[]",
    );
    violations.push({
      type: type,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      platform: navigator.platform,
    });
    localStorage.setItem("securityViolations", JSON.stringify(violations));

    if (securityViolations >= 5) {
      blockUser("Haddan tashqari xavfsizlik buzilishi", 60); // 60 daqiqa blok
    }
  }

  // Foydalanuvchini bloklash
  function blockUser(reason, minutes = 10) {
    if (isBlocked) return;

    isBlocked = true;
    blockEndTime = Date.now() + minutes * 60 * 1000;

    localStorage.setItem("isBlocked", "true");
    localStorage.setItem("blockEndTime", blockEndTime);
    localStorage.setItem("blockReason", reason);

    showBlockScreen(reason, minutes);

    // Logout qilish
    currentUser = null;
    localStorage.removeItem("currentUser");
  }

  // Bloklangan ekranini ko'rsatish
  function showBlockScreen(reason, minutes) {
    const blockDiv = document.createElement("div");
    blockDiv.className = "block-screen";
    blockDiv.innerHTML = `
            <div class="block-content">
                <i class="fas fa-shield-alt fa-4x" style="color: #e74c3c;"></i>
                <h2>Platforma bloklandi!</h2>
                <p>Sabab: ${reason}</p>
                <p>Blok vaqti: ${minutes} daqiqa</p>
                <p class="small">Xavfsizlik qoidalarini buzganingiz uchun platformadan vaqtinchalik bloklandingiz.</p>
                <div class="countdown">${formatTime(minutes * 60)}</div>
            </div>
        `;

    document.body.innerHTML = "";
    document.body.appendChild(blockDiv);

    // Countdown
    const countdownEl = blockDiv.querySelector(".countdown");
    const interval = setInterval(() => {
      const remaining = blockEndTime - Date.now();
      if (remaining <= 0) {
        clearInterval(interval);
        location.reload();
      } else {
        const hours = Math.floor(remaining / 3600000);
        const mins = Math.floor((remaining % 3600000) / 60000);
        const secs = Math.floor((remaining % 60000) / 1000);
        countdownEl.textContent = `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
      }
    }, 1000);
  }

  // Vaqtni formatlash
  function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }

  // Xavfsizlik ogohlantirishi
  function showSecurityWarning(message) {
    const warning = document.createElement("div");
    warning.className = "security-warning";
    warning.innerHTML = `
            <i class="fas fa-exclamation-triangle"></i>
            <span>${message}</span>
        `;

    document.body.appendChild(warning);

    setTimeout(() => {
      warning.classList.add("fade-out");
      setTimeout(() => warning.remove(), 500);
    }, 2000);
  }

  // ============================================
  // PLATFORMA FUNKSIYALARI
  // ============================================

  let currentUser = null;
  let currentLevel = 1;
  let currentQuestionIndex = 0;
  let userAnswers = {};
  let questionChecked = {};
  let testStartTime = null;
  let currentResults = {
    total: 0,
    correct: 0,
    incorrect: 0,
    skipped: 0,
    percentage: 0,
  };

  // Device ID generatsiya qilish
  function generateDeviceId() {
    const navigatorInfo =
      navigator.userAgent +
      navigator.language +
      screen.width +
      screen.height +
      new Date().getTimezoneOffset() +
      navigator.platform;
    let hash = 0;
    for (let i = 0; i < navigatorInfo.length; i++) {
      const char = navigatorInfo.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return "device-" + Math.abs(hash).toString(16).substring(0, 8);
  }

  // Device ID ni tekshirish
  function checkDevice() {
    const deviceId = localStorage.getItem("deviceId") || generateDeviceId();
    localStorage.setItem("deviceId", deviceId);
    document.getElementById("device-id-display").textContent = deviceId;

    const isAllowed = ALLOWED_DEVICES.some((device) =>
      deviceId.includes(device.substring(0, 8)),
    );
    return isAllowed;
  }

  // Login form
  document
    .getElementById("login-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      // Login blokini tekshirish
      if (checkLoginBlock()) return;

      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      const errorDiv = document.getElementById("login-error");

      if (!checkDevice()) {
        errorDiv.textContent = "⚠️ Bu qurilmadan kirish ruxsat etilmagan!";
        return;
      }

      if (
        username === VALID_CREDENTIALS.username &&
        password === VALID_CREDENTIALS.password
      ) {
        // Muvaffaqiyatli login - urinishlarni tozalash
        sessionStorage.removeItem("loginAttempts");

        currentUser = {
          username,
          loginTime: new Date().toISOString(),
          deviceId: localStorage.getItem("deviceId"),
        };
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        showSection("level-section");
        errorDiv.textContent = "";

        // Xavfsizlik monitoringini boshlash
        startSecurityMonitoring();

        showNotification("success", "Tizimga muvaffaqiyatli kirdingiz!");
      } else {
        // Noto'g'ri login - urinishlarni hisoblash
        const blocked = trackLoginAttempt();
        if (!blocked) {
          const attempts = parseInt(
            sessionStorage.getItem("loginAttempts") || "1",
          );
          errorDiv.textContent = `❌ Login yoki parol noto'g'ri! (${attempts}/3 urinish)`;
        }
        logSecurityViolation("INVALID_LOGIN_ATTEMPT");
      }
    });

  // Xavfsizlik monitoringini boshlash
  function startSecurityMonitoring() {
    preventCopyOnAllDevices();
    detectDevTools();
    detectScreenshotOnMobile();

    // Tab visibility change
    document.addEventListener("visibilitychange", function () {
      if (
        document.hidden &&
        document.getElementById("test-section").classList.contains("active")
      ) {
        logSecurityViolation("TAB_SWITCH");
        showSecurityWarning("Boshqa tabga o'tish aniqlandi!");
      }
    });

    // Window blur
    window.addEventListener("blur", function () {
      if (
        document.getElementById("test-section").classList.contains("active")
      ) {
        logSecurityViolation("WINDOW_BLUR");
      }
    });

    // Mouse leaving window
    document.addEventListener("mouseleave", function () {
      if (
        document.getElementById("test-section").classList.contains("active")
      ) {
        logSecurityViolation("MOUSE_LEAVE_WINDOW");
      }
    });

    // Focus o'zgarishi
    window.addEventListener("focus", function () {
      if (
        document.getElementById("test-section").classList.contains("active")
      ) {
        // Fokus qaytganida tekshirish
        if (securityViolations > 0) {
          showSecurityWarning("Diqqat! Xavfsizlik buzilishi aniqlandi");
        }
      }
    });
  }

  // Qolgan platforma funksiyalari (level tanlash, savol yuklash, test ishlash)
  // ... (oldingi kod bilan bir xil)

  // ============================================
  // PLATFORMANI ISHGA TUSHIRISH
  // ============================================

  document.addEventListener("DOMContentLoaded", function () {
    // Device ID ni ko'rsatish
    checkDevice();

    // Bloklanganligini tekshirish
    if (localStorage.getItem("isBlocked") === "true") {
      const blockEnd = parseInt(localStorage.getItem("blockEndTime"));
      if (Date.now() < blockEnd) {
        const remainingMinutes = Math.ceil((blockEnd - Date.now()) / 60000);
        showBlockScreen(localStorage.getItem("blockReason"), remainingMinutes);
      } else {
        localStorage.removeItem("isBlocked");
        localStorage.removeItem("blockEndTime");
      }
    }

    // Avtorizatsiyani tekshirish
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser && !localStorage.getItem("isBlocked")) {
      currentUser = JSON.parse(savedUser);
      showSection("level-section");
    }

    // CSS qo'shish
    addStyles();
  });

  // CSS qo'shish
  function addStyles() {
    const style = document.createElement("style");
    style.textContent = `
            /* Screen blur effect */
            .screen-blur {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.9);
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 50000;
                animation: fadeIn 0.2s ease;
            }
            
            .blur-content {
                text-align: center;
                color: white;
            }
            
            .blur-content i {
                font-size: 80px;
                color: #e74c3c;
                margin-bottom: 20px;
            }
            
            .blur-content h3 {
                font-size: 24px;
                margin-bottom: 10px;
            }
            
            .blur-content p {
                font-size: 16px;
                opacity: 0.8;
            }
            
            .blur-timer {
                font-size: 48px;
                font-weight: 700;
                color: #e74c3c;
                margin-top: 20px;
            }
            
            /* Security warning */
            .security-warning {
                position: fixed;
                top: 20px;
                right: 20px;
                background: rgba(231, 76, 60, 0.95);
                color: white;
                padding: 15px 25px;
                border-radius: 12px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                z-index: 40000;
                display: flex;
                align-items: center;
                gap: 15px;
                font-size: 16px;
                font-weight: 500;
                animation: slideInRight 0.3s ease;
                backdrop-filter: blur(5px);
                -webkit-backdrop-filter: blur(5px);
                border: 1px solid rgba(255,255,255,0.2);
            }
            
            .security-warning i {
                font-size: 20px;
            }
            
            /* Block screen */
            .block-screen {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 100000;
                animation: fadeIn 0.3s ease;
            }
            
            .block-content {
                background: white;
                padding: 50px;
                border-radius: 30px;
                text-align: center;
                max-width: 500px;
                width: 90%;
                box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                animation: scaleIn 0.3s ease;
            }
            
            .block-content i {
                font-size: 80px;
                margin-bottom: 20px;
            }
            
            .block-content h2 {
                color: #e74c3c;
                font-size: 32px;
                margin: 20px 0;
            }
            
            .block-content p {
                margin: 10px 0;
                color: #666;
                font-size: 16px;
            }
            
            .block-content .small {
                font-size: 14px;
                opacity: 0.7;
                margin-top: 20px;
            }
            
            .block-content .countdown {
                font-size: 48px;
                font-weight: 700;
                color: #e74c3c;
                margin-top: 30px;
                font-family: 'Courier New', monospace;
                text-shadow: 0 2px 10px rgba(231, 76, 60, 0.3);
            }
            
            /* No select for all elements */
            .no-select, 
            .question-card, 
            .option-item, 
            .question-text, 
            .options-container,
            .level-card,
            .test-header,
            .navigation-buttons {
                -webkit-user-select: none !important;
                -moz-user-select: none !important;
                -ms-user-select: none !important;
                user-select: none !important;
                -webkit-touch-callout: none !important;
                -webkit-tap-highlight-color: transparent !important;
            }
            
            /* Disable text selection cursor */
            .option-item {
                cursor: pointer;
            }
            
            /* Animations */
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes scaleIn {
                from {
                    transform: scale(0.8);
                    opacity: 0;
                }
                to {
                    transform: scale(1);
                    opacity: 1;
                }
            }
            
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
            
            .fade-out {
                animation: fadeOut 0.5s ease forwards;
            }
            
            /* Responsive */
            @media (max-width: 768px) {
                .block-content {
                    padding: 30px;
                }
                
                .block-content h2 {
                    font-size: 24px;
                }
                
                .block-content .countdown {
                    font-size: 36px;
                }
                
                .security-warning {
                    left: 20px;
                    right: 20px;
                    top: 10px;
                    font-size: 14px;
                }
            }
            
            /* Mobile tap highlight disable */
            * {
                -webkit-tap-highlight-color: transparent;
            }
            
            /* Disable image dragging */
            img {
                -webkit-user-drag: none;
                -khtml-user-drag: none;
                -moz-user-drag: none;
                -o-user-drag: none;
                user-drag: none;
            }
        `;

    document.head.appendChild(style);
  }
})();
