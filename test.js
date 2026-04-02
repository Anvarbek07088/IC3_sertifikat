// ========== LEVEL CREDENTIALS ==========
const LEVEL_CREDENTIALS = {
    level1: { login: "student1", password: "level123", name: "🌟 Level 1 - Boshlang'ich" },
    level2: { login: "student2", password: "level456", name: "⚡ Level 2 - O'rta" },
    level3: { login: "student3", password: "level789", name: "🏆 Level 3 - Yuqori" }
};

const LEVEL_TO_KEY = {
    level1: "1",
    level2: "2",
    level3: "3"
};

// ========== GLOBAL O'ZGARUVCHILAR ==========
let currentLevel = null;
let currentQuestions = [];
let currentQuestionIndex = 0;
let userAnswers = {};
let userResults = {};

// ========== SAHIFA YUKLANGANDA ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log('Sahifa yuklandi');
    
    if (typeof questionsData !== 'undefined') {
        console.log('Level1 savollar soni:', questionsData["1"]?.length || 0);
        console.log('Level2 savollar soni:', questionsData["2"]?.length || 0);
        console.log('Level3 savollar soni:', questionsData["3"]?.length || 0);
    }
    
    // Avval saqlangan levelni tekshirish
    const savedLevel = localStorage.getItem('ic3_current_level');
    if (savedLevel && LEVEL_CREDENTIALS[savedLevel]) {
        const savedUsername = localStorage.getItem('ic3_username');
        if (savedUsername) {
            currentLevel = savedLevel;
            const userDisplay = document.getElementById('userDisplay');
            if (userDisplay) userDisplay.innerHTML = `👋 ${savedUsername}`;
            loadLevel(savedLevel);
            showTestInterface();
            return;
        }
    }
    
    showLevelSelection();
    
    const closeBtn = document.querySelector('#loginModal .login-modal-header button');
    if (closeBtn) closeBtn.onclick = closeLoginModal;
    
    window.addEventListener('click', function(e) {
        const modal = document.getElementById('loginModal');
        if (e.target === modal) closeLoginModal();
        const resultsModal = document.getElementById('resultsModal');
        if (e.target === resultsModal) closeModal();
    });
});

// ========== INTERFEYSLARNI KO'RSATISH ==========
function showLevelSelection() {
    const levelSelection = document.getElementById('levelSelection');
    const testWrapper = document.getElementById('testWrapper');
    const loginModal = document.getElementById('loginModal');
    
    if (levelSelection) levelSelection.style.display = 'flex';
    if (testWrapper) testWrapper.style.display = 'none';
    if (loginModal) loginModal.classList.remove('active');
}

function showTestInterface() {
    const levelSelection = document.getElementById('levelSelection');
    const testWrapper = document.getElementById('testWrapper');
    
    if (levelSelection) levelSelection.style.display = 'none';
    if (testWrapper) testWrapper.style.display = 'block';
}

// ========== LOGIN MODAL ==========
let selectedLevelForLogin = null;

function showLoginModal(level) {
    console.log('showLoginModal:', level);
    selectedLevelForLogin = level;
    const modal = document.getElementById('loginModal');
    const modalLevelInfo = document.getElementById('modalLevelInfo');
    
    if (modalLevelInfo && LEVEL_CREDENTIALS[level]) {
        modalLevelInfo.innerHTML = `<span style="color: ${getLevelColor(level)}">${LEVEL_CREDENTIALS[level].name}</span>`;
    }
    
    const loginInput = document.getElementById('loginInput');
    const passwordInput = document.getElementById('passwordInput');
    if (loginInput) loginInput.value = '';
    if (passwordInput) passwordInput.value = '';
    
    const errorDiv = document.getElementById('loginError');
    if (errorDiv) errorDiv.style.display = 'none';
    
    if (modal) modal.classList.add('active');
    if (loginInput) loginInput.focus();
}

function closeLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) modal.classList.remove('active');
    selectedLevelForLogin = null;
}

function getLevelColor(level) {
    const colors = { level1: '#4caf50', level2: '#2196f3', level3: '#ff9800' };
    return colors[level] || '#667eea';
}

// ========== AUTHENTIFIKATSIYA ==========
function authenticate() {
    console.log('authenticate(), selectedLevel:', selectedLevelForLogin);
    
    const loginInput = document.getElementById('loginInput');
    const passwordInput = document.getElementById('passwordInput');
    const errorDiv = document.getElementById('loginError');
    
    const login = loginInput ? loginInput.value.trim() : '';
    const password = passwordInput ? passwordInput.value : '';
    
    if (!login || !password) {
        if (errorDiv) {
            errorDiv.textContent = '❌ Iltimos, login va parolni kiriting!';
            errorDiv.style.display = 'block';
        }
        return;
    }
    
    if (!selectedLevelForLogin) {
        if (errorDiv) {
            errorDiv.textContent = '❌ Iltimos, levelni tanlang!';
            errorDiv.style.display = 'block';
        }
        return;
    }
    
    const credentials = LEVEL_CREDENTIALS[selectedLevelForLogin];
    
    if (login === credentials.login && password === credentials.password) {
        console.log('Authentication SUCCESS!');
        
        localStorage.setItem('ic3_current_level', selectedLevelForLogin);
        localStorage.setItem('ic3_username', login);
        
        closeLoginModal();
        
        // MUHIM: currentLevel ni to'g'ri o'rnatish
        currentLevel = selectedLevelForLogin;
        
        const userDisplay = document.getElementById('userDisplay');
        if (userDisplay) userDisplay.innerHTML = `👋 ${login}`;
        
        // Levelni yuklash
        loadLevel(currentLevel);
        showTestInterface();
    } else {
        if (errorDiv) {
            errorDiv.innerHTML = `❌ Noto'g'ri login yoki parol!<br><br>
            <small>${selectedLevelForLogin.toUpperCase()} uchun:<br>
            👤 Login: ${credentials.login}<br>
            🔑 Parol: ${credentials.password}</small>`;
            errorDiv.style.display = 'block';
        }
    }
}

