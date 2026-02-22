// Xavfsizlik tizimi - screenshot, nusxalash va boshqa harakatlarni bloklash

// Global o'zgaruvchilar
let violationCount = 0;
let lockUntil = null;
let warningShown = false;
let lastViolationTime = 0;
const LOCK_DURATION = 10 * 60 * 1000; // 10 daqiqa
const VIOLATION_LIMIT = 1; // 1 ta qoidabuzarlikda bloklanadi

// LocalStorage dan holatni yuklash
function loadSecurityState() {
    const savedLockUntil = localStorage.getItem('lockUntil');
    if (savedLockUntil) {
        lockUntil = parseInt(savedLockUntil);
        if (lockUntil > Date.now()) {
            // Hali ham bloklangan
            showLockScreen();
        } else {
            // Bloklash muddati tugagan
            localStorage.removeItem('lockUntil');
            lockUntil = null;
        }
    }
    
    const savedViolationCount = localStorage.getItem('violationCount');
    if (savedViolationCount) {
        violationCount = parseInt(savedViolationCount);
    }
}

// Bloklash ekranini ko'rsatish
function showLockScreen() {
    const lockScreen = document.createElement('div');
    lockScreen.className = 'lock-screen';
    lockScreen.id = 'lockScreen';
    
    const remainingTime = Math.ceil((lockUntil - Date.now()) / 1000 / 60);
    
    lockScreen.innerHTML = `
        <div class="lock-screen-content">
            <div class="lock-icon">🔒</div>
            <h2>Test vaqtincha bloklandi</h2>
            <p>Siz test qoidalarini buzdingiz (screenshot, nusxalash va h.k.)</p>
            <p class="lock-time">Bloklash muddati: ${remainingTime} daqiqa</p>
            <p class="lock-message">Iltimos, test qoidalariga rioya qiling!</p>
            <div class="lock-timer" id="lockTimer"></div>
        </div>
    `;
    
    document.body.appendChild(lockScreen);
    document.body.style.overflow = 'hidden';
    
    // Taymerni yangilash
    updateLockTimer();
}

