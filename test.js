// ========== LEVEL CREDENTIALS ==========
const LEVEL_CREDENTIALS = {
    level1: { login: "student1", password: "level123", name: "🌟 Level 1 - Boshlang'ich" },
    level2: { login: "student2", password: "level456", name: "⚡ Level 2 - O'rta" },
    level3: { login: "student3", password: "level789", name: "🏆 Level 3 - Yuqori" }
};

// Level nomlarini raqamli kalitlarga o'girish
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
    
    // questionsData ni tekshirish
    if (typeof questionsData !== 'undefined') {
        console.log('Level1 savollar soni:', questionsData["1"]?.length || 0);
        console.log('Level2 savollar soni:', questionsData["2"]?.length || 0);
        console.log('Level3 savollar soni:', questionsData["3"]?.length || 0);
    } else {
        console.error('questionsData topilmadi!');
    }
    
    // Faqat level tanlash sahifasini ko'rsatish
    showLevelSelection();
    
    // Login modalni yopish uchun event listener
    const closeBtn = document.querySelector('#loginModal .login-modal-header button');
    if (closeBtn) {
        closeBtn.onclick = closeLoginModal;
    }
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
    console.log('showLoginModal called for level:', level);
    selectedLevelForLogin = level;
    const modal = document.getElementById('loginModal');
    const loginInput = document.getElementById('loginInput');
    const passwordInput = document.getElementById('passwordInput');
    const errorDiv = document.getElementById('loginError');
    const modalLevelInfo = document.getElementById('modalLevelInfo');
    
    if (modalLevelInfo) {
        const credentials = LEVEL_CREDENTIALS[level];
        modalLevelInfo.innerHTML = `<span style="color: ${getLevelColor(level)}">${credentials.name}</span>`;
    }
    
    if (loginInput) loginInput.value = '';
    if (passwordInput) passwordInput.value = '';
    if (errorDiv) errorDiv.style.display = 'none';
    
    if (modal) modal.classList.add('active');
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
    console.log('authenticate() called');
    console.log('selectedLevelForLogin:', selectedLevelForLogin);
    
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
        
        // MUHIM: currentLevel ni o'rnatish
        currentLevel = selectedLevelForLogin;
        console.log('currentLevel set to:', currentLevel);
        
        closeLoginModal();
        
        const userDisplay = document.getElementById('userDisplay');
        if (userDisplay) userDisplay.innerHTML = `👋 ${login}`;
        
        // Levelni yuklash - to'g'ri parametr bilan
        loadLevel(selectedLevelForLogin);
        showTestInterface();
        
    } else {
        if (errorDiv) {
            errorDiv.innerHTML = `❌ Noto'g'ri login yoki parol!<br><br>
            <small>${selectedLevelForLogin.toUpperCase()} uchun ma'lumotlar:<br>
            👤 Login: ${credentials.login}<br>
            🔑 Parol: ${credentials.password}</small>`;
            errorDiv.style.display = 'block';
        }
    }
}

// ========== LEVELNI YUKLASH ==========
function loadLevel(level) {
    console.log('loadLevel called for level:', level);
    console.log('level type:', typeof level);
    
    // Agar level null bo'lsa, localStorage dan olish
    let levelToLoad = level;
    if (!levelToLoad) {
        levelToLoad = localStorage.getItem('ic3_current_level');
        console.log('Level null, loading from storage:', levelToLoad);
    }
    
    if (!levelToLoad) {
        console.error('No level specified!');
        showErrorMessage('Level tanlanmagan!');
        return;
    }
    
    // questionsData mavjudligini tekshirish
    if (typeof questionsData === 'undefined') {
        console.error('questionsData is not defined!');
        showErrorMessage('Savollar bazasi yuklanmadi! Iltimos, sahifani qayta yuklang.');
        return;
    }
    
    // Level nomini raqamli kalitga o'girish
    const levelKey = LEVEL_TO_KEY[levelToLoad];
    console.log('Level key:', levelKey);
    
    if (!levelKey) {
        console.error(`No key mapping for level: ${levelToLoad}`);
        showErrorMessage(`Level kaliti topilmadi: ${levelToLoad}`);
        return;
    }
    
    // Savollarni olish
    let levelData = questionsData[levelKey];
    console.log('questionsData[levelKey]:', levelData ? `${levelData.length} savol` : 'undefined');
    
    if (!levelData) {
        console.error(`No data found for level key: ${levelKey}`);
        showErrorMessage(`${LEVEL_CREDENTIALS[levelToLoad]?.name || levelToLoad} uchun savollar topilmadi!`);
        return;
    }
    
    // Savollarni nusxalash
    currentQuestions = JSON.parse(JSON.stringify(levelData));
    console.log(`Level ${levelToLoad} (key: ${levelKey}) loaded with ${currentQuestions.length} questions`);
    
    if (currentQuestions.length === 0) {
        showErrorMessage('Savollar bazasi bo\'sh!');
        return;
    }
    
    currentQuestionIndex = 0;
    
    // Javoblarni yuklash
    const savedAnswers = localStorage.getItem(`ic3_answers_${levelToLoad}`);
    const savedResults = localStorage.getItem(`ic3_results_${levelToLoad}`);
    
    userAnswers = savedAnswers ? JSON.parse(savedAnswers) : {};
    userResults = savedResults ? JSON.parse(savedResults) : {};
    
    console.log('Loaded answers count:', Object.keys(userAnswers).length);
    
    // UI yangilash
    updateUIForLevel();
    updateStats();
    renderQuestionGrid();
    showQuestion(0);
    clearResultMessage();
    
    console.log('Level loading complete!');
}