// ========== LEVELNI YUKLASH ==========
function loadLevel(level) {
    console.log('loadLevel called with:', level);
    
    if (!level) {
        console.error('ERROR: Level is null or undefined!');
        const questionText = document.getElementById('questionText');
        if (questionText) questionText.innerHTML = '⚠️ Level tanlanmagan! Iltimos, qaytadan urinib ko\'ring.';
        return;
    }
    
    const levelKey = LEVEL_TO_KEY[level];
    console.log('Level key:', levelKey);
    
    if (typeof questionsData === 'undefined') {
        console.error('ERROR: questionsData is undefined!');
        const questionText = document.getElementById('questionText');
        if (questionText) questionText.innerHTML = '⚠️ Savollar bazasi topilmadi!';
        return;
    }
    
    const levelData = questionsData[levelKey];
    if (!levelData || levelData.length === 0) {
        console.error('ERROR: No questions found for level:', levelKey);
        const questionText = document.getElementById('questionText');
        if (questionText) questionText.innerHTML = `⚠️ ${LEVEL_CREDENTIALS[level]?.name || level} uchun savollar topilmadi!`;
        return;
    }
    
    currentQuestions = JSON.parse(JSON.stringify(levelData));
    console.log('Loaded', currentQuestions.length, 'questions for', level);
    
    currentQuestionIndex = 0;
    
    const savedAnswers = localStorage.getItem(`ic3_answers_${level}`);
    const savedResults = localStorage.getItem(`ic3_results_${level}`);
    userAnswers = savedAnswers ? JSON.parse(savedAnswers) : {};
    userResults = savedResults ? JSON.parse(savedResults) : {};
    
    const badge = document.getElementById('levelBadge');
    if (badge) {
        badge.textContent = LEVEL_CREDENTIALS[level].name;
        badge.className = `level-badge ${level}`;
    }
    
    updateStats();
    renderQuestionGrid();
    showQuestion(0);
    clearResultMessage();
}

// ========== STATISTIKA ==========
function updateStats() {
    if (!currentQuestions || currentQuestions.length === 0) return;
    
    const total = currentQuestions.length;
    let answered = 0, correct = 0;
    
    currentQuestions.forEach(q => {
        const key = `${currentLevel}_${q.id}`;
        if (userAnswers[key] !== undefined && userAnswers[key] !== null && 
            !(Array.isArray(userAnswers[key]) && userAnswers[key].length === 0)) {
            answered++;
            if (userResults[key] === true) correct++;
        }
    });
    
    const totalEl = document.getElementById('totalQuestions');
    const answeredEl = document.getElementById('answeredCount');
    const correctEl = document.getElementById('correctCount');
    const remainingEl = document.getElementById('remainingCount');
    const progressFill = document.getElementById('progressFill');
    
    if (totalEl) totalEl.textContent = total;
    if (answeredEl) answeredEl.textContent = answered;
    if (correctEl) correctEl.textContent = correct;
    if (remainingEl) remainingEl.textContent = total - answered;
    if (progressFill) progressFill.style.width = total > 0 ? (answered / total) * 100 + '%' : '0%';
}

// ========== SAVOL GRIDI ==========
function renderQuestionGrid() {
    const grid = document.getElementById('questionGrid');
    if (!grid || !currentQuestions) return;
    grid.innerHTML = '';
    
    currentQuestions.forEach((q, index) => {
        const btn = document.createElement('div');
        btn.className = 'question-number';
        const key = `${currentLevel}_${q.id}`;
        
        if (userResults[key] === true) btn.classList.add('correct');
        else if (userResults[key] === false) btn.classList.add('wrong');
        else if (userAnswers[key] !== undefined && userAnswers[key] !== null && 
                 !(Array.isArray(userAnswers[key]) && userAnswers[key].length === 0)) btn.classList.add('answered');
        if (index === currentQuestionIndex) btn.classList.add('active');
        
        btn.textContent = index + 1;
        btn.onclick = (function(idx) { return function() { goToQuestion(idx); }; })(index);
        grid.appendChild(btn);
    });
}

function goToQuestion(index) {
    if (index >= 0 && index < currentQuestions.length) {
        currentQuestionIndex = index;
        showQuestion(index);
        renderQuestionGrid();
        clearResultMessage();
    }
}