// Bloklash taymerini yangilash
function updateLockTimer() {
    const timerElement = document.getElementById('lockTimer');
    if (!timerElement) return;
    
    const interval = setInterval(() => {
        const remaining = lockUntil - Date.now();
        
        if (remaining <= 0) {
            clearInterval(interval);
            document.getElementById('lockScreen')?.remove();
            document.body.style.overflow = '';
            localStorage.removeItem('lockUntil');
            localStorage.removeItem('violationCount');
            location.reload();
            return;
        }
        
        const minutes = Math.floor(remaining / 1000 / 60);
        const seconds = Math.floor((remaining / 1000) % 60);
        timerElement.textContent = `⏱️ ${minutes}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
}

// Qoidabuzarlikni qayd etish
function recordViolation(type) {
    const now = Date.now();
    
    // Agar bloklangan bo'lsa, hech narsa qilma
    if (lockUntil && lockUntil > now) {
        return;
    }
    
    // 2 sekund ichida takroriy qoidabuzarliklarni bitta deb hisoblash
    if (now - lastViolationTime < 2000) {
        return;
    }
    
    lastViolationTime = now;
    violationCount++;
    localStorage.setItem('violationCount', violationCount);
    
    // Qoidabuzarlik haqida xabar berish
    if (!warningShown) {
        showViolationWarning(type);
        warningShown = true;
        setTimeout(() => {
            warningShown = false;
        }, 3000);
    }
    
    // Agar limitga yetgan bo'lsa, bloklash
    if (violationCount >= VIOLATION_LIMIT) {
        lockUntil = now + LOCK_DURATION;
        localStorage.setItem('lockUntil', lockUntil);
        showLockScreen();
    }
}

// Qoidabuzarlik haqida ogohlantirish
function showViolationWarning(type) {
    const warning = document.createElement('div');
    warning.className = 'security-warning';
    
    let message = '';
    switch(type) {
        case 'screenshot':
            message = '📸 Screenshot olish taqiqlangan!';
            break;
        case 'copy':
            message = '📋 Matn nusxalash taqiqlangan!';
            break;
        case 'cut':
            message = '✂️ Matn kesish taqiqlangan!';
            break;
        case 'paste':
            message = '📎 Matn joylash taqiqlangan!';
            break;
        case 'print':
            message = '🖨️ Chop etish taqiqlangan!';
            break;
        case 'contextmenu':
            message = '🔍 O\'ng tugma bilan menyu taqiqlangan!';
            break;
        case 'devtools':
            message = '🛠️ Developer Tools ochish taqiqlangan!';
            break;
        default:
            message = '⚠️ Test qoidalari buzildi!';
    }
    
    warning.innerHTML = `
        <div class="warning-content">
            <span class="warning-icon">⚠️</span>
            <span class="warning-message">${message}</span>
            <span class="warning-count">Qoidabuzarlik: ${violationCount}/${VIOLATION_LIMIT}</span>
        </div>
    `;
    
    document.body.appendChild(warning);
    
    setTimeout(() => {
        warning.remove();
    }, 3000);
}

// Developer Tools ni aniqlash
function detectDevTools() {
    const devToolsThreshold = 100;
    
    setInterval(() => {
        if (lockUntil && lockUntil > Date.now()) return;
        
        const start = performance.now();
        debugger;
        const end = performance.now();
        
        if (end - start > devToolsThreshold) {
            recordViolation('devtools');
        }
    }, 1000);
}

// Klaviatura tugmalarini bloklash
function blockKeyboardShortcuts(e) {
    // Screenshot tugmalari: PrtSc, Ctrl+P, Cmd+P, Ctrl+Shift+I, Cmd+Option+I
    const key = e.key;
    const ctrl = e.ctrlKey;
    const shift = e.shiftKey;
    const alt = e.altKey;
    const meta = e.metaKey;
    
    // PrtSc tugmasi
    if (key === 'PrintScreen') {
        e.preventDefault();
        e.stopPropagation();
        recordViolation('screenshot');
        return false;
    }
    
    // Ctrl+P (Chop etish)
    if ((ctrl || meta) && key.toLowerCase() === 'p') {
        e.preventDefault();
        e.stopPropagation();
        recordViolation('print');
        return false;
    }
    
    // Ctrl+C (Nusxalash)
    if ((ctrl || meta) && key.toLowerCase() === 'c') {
        e.preventDefault();
        e.stopPropagation();
        recordViolation('copy');
        return false;
    }
    
    // Ctrl+X (Kesish)
    if ((ctrl || meta) && key.toLowerCase() === 'x') {
        e.preventDefault();
        e.stopPropagation();
        recordViolation('cut');
        return false;
    }
    
    // Ctrl+V (Joylash)
    if ((ctrl || meta) && key.toLowerCase() === 'v') {
        e.preventDefault();
        e.stopPropagation();
        recordViolation('paste');
        return false;
    }
    
    // Ctrl+Shift+I (DevTools)
    if ((ctrl && shift && key.toLowerCase() === 'i') || 
        (meta && alt && key.toLowerCase() === 'i')) {
        e.preventDefault();
        e.stopPropagation();
        recordViolation('devtools');
        return false;
    }
    
    // F12 (DevTools)
    if (key === 'F12') {
        e.preventDefault();
        e.stopPropagation();
        recordViolation('devtools');
        return false;
    }
    
    // Ctrl+U (Manba kodini ko'rish)
    if ((ctrl || meta) && key.toLowerCase() === 'u') {
        e.preventDefault();
        e.stopPropagation();
        recordViolation('devtools');
        return false;
    }
    
    // Ctrl+S (Saqlash)
    if ((ctrl || meta) && key.toLowerCase() === 's') {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }
    
    // Ctrl+F (Qidirish)
    if ((ctrl || meta) && key.toLowerCase() === 'f') {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }
}

// Mouse hodisalarini bloklash
function blockMouseEvents(e) {
    // O'ng tugma
    if (e.type === 'contextmenu') {
        e.preventDefault();
        e.stopPropagation();
        recordViolation('contextmenu');
        return false;
    }
}

// Sekin suratga olishni aniqlash
function detectSlowScreenshot() {
    let lastBlurTime = 0;
    
    window.addEventListener('blur', () => {
        lastBlurTime = Date.now();
    });
    
    window.addEventListener('focus', () => {
        const blurDuration = Date.now() - lastBlurTime;
        
        // Agar oyna 100ms dan ko'proq focusdan chiqib qolsa (screenshot uchun)
        if (blurDuration > 100 && blurDuration < 5000) {
            // Bu screenshot bo'lishi mumkin
            recordViolation('screenshot');
        }
    });
}

// CSS orqali xavfsizlik
function addSecurityStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* Screenshot olishni qiyinlashtirish */
        body {
            -webkit-user-select: none !important;
            -moz-user-select: none !important;
            -ms-user-select: none !important;
            user-select: none !important;
            -webkit-touch-callout: none !important;
        }
        
        /* Bloklash ekrani */
        .lock-screen {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.95);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.5s ease;
        }
        
        .lock-screen-content {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 50px;
            border-radius: 30px;
            text-align: center;
            color: white;
            max-width: 500px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            animation: slideUp 0.5s ease;
        }
        
        .lock-icon {
            font-size: 80px;
            margin-bottom: 20px;
            animation: pulse 2s infinite;
        }
        
        .lock-screen-content h2 {
            font-size: 28px;
            margin-bottom: 15px;
            font-weight: 700;
        }
        
        .lock-screen-content p {
            font-size: 16px;
            margin-bottom: 10px;
            opacity: 0.9;
            line-height: 1.6;
        }
        
        .lock-time {
            font-size: 18px !important;
            font-weight: 600;
            margin: 20px 0 !important;
            padding: 10px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 10px;
        }
        
        .lock-message {
            font-style: italic;
            margin-top: 20px;
        }
        
        .lock-timer {
            font-size: 24px;
            font-weight: 700;
            margin-top: 20px;
            padding: 15px;
            background: rgba(0, 0, 0, 0.2);
            border-radius: 15px;
            font-family: monospace;
        }
        
        /* Xavfsizlik ogohlantirishi */
        .security-warning {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
            animation: slideInRight 0.3s ease;
        }
        
        .warning-content {
            background: linear-gradient(135deg, #f56565 0%, #c53030 100%);
            color: white;
            padding: 15px 25px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            display: flex;
            align-items: center;
            gap: 15px;
        }
        
        .warning-icon {
            font-size: 24px;
        }
        
        .warning-message {
            font-weight: 600;
            font-size: 14px;
        }
        
        .warning-count {
            background: rgba(255, 255, 255, 0.2);
            padding: 5px 10px;
            border-radius: 20px;
            font-size: 12px;
        }
        
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
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideUp {
            from {
                transform: translateY(30px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
        
        /* Test qismini tanlab bo'lmasin */
        .question-box, .options-container, .truefalse-container, 
        .matching-container, .ranking-container {
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }
        
        /* Rasm va matnlarni nusxalashni oldini olish */
        img, .question-text, .option-item span, .truefalse-row span {
            pointer-events: none;
        }
    `;
    document.head.appendChild(style);
}

// Xavfsizlik tizimini ishga tushirish
function initSecurity() {
    // Holatni yuklash
    loadSecurityState();
    
    // CSS stillarni qo'shish
    addSecurityStyles();
    
    // Klaviatura hodisalarini bloklash
    document.addEventListener('keydown', blockKeyboardShortcuts, true);
    
    // Mouse hodisalarini bloklash
    document.addEventListener('contextmenu', blockMouseEvents, true);
    
    // Nusxalash hodisalarini bloklash
    document.addEventListener('copy', (e) => {
        e.preventDefault();
        e.stopPropagation();
        recordViolation('copy');
    }, true);
    
    document.addEventListener('cut', (e) => {
        e.preventDefault();
        e.stopPropagation();
        recordViolation('cut');
    }, true);
    
    document.addEventListener('paste', (e) => {
        e.preventDefault();
        e.stopPropagation();
        recordViolation('paste');
    }, true);
    
    document.addEventListener('print', (e) => {
        e.preventDefault();
        e.stopPropagation();
        recordViolation('print');
    }, true);
    
    // Sekin suratga olishni aniqlash
    detectSlowScreenshot();
    
    // Developer Tools ni aniqlash
    detectDevTools();
    
    // Visibility change ni kuzatish (boshqa tabga o'tish)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // Boshqa tabga o'tdi
            setTimeout(() => {
                recordViolation('screenshot');
            }, 500);
        }
    });
    
    // Oyna o'lchamini o'zgartirishni kuzatish
    let lastWidth = window.innerWidth;
    let lastHeight = window.innerHeight;
    
    window.addEventListener('resize', () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        // Agar oyna o'lchami keskin o'zgarsa (DevTools ochilgan bo'lishi mumkin)
        if (Math.abs(width - lastWidth) > 200 || Math.abs(height - lastHeight) > 200) {
            recordViolation('devtools');
        }
        
        lastWidth = width;
        lastHeight = height;
    });
    
    // PrintScreen tugmasi uchun maxsus
    window.addEventListener('keyup', (e) => {
        if (e.key === 'PrintScreen') {
            recordViolation('screenshot');
        }
    });
}

// Sahifa yuklanganda xavfsizlik tizimini ishga tushirish
document.addEventListener('DOMContentLoaded', () => {
    initSecurity();
});

// Sahifa yopilganda localStorage ni tozalash
window.addEventListener('beforeunload', () => {
    // Bloklash muddati tugagan bo'lsa tozalash
    if (lockUntil && lockUntil < Date.now()) {
        localStorage.removeItem('lockUntil');
        localStorage.removeItem('violationCount');
    }
});