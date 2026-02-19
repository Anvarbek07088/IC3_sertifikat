// script.js - IC3 GS6 Test Platformasi asosiy dastur kodi

// ==================== XAVFSIZLIK MODULI ====================

class SecurityManager {
    constructor() {
        this.authorizedDevices = ['Device-132545', 'Device-191277', 'Device-166446',"Device-194764","Device-768537",'Device-885750'];
        this.currentDevice = this.generateDeviceId();
        this.devtoolsOpen = false;
        this.init();
    }

    generateDeviceId() {
        // Generate a simple device ID
        const navigatorInfo = navigator.userAgent + navigator.language + screen.width + 'x' + screen.height;
        let hash = 0;
        for (let i = 0; i < navigatorInfo.length; i++) {
            hash = ((hash << 5) - hash) + navigatorInfo.charCodeAt(i);
            hash |= 0; // Convert to 32bit integer
        }
        return 'Device-' + Math.abs(hash).toString().substring(0, 6);
    }

    init() {
        // Disable right click
        document.addEventListener('contextmenu', (e) => e.preventDefault());
        
        // Disable copy/paste
        document.addEventListener('copy', (e) => e.preventDefault());
        document.addEventListener('cut', (e) => e.preventDefault());
        document.addEventListener('paste', (e) => e.preventDefault());
        
        // Disable keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl+C, Ctrl+V, Ctrl+X, Ctrl+S, Ctrl+P
            if (e.ctrlKey && ['c', 'v', 'x', 's', 'p'].includes(e.key.toLowerCase())) {
                e.preventDefault();
                return false;
            }
            
            // Print Screen
            if (e.key === 'PrintScreen') {
                e.preventDefault();
                this.showWarning('Print Screen is disabled during test');
                return false;
            }
            
            // F12
            if (e.key === 'F12') {
                e.preventDefault();
                this.showWarning('Developer tools are disabled');
                return false;
            }
        });
        
        // Detect DevTools
        this.detectDevTools();
    }

    detectDevTools() {
        // Method 1: Check console
        const element = new Image();
        Object.defineProperty(element, 'id', {
            get: () => {
                this.devtoolsOpen = true;
                this.showDevToolsWarning();
            }
        });
        console.log('%c', element);
        
        // Method 2: Check window size
        setInterval(() => {
            const widthThreshold = window.outerWidth - window.innerWidth > 200;
            const heightThreshold = window.outerHeight - window.innerHeight > 200;
            
            if (widthThreshold || heightThreshold) {
                this.devtoolsOpen = true;
                this.showDevToolsWarning();
            }
        }, 1000);
    }

    showDevToolsWarning() {
        const modal = document.getElementById('devtools-warning');
        if (modal) {
            modal.classList.remove('hidden');
        }
    }

    showWarning(message) {
        // Create temporary warning
        const warning = document.createElement('div');
        warning.className = 'security-warning';
        warning.textContent = message;
        warning.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--incorrect-color);
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            z-index: 9999;
            animation: slideIn 0.3s ease;
        `;
        document.body.appendChild(warning);
        
        setTimeout(() => {
            warning.remove();
        }, 3000);
    }

    checkDeviceAuthorization() {
        return this.authorizedDevices.includes(this.currentDevice);
    }
}

// ==================== AUTENTIFIKATSIYA MODULI ====================

class AuthManager {
    constructor(securityManager) {
        this.securityManager = securityManager;
        this.users = [
            { username: 'student', password: 'student123', role: 'student' },
            { username: 'admin', password: 'admin123', role: 'admin' }
        ];
        this.currentUser = null;
        this.isAuthenticated = false;
    }

    login(username, password) {
        // Check device authorization first
        if (!this.securityManager.checkDeviceAuthorization()) {
            return { 
                success: false, 
                message: 'This device is not authorized. Authorized devices: Device-001, Device-002, Device-003' 
            };
        }
        
        // Find user
        const user = this.users.find(u => u.username === username && u.password === password);
        
        if (user) {
            this.currentUser = user;
            this.isAuthenticated = true;
            
            // Save to session
            sessionStorage.setItem('auth', JSON.stringify({
                user: user.username,
                device: this.securityManager.currentDevice,
                timestamp: new Date().toISOString()
            }));
            
            return { success: true, user: user };
        }
        
        return { success: false, message: 'Invalid username or password' };
    }

    logout() {
        this.currentUser = null;
        this.isAuthenticated = false;
        sessionStorage.removeItem('auth');
    }

    checkSession() {
        const session = sessionStorage.getItem('auth');
        if (session) {
            try {
                const data = JSON.parse(session);
                // Check if session is still valid (e.g., not expired)
                return true;
            } catch (e) {
                return false;
            }
        }
        return false;
    }
}

// ==================== TEST UI MANAGER ====================

class TestUIManager {
    constructor() {
        this.testManager = null;
        this.renderer = null;
        this.timerInterval = null;
        this.timerSeconds = 0;
        this.currentLevel = 1;
        
        // DOM Elements
        this.screens = {
            login: document.getElementById('login-screen'),
            level: document.getElementById('level-screen'),
            test: document.getElementById('test-screen'),
            results: document.getElementById('results-screen')
        };
        
        this.init();
    }

    init() {
        // Display device ID
        const deviceDisplay = document.getElementById('device-id-display');
        if (deviceDisplay) {
            deviceDisplay.textContent = window.securityManager.currentDevice;
        }
        
        // Setup event listeners
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Login button
        document.getElementById('login-btn').addEventListener('click', () => this.handleLogin());
        
        // Password input enter key
        document.getElementById('password').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleLogin();
        });
        
        // Logout button
        document.getElementById('logout-btn').addEventListener('click', () => this.handleLogout());
        
        // Level selection
        document.querySelectorAll('.start-level').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const level = e.target.dataset.level;
                if (level) this.startLevel(parseInt(level));
            });
        });
        
        // Test navigation
        document.getElementById('prev-btn').addEventListener('click', () => this.prevQuestion());
        document.getElementById('next-btn').addEventListener('click', () => this.nextQuestion());
        document.getElementById('check-btn').addEventListener('click', () => this.checkAnswer());
        
        // Results screen buttons
        document.getElementById('review-btn').addEventListener('click', () => this.reviewMistakes());
        document.getElementById('retake-btn').addEventListener('click', () => this.retakeTest());
        document.getElementById('back-to-levels-btn').addEventListener('click', () => this.backToLevels());
        
        // Close warning modal
        document.getElementById('close-warning').addEventListener('click', () => {
            document.getElementById('devtools-warning').classList.add('hidden');
        });
    }

    handleLogin() {
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        const errorEl = document.getElementById('login-error');
        
        if (!username || !password) {
            errorEl.textContent = 'Please enter both username and password';
            return;
        }
        
        const result = window.authManager.login(username, password);
        
        if (result.success) {
            errorEl.textContent = '';
            document.getElementById('logged-user').textContent = username;
            this.showScreen('level');
            this.loadUserProgress();
        } else {
            errorEl.textContent = result.message;
        }
    }

    handleLogout() {
        window.authManager.logout();
        this.showScreen('login');
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
    }

    showScreen(screenName) {
        Object.values(this.screens).forEach(screen => {
            screen.classList.remove('active');
        });
        
        if (screenName === 'login') {
            this.screens.login.classList.add('active');
        } else if (screenName === 'level') {
            this.screens.level.classList.add('active');
        } else if (screenName === 'test') {
            this.screens.test.classList.add('active');
        } else if (screenName === 'results') {
            this.screens.results.classList.add('active');
        }
    }

    startLevel(level) {
        if (!questions[`level${level}`] || questions[`level${level}`].length === 0) {
            alert('This level is coming soon!');
            return;
        }
        
        this.currentLevel = level;
        document.getElementById('current-level').textContent = level;
        
        // Initialize test manager
        this.testManager = new TestManager();
        this.testManager.init(questions[`level${level}`], level);
        
        // Initialize renderer
        this.renderer = new QuestionRenderer('question-content', this.testManager);
        
        // Setup callbacks
        this.testManager.onUpdateStats = (stats) => this.updateStats(stats);
        this.testManager.onUpdateProgress = (progress) => this.updateProgress(progress);
        
        // Load first question
        this.loadQuestion(0);
        
        // Start timer
        this.startTimer();
        
        // Show test screen
        this.showScreen('test');
    }

    loadQuestion(index) {
        const question = this.testManager.questions[index];
        if (!question) return;
        
        document.getElementById('question-number').textContent = `Question ${index + 1}/${this.testManager.questions.length}`;
        document.getElementById('question-text').textContent = question.question;
        
        // Hide image container initially
        document.getElementById('question-image').classList.add('hidden');
        
        // Render question
        this.renderer.render(question);
        
        // Update navigation buttons
        this.updateNavButtons();
        
        // Update check button state
        this.updateCheckButton();
    }

    updateNavButtons() {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        
        prevBtn.disabled = this.testManager.currentIndex === 0;
        
        // Next button enabled only if question is answered and checked
        const currentQ = this.testManager.getCurrentQuestion();
        const status = this.testManager.getQuestionStatus(currentQ.id);
        nextBtn.disabled = !status.answered;
    }

    updateCheckButton() {
        const checkBtn = document.getElementById('check-btn');
        const currentQ = this.testManager.getCurrentQuestion();
        const status = this.testManager.getQuestionStatus(currentQ.id);
        
        if (status.answered) {
            checkBtn.textContent = status.correct ? '✔ Correct!' : '✗ Incorrect';
            checkBtn.style.background = status.correct ? 'var(--correct-color)' : 'var(--incorrect-color)';
        } else {
            checkBtn.textContent = '✔ Check Answer';
            checkBtn.style.background = 'var(--success-color)';
        }
    }

    prevQuestion() {
        if (this.testManager.prevQuestion()) {
            this.loadQuestion(this.testManager.currentIndex);
        }
    }

    nextQuestion() {
        if (this.testManager.nextQuestion()) {
            this.loadQuestion(this.testManager.currentIndex);
        } else {
            // Test completed
            this.showResults();
        }
    }

    checkAnswer() {
        const currentQ = this.testManager.getCurrentQuestion();
        const answer = this.renderer.getCurrentAnswer();
        
        if (answer === undefined || answer === null) {
            this.showFeedback('Please select an answer first', 'incorrect');
            return;
        }
        
        // Check answer
        const isCorrect = this.testManager.checkAnswer(currentQ, answer);
        
        // Save answer
        this.testManager.setAnswer(currentQ.id, answer);
        
        // Show feedback
        if (isCorrect) {
            this.showFeedback('✓ Correct!', 'correct');
        } else {
            this.showFeedback('✗ Incorrect. Please review the correct answer.', 'incorrect');
        }
        
        // Update UI
        this.updateNavButtons();
        this.updateCheckButton();
    }

    showFeedback(message, type) {
        const feedbackEl = document.getElementById('feedback');
        feedbackEl.textContent = message;
        feedbackEl.className = `feedback ${type}`;
        feedbackEl.classList.remove('hidden');
        
        setTimeout(() => {
            feedbackEl.classList.add('hidden');
        }, 3000);
    }

    updateStats(stats) {
        document.getElementById('correct-count').textContent = stats.correct;
        document.getElementById('incorrect-count').textContent = stats.incorrect;
        document.getElementById('percent').textContent = stats.percent;
    }

    updateProgress(progress) {
        document.getElementById('test-progress').style.width = `${progress}%`;
    }

    startTimer() {
        this.timerSeconds = 0;
        this.updateTimerDisplay();
        
        this.timerInterval = setInterval(() => {
            this.timerSeconds++;
            this.updateTimerDisplay();
        }, 1000);
    }

    updateTimerDisplay() {
        const minutes = Math.floor(this.timerSeconds / 60);
        const seconds = this.timerSeconds % 60;
        document.getElementById('timer').textContent = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    showResults() {
        this.stopTimer();
        
        const stats = this.testManager.getStats();
        const percent = stats.percent;
        
        // Update results display
        document.getElementById('final-correct').textContent = stats.correct;
        document.getElementById('final-incorrect').textContent = stats.incorrect;
        document.getElementById('final-percent').textContent = percent + '%';
        
        // Certificate status
        const certStatus = document.getElementById('certificate-status');
        if (percent >= 80) {
            certStatus.textContent = '✅ Congratulations! You are ready for certification!';
            certStatus.className = 'certificate-status ready';
        } else {
            certStatus.textContent = '📚 Keep practicing. You need 80% to be certification ready.';
            certStatus.className = 'certificate-status not-ready';
        }
        
        // Show mistakes
        const mistakes = this.testManager.getIncorrectQuestions();
        const mistakesList = document.getElementById('mistakes-list');
        
        if (mistakes.length > 0) {
            let html = '<h4>Questions to review:</h4>';
            mistakes.forEach((q, i) => {
                html += `<div class="mistake-item">${i+1}. ${q.question.substring(0, 60)}...</div>`;
            });
            mistakesList.innerHTML = html;
        } else {
            mistakesList.innerHTML = '<p>Perfect score! No mistakes to review.</p>';
        }
        
        // Save progress
        this.saveProgress();
        
        // Show results screen
        this.showScreen('results');
    }

    reviewMistakes() {
        // Go back to test with only incorrect questions
        const mistakes = this.testManager.getIncorrectQuestions();
        if (mistakes.length === 0) {
            alert('No mistakes to review!');
            return;
        }
        
        // Create a new test with only incorrect questions
        this.testManager = new TestManager();
        this.testManager.init(mistakes, this.currentLevel);
        this.renderer = new QuestionRenderer('question-content', this.testManager);
        
        this.testManager.onUpdateStats = (stats) => this.updateStats(stats);
        this.testManager.onUpdateProgress = (progress) => this.updateProgress(progress);
        
        this.loadQuestion(0);
        this.startTimer();
        this.showScreen('test');
    }

    retakeTest() {
        // Restart the same level
        this.startLevel(this.currentLevel);
    }

    backToLevels() {
        this.stopTimer();
        this.showScreen('level');
        this.loadUserProgress();
    }

    loadUserProgress() {
        // Load from localStorage
        const saved = localStorage.getItem(`ic3_level1_progress`);
        if (saved) {
            try {
                const data = JSON.parse(saved);
                const percent = (data.correct / 49) * 100;
                document.getElementById('level1-progress').style.width = `${percent}%`;
                document.getElementById('level1-stats').textContent = `${data.correct}/49`;
            } catch (e) {
                console.error('Error loading progress:', e);
            }
        }
    }

    saveProgress() {
        const stats = this.testManager.getStats();
        const progress = {
            correct: stats.correct,
            total: stats.total,
            date: new Date().toISOString(),
            level: this.currentLevel
        };
        
        localStorage.setItem(`ic3_level${this.currentLevel}_progress`, JSON.stringify(progress));
    }
}

// ==================== INITIALIZATION ====================

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize security
    window.securityManager = new SecurityManager();
    
    // Initialize auth
    window.authManager = new AuthManager(window.securityManager);
    
    // Initialize UI
    window.uiManager = new TestUIManager();
    
    // Check for existing session
    if (window.authManager.checkSession()) {
        // Auto-login with demo user
        document.getElementById('username').value = 'student';
        document.getElementById('logged-user').textContent = 'student';
        window.uiManager.showScreen('level');
        window.uiManager.loadUserProgress();
    }
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        .security-warning {
            animation: slideIn 0.3s ease;
        }
    `;
    document.head.appendChild(style);
});