// ========== SAVOLNI KO'RSATISH ==========
function showQuestion(index) {
    if (!currentQuestions || currentQuestions.length === 0) return;
    
    const q = currentQuestions[index];
    if (!q) return;
    
    const questionId = document.getElementById('questionId');
    const questionText = document.getElementById('questionText');
    const questionType = document.getElementById('questionType');
    
    if (questionId) questionId.textContent = `#${q.id}`;
    if (questionText) questionText.innerHTML = q.question;
    
    if (questionType) {
        let typeText = '';
        switch(q.type) {
            case 1: typeText = '✅ Bitta to\'g\'ri javob'; break;
            case 2: typeText = '☑️ Ko\'p to\'g\'ri javob'; break;
            case 3: typeText = '🔘 True / False'; break;
            case 5: typeText = '🔗 Moslashtirish / Tartiblash'; break;
            default: typeText = '📝 Savol';
        }
        questionType.textContent = typeText;
    }
    
    renderAnswerArea(q);
    setTimeout(() => loadSavedAnswer(q), 100);
}

function renderAnswerArea(q) {
    const answerArea = document.getElementById('answerArea');
    if (!answerArea) return;
    
    let html = '';
    
    if (q.img) {
        html += `<div style="margin-bottom:15px;"><img src="${q.img}" style="max-width:100%; border-radius:10px;" onerror="this.style.display='none'"></div>`;
    }
    
    switch(q.type) {
        case 1:
            html += '<div class="options-container">';
            q.options.forEach((opt, idx) => {
                const letter = String.fromCharCode(65 + idx);
                let cleanOpt = opt;
                if (typeof opt === 'string') {
                    cleanOpt = opt.replace(/^[A-D]\.\s*/, '');
                }
                html += `
                    <div class="option-item" onclick="selectSingleOption(${idx})">
                        <input type="radio" name="singleOption" value="${idx}" id="opt_${idx}">
                        <label for="opt_${idx}"><strong>${letter}.</strong> ${cleanOpt}</label>
                    </div>
                `;
            });
            html += '</div>';
            break;
            
        case 2:
            html += '<div class="options-container"><p style="color:#ff9800; font-size:12px; margin-bottom:10px;">⚠️ Bir nechta variant to\'g\'ri bo\'lishi mumkin</p>';
            q.options.forEach((opt, idx) => {
                const letter = String.fromCharCode(65 + idx);
                let cleanOpt = opt;
                if (typeof opt === 'string') {
                    cleanOpt = opt.replace(/^[A-D]\.\s*/, '');
                }
                html += `
                    <div class="option-item" onclick="toggleMultipleOption(${idx})">
                        <input type="checkbox" name="multipleOption" value="${idx}" id="opt_${idx}">
                        <label for="opt_${idx}"><strong>${letter}.</strong> ${cleanOpt}</label>
                    </div>
                `;
            });
            html += '</div>';
            break;
            
        case 3:
            html += '<div class="truefalse-container">';
            q.statements.forEach((stmt, idx) => {
                html += `
                    <div class="truefalse-row" data-index="${idx}">
                        <span style="flex:1;">${idx + 1}. ${stmt}</span>
                        <div class="truefalse-buttons">
                            <button type="button" class="true-btn" onclick="setTrueFalse(${idx}, true)">✅ True</button>
                            <button type="button" class="false-btn" onclick="setTrueFalse(${idx}, false)">❌ False</button>
                        </div>
                    </div>
                `;
            });
            html += '</div>';
            break;
            
        case 5:
            if (q.items && q.targets && q.correct && typeof q.correct === 'object') {
                html += `<div class="matching-game-container" id="matchingGameContainer">
                    <div class="matching-items">
                        <h4>📦 Elementlar</h4>
                        <div id="matchingItemsList"></div>
                    </div>
                    <div class="matching-targets">
                        <h4>🎯 Joylar</h4>
                        <div id="matchingTargetsList"></div>
                        <button type="button" class="reset-matching" onclick="resetMatching()">🔄 Qayta boshlash</button>
                    </div>
                </div>`;
            } else if (q.items && Array.isArray(q.items)) {
                html += `<div class="ranking-container" id="rankingContainer"></div>`;
            }
            break;
    }
    
    if (q.note) {
        html += `<div class="question-note" style="margin-top:15px; padding:10px; background:#f0f0f0; border-radius:8px;">💡 ${q.note}</div>`;
    }
    
    answerArea.innerHTML = html;
    
    if (q.type === 5) {
        if (q.items && q.targets && q.correct && typeof q.correct === 'object') {
            setTimeout(() => setupMatchingEvents(q), 50);
        } else if (q.items && Array.isArray(q.items)) {
            setTimeout(() => setupRankingEvents(q), 50);
        }
    }
}

// ========== JAVOB TANLASH ==========
function selectSingleOption(index) {
    const q = currentQuestions[currentQuestionIndex];
    const key = `${currentLevel}_${q.id}`;
    userAnswers[key] = index;
    delete userResults[key];
    saveProgress();
    updateStats();
    renderQuestionGrid();
    clearResultMessage();
}

function toggleMultipleOption(index) {
    const checkboxes = document.querySelectorAll('input[name="multipleOption"]:checked');
    const selectedValues = [];
    checkboxes.forEach(cb => {
        selectedValues.push(parseInt(cb.value));
    });
    selectedValues.sort((a, b) => a - b);
    
    const q = currentQuestions[currentQuestionIndex];
    const key = `${currentLevel}_${q.id}`;
    userAnswers[key] = selectedValues;
    delete userResults[key];
    saveProgress();
    updateStats();
    renderQuestionGrid();
    clearResultMessage();
}