function showErrorMessage(message) {
    const questionText = document.getElementById('questionText');
    if (questionText) {
        questionText.innerHTML = `⚠️ ${message}`;
    }
    console.error(message);
}

// ========== UI YANGILASH ==========
function updateUIForLevel() {
    const badge = document.getElementById('levelBadge');
    if (badge && currentLevel && LEVEL_CREDENTIALS[currentLevel]) {
        badge.textContent = LEVEL_CREDENTIALS[currentLevel].name;
        badge.className = `level-badge ${currentLevel}`;
    }
}

// ========== STATISTIKA ==========
function updateStats() {
    const total = currentQuestions.length;
    let answered = 0;
    let correct = 0;
    
    currentQuestions.forEach(q => {
        const key = `${currentLevel}_${q.id}`;
        if (userAnswers[key] !== undefined && userAnswers[key] !== null) {
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
    
    const percent = total > 0 ? (answered / total) * 100 : 0;
    if (progressFill) progressFill.style.width = `${percent}%`;
}

// ========== SAVOL GRIDI ==========
function renderQuestionGrid() {
    const grid = document.getElementById('questionGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    currentQuestions.forEach((q, index) => {
        const btn = document.createElement('div');
        btn.className = 'question-number';
        
        const key = `${currentLevel}_${q.id}`;
        
        if (userResults[key] === true) {
            btn.classList.add('correct');
        } else if (userResults[key] === false) {
            btn.classList.add('wrong');
        } else if (userAnswers[key] !== undefined) {
            btn.classList.add('answered');
        }
        
        if (index === currentQuestionIndex) {
            btn.classList.add('active');
        }
        
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
    const q = currentQuestions[index];
    if (!q) return;
    
    const questionId = document.getElementById('questionId');
    const questionText = document.getElementById('questionText');
    const questionType = document.getElementById('questionType');
    
    if (questionId) questionId.textContent = `#${q.id}`;
    if (questionText) questionText.innerHTML = q.question;
    
    let typeText = '';
    switch(q.type) {
        case 1: typeText = '✅ Bitta to\'g\'ri javob'; break;
        case 2: typeText = '☑️ Ko\'p to\'g\'ri javob'; break;
        case 3: typeText = '🔘 True / False'; break;
        case 5: typeText = '🔗 Moslashtirish / Tartiblash'; break;
        default: typeText = '📝 Savol';
    }
    if (questionType) questionType.textContent = typeText;
    
    renderAnswerArea(q);
    loadSavedAnswer(q);
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
                let cleanOpt = opt.replace(/^[A-D]\.\s*/, '');
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
            html += '<div class="options-container"><p style="color:#ff9800; font-size:13px;">⚠️ Bir nechta variant to\'g\'ri bo\'lishi mumkin</p>';
            q.options.forEach((opt, idx) => {
                const letter = String.fromCharCode(65 + idx);
                let cleanOpt = opt.replace(/^[A-D]\.\s*/, '');
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
            if (q.statements) {
                q.statements.forEach((stmt, idx) => {
                    html += `
                        <div class="truefalse-row">
                            <span>${idx + 1}. ${stmt}</span>
                            <div class="truefalse-buttons">
                                <button class="true-btn" onclick="setTrueFalse(${idx}, true)">✅ True</button>
                                <button class="false-btn" onclick="setTrueFalse(${idx}, false)">❌ False</button>
                            </div>
                        </div>
                    `;
                });
            }
            html += '</div>';
            break;
            
        case 5:
            if (q.items && q.targets) {
                html += '<div class="matching-container"><div class="matching-left"><h4>📦 Elementlar</h4>';
                const shuffledItems = [...q.items];
                shuffleArray(shuffledItems);
                shuffledItems.forEach(item => {
                    html += `<div class="matching-item" draggable="true" data-item="${item}" ondragstart="dragStart(event)" ondragend="dragEnd(event)">📌 ${item}</div>`;
                });
                html += '</div><div class="matching-right"><h4>🎯 Joylar</h4>';
                q.targets.forEach(target => {
                    html += `<div class="matching-target" data-target="${target}" ondragover="dragOver(event)" ondrop="dropOnTarget(event)">⬜ ${target}</div>`;
                });
                html += '</div></div>';
            } else if (q.items) {
                html += '<div class="ranking-container">';
                const shuffledItems = [...q.items];
                shuffleArray(shuffledItems);
                shuffledItems.forEach((item, idx) => {
                    html += `
                        <div class="ranking-item" draggable="true" data-item="${item}" ondragstart="dragStart(event)" ondragend="dragEnd(event)" ondragover="dragOver(event)" ondrop="dropOnRanking(event)">
                            <span class="ranking-number">${idx + 1}</span>
                            <span>${item}</span>
                        </div>
                    `;
                });
                html += '</div>';
            }
            break;
    }
    
    if (q.note) {
        html += `<div style="margin-top:15px; padding:10px; background:#f0f0f0; border-radius:8px; font-size:13px;">💡 ${q.note}</div>`;
    }
    
    answerArea.innerHTML = html;
}

// ========== JAVOB TANLASH FUNKSIYALARI ==========
function selectSingleOption(index) {
    const q = currentQuestions[currentQuestionIndex];
    const key = `${currentLevel}_${q.id}`;
    userAnswers[key] = index;
    delete userResults[key];
    saveProgress();
    updateStats();
    renderQuestionGrid();
    clearResultMessage();
    
    document.querySelectorAll('.option-item').forEach((item, i) => {
        if (i === index) {
            item.classList.add('selected');
            const radio = item.querySelector('input');
            if (radio) radio.checked = true;
        } else {
            item.classList.remove('selected');
            const radio = item.querySelector('input');
            if (radio) radio.checked = false;
        }
    });
}

function toggleMultipleOption(index) {
    const checkbox = document.querySelector(`input[value="${index}"]`);
    if (checkbox) {
        checkbox.checked = !checkbox.checked;
        const optionItem = checkbox.closest('.option-item');
        if (optionItem) optionItem.classList.toggle('selected');
    }
    
    const selectedValues = [];
    document.querySelectorAll('input[name="multipleOption"]:checked').forEach(cb => {
        selectedValues.push(parseInt(cb.value));
    });
    
    const q = currentQuestions[currentQuestionIndex];
    const key = `${currentLevel}_${q.id}`;
    userAnswers[key] = selectedValues.sort((a, b) => a - b);
    delete userResults[key];
    saveProgress();
    updateStats();
    renderQuestionGrid();
    clearResultMessage();
}

function setTrueFalse(index, value) {
    const btn = event.currentTarget;
    const row = btn.closest('.truefalse-row');
    if (row) {
        const trueBtn = row.querySelector('.true-btn');
        const falseBtn = row.querySelector('.false-btn');
        if (trueBtn) trueBtn.classList.remove('selected');
        if (falseBtn) falseBtn.classList.remove('selected');
        btn.classList.add('selected');
    }
    
    const answers = [];
    document.querySelectorAll('.truefalse-row').forEach((row, i) => {
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

// ========== DRAG & DROP FUNKSIYALARI ==========
// ========== MATCHING (MOSLASHTIRISH) UCHUN TO'LIQ QAYTA ISHLANGAN QISM ==========

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
                let cleanOpt = opt.replace(/^[A-D]\.\s*/, '');
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
            html += '<div class="options-container"><p style="color:#ff9800; font-size:13px;">⚠️ Bir nechta variant to\'g\'ri bo\'lishi mumkin</p>';
            q.options.forEach((opt, idx) => {
                const letter = String.fromCharCode(65 + idx);
                let cleanOpt = opt.replace(/^[A-D]\.\s*/, '');
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
            if (q.statements) {
                q.statements.forEach((stmt, idx) => {
                    html += `
                        <div class="truefalse-row">
                            <span>${idx + 1}. ${stmt}</span>
                            <div class="truefalse-buttons">
                                <button class="true-btn" onclick="setTrueFalse(${idx}, true)">✅ True</button>
                                <button class="false-btn" onclick="setTrueFalse(${idx}, false)">❌ False</button>
                            </div>
                        </div>
                    `;
                });
            }
            html += '</div>';
            break;
            
        case 5:
            // Matching (Moslashtirish) - Drag and Drop
            if (q.items && q.targets) {
                html += `
                    <style>
                        .matching-game-container {
                            display: flex;
                            gap: 30px;
                            margin: 20px 0;
                            flex-wrap: wrap;
                        }
                        .matching-items {
                            flex: 1;
                            min-width: 250px;
                            background: #f8f9fa;
                            border-radius: 12px;
                            padding: 15px;
                        }
                        .matching-targets {
                            flex: 1;
                            min-width: 250px;
                            background: #f8f9fa;
                            border-radius: 12px;
                            padding: 15px;
                        }
                        .matching-item {
                            background: white;
                            border: 2px solid #e0e0e0;
                            border-radius: 10px;
                            padding: 12px;
                            margin-bottom: 10px;
                            cursor: grab;
                            transition: all 0.2s;
                            user-select: none;
                        }
                        .matching-item:active {
                            cursor: grabbing;
                        }
                        .matching-item.dragging {
                            opacity: 0.5;
                            cursor: grabbing;
                        }
                        .matching-target {
                            background: white;
                            border: 2px dashed #ccc;
                            border-radius: 10px;
                            padding: 12px;
                            margin-bottom: 10px;
                            min-height: 50px;
                            transition: all 0.2s;
                        }
                        .matching-target.drag-over {
                            border-color: #667eea;
                            background: #f0f0ff;
                        }
                        .matching-target.filled {
                            border: 2px solid #4caf50;
                            background: #e8f5e9;
                        }
                        .matching-target .matched-text {
                            font-weight: bold;
                            color: #4caf50;
                        }
                        .reset-matching {
                            margin-top: 15px;
                            padding: 8px 16px;
                            background: #ff9800;
                            color: white;
                            border: none;
                            border-radius: 8px;
                            cursor: pointer;
                        }
                    </style>
                    <div class="matching-game-container">
                        <div class="matching-items">
                            <h4>📦 Elementlar (surab oling)</h4>
                            <div id="matchingItemsList">
                `;
                
                // Itemslarni aralashtirish
                const shuffledItems = [...q.items];
                shuffleArray(shuffledItems);
                
                shuffledItems.forEach((item, idx) => {
                    html += `
                        <div class="matching-item" draggable="true" data-item="${item.replace(/"/g, '&quot;')}" data-original-item="${item.replace(/"/g, '&quot;')}">
                            📌 ${item}
                        </div>
                    `;
                });
                
                html += `
                            </div>
                        </div>
                        <div class="matching-targets">
                            <h4>🎯 Joylar (pastga tashlang)</h4>
                            <div id="matchingTargetsList">
                `;
                
                q.targets.forEach((target, idx) => {
                    html += `
                        <div class="matching-target" data-target="${target.replace(/"/g, '&quot;')}" data-original-target="${target.replace(/"/g, '&quot;')}">
                            ⬜ ${target}
                        </div>
                    `;
                });
                
                html += `
                            </div>
                            <button class="reset-matching" onclick="resetMatching()">🔄 Qayta boshlash</button>
                        </div>
                    </div>
                `;
            } 
            // Ranking (Tartiblash)
            else if (q.items) {
                html += `
                    <style>
                        .ranking-container {
                            background: #f8f9fa;
                            border-radius: 12px;
                            padding: 15px;
                            margin: 20px 0;
                        }
                        .ranking-item {
                            background: white;
                            border: 2px solid #e0e0e0;
                            border-radius: 10px;
                            padding: 12px;
                            margin-bottom: 10px;
                            cursor: grab;
                            display: flex;
                            align-items: center;
                            gap: 15px;
                        }
                        .ranking-item:active {
                            cursor: grabbing;
                        }
                        .ranking-item.dragging {
                            opacity: 0.5;
                        }
                        .ranking-number {
                            width: 30px;
                            height: 30px;
                            background: #667eea;
                            color: white;
                            border-radius: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-weight: bold;
                        }
                        .ranking-text {
                            flex: 1;
                        }
                        .drag-handle {
                            cursor: grab;
                            color: #999;
                            font-size: 20px;
                        }
                    </style>
                    <div class="ranking-container" id="rankingContainer">
                `;
                
                const shuffledItems = [...q.items];
                shuffleArray(shuffledItems);
                
                shuffledItems.forEach((item, idx) => {
                    html += `
                        <div class="ranking-item" draggable="true" data-item="${item.replace(/"/g, '&quot;')}">
                            <span class="ranking-number">${idx + 1}</span>
                            <span class="ranking-text">${item}</span>
                            <span class="drag-handle">⋮⋮</span>
                        </div>
                    `;
                });
                
                html += `</div>`;
            }
            break;
    }
    
    if (q.note) {
        html += `<div style="margin-top:15px; padding:10px; background:#f0f0f0; border-radius:8px; font-size:13px;">💡 ${q.note}</div>`;
    }
    
    answerArea.innerHTML = html;
    
    // Matching uchun event listenerlarni o'rnatish
    if (q.type === 5 && q.items && q.targets) {
        setupMatchingEvents();
    }
    // Ranking uchun event listenerlarni o'rnatish
    else if (q.type === 5 && q.items && !q.targets) {
        setupRankingEvents();
    }
}

// ========== MATCHING EVENTLARINI O'RNATISH ==========
function setupMatchingEvents() {
    const items = document.querySelectorAll('.matching-item');
    const targets = document.querySelectorAll('.matching-target');
    
    console.log('Setting up matching events, items:', items.length, 'targets:', targets.length);
    
    // Drag start event
    items.forEach(item => {
        item.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text/plain', this.dataset.item);
            this.classList.add('dragging');
        });
        
        item.addEventListener('dragend', function(e) {
            this.classList.remove('dragging');
        });
        
        // Touch qurilmalar uchun (mobil)
        item.addEventListener('touchstart', function(e) {
            e.preventDefault();
            const touch = e.touches[0];
            draggedItem = this;
            draggedItem.classList.add('dragging');
            
            // Touch move va touch end ni qo'shish
            document.addEventListener('touchmove', onTouchMove);
            document.addEventListener('touchend', onTouchEnd);
        });
    });
    
    // Drag over va drop eventlari
    targets.forEach(target => {
        target.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.classList.add('drag-over');
        });
        
        target.addEventListener('dragleave', function(e) {
            this.classList.remove('drag-over');
        });
        
        target.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('drag-over');
            
            const draggedItemText = e.dataTransfer.getData('text/plain');
            const targetElement = this;
            
            // Agar target allaqachon to'ldirilgan bo'lsa, yangi element qo'shmaslik
            if (targetElement.classList.contains('filled')) {
                showMessage('⚠️ Bu joy allaqachon to\'ldirilgan! Avval tozalang.', 'warning');
                return;
            }
            
            // Elementni targetga joylashtirish
            targetElement.innerHTML = `📌 <span class="matched-text">${draggedItemText}</span>`;
            targetElement.classList.add('filled');
            targetElement.dataset.matched = draggedItemText;
            
            // Drag qilingan elementni o'chirish
            const draggedElement = document.querySelector(`.matching-item[data-item="${draggedItemText.replace(/"/g, '&quot;')}"]`);
            if (draggedElement) {
                draggedElement.style.opacity = '0.5';
                draggedElement.style.pointerEvents = 'none';
                draggedElement.setAttribute('draggable', 'false');
            }
            
            // Javobni saqlash
            saveMatchingAnswer();
        });
    });
}

// Touch qurilmalar uchun o'zgaruvchilar
let draggedItem = null;
let touchTarget = null;

function onTouchMove(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    const target = element?.closest('.matching-target');
    
    // Oldingi targetdan drag-over class ni olib tashlash
    if (touchTarget && touchTarget !== target) {
        touchTarget.classList.remove('drag-over');
    }
    
    touchTarget = target;
    if (target) {
        target.classList.add('drag-over');
    }
}

function onTouchEnd(e) {
    e.preventDefault();
    
    if (draggedItem && touchTarget) {
        touchTarget.classList.remove('drag-over');
        
        const draggedItemText = draggedItem.dataset.item;
        const targetElement = touchTarget;
        
        if (targetElement.classList.contains('filled')) {
            showMessage('⚠️ Bu joy allaqachon to\'ldirilgan! Avval tozalang.', 'warning');
        } else {
            targetElement.innerHTML = `📌 <span class="matched-text">${draggedItemText}</span>`;
            targetElement.classList.add('filled');
            targetElement.dataset.matched = draggedItemText;
            
            draggedItem.style.opacity = '0.5';
            draggedItem.style.pointerEvents = 'none';
            draggedItem.setAttribute('draggable', 'false');
            
            saveMatchingAnswer();
        }
    }
    
    if (draggedItem) {
        draggedItem.classList.remove('dragging');
    }
    
    draggedItem = null;
    touchTarget = null;
    
    document.removeEventListener('touchmove', onTouchMove);
    document.removeEventListener('touchend', onTouchEnd);
}

// ========== MATCHING JAVOBINI SAQLASH ==========
function saveMatchingAnswer() {
    const matches = {};
    const targets = document.querySelectorAll('.matching-target');
    
    targets.forEach(target => {
        if (target.dataset.matched) {
            matches[target.dataset.originalTarget || target.dataset.target] = target.dataset.matched;
        }
    });
    
    const q = currentQuestions[currentQuestionIndex];
    const key = `${currentLevel}_${q.id}`;
    userAnswers[key] = matches;
    delete userResults[key];
    saveProgress();
    updateStats();
    renderQuestionGrid();
    
    console.log('Matching answer saved:', matches);
}

// ========== MATCHING NI QAYTA BOSHLASH ==========
function resetMatching() {
    const q = currentQuestions[currentQuestionIndex];
    if (!q || q.type !== 5 || !q.items || !q.targets) return;
    
    // Barcha targetlarni tozalash
    const targets = document.querySelectorAll('.matching-target');
    targets.forEach((target, idx) => {
        const originalTarget = target.dataset.originalTarget || q.targets[idx];
        target.innerHTML = `⬜ ${originalTarget}`;
        target.classList.remove('filled');
        target.dataset.matched = '';
    });
    
    // Barcha itemlarni qayta faollashtirish
    const items = document.querySelectorAll('.matching-item');
    items.forEach(item => {
        item.style.opacity = '1';
        item.style.pointerEvents = 'auto';
        item.setAttribute('draggable', 'true');
    });
    
    // Javobni tozalash
    const key = `${currentLevel}_${q.id}`;
    delete userAnswers[key];
    delete userResults[key];
    saveProgress();
    updateStats();
    renderQuestionGrid();
    clearResultMessage();
    showMessage('🔄 Moslashtirish qayta boshlandi!', 'warning');
}

// ========== RANKING EVENTLARINI O'RNATISH ==========
function setupRankingEvents() {
    const container = document.getElementById('rankingContainer');
    if (!container) return;
    
    const items = container.querySelectorAll('.ranking-item');
    
    items.forEach(item => {
        item.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text/plain', this.dataset.item);
            this.classList.add('dragging');
        });
        
        item.addEventListener('dragend', function(e) {
            this.classList.remove('dragging');
        });
        
        item.addEventListener('dragover', function(e) {
            e.preventDefault();
        });
        
        item.addEventListener('drop', function(e) {
            e.preventDefault();
            const draggedItem = document.querySelector('.ranking-item.dragging');
            const targetItem = this;
            
            if (draggedItem && targetItem && draggedItem !== targetItem) {
                const container = document.querySelector('.ranking-container');
                const items = Array.from(container.querySelectorAll('.ranking-item'));
                const draggedIndex = items.indexOf(draggedItem);
                const targetIndex = items.indexOf(targetItem);
                
                if (draggedIndex < targetIndex) {
                    targetItem.parentNode.insertBefore(draggedItem, targetItem.nextSibling);
                } else {
                    targetItem.parentNode.insertBefore(draggedItem, targetItem);
                }
                
                updateRankingNumbers();
                saveRankingAnswer();
            }
        });
    });
}

