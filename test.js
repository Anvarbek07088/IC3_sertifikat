// Global o'zgaruvchilar
let currentLevel = 'level1';
let currentQuestionIndex = 0;
let currentQuestions = [];
let userAnswers = {};
let userResults = {};

// Sahifa yuklanganda
document.addEventListener('DOMContentLoaded', function() {
    const username = localStorage.getItem('ic3_username');
    if (username) {
        document.getElementById('userDisplay').textContent = username;
    }
    
    loadLevel('level1');
    
    document.querySelectorAll('.level-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.level-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            loadLevel(this.dataset.level);
        });
    });
});

// Levelni yuklash
function loadLevel(level) {
    currentLevel = level;
    
    if (window.questionsData && window.questionsData[level]) {
        currentQuestions = JSON.parse(JSON.stringify(window.questionsData[level]));
    } else {
        currentQuestions = [];
    }
    
    currentQuestionIndex = 0;
    
    updateStats();
    renderQuestionGrid();
    showQuestion(0);
    clearResultMessage();
}

// Savol gridini render qilish
function renderQuestionGrid() {
    const grid = document.getElementById('questionGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    currentQuestions.forEach((q, index) => {
        const questionNumber = document.createElement('div');
        questionNumber.className = 'question-number';
        
        const questionKey = `${currentLevel}_${q.id}`;
        
        if (userResults[questionKey] !== undefined) {
            questionNumber.classList.add(userResults[questionKey] ? 'correct' : 'wrong');
        } else if (userAnswers[questionKey] !== undefined) {
            questionNumber.classList.add('answered');
        }
        
        if (index === currentQuestionIndex) {
            questionNumber.classList.add('active');
        }
        
        questionNumber.textContent = index + 1;
        questionNumber.onclick = () => goToQuestion(index);
        
        grid.appendChild(questionNumber);
    });
}

// Savolga o'tish
function goToQuestion(index) {
    currentQuestionIndex = index;
    showQuestion(index);
    renderQuestionGrid();
    clearResultMessage();
}

// Savolni ko'rsatish
function showQuestion(index) {
    const question = currentQuestions[index];
    if (!question) return;
    
    document.getElementById('questionId').textContent = `ID: ${question.id}`;
    document.getElementById('questionText').textContent = question.question;
    
    let typeText = '';
    switch(question.type) {
        case 1: typeText = 'Bitta javob'; break;
        case 2: typeText = 'Ko\'p javob'; break;
        case 3: typeText = 'True/False'; break;
        case 5: typeText = 'Moslashtirish'; break;
        default: typeText = 'Noma\'lum';
    }
    
    document.getElementById('questionType').textContent = typeText;
    
    renderQuestionByType(question);
    loadSavedAnswer(question);
}

// Savol turiga qarab render qilish
function renderQuestionByType(question) {
    const answerArea = document.getElementById('answerArea');
    
    // Avval rasmni ko'rsatish (agar bor bo'lsa)
    let html = '';
    
    // Rasm qo'shish (barcha savol turlari uchun)
    if (question.img) {
        html += `<div class="question-image">`;
        html += `<img src="${question.img}" alt="Savol rasmi" onerror="this.onerror=null; this.src='placeholder.jpg';">`;
        html += `</div>`;
    }
    
    // Savol turiga qarab qo'shimcha kontent
    switch(question.type) {
        case 1:
            html += renderSingleChoiceHTML(question);
            break;
        case 2:
            html += renderMultipleChoiceHTML(question);
            break;
        case 3:
            html += renderTrueFalseHTML(question);
            break;
        case 5:
            if (question.items && question.targets) {
                html += renderMatchingHTML(question);
            } else if (question.items && !question.targets) {
                html += renderRankingHTML(question);
            }
            break;
    }
    
    // Eslatma qo'shish (agar bor bo'lsa)
    if (question.note) {
        html += `<div class="question-note">${question.note}</div>`;
    }
    
    answerArea.innerHTML = html;
    
    // Ranking uchun drag & drop eventlarini qo'shish
    if (question.type === 5 && question.items && !question.targets) {
        makeRankingDraggable();
    }
}