function setTrueFalse(index, value) {
    const btns = document.querySelectorAll(`.truefalse-row .true-btn, .truefalse-row .false-btn`);
    const row = document.querySelector(`.truefalse-row[data-index="${index}"]`);
    if (row) {
        const trueBtn = row.querySelector('.true-btn');
        const falseBtn = row.querySelector('.false-btn');
        if (trueBtn) trueBtn.classList.remove('selected');
        if (falseBtn) falseBtn.classList.remove('selected');
        const clickedBtn = value ? trueBtn : falseBtn;
        if (clickedBtn) clickedBtn.classList.add('selected');
    }
    
    const answers = [];
    const rows = document.querySelectorAll('.truefalse-row');
    rows.forEach((row, i) => {
        if (row.querySelector('.true-btn.selected')) answers[i] = true;
        else if (row.querySelector('.false-btn.selected')) answers[i] = false;
        else answers[i] = null;
    });
    
    const q = currentQuestions[currentQuestionIndex];
    const key = `${currentLevel}_${q.id}`;
    userAnswers[key] = answers;
    delete userResults[key];
    saveProgress();
    updateStats();
    renderQuestionGrid();
    clearResultMessage();
}

// ========== MATCHING/RANKING EVENTLARI ==========
let draggedItemData = null;

function setupMatchingEvents(q) {
    const itemsContainer = document.getElementById('matchingItemsList');
    const targetsContainer = document.getElementById('matchingTargetsList');
    
    if (!itemsContainer || !targetsContainer) return;
    
    const shuffledItems = [...q.items];
    for (let i = shuffledItems.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledItems[i], shuffledItems[j]] = [shuffledItems[j], shuffledItems[i]];
    }
    
    itemsContainer.innerHTML = '';
    shuffledItems.forEach(item => {
        const div = document.createElement('div');
        div.className = 'matching-item';
        div.setAttribute('draggable', 'true');
        div.setAttribute('data-item', item);
        div.textContent = `📌 ${item}`;
        div.addEventListener('dragstart', handleDragStart);
        div.addEventListener('dragend', handleDragEnd);
        itemsContainer.appendChild(div);
    });
    
    targetsContainer.innerHTML = '';
    q.targets.forEach(target => {
        const div = document.createElement('div');
        div.className = 'matching-target';
        div.setAttribute('data-target', target);
        div.textContent = `⬜ ${target}`;
        div.addEventListener('dragover', e => e.preventDefault());
        div.addEventListener('drop', handleDrop);
        targetsContainer.appendChild(div);
    });
}

function handleDragStart(e) {
    draggedItemData = e.target.getAttribute('data-item');
    e.target.classList.add('dragging');
    e.dataTransfer.setData('text/plain', draggedItemData);
    e.dataTransfer.effectAllowed = 'copy';
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
    draggedItemData = null;
}

function handleDrop(e) {
    e.preventDefault();
    const target = e.target.closest('.matching-target');
    if (!target) return;
    
    const draggedItem = draggedItemData || e.dataTransfer.getData('text/plain');
    if (!draggedItem) return;
    
    if (target.classList.contains('filled')) {
        showMessage('⚠️ Bu joy allaqachon to\'ldirilgan!', 'warning');
        return;
    }
    
    target.innerHTML = `📌 <span class="matched-text">${draggedItem}</span>`;
    target.classList.add('filled');
    target.setAttribute('data-matched', draggedItem);
    
    const draggedEl = document.querySelector(`.matching-item[data-item="${draggedItem}"]`);
    if (draggedEl) {
        draggedEl.style.opacity = '0.5';
        draggedEl.style.pointerEvents = 'none';
        draggedEl.setAttribute('draggable', 'false');
    }
    
    saveMatchingAnswer();
}

function saveMatchingAnswer() {
    const matches = {};
    const targets = document.querySelectorAll('.matching-target');
    targets.forEach(target => {
        const matched = target.getAttribute('data-matched');
        if (matched) {
            matches[target.getAttribute('data-target')] = matched;
        }
    });
    
    const q = currentQuestions[currentQuestionIndex];
    const key = `${currentLevel}_${q.id}`;
    userAnswers[key] = matches;
    delete userResults[key];
    saveProgress();
    updateStats();
    renderQuestionGrid();
}

function resetMatching() {
    const q = currentQuestions[currentQuestionIndex];
    const key = `${currentLevel}_${q.id}`;
    delete userAnswers[key];
    delete userResults[key];
    
    showQuestion(currentQuestionIndex);
    saveProgress();
    updateStats();
    renderQuestionGrid();
    showMessage('🔄 Moslashtirish qayta boshlandi!', 'warning');
}

let rankingDragged = null;

function setupRankingEvents(q) {
    const container = document.getElementById('rankingContainer');
    if (!container) return;
    
    const shuffledItems = [...q.items];
    for (let i = shuffledItems.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledItems[i], shuffledItems[j]] = [shuffledItems[j], shuffledItems[i]];
    }
    
    container.innerHTML = '';
    shuffledItems.forEach((item, idx) => {
        const div = document.createElement('div');
        div.className = 'ranking-item';
        div.setAttribute('draggable', 'true');
        div.setAttribute('data-item', item);
        div.innerHTML = `<span class="ranking-number">${idx + 1}</span><span class="ranking-text">${item}</span>`;
        container.appendChild(div);
    });
    
    const items = document.querySelectorAll('.ranking-item');
    items.forEach(item => {
        item.addEventListener('dragstart', rankingDragStart);
        item.addEventListener('dragend', rankingDragEnd);
        item.addEventListener('dragover', rankingDragOver);
        item.addEventListener('drop', rankingDrop);
    });
}