// ========== RANKING NUMERLARINI YANGILASH ==========
function updateRankingNumbers() {
    const items = document.querySelectorAll('.ranking-item');
    items.forEach((item, idx) => {
        const numSpan = item.querySelector('.ranking-number');
        if (numSpan) numSpan.textContent = idx + 1;
    });
}

// ========== RANKING JAVOBINI SAQLASH ==========
function saveRankingAnswer() {
    const order = [];
    const items = document.querySelectorAll('.ranking-item');
    items.forEach(item => {
        const textSpan = item.querySelector('.ranking-text');
        if (textSpan) {
            order.push(textSpan.textContent);
        } else {
            order.push(item.dataset.item);
        }
    });
    
    const q = currentQuestions[currentQuestionIndex];
    const key = `${currentLevel}_${q.id}`;
    userAnswers[key] = order;
    delete userResults[key];
    saveProgress();
    updateStats();
    renderQuestionGrid();
    
    console.log('Ranking answer saved:', order);
}

// ========== SAVOLGAN JAVOB YUKLASH ==========
function loadSavedAnswer(q) {
    const key = `${currentLevel}_${q.id}`;
    const saved = userAnswers[key];
    if (saved === undefined) return;
    
    setTimeout(function() {
        switch(q.type) {
            case 1:
                const radio = document.querySelector(`input[value="${saved}"]`);
                if (radio) {
                    radio.checked = true;
                    const optionItem = radio.closest('.option-item');
                    if (optionItem) optionItem.classList.add('selected');
                }
                break;
            case 2:
                if (Array.isArray(saved)) {
                    saved.forEach(val => {
                        const cb = document.querySelector(`input[value="${val}"]`);
                        if (cb) {
                            cb.checked = true;
                            const optionItem = cb.closest('.option-item');
                            if (optionItem) optionItem.classList.add('selected');
                        }
                    });
                }
                break;
            case 3:
                if (Array.isArray(saved)) {
                    saved.forEach((val, idx) => {
                        if (val !== null) {
                            const rows = document.querySelectorAll('.truefalse-row');
                            if (rows[idx]) {
                                const btn = rows[idx].querySelector(val ? '.true-btn' : '.false-btn');
                                if (btn) btn.classList.add('selected');
                            }
                        }
                    });
                }
                break;
            case 5:
                if (q.items && q.targets && typeof saved === 'object') {
                    document.querySelectorAll('.matching-target').forEach(target => {
                        if (saved[target.dataset.target]) {
                            target.innerHTML = `📌 ${saved[target.dataset.target]}`;
                            target.dataset.filled = saved[target.dataset.target];
                        }
                    });
                } else if (q.items && Array.isArray(saved)) {
                    const container = document.querySelector('.ranking-container');
                    if (container) {
                        const items = Array.from(container.querySelectorAll('.ranking-item'));
                        const ordered = [];
                        saved.forEach(itemText => {
                            const found = items.find(i => i.dataset.item === itemText);
                            if (found) ordered.push(found);
                        });
                        items.forEach(item => {
                            if (!ordered.includes(item)) ordered.push(item);
                        });
                        container.innerHTML = '';
                        ordered.forEach((item, idx) => {
                            const numSpan = item.querySelector('.ranking-number');
                            if (numSpan) numSpan.textContent = idx + 1;
                            container.appendChild(item);
                        });
                    }
                }
                break;
        }
    }, 50);
}
// ========== TO'G'RI JAVOBNI YASHIL RANGDA KO'RSATISH ==========
function highlightCorrectAnswer(q, userAnswer) {
    // Avval barcha highlightlarni tozalash
    document.querySelectorAll('.option-item, .true-btn, .false-btn').forEach(el => {
        el.classList.remove('correct-highlight', 'wrong-highlight');
    });
    
    switch(q.type) {
        case 1: // Bitta javob
            // To'g'ri javobni yashil qilish
            const correctOption = document.querySelector(`.option-item:nth-child(${q.correct + 1})`);
            if (correctOption) {
                correctOption.classList.add('correct-highlight');
            }
            // Agar user javobi noto'g'ri bo'lsa, uni qizil qilish
            if (userAnswer !== undefined && userAnswer !== q.correct) {
                const wrongOption = document.querySelector(`.option-item:nth-child(${userAnswer + 1})`);
                if (wrongOption) {
                    wrongOption.classList.add('wrong-highlight');
                }
            }
            break;
            
        case 2: // Ko'p javob
            // To'g'ri javoblarni yashil qilish
            if (Array.isArray(q.correct)) {
                q.correct.forEach(correctIdx => {
                    const correctOpt = document.querySelector(`.option-item:nth-child(${correctIdx + 1})`);
                    if (correctOpt) {
                        correctOpt.classList.add('correct-highlight');
                    }
                });
            }
            // Noto'g'ri tanlanganlarni qizil qilish
            if (Array.isArray(userAnswer)) {
                userAnswer.forEach(wrongIdx => {
                    if (!q.correct.includes(wrongIdx)) {
                        const wrongOpt = document.querySelector(`.option-item:nth-child(${wrongIdx + 1})`);
                        if (wrongOpt) {
                            wrongOpt.classList.add('wrong-highlight');
                        }
                    }
                });
            }
            break;
            
        case 3: // True/False
            if (Array.isArray(q.correct)) {
                const rows = document.querySelectorAll('.truefalse-row');
                rows.forEach((row, idx) => {
                    const isCorrect = q.correct[idx];
                    const correctBtn = row.querySelector(isCorrect ? '.true-btn' : '.false-btn');
                    if (correctBtn) {
                        correctBtn.classList.add('correct-highlight');
                    }
                    
                    // User javobi noto'g'ri bo'lsa
                    if (userAnswer && userAnswer[idx] !== undefined && userAnswer[idx] !== isCorrect) {
                        const wrongBtn = row.querySelector(userAnswer[idx] ? '.true-btn' : '.false-btn');
                        if (wrongBtn) {
                            wrongBtn.classList.add('wrong-highlight');
                        }
                    }
                });
            }
            break;
            
        case 5: // Matching
            if (q.items && q.targets && q.correct) {
                const targets = document.querySelectorAll('.matching-target');
                targets.forEach(target => {
                    const targetName = target.dataset.originalTarget || target.dataset.target;
                    const correctItem = Object.keys(q.correct).find(key => q.correct[key] === targetName);
                    if (correctItem && target.dataset.matched === correctItem) {
                        target.classList.add('correct-highlight');
                    } else if (target.dataset.matched) {
                        target.classList.add('wrong-highlight');
                    }
                });
            } else if (q.items && q.correct && Array.isArray(q.correct)) {
                // Ranking
                const items = document.querySelectorAll('.ranking-item');
                items.forEach((item, idx) => {
                    const itemText = item.querySelector('.ranking-text')?.textContent || item.dataset.item;
                    if (itemText === q.correct[idx]) {
                        item.classList.add('correct-highlight');
                    } else {
                        item.classList.add('wrong-highlight');
                    }
                });
            }
            break;
    }
}