// Bitta javobli savol HTML
function renderSingleChoiceHTML(question) {
    let html = '<div class="options-container">';
    
    question.options.forEach((opt, index) => {
        const letter = String.fromCharCode(65 + index);
        
        html += `
            <div class="option-item" onclick="selectSingleOption(${index})">
                <input type="radio" name="singleOption" value="${index}">
                <span><strong>${letter}.</strong> ${opt.replace(/^[A-D]\.\s*/, '')}</span>
            </div>
        `;
    });
    
    html += '</div>';
    return html;
}

// Ko'p javobli savol HTML
function renderMultipleChoiceHTML(question) {
    let html = '<div class="options-container">';
    
    question.options.forEach((opt, index) => {
        const letter = String.fromCharCode(65 + index);
        
        html += `
            <div class="option-item" onclick="toggleMultipleOption(${index})">
                <input type="checkbox" name="multipleOption" value="${index}">
                <span><strong>${letter}.</strong> ${opt.replace(/^[A-D]\.\s*/, '')}</span>
            </div>
        `;
    });
    
    html += '</div>';
    return html;
}

// True/False savoli HTML
function renderTrueFalseHTML(question) {
    let html = '<div class="truefalse-container">';
    
    question.statements.forEach((stmt, index) => {
        html += `
            <div class="truefalse-row">
                <span>${index + 1}. ${stmt}</span>
                <div class="truefalse-buttons">
                    <button class="true-btn" onclick="setTrueFalse(${index}, 1)">True</button>
                    <button class="false-btn" onclick="setTrueFalse(${index}, 0)">False</button>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    return html;
}

// Moslashtirish savoli HTML
function renderMatchingHTML(question) {
    let html = '<div class="matching-container">';
    
    // Chap ustun - elementlar (aralashtirilgan)
    html += '<div class="matching-left"><h4>Elementlar</h4>';
    const shuffledItems = [...question.items];
    shuffleArray(shuffledItems);
    
    shuffledItems.forEach(item => {
        html += `<div class="matching-item" draggable="true" ondragstart="dragStart(event)" data-item="${item}">${item}</div>`;
    });
    html += '</div>';
    
    // O'ng ustun - joylar (aralashtirilgan)
    html += '<div class="matching-right"><h4>Joylar</h4>';
    const shuffledTargets = [...question.targets];
    shuffleArray(shuffledTargets);
    
    shuffledTargets.forEach(target => {
        html += `<div class="matching-target" ondrop="drop(event)" ondragover="allowDrop(event)" data-target="${target}">${target}</div>`;
    });
    html += '</div>';
    
    html += '</div>';
    return html;
}

// Tartiblash savoli HTML
function renderRankingHTML(question) {
    let html = '<div class="ranking-container">';
    html += '<p class="ranking-instruction">Elementlarni to\'g\'ri tartibda joylashtiring:</p>';
    
    // Itemlarni aralashtirish
    const shuffledItems = [...question.items];
    shuffleArray(shuffledItems);
    
    shuffledItems.forEach((item, index) => {
        html += `
            <div class="ranking-item" draggable="true" ondragstart="dragStart(event)" data-item="${item}">
                <span class="ranking-number">${index + 1}</span>
                <span>${item}</span>
            </div>
        `;
    });
    
    html += '</div>';
    return html;
}

// Bitta javobli savol - tanlash
function selectSingleOption(index) {
    document.querySelectorAll('.option-item').forEach(item => {
        item.classList.remove('selected');
    });
    
    event.currentTarget.classList.add('selected');
    event.currentTarget.querySelector('input').checked = true;
    
    const question = currentQuestions[currentQuestionIndex];
    const key = `${currentLevel}_${question.id}`;
    userAnswers[key] = index;
    
    updateStats();
    renderQuestionGrid();
    clearResultMessage();
}

// Ko'p javobli savol - tanlash
function toggleMultipleOption(index) {
    const optionItem = event.currentTarget;
    const checkbox = optionItem.querySelector('input');
    
    checkbox.checked = !checkbox.checked;
    
    if (checkbox.checked) {
        optionItem.classList.add('selected');
    } else {
        optionItem.classList.remove('selected');
    }
    
    const selectedValues = [];
    document.querySelectorAll('input[name="multipleOption"]:checked').forEach(cb => {
        selectedValues.push(parseInt(cb.value));
    });
    
    const question = currentQuestions[currentQuestionIndex];
    const key = `${currentLevel}_${question.id}`;
    userAnswers[key] = selectedValues.sort((a, b) => a - b);
    
    updateStats();
    renderQuestionGrid();
    clearResultMessage();
}

// True/False - tanlash
function setTrueFalse(index, value) {
    const btn = event.currentTarget;
    const row = btn.closest('.truefalse-row');
    const trueBtn = row.querySelector('.true-btn');
    const falseBtn = row.querySelector('.false-btn');
    
    trueBtn.classList.remove('selected');
    falseBtn.classList.remove('selected');
    btn.classList.add('selected');
    
    const answers = [];
    document.querySelectorAll('.truefalse-row').forEach((row, i) => {
        if (row.querySelector('.true-btn.selected')) {
            answers[i] = 1;
        } else if (row.querySelector('.false-btn.selected')) {
            answers[i] = 0;
        } else {
            answers[i] = null;
        }
    });
    
    const question = currentQuestions[currentQuestionIndex];
    const key = `${currentLevel}_${question.id}`;
    userAnswers[key] = answers;
    
    updateStats();
    renderQuestionGrid();
    clearResultMessage();
}

// Drag & drop funksiyalari
function allowDrop(ev) {
    ev.preventDefault();
}

function dragStart(ev) {
    ev.dataTransfer.setData('text/plain', ev.target.dataset.item || ev.target.innerText);
    ev.target.classList.add('dragging');
}

function dragEnd(ev) {
    ev.target.classList.remove('dragging');
}

function dragOver(ev) {
    ev.preventDefault();
}

function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData('text/plain');
    const target = ev.target.closest('.matching-target');
    
    if (target) {
        target.textContent = data;
        target.classList.add('filled');
    }
    
    document.querySelectorAll('.dragging').forEach(el => {
        el.classList.remove('dragging');
    });
    
    // Moslashtirish javobini saqlash
    saveMatchingAnswer();
}

// Ranking drop
function rankingDrop(ev) {
    ev.preventDefault();
    const draggedItem = document.querySelector('.dragging');
    const targetItem = ev.target.closest('.ranking-item');
    
    if (draggedItem && targetItem && draggedItem !== targetItem) {
        const container = document.querySelector('.ranking-container');
        const items = [...container.querySelectorAll('.ranking-item')];
        
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
}

// Ranking uchun drag & drop
function makeRankingDraggable() {
    const container = document.querySelector('.ranking-container');
    if (!container) return;
    
    const items = container.querySelectorAll('.ranking-item');
    
    items.forEach(item => {
        item.addEventListener('dragstart', dragStart);
        item.addEventListener('dragend', dragEnd);
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', rankingDrop);
    });
}

// Ranking raqamlarini yangilash
function updateRankingNumbers() {
    const items = document.querySelectorAll('.ranking-item');
    items.forEach((item, index) => {
        const numberSpan = item.querySelector('.ranking-number');
        if (numberSpan) {
            numberSpan.textContent = index + 1;
        }
    });
}

// Moslashtirish javobini saqlash
function saveMatchingAnswer() {
    const matches = {};
    
    document.querySelectorAll('.matching-target').forEach(target => {
        const targetId = target.dataset.target;
        const value = target.textContent.trim();
        if (value && value !== targetId) {
            matches[targetId] = value;
        }
    });
    
    const question = currentQuestions[currentQuestionIndex];
    const key = `${currentLevel}_${question.id}`;
    
    if (Object.keys(matches).length > 0) {
        userAnswers[key] = matches;
        updateStats();
        renderQuestionGrid();
    }
}

// Ranking javobini saqlash
function saveRankingAnswer() {
    const items = document.querySelectorAll('.ranking-item');
    const order = [];
    
    items.forEach(item => {
        const text = item.querySelector('span:last-child').textContent;
        order.push(text);
    });
    
    const question = currentQuestions[currentQuestionIndex];
    const key = `${currentLevel}_${question.id}`;
    userAnswers[key] = order;
    
    updateStats();
    renderQuestionGrid();
}

// Saqlangan javobni yuklash
function loadSavedAnswer(question) {
    const key = `${currentLevel}_${question.id}`;
    const saved = userAnswers[key];
    
    if (saved === undefined) return;
    
    switch(question.type) {
        case 1:
            const radio = document.querySelector(`input[value="${saved}"]`);
            if (radio) {
                radio.checked = true;
                radio.closest('.option-item').classList.add('selected');
            }
            break;
            
        case 2:
            if (Array.isArray(saved)) {
                saved.forEach(val => {
                    const checkbox = document.querySelector(`input[value="${val}"]`);
                    if (checkbox) {
                        checkbox.checked = true;
                        checkbox.closest('.option-item').classList.add('selected');
                    }
                });
            }
            break;
            
        case 3:
            if (Array.isArray(saved)) {
                saved.forEach((val, index) => {
                    if (val !== null) {
                        const rows = document.querySelectorAll('.truefalse-row');
                        if (rows[index]) {
                            const btn = rows[index].querySelector(val === 1 ? '.true-btn' : '.false-btn');
                            if (btn) {
                                btn.classList.add('selected');
                            }
                        }
                    }
                });
            }
            break;
            
        case 5:
            if (question.items && question.targets) {
                // Moslashtirish
                if (typeof saved === 'object' && !Array.isArray(saved)) {
                    document.querySelectorAll('.matching-target').forEach(target => {
                        const targetId = target.dataset.target;
                        if (saved[targetId]) {
                            target.textContent = saved[targetId];
                            target.classList.add('filled');
                        }
                    });
                }
            } else if (question.items) {
                // Ranking
                if (Array.isArray(saved)) {
                    loadRankingAnswer(saved);
                }
            }
            break;
    }
}

// Ranking javobini yuklash
function loadRankingAnswer(savedOrder) {
    const container = document.querySelector('.ranking-container');
    if (!container) return;
    
    const items = container.querySelectorAll('.ranking-item');
    const itemsArray = Array.from(items);
    
    const orderedItems = [];
    savedOrder.forEach(itemText => {
        const found = itemsArray.find(item => 
            item.querySelector('span:last-child').textContent === itemText
        );
        if (found) orderedItems.push(found);
    });
    
    itemsArray.forEach(item => {
        if (!orderedItems.includes(item)) {
            orderedItems.push(item);
        }
    });
    
    container.innerHTML = '';
    orderedItems.forEach((item, index) => {
        const numberSpan = item.querySelector('.ranking-number');
        if (numberSpan) {
            numberSpan.textContent = index + 1;
        }
        container.appendChild(item);
    });
}

// Javobni tekshirish
function checkAnswer() {
    const question = currentQuestions[currentQuestionIndex];
    const key = `${currentLevel}_${question.id}`;
    const userAnswer = userAnswers[key];
    
    if (userAnswer === undefined) {
        showMessage('⚠️ Iltimos, avval javob bering!', 'warning');
        return;
    }
    
    let isCorrect = false;
    let correctDisplay = '';
    
    switch(question.type) {
        case 1:
            isCorrect = (userAnswer === question.correct);
            correctDisplay = String.fromCharCode(65 + question.correct) + '. ' + 
                            question.options[question.correct].replace(/^[A-D]\.\s*/, '');
            break;
            
        case 2:
            if (Array.isArray(userAnswer) && Array.isArray(question.correct)) {
                const userSorted = [...userAnswer].sort((a, b) => a - b);
                const correctSorted = [...question.correct].sort((a, b) => a - b);
                
                isCorrect = (userSorted.length === correctSorted.length && 
                            userSorted.every((val, i) => val === correctSorted[i]));
                
                correctDisplay = question.correct.map(i => 
                    String.fromCharCode(65 + i) + '. ' + question.options[i].replace(/^[A-D]\.\s*/, '')
                ).join('; ');
            }
            break;
            
        case 3:
            if (Array.isArray(userAnswer) && Array.isArray(question.correct)) {
                if (userAnswer.includes(null)) {
                    showMessage('⚠️ Barcha savollarga javob bering!', 'warning');
                    return;
                }
                isCorrect = (userAnswer.length === question.correct.length &&
                            userAnswer.every((val, i) => val === question.correct[i]));
                
                correctDisplay = question.correct.map((v, i) => 
                    `${i+1}: ${v === 1 ? 'True' : 'False'}`
                ).join(', ');
            }
            break;
            
        case 5:
            if (question.items && question.targets) {
                // Moslashtirish
                if (question.correct && typeof question.correct === 'object') {
                    let match = true;
                    for (let [item, target] of Object.entries(question.correct)) {
                        if (userAnswer[target] !== item) {
                            match = false;
                            break;
                        }
                    }
                    isCorrect = match;
                    correctDisplay = 'Moslashtirishni tekshiring';
                }
            } else if (question.items) {
                // Ranking
                if (Array.isArray(question.correct) && Array.isArray(userAnswer)) {
                    isCorrect = (userAnswer.length === question.correct.length &&
                                userAnswer.every((val, i) => val === question.correct[i]));
                    
                    correctDisplay = question.correct.join(' → ');
                }
            }
            break;
    }
    
    userResults[key] = isCorrect;
    
    if (isCorrect) {
        showMessage('✅ To\'g\'ri javob!', 'correct');
    } else {
        showMessage(`❌ Noto'g'ri. To'g'ri javob: ${correctDisplay}`, 'wrong');
    }
    
    updateStats();
    renderQuestionGrid();
}

// Xabarni ko'rsatish
function showMessage(text, type) {
    const messageDiv = document.getElementById('resultMessage');
    messageDiv.textContent = text;
    messageDiv.className = `result-message ${type}`;
}

// Xabarni tozalash
function clearResultMessage() {
    const messageDiv = document.getElementById('resultMessage');
    messageDiv.textContent = '';
    messageDiv.className = 'result-message';
}

// Statistika yangilash
function updateStats() {
    const total = currentQuestions.length;
    const answered = Object.keys(userAnswers).length;
    const correct = Object.values(userResults).filter(v => v === true).length;
    
    document.getElementById('totalQuestions').textContent = total;
    document.getElementById('answeredCount').textContent = answered;
    document.getElementById('correctCount').textContent = correct;
    document.getElementById('remainingCount').textContent = total - answered;
}

// Savolni o'zgartirish
function changeQuestion(direction) {
    if (direction === 'next' && currentQuestionIndex < currentQuestions.length - 1) {
        currentQuestionIndex++;
    } else if (direction === 'prev' && currentQuestionIndex > 0) {
        currentQuestionIndex--;
    } else {
        if (direction === 'next' && currentQuestionIndex === currentQuestions.length - 1) {
            showResults();
        }
        return;
    }
    
    showQuestion(currentQuestionIndex);
    renderQuestionGrid();
    clearResultMessage();
}

// Natijalarni ko'rsatish
function showResults() {
    const modal = document.getElementById('resultsModal');
    
    const total = currentQuestions.length;
    const correct = Object.values(userResults).filter(v => v === true).length;
    const wrong = Object.values(userResults).filter(v => v === false).length;
    const percent = total > 0 ? Math.round((correct / total) * 100) : 0;
    
    document.getElementById('resultTotal').textContent = total;
    document.getElementById('resultCorrect').textContent = correct;
    document.getElementById('resultWrong').textContent = wrong;
    document.getElementById('resultPercent').textContent = percent + '%';
    
    modal.classList.add('active');
}

// Modalni yopish
function closeModal() {
    document.getElementById('resultsModal').classList.remove('active');
}

// Chiqish
function logout() {
    if (confirm('Haqiqatan ham chiqmoqchimisiz?')) {
        localStorage.removeItem('ic3_username');
        localStorage.removeItem('ic3_logged_in');
        window.location.href = 'index.html';
    }
}

// Array ni aralashtirish
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}