function rankingDragStart(e) {
    rankingDragged = e.target.closest('.ranking-item');
    e.dataTransfer.setData('text/plain', rankingDragged?.getAttribute('data-item') || '');
    e.target.classList.add('dragging');
}

function rankingDragEnd(e) {
    e.target.classList.remove('dragging');
    rankingDragged = null;
}

function rankingDragOver(e) {
    e.preventDefault();
}

function rankingDrop(e) {
    e.preventDefault();
    const target = e.target.closest('.ranking-item');
    if (!target || !rankingDragged || rankingDragged === target) return;
    
    const container = document.querySelector('.ranking-container');
    const items = Array.from(container.children);
    const draggedIdx = items.indexOf(rankingDragged);
    const targetIdx = items.indexOf(target);
    
    if (draggedIdx < targetIdx) {
        target.parentNode.insertBefore(rankingDragged, target.nextSibling);
    } else {
        target.parentNode.insertBefore(rankingDragged, target);
    }
    
    const newItems = document.querySelectorAll('.ranking-item');
    newItems.forEach((item, idx) => {
        const numSpan = item.querySelector('.ranking-number');
        if (numSpan) numSpan.textContent = idx + 1;
    });
    
    saveRankingAnswer();
}

function saveRankingAnswer() {
    const order = [];
    const items = document.querySelectorAll('.ranking-item');
    items.forEach(item => {
        order.push(item.getAttribute('data-item'));
    });
    
    const q = currentQuestions[currentQuestionIndex];
    const key = `${currentLevel}_${q.id}`;
    userAnswers[key] = order;
    delete userResults[key];
    saveProgress();
    updateStats();
    renderQuestionGrid();
}

// ========== JAVOB YUKLASH ==========
function loadSavedAnswer(q) {
    const key = `${currentLevel}_${q.id}`;
    const saved = userAnswers[key];
    if (saved === undefined || saved === null) return;
    
    switch(q.type) {
        case 1:
            const radio = document.querySelector(`input[name="singleOption"][value="${saved}"]`);
            if (radio) {
                radio.checked = true;
                const parent = radio.closest('.option-item');
                if (parent) parent.classList.add('selected');
            }
            break;
        case 2:
            if (Array.isArray(saved)) {
                saved.forEach(val => {
                    const cb = document.querySelector(`input[name="multipleOption"][value="${val}"]`);
                    if (cb) {
                        cb.checked = true;
                        const parent = cb.closest('.option-item');
                        if (parent) parent.classList.add('selected');
                    }
                });
            }
            break;
        case 3:
            if (Array.isArray(saved)) {
                const rows = document.querySelectorAll('.truefalse-row');
                saved.forEach((val, idx) => {
                    if (val !== null && rows[idx]) {
                        const btn = rows[idx].querySelector(val ? '.true-btn' : '.false-btn');
                        if (btn) btn.classList.add('selected');
                    }
                });
            }
            break;
        case 5:
            if (q.items && q.targets && typeof saved === 'object') {
                const targets = document.querySelectorAll('.matching-target');
                targets.forEach(target => {
                    const targetName = target.getAttribute('data-target');
                    if (saved[targetName]) {
                        target.innerHTML = `📌 <span class="matched-text">${saved[targetName]}</span>`;
                        target.classList.add('filled');
                        target.setAttribute('data-matched', saved[targetName]);
                        const item = document.querySelector(`.matching-item[data-item="${saved[targetName]}"]`);
                        if (item) {
                            item.style.opacity = '0.5';
                            item.style.pointerEvents = 'none';
                            item.setAttribute('draggable', 'false');
                        }
                    }
                });
            } else if (q.items && Array.isArray(saved)) {
                setTimeout(() => {
                    const container = document.querySelector('.ranking-container');
                    if (container) {
                        const currentItems = Array.from(container.children);
                        const ordered = [];
                        saved.forEach(text => {
                            const found = currentItems.find(i => i.getAttribute('data-item') === text);
                            if (found) ordered.push(found);
                        });
                        currentItems.forEach(item => {
                            if (!ordered.includes(item)) ordered.push(item);
                        });
                        container.innerHTML = '';
                        ordered.forEach((item, idx) => {
                            const numSpan = item.querySelector('.ranking-number');
                            if (numSpan) numSpan.textContent = idx + 1;
                            container.appendChild(item);
                        });
                    }
                }, 100);
            }
            break;
    }
}

