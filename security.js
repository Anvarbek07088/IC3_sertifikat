// ========== XAVFSIZLIK TIZIMI ==========
(function() {
    const UNLOCK_CODES = {
        'IC3GS6': true,
        '2025': true,
        'ADMIN': true,
        'UNLOCK': true,
        '123456': true
    };
    
    let lockUntil = null;
    let isLocked = false;
    let unlockAttempts = 0;
    const LOCK_DURATION = 10 * 60 * 1000;
    const MAX_UNLOCK_ATTEMPTS = 5;
    
    function loadFromStorage() {
        const savedLockUntil = localStorage.getItem('screenshot_lockUntil');
        if (savedLockUntil) {
            lockUntil = parseInt(savedLockUntil);
            if (lockUntil > Date.now()) {
                isLocked = true;
                showLockScreen('screenshot olindi', false);
            } else {
                localStorage.removeItem('screenshot_lockUntil');
                lockUntil = null;
            }
        }
        
        const savedAttempts = localStorage.getItem('screenshot_unlockAttempts');
        if (savedAttempts) {
            unlockAttempts = parseInt(savedAttempts);
        }
    }
    
    function showLockScreen(reason, playAnimation = true) {
        const lockScreen = document.getElementById('lockScreen');
        const reasonEl = document.getElementById('violationReason');
        
        if (!lockScreen) return;
        
        reasonEl.textContent = reason;
        lockScreen.classList.add('active');
        updateLockTimer();
        
        // Test funksiyalarini bloklash
        if (window.checkAnswer) window.checkAnswer = () => {};
        if (window.changeQuestion) window.changeQuestion = () => {};
    }
    
    function hideLockScreen() {
        const lockScreen = document.getElementById('lockScreen');
        lockScreen.classList.remove('active');
        isLocked = false;
        lockUntil = null;
        unlockAttempts = 0;
        
        localStorage.removeItem('screenshot_lockUntil');
        localStorage.removeItem('screenshot_unlockAttempts');
        
        // Funksiyalarni qayta tiklash
        location.reload();
    }
    
    function updateLockTimer() {
        const timerElement = document.getElementById('lockTimer');
        if (!timerElement) return;
        
        const interval = setInterval(() => {
            if (!lockUntil || lockUntil <= Date.now()) {
                clearInterval(interval);
                hideLockScreen();
                return;
            }
            
            const remaining = lockUntil - Date.now();
            const minutes = Math.floor(remaining / 1000 / 60);
            const seconds = Math.floor((remaining / 1000) % 60);
            timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    }
    
    window.checkUnlockCode = function() {
        const codeInput = document.getElementById('unlockCode');
        const lockMessage = document.getElementById('lockMessage');
        const code = codeInput.value.trim().toUpperCase();
        
        if (unlockAttempts >= MAX_UNLOCK_ATTEMPTS) {
            lockMessage.textContent = '❌ Juda ko\'p urindingiz! 30 daqiqa kuting.';
            lockUntil = Date.now() + (30 * 60 * 1000);
            localStorage.setItem('screenshot_lockUntil', lockUntil);
            return;
        }
        
        if (UNLOCK_CODES[code]) {
            lockMessage.textContent = '✅ Kod to\'g\'ri! Sahifa qayta yuklanadi...';
            setTimeout(() => hideLockScreen(), 1000);
        } else {
            unlockAttempts++;
            localStorage.setItem('screenshot_unlockAttempts', unlockAttempts);
            lockMessage.textContent = `❌ Noto'g'ri kod! Qolgan urinishlar: ${MAX_UNLOCK_ATTEMPTS - unlockAttempts}`;
            codeInput.classList.add('error');
            setTimeout(() => codeInput.classList.remove('error'), 500);
        }
    };
    
    function detectScreenshot() {
        let blurTime = 0;
        
        window.addEventListener('blur', () => {
            if (!isLocked) blurTime = Date.now();
        });
        
        window.addEventListener('focus', () => {
            if (!isLocked && blurTime > 0 && Date.now() - blurTime > 100 && Date.now() - blurTime < 5000) {
                lockPlatform('screenshot olindi');
            }
            blurTime = 0;
        });
        
        document.addEventListener('visibilitychange', () => {
            if (!isLocked && document.hidden) {
                blurTime = Date.now();
            } else if (!isLocked && blurTime > 0 && Date.now() - blurTime > 100) {
                lockPlatform('screenshot olindi');
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (isLocked) return;
            if (e.key === 'PrintScreen') {
                e.preventDefault();
                lockPlatform('screenshot olindi (PrtSc)');
            }
            if (e.altKey && e.key === 'PrintScreen') {
                e.preventDefault();
                lockPlatform('screenshot olindi (Alt+PrtSc)');
            }
            if (e.ctrlKey && e.shiftKey && e.key === 'S') {
                e.preventDefault();
                lockPlatform('screenshot olindi');
            }
        });
    }
    
    function lockPlatform(reason) {
        if (isLocked) return;
        lockUntil = Date.now() + LOCK_DURATION;
        isLocked = true;
        localStorage.setItem('screenshot_lockUntil', lockUntil);
        showLockScreen(reason);
    }
    
    loadFromStorage();
    if (!isLocked) detectScreenshot();
})();