// ========== YANGILANGAN checkAnswer FUNKSIYASI ==========
function checkAnswer() {
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
                isCorrect = userAnswer.length === q.correct.length && userAnswer.every((v,i) => v === q.correct[i]);
                correctDisplay = q.correct.map((v,i) => `${i+1}: ${v ? 'True' : 'False'}`).join(', ');
            }
            break;
        case 5:
            if (q.items && q.targets && q.correct) {
                let match = true;
                for (let [item, target] of Object.entries(q.correct)) {
                    if (userAnswer[target] !== item) {
                        match = false;
                        break;
                    }
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
    
    // To'g'ri javoblarni highlight qilish
    highlightCorrectAnswer(q, userAnswer);
    
    if (isCorrect) {
        showMessage('✅ To\'g\'ri javob! Tabriklaymiz!', 'correct');
    } else {
        showMessage(`❌ Noto'g'ri javob!<br>📖 To'g'ri javob: ${correctDisplay}`, 'wrong');
    }
    
    updateStats();
    renderQuestionGrid();
}

function showMessage(text, type) {
    const msgDiv = document.getElementById('resultMessage');
    if (msgDiv) {
        msgDiv.innerHTML = text;
        msgDiv.className = `result-message ${type}`;
        setTimeout(function() {
            if (msgDiv.innerHTML === text) {
                msgDiv.innerHTML = '';
                msgDiv.className = 'result-message';
            }
        }, 3000);
    }
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
    const wrong = total - correct;
    const percent = total > 0 ? Math.round((correct / total) * 100) : 0;
    
    const resultTotal = document.getElementById('resultTotal');
    const resultCorrect = document.getElementById('resultCorrect');
    const resultWrong = document.getElementById('resultWrong');
    const resultPercent = document.getElementById('resultPercent');
    const resultsModal = document.getElementById('resultsModal');
    
    if (resultTotal) resultTotal.textContent = total;
    if (resultCorrect) resultCorrect.textContent = correct;
    if (resultWrong) resultWrong.textContent = wrong;
    if (resultPercent) resultPercent.textContent = percent + '%';
    if (resultsModal) resultsModal.classList.add('active');
}

function closeModal() {
    const resultsModal = document.getElementById('resultsModal');
    if (resultsModal) resultsModal.classList.remove('active');
}

// ========== PROGRESSNI SAQLASH ==========
function saveProgress() {
    if (currentLevel) {
        localStorage.setItem(`ic3_answers_${currentLevel}`, JSON.stringify(userAnswers));
        localStorage.setItem(`ic3_results_${currentLevel}`, JSON.stringify(userResults));
    }
}

// ========== CHIQISH ==========
function logout() {
    if (confirm('Haqiqatan ham chiqmoqchimisiz?')) {
        localStorage.clear();
        window.location.reload();
    }
}

// ========== YORDAMCHI FUNKSIYA ==========
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Enter tugmasi bilan kirish
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const modal = document.getElementById('loginModal');
        if (modal && modal.classList.contains('active')) {
            authenticate();
        }
    }
});

// Global funksiyalarni window ga qo'shish
window.showLoginModal = showLoginModal;
window.closeLoginModal = closeLoginModal;
window.authenticate = authenticate;
window.logout = logout;
window.changeQuestion = changeQuestion;
window.checkAnswer = checkAnswer;
window.selectSingleOption = selectSingleOption;
window.toggleMultipleOption = toggleMultipleOption;
window.setTrueFalse = setTrueFalse;
window.dragStart = dragStart;
window.dragEnd = dragEnd;
window.dragOver = dragOver;
window.dropOnTarget = dropOnTarget;
window.dropOnRanking = dropOnRanking;
window.closeModal = closeModal;