// ========== JAVOBNI TEKSHIRISH ==========
function checkAnswer() {
    if (!currentQuestions || currentQuestions.length === 0) return;
    
    const q = currentQuestions[currentQuestionIndex];
    const key = `${currentLevel}_${q.id}`;
    const userAnswer = userAnswers[key];
    
    if (userAnswer === undefined || userAnswer === null) {
        showMessage('⚠️ Iltimos, avval javob bering!', 'warning');
        return;
    }
    
    if (Array.isArray(userAnswer) && userAnswer.includes(null)) {
        showMessage('⚠️ Barcha True/False savollariga javob bering!', 'warning');
        return;
    }
    
    let isCorrect = false;
    let correctDisplay = '';
    
    switch(q.type) {
        case 1:
            isCorrect = (userAnswer === q.correct);
            correctDisplay = String.fromCharCode(65 + q.correct) + '. ' + (q.options[q.correct] || '').replace(/^[A-D]\.\s*/, '');
            break;
        case 2:
            if (Array.isArray(userAnswer) && Array.isArray(q.correct)) {
                const userSorted = [...userAnswer].sort((a,b)=>a-b);
                const correctSorted = [...q.correct].sort((a,b)=>a-b);
                isCorrect = userSorted.length === correctSorted.length && userSorted.every((v,i) => v === correctSorted[i]);
                correctDisplay = q.correct.map(i => String.fromCharCode(65 + i) + '. ' + (q.options[i] || '').replace(/^[A-D]\.\s*/, '')).join('; ');
            }
            break;
        case 3:
            if (Array.isArray(userAnswer) && Array.isArray(q.correct)) {
                const correctBoolean = q.correct.map(v => v === 1 || v === true);
                isCorrect = userAnswer.length === correctBoolean.length && userAnswer.every((v,i) => v === correctBoolean[i]);
                correctDisplay = correctBoolean.map((v,i) => `${i+1}: ${v ? 'True' : 'False'}`).join(', ');
            }
            break;
        case 5:
            if (q.items && q.targets && q.correct && typeof q.correct === 'object') {
                let match = true;
                for (let [item, target] of Object.entries(q.correct)) {
                    if (userAnswer[target] !== item) { match = false; break; }
                }
                isCorrect = match;
                correctDisplay = 'Moslashtirish jadvaliga qarang';
            } else if (q.items && q.correct && Array.isArray(q.correct)) {
                isCorrect = Array.isArray(userAnswer) && userAnswer.length === q.correct.length && userAnswer.every((v,i) => v === q.correct[i]);
                correctDisplay = q.correct.join(' → ');
            }
            break;
    }
    
    userResults[key] = isCorrect;
    saveProgress();
    highlightCorrectAnswer(q);
    
    if (isCorrect) {
        showMessage('✅ To\'g\'ri javob! Tabriklaymiz!', 'correct');
    } else {
        showMessage(`❌ Noto'g'ri javob!<br>📖 To'g'ri javob: ${correctDisplay}`, 'wrong');
    }
    
    updateStats();
    renderQuestionGrid();
}

function highlightCorrectAnswer(q) {
    clearHighlights();
    
    switch(q.type) {
        case 1:
            const opt = document.querySelector(`.option-item:nth-child(${q.correct + 1})`);
            if (opt) opt.classList.add('correct-highlight');
            break;
        case 2:
            if (Array.isArray(q.correct)) {
                q.correct.forEach(idx => {
                    const opt = document.querySelector(`.option-item:nth-child(${idx + 1})`);
                    if (opt) opt.classList.add('correct-highlight');
                });
            }
            break;
        case 3:
            if (Array.isArray(q.correct)) {
                const rows = document.querySelectorAll('.truefalse-row');
                rows.forEach((row, idx) => {
                    const isCorrect = (q.correct[idx] === 1 || q.correct[idx] === true);
                    const btn = row.querySelector(isCorrect ? '.true-btn' : '.false-btn');
                    if (btn) btn.classList.add('correct-highlight');
                });
            }
            break;
        case 5:
            if (q.items && q.targets && q.correct && typeof q.correct === 'object') {
                const targets = document.querySelectorAll('.matching-target');
                targets.forEach(target => {
                    let correctItem = null;
                    for (let [item, targ] of Object.entries(q.correct)) {
                        if (targ === target.getAttribute('data-target')) { correctItem = item; break; }
                    }
                    if (correctItem && target.getAttribute('data-matched') === correctItem) {
                        target.classList.add('correct-highlight');
                    }
                });
            } else if (q.items && q.correct && Array.isArray(q.correct)) {
                const items = document.querySelectorAll('.ranking-item');
                items.forEach((item, idx) => {
                    const itemText = item.getAttribute('data-item');
                    if (itemText === q.correct[idx]) item.classList.add('correct-highlight');
                });
            }
            break;
    }
}

function clearHighlights() {
    document.querySelectorAll('.option-item, .true-btn, .false-btn, .matching-target, .ranking-item').forEach(el => {
        el.classList.remove('correct-highlight');
    });
}

function showMessage(text, type) {
    const msgDiv = document.getElementById('resultMessage');
    if (!msgDiv) return;
    msgDiv.innerHTML = text;
    msgDiv.className = `result-message ${type}`;
    setTimeout(() => {
        if (msgDiv.innerHTML === text) {
            msgDiv.innerHTML = '';
            msgDiv.className = 'result-message';
        }
    }, 3000);
}

function clearResultMessage() {
    const msgDiv = document.getElementById('resultMessage');
    if (msgDiv) {
        msgDiv.innerHTML = '';
        msgDiv.className = 'result-message';
    }
}

// ========== SAVOLNI O'ZGARTIRISH ==========
function changeQuestion(direction) {
    if (direction === 'next' && currentQuestionIndex < currentQuestions.length - 1) {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
        renderQuestionGrid();
        clearResultMessage();
    } else if (direction === 'prev' && currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion(currentQuestionIndex);
        renderQuestionGrid();
        clearResultMessage();
    } else if (direction === 'next' && currentQuestionIndex === currentQuestions.length - 1) {
        showResults();
    }
}

// ========== NATIJALAR ==========
function showResults() {
    const total = currentQuestions.length;
    const correct = Object.values(userResults).filter(v => v === true).length;
    const percent = total > 0 ? Math.round((correct / total) * 100) : 0;
    
    const resultTotal = document.getElementById('resultTotal');
    const resultCorrect = document.getElementById('resultCorrect');
    const resultWrong = document.getElementById('resultWrong');
    const resultPercent = document.getElementById('resultPercent');
    const resultsModal = document.getElementById('resultsModal');
    
    if (resultTotal) resultTotal.textContent = total;
    if (resultCorrect) resultCorrect.textContent = correct;
    if (resultWrong) resultWrong.textContent = total - correct;
    if (resultPercent) resultPercent.textContent = percent + '%';
    if (resultsModal) resultsModal.classList.add('active');
}

function closeModal() {
    const modal = document.getElementById('resultsModal');
    if (modal) modal.classList.remove('active');
}

function saveProgress() {
    if (currentLevel) {
        localStorage.setItem(`ic3_answers_${currentLevel}`, JSON.stringify(userAnswers));
        localStorage.setItem(`ic3_results_${currentLevel}`, JSON.stringify(userResults));
    }
}

// ========== LOGOUT FUNKSIYASI (TUZATILGAN) ==========
function logout() {
    if (confirm('Haqiqatan ham chiqmoqchimisiz?')) {
        // Barcha ma'lumotlarni tozalash
        localStorage.clear();
        
        // Global o'zgaruvchilarni tozalash
        currentLevel = null;
        currentQuestions = [];
        currentQuestionIndex = 0;
        userAnswers = {};
        userResults = {};
        selectedLevelForLogin = null;
        showCorrectAnswers = false;
        
        // LocalStorage'dagi ma'lumotlarni to'liq tozalash
        localStorage.removeItem('ic3_current_level');
        localStorage.removeItem('ic3_username');
        localStorage.removeItem('ic3_answers_level1');
        localStorage.removeItem('ic3_answers_level2');
        localStorage.removeItem('ic3_answers_level3');
        localStorage.removeItem('ic3_results_level1');
        localStorage.removeItem('ic3_results_level2');
        localStorage.removeItem('ic3_results_level3');
        
        // Sahifani qayta yuklash
        window.location.reload();
    }
}

// ========== LEVELNI YUKLASH (TUZATILGAN) ==========
function loadLevel(level) {
    console.log('loadLevel called with:', level);
    
    // Levelni tekshirish
    if (!level) {
        console.error('ERROR: Level is null or undefined!');
        
        // Agar level null bo'lsa, localStorage'dan o'qishga urinish
        const savedLevel = localStorage.getItem('ic3_current_level');
        if (savedLevel && LEVEL_CREDENTIALS[savedLevel]) {
            console.log('LocalStorage dan level topildi:', savedLevel);
            level = savedLevel;
            currentLevel = level;
        } else {
            const questionText = document.getElementById('questionText');
            if (questionText) {
                questionText.innerHTML = '⚠️ Level tanlanmagan! Iltimos, qaytadan urinib ko\'ring.';
            }
            return;
        }
    }
    
    const levelKey = LEVEL_TO_KEY[level];
    console.log('Level key:', levelKey);
    
    if (typeof questionsData === 'undefined') {
        console.error('ERROR: questionsData is undefined!');
        const questionText = document.getElementById('questionText');
        if (questionText) questionText.innerHTML = '⚠️ Savollar bazasi topilmadi!';
        return;
    }
    
    const levelData = questionsData[levelKey];
    if (!levelData || levelData.length === 0) {
        console.error('ERROR: No questions found for level:', levelKey);
        const questionText = document.getElementById('questionText');
        if (questionText) {
            questionText.innerHTML = `⚠️ ${LEVEL_CREDENTIALS[level]?.name || level} uchun savollar topilmadi!`;
        }
        return;
    }
    
    currentQuestions = JSON.parse(JSON.stringify(levelData));
    console.log('Loaded', currentQuestions.length, 'questions for', level);
    
    currentQuestionIndex = 0;
    
    const savedAnswers = localStorage.getItem(`ic3_answers_${level}`);
    const savedResults = localStorage.getItem(`ic3_results_${level}`);
    userAnswers = savedAnswers ? JSON.parse(savedAnswers) : {};
    userResults = savedResults ? JSON.parse(savedResults) : {};
    
    const badge = document.getElementById('levelBadge');
    if (badge) {
        badge.textContent = LEVEL_CREDENTIALS[level].name;
        badge.className = `level-badge ${level}`;
    }
    
    updateStats();
    renderQuestionGrid();
    showQuestion(0);
    clearResultMessage();
    
    console.log('Level loaded successfully!');
}

// ========== AUTHENTICATE FUNKSIYASI (TUZATILGAN) ==========
function authenticate() {
    console.log('authenticate(), selectedLevel:', selectedLevelForLogin);
    
    const loginInput = document.getElementById('loginInput');
    const passwordInput = document.getElementById('passwordInput');
    const errorDiv = document.getElementById('loginError');
    
    const login = loginInput ? loginInput.value.trim() : '';
    const password = passwordInput ? passwordInput.value : '';
    
    if (!login || !password) {
        if (errorDiv) {
            errorDiv.textContent = '❌ Iltimos, login va parolni kiriting!';
            errorDiv.style.display = 'block';
        }
        return;
    }
    
    if (!selectedLevelForLogin) {
        if (errorDiv) {
            errorDiv.textContent = '❌ Iltimos, levelni tanlang!';
            errorDiv.style.display = 'block';
        }
        return;
    }
    
    const credentials = LEVEL_CREDENTIALS[selectedLevelForLogin];
    
    if (login === credentials.login && password === credentials.password) {
        console.log('Authentication SUCCESS!');
        
        // LocalStorage'ga saqlash
        localStorage.setItem('ic3_current_level', selectedLevelForLogin);
        localStorage.setItem('ic3_username', login);
        
        // Global o'zgaruvchini o'rnatish
        currentLevel = selectedLevelForLogin;
        
        // Modalni yopish
        closeLoginModal();
        
        // Userni ko'rsatish
        const userDisplay = document.getElementById('userDisplay');
        if (userDisplay) userDisplay.innerHTML = `👋 ${login}`;
        
        // Levelni yuklash (to'g'ri parametr bilan)
        loadLevel(currentLevel);
        
        // Test interfeysini ko'rsatish
        showTestInterface();
    } else {
        if (errorDiv) {
            errorDiv.innerHTML = `❌ Noto'g'ri login yoki parol!<br><br>
            <small>${selectedLevelForLogin.toUpperCase()} uchun:<br>
            👤 Login: ${credentials.login}<br>
            🔑 Parol: ${credentials.password}</small>`;
            errorDiv.style.display = 'block';
        }
    }
}

// ========== SAHIFA YUKLANGANDA (TUZATILGAN) ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log('Sahifa yuklandi');
    
    if (typeof questionsData !== 'undefined') {
        console.log('Level1 savollar soni:', questionsData["1"]?.length || 0);
        console.log('Level2 savollar soni:', questionsData["2"]?.length || 0);
        console.log('Level3 savollar soni:', questionsData["3"]?.length || 0);
    }
    
    // Avval saqlangan levelni tekshirish
    const savedLevel = localStorage.getItem('ic3_current_level');
    const savedUsername = localStorage.getItem('ic3_username');
    
    if (savedLevel && LEVEL_CREDENTIALS[savedLevel] && savedUsername) {
        console.log('Saved level found:', savedLevel);
        currentLevel = savedLevel;
        
        const userDisplay = document.getElementById('userDisplay');
        if (userDisplay) userDisplay.innerHTML = `👋 ${savedUsername}`;
        
        // Levelni yuklash
        loadLevel(savedLevel);
        showTestInterface();
        return;
    }
    
    // Agar saqlangan level bo'lmasa, level tanlash ekranini ko'rsatish
    showLevelSelection();
    
    const closeBtn = document.querySelector('#loginModal .login-modal-header button');
    if (closeBtn) closeBtn.onclick = closeLoginModal;
    
    window.addEventListener('click', function(e) {
        const modal = document.getElementById('loginModal');
        if (e.target === modal) closeLoginModal();
        const resultsModal = document.getElementById('resultsModal');
        if (e.target === resultsModal) closeModal();
    });
});

// ========== SHOW LEVEL SELECTION FUNKSIYASI (TUZATILGAN) ==========
function showLevelSelection() {
    const levelSelection = document.getElementById('levelSelection');
    const testWrapper = document.getElementById('testWrapper');
    const loginModal = document.getElementById('loginModal');
    
    if (levelSelection) levelSelection.style.display = 'flex';
    if (testWrapper) testWrapper.style.display = 'none';
    if (loginModal) loginModal.classList.remove('active');
    
    // Level tanlash tugmalarini faollashtirish
    const levelButtons = document.querySelectorAll('.level-btn');
    levelButtons.forEach(btn => {
        btn.onclick = function() {
            const level = this.getAttribute('data-level');
            if (level) {
                showLoginModal(level);
            }
        };
    });
}

// ========== SHOW TEST INTERFACE FUNKSIYASI ==========
function showTestInterface() {
    const levelSelection = document.getElementById('levelSelection');
    const testWrapper = document.getElementById('testWrapper');
    
    if (levelSelection) levelSelection.style.display = 'none';
    if (testWrapper) testWrapper.style.display = 'block';
    
    // Agar currentQuestions mavjud bo'lmasa, qayta yuklash
    if (!currentQuestions || currentQuestions.length === 0) {
        if (currentLevel) {
            loadLevel(currentLevel);
        }
    }
}

// ========== HTML GA QO'SHILADIGAN LEVEL TANLASH TUGMALARI UCHUN ==========
// Agar HTML da level tugmalari bo'lmasa, quyidagi kod ishlatiladi
document.addEventListener('DOMContentLoaded', function() {
    // Level tugmalarini aniqlash va ularga onclick qo'shish
    setTimeout(() => {
        const levelButtons = document.querySelectorAll('.level-btn');
        if (levelButtons.length > 0) {
            levelButtons.forEach(btn => {
                btn.onclick = function() {
                    const level = this.getAttribute('data-level');
                    if (level) {
                        showLoginModal(level);
                    }
                };
            });
        }
        
        // Logout tugmasini aniqlash
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.onclick = logout;
        }
    }, 100);
});

// Enter tugmasi
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const modal = document.getElementById('loginModal');
        if (modal && modal.classList.contains('active')) authenticate();
    }
});

// Global funksiyalar
window.showLoginModal = showLoginModal;
window.closeLoginModal = closeLoginModal;
window.authenticate = authenticate;
window.logout = logout;
window.changeQuestion = changeQuestion;
window.checkAnswer = checkAnswer;
window.selectSingleOption = selectSingleOption;
window.toggleMultipleOption = toggleMultipleOption;
window.setTrueFalse = setTrueFalse;
window.closeModal = closeModal;
window.resetMatching = resetMatching;