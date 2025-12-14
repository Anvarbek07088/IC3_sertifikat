// Global state
let currentLevel = null;
let currentQuestions = [];
let currentQuestionIndex = 0;
let userAnswers = [];
let checkedAnswers = []; // Track which questions have been checked
let currentScore = 0;
let testStarted = false;

// DOM elements
const homePage = document.getElementById('home-page');
const testPage = document.getElementById('test-page');
const resultsPage = document.getElementById('results-page');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
});

function initializeEventListeners() {
    // Level selection buttons
    document.querySelectorAll('.level-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const level = e.currentTarget.dataset.level;
            startTest(level);
        });
    });

    // Navigation buttons
    document.getElementById('check-answer-btn').addEventListener('click', checkAnswer);
    document.getElementById('next-btn').addEventListener('click', nextQuestion);
    document.getElementById('prev-btn').addEventListener('click', prevQuestion);
    document.getElementById('finish-btn').addEventListener('click', finishTest);
    document.getElementById('restart-btn').addEventListener('click', restartTest);
    document.getElementById('home-btn').addEventListener('click', goHome);
}

function startTest(level) {
    currentLevel = level;
    currentQuestions = tests.filter(test => test.level === level);
    
    if (currentQuestions.length === 0) {
        alert('Bu daraja uchun hozircha savollar mavjud emas. Iltimos, keyinroq qayta urinib ko\'ring.');
        return;
    }

    currentQuestionIndex = 0;
    userAnswers = new Array(currentQuestions.length).fill(null);
    checkedAnswers = new Array(currentQuestions.length).fill(false);
    currentScore = 0;
    testStarted = true;

    showPage('test-page');
    renderQuestion();
    updateProgress();
    updateScore();
}

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

function renderQuestion() {
    const question = currentQuestions[currentQuestionIndex];
    if (!question) return;

    // Update header
    document.getElementById('current-level-name').textContent = question.level;
    document.getElementById('current-question-num').textContent = currentQuestionIndex + 1;
    document.getElementById('total-questions').textContent = currentQuestions.length;

    // Update question text
    document.getElementById('question-text').textContent = question.question;
    const questionUz = document.getElementById('question-text-uz');
    if (question.question_uz) {
        questionUz.textContent = question.question_uz;
        questionUz.style.display = 'block';
    } else {
        questionUz.style.display = 'none';
    }

    // Hide all containers
    document.querySelectorAll('.answer-container').forEach(container => {
        container.classList.add('hidden');
    });

    // Hide feedback
    document.getElementById('answer-feedback').classList.add('hidden');

    // Render based on question type
    switch (question.type) {
        case 'single':
            renderSingleChoice(question);
            break;
        case 'multiple':
            renderMultipleChoice(question);
            break;
        case 'image-hotspot':
            renderImageHotspot(question);
            break;
        case 'true-false-list':
            renderTrueFalseList(question);
            break;
    }

    // Update navigation buttons
    updateNavigationButtons();
    
    // Show correct/incorrect indicators if already checked
    if (checkedAnswers[currentQuestionIndex]) {
        showAnswerFeedback(question);
    }
}

function renderSingleChoice(question) {
    const container = document.getElementById('single-choice-container');
    const optionsList = document.getElementById('single-options');
    optionsList.innerHTML = '';

    question.options.forEach((option, index) => {
        const optionItem = document.createElement('div');
        optionItem.className = 'option-item';
        if (userAnswers[currentQuestionIndex] && userAnswers[currentQuestionIndex].includes(index)) {
            optionItem.classList.add('selected');
        }

        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = `question-${question.id}`;
        radio.value = index;
        radio.id = `option-${index}`;
        radio.checked = userAnswers[currentQuestionIndex] && userAnswers[currentQuestionIndex].includes(index);

        const label = document.createElement('label');
        label.htmlFor = `option-${index}`;
        label.textContent = option;

        optionItem.appendChild(radio);
        optionItem.appendChild(label);

        optionItem.addEventListener('click', () => {
            document.querySelectorAll(`input[name="question-${question.id}"]`).forEach(r => {
                r.checked = false;
                r.closest('.option-item').classList.remove('selected');
            });
            radio.checked = true;
            optionItem.classList.add('selected');
            userAnswers[currentQuestionIndex] = [index];
        });

        optionsList.appendChild(optionItem);
    });

    container.classList.remove('hidden');
}

function renderMultipleChoice(question) {
    const container = document.getElementById('multiple-choice-container');
    const optionsList = document.getElementById('multiple-options');
    optionsList.innerHTML = '';

    question.options.forEach((option, index) => {
        const optionItem = document.createElement('div');
        optionItem.className = 'option-item';
        const isSelected = userAnswers[currentQuestionIndex] && userAnswers[currentQuestionIndex].includes(index);
        if (isSelected) {
            optionItem.classList.add('selected');
        }

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = index;
        checkbox.id = `option-${index}`;
        checkbox.checked = isSelected;

        const label = document.createElement('label');
        label.htmlFor = `option-${index}`;
        label.textContent = option;

        optionItem.appendChild(checkbox);
        optionItem.appendChild(label);

        optionItem.addEventListener('click', () => {
            checkbox.checked = !checkbox.checked;
            if (checkbox.checked) {
                optionItem.classList.add('selected');
            } else {
                optionItem.classList.remove('selected');
            }
            updateMultipleChoiceAnswer(question);
        });

        optionsList.appendChild(optionItem);
    });

    container.classList.remove('hidden');
}

function updateMultipleChoiceAnswer(question) {
    const checkboxes = document.querySelectorAll(`#multiple-options input[type="checkbox"]:checked`);
    const selected = Array.from(checkboxes).map(cb => parseInt(cb.value));
    userAnswers[currentQuestionIndex] = selected.length > 0 ? selected : null;
}

function renderImageHotspot(question) {
    const container = document.getElementById('image-hotspot-container');
    const image = document.getElementById('hotspot-image');
    const canvas = document.getElementById('hotspot-canvas');

    // Use image URL from question data
    if (question.image) {
        image.src = question.image;
    } else {
        image.src = '';
    }
    image.onload = () => {
        // Wait for image to be fully rendered
        setTimeout(() => {
            const imgWidth = image.naturalWidth || image.offsetWidth;
            const imgHeight = image.naturalHeight || image.offsetHeight;
            const displayWidth = image.offsetWidth;
            const displayHeight = image.offsetHeight;
            
            canvas.width = displayWidth;
            canvas.height = displayHeight;
            canvas.style.width = displayWidth + 'px';
            canvas.style.height = displayHeight + 'px';
            
            // Scale hotspots to match display size
            const scaleX = displayWidth / imgWidth;
            const scaleY = displayHeight / imgHeight;
            
            drawHotspots(question, canvas, scaleX, scaleY);
        }, 100);
    };

    canvas.addEventListener('click', (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        handleHotspotClick(question, x, y, canvas);
    });

    container.classList.remove('hidden');
}

function drawHotspots(question, canvas, scaleX = 1, scaleY = 1) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    question.hotspots.forEach(hotspot => {
        const x = hotspot.x * scaleX;
        const y = hotspot.y * scaleY;
        const radius = hotspot.radius * Math.min(scaleX, scaleY);
        
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fillStyle = hotspot.correct ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)';
        ctx.fill();
        ctx.strokeStyle = hotspot.correct ? '#10b981' : '#ef4444';
        ctx.lineWidth = 2;
        ctx.stroke();
    });
}

function handleHotspotClick(question, x, y, canvas) {
    const image = document.getElementById('hotspot-image');
    const imgWidth = image.naturalWidth || image.offsetWidth;
    const imgHeight = image.naturalHeight || image.offsetHeight;
    const displayWidth = image.offsetWidth;
    const displayHeight = image.offsetHeight;
    
    const scaleX = displayWidth / imgWidth;
    const scaleY = displayHeight / imgHeight;
    
    // Convert click coordinates to original image coordinates
    const origX = x / scaleX;
    const origY = y / scaleY;
    
    let clickedHotspot = null;
    let clickedCorrect = false;

    question.hotspots.forEach(hotspot => {
        const distance = Math.sqrt(Math.pow(origX - hotspot.x, 2) + Math.pow(origY - hotspot.y, 2));
        if (distance <= hotspot.radius) {
            clickedHotspot = hotspot.id;
            clickedCorrect = hotspot.correct;
        }
    });

    if (clickedHotspot) {
        userAnswers[currentQuestionIndex] = {
            hotspotId: clickedHotspot,
            correct: clickedCorrect,
            x: x,
            y: y
        };
        
        // Visual feedback
        const ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.arc(x, y, 15, 0, 2 * Math.PI);
        ctx.fillStyle = clickedCorrect ? 'rgba(16, 185, 129, 0.5)' : 'rgba(239, 68, 68, 0.5)';
        ctx.fill();
        ctx.strokeStyle = clickedCorrect ? '#10b981' : '#ef4444';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        // Redraw hotspots
        setTimeout(() => drawHotspots(question, canvas, scaleX, scaleY), 500);
    }
}

function renderTrueFalseList(question) {
    const container = document.getElementById('true-false-container');
    const itemsList = document.getElementById('true-false-items');
    itemsList.innerHTML = '';

    const savedAnswers = userAnswers[currentQuestionIndex] || {};

    question.items.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'true-false-item';

        const textDiv = document.createElement('div');
        textDiv.className = 'item-text';
        textDiv.textContent = item.text;

        const buttonsDiv = document.createElement('div');
        buttonsDiv.className = 'true-false-buttons';

        const trueBtn = document.createElement('button');
        trueBtn.className = 'true-false-btn true';
        trueBtn.textContent = 'To\'g\'ri';
        if (savedAnswers[index] === true) {
            trueBtn.classList.add('selected');
        }

        const falseBtn = document.createElement('button');
        falseBtn.className = 'true-false-btn false';
        falseBtn.textContent = 'Noto\'g\'ri';
        if (savedAnswers[index] === false) {
            falseBtn.classList.add('selected');
        }

        trueBtn.addEventListener('click', () => {
            if (savedAnswers[index] === true) {
                delete savedAnswers[index];
                trueBtn.classList.remove('selected');
            } else {
                savedAnswers[index] = true;
                trueBtn.classList.add('selected');
                falseBtn.classList.remove('selected');
            }
            userAnswers[currentQuestionIndex] = { ...savedAnswers };
        });

        falseBtn.addEventListener('click', () => {
            if (savedAnswers[index] === false) {
                delete savedAnswers[index];
                falseBtn.classList.remove('selected');
            } else {
                savedAnswers[index] = false;
                falseBtn.classList.add('selected');
                trueBtn.classList.remove('selected');
            }
            userAnswers[currentQuestionIndex] = { ...savedAnswers };
        });

        buttonsDiv.appendChild(trueBtn);
        buttonsDiv.appendChild(falseBtn);
        itemDiv.appendChild(textDiv);
        itemDiv.appendChild(buttonsDiv);
        itemsList.appendChild(itemDiv);
    });

    container.classList.remove('hidden');
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const finishBtn = document.getElementById('finish-btn');
    const checkBtn = document.getElementById('check-answer-btn');
    const isChecked = checkedAnswers[currentQuestionIndex];

    // Previous button
    if (currentQuestionIndex === 0) {
        prevBtn.classList.add('hidden');
    } else {
        prevBtn.classList.remove('hidden');
    }

    // Check answer button
    if (isChecked) {
        checkBtn.classList.add('hidden');
    } else {
        checkBtn.classList.remove('hidden');
    }

    // Next/Finish button
    if (isChecked) {
        if (currentQuestionIndex === currentQuestions.length - 1) {
            nextBtn.classList.add('hidden');
            finishBtn.classList.remove('hidden');
        } else {
            nextBtn.classList.remove('hidden');
            finishBtn.classList.add('hidden');
        }
    } else {
        nextBtn.classList.add('hidden');
        finishBtn.classList.add('hidden');
    }
}

function nextQuestion() {
    if (currentQuestionIndex < currentQuestions.length - 1) {
        currentQuestionIndex++;
        renderQuestion();
        updateProgress();
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderQuestion();
        updateProgress();
    }
}

function updateProgress() {
    const progress = ((currentQuestionIndex + 1) / currentQuestions.length) * 100;
    document.getElementById('progress-bar').style.width = progress + '%';
}

function updateScore() {
    const maxPossible = currentQuestions.length * 10;
    document.getElementById('current-score').textContent = currentScore;
    document.getElementById('max-possible-score').textContent = maxPossible;
}

function checkAnswer() {
    const question = currentQuestions[currentQuestionIndex];
    if (!question) return;

    const userAnswer = userAnswers[currentQuestionIndex];
    if (!userAnswer || (Array.isArray(userAnswer) && userAnswer.length === 0) || 
        (typeof userAnswer === 'object' && Object.keys(userAnswer).length === 0)) {
        alert('Iltimos, javobni tanlang!');
        return;
    }

    const isCorrect = checkAnswerCorrect(question, userAnswer);
    checkedAnswers[currentQuestionIndex] = true;

    if (isCorrect) {
        currentScore += question.score || 10;
    }

    updateScore();
    showAnswerFeedback(question, isCorrect);
    updateNavigationButtons();
    highlightCorrectAnswers(question, isCorrect);
}

function checkAnswerCorrect(question, userAnswer) {
    switch (question.type) {
        case 'single':
            if (userAnswer && Array.isArray(userAnswer) && userAnswer.length === 1) {
                return JSON.stringify(userAnswer.sort()) === JSON.stringify(question.correctAnswer.sort());
            }
            return false;

        case 'multiple':
            if (userAnswer && Array.isArray(userAnswer)) {
                return JSON.stringify(userAnswer.sort()) === JSON.stringify(question.correctAnswer.sort());
            }
            return false;

        case 'image-hotspot':
            if (userAnswer && userAnswer.correct) {
                return true;
            }
            return false;

        case 'true-false-list':
            if (userAnswer && typeof userAnswer === 'object') {
                let allCorrect = true;
                question.items.forEach((item, itemIndex) => {
                    if (userAnswer[itemIndex] !== item.correct) {
                        allCorrect = false;
                    }
                });
                const allAnswered = question.items.every((item, itemIndex) => userAnswer.hasOwnProperty(itemIndex));
                return allCorrect && allAnswered;
            }
            return false;

        default:
            return false;
    }
}

function showAnswerFeedback(question, isCorrect = null) {
    const feedbackDiv = document.getElementById('answer-feedback');
    const feedbackIcon = document.getElementById('feedback-icon');
    const feedbackText = document.getElementById('feedback-text');

    if (isCorrect === null) {
        // If already checked, determine correctness
        isCorrect = checkAnswerCorrect(question, userAnswers[currentQuestionIndex]);
    }

    feedbackDiv.classList.remove('hidden');
    feedbackDiv.classList.remove('correct', 'incorrect');
    feedbackDiv.classList.add(isCorrect ? 'correct' : 'incorrect');

    if (isCorrect) {
        feedbackIcon.textContent = '✓';
        feedbackIcon.className = 'feedback-icon correct-icon';
        feedbackText.textContent = 'To\'g\'ri! +' + (question.score || 10) + ' ball';
    } else {
        feedbackIcon.textContent = '✗';
        feedbackIcon.className = 'feedback-icon incorrect-icon';
        feedbackText.textContent = 'Noto\'g\'ri! 0 ball';
    }
}

function highlightCorrectAnswers(question, isCorrect) {
    switch (question.type) {
        case 'single':
            const singleOptions = document.querySelectorAll('#single-options .option-item');
            singleOptions.forEach((item, index) => {
                const radio = item.querySelector('input[type="radio"]');
                if (question.correctAnswer.includes(index)) {
                    item.classList.add('correct-answer');
                }
                if (userAnswers[currentQuestionIndex] && userAnswers[currentQuestionIndex].includes(index) && !isCorrect) {
                    item.classList.add('wrong-answer');
                }
            });
            break;

        case 'multiple':
            const multipleOptions = document.querySelectorAll('#multiple-options .option-item');
            multipleOptions.forEach((item, index) => {
                const checkbox = item.querySelector('input[type="checkbox"]');
                if (question.correctAnswer.includes(index)) {
                    item.classList.add('correct-answer');
                }
                if (userAnswers[currentQuestionIndex] && userAnswers[currentQuestionIndex].includes(index) && !question.correctAnswer.includes(index)) {
                    item.classList.add('wrong-answer');
                }
            });
            break;

        case 'true-false-list':
            const trueFalseItems = document.querySelectorAll('#true-false-items .true-false-item');
            trueFalseItems.forEach((item, index) => {
                const correctAnswer = question.items[index].correct;
                const userAnswer = userAnswers[currentQuestionIndex][index];
                
                if (correctAnswer === userAnswer) {
                    item.classList.add('correct-answer');
                } else {
                    item.classList.add('wrong-answer');
                    // Show correct answer
                    const buttons = item.querySelectorAll('.true-false-btn');
                    buttons.forEach(btn => {
                        if ((btn.classList.contains('true') && correctAnswer === true) ||
                            (btn.classList.contains('false') && correctAnswer === false)) {
                            btn.classList.add('show-correct');
                        }
                    });
                }
            });
            break;
    }
}

function finishTest() {
    const results = calculateResults();
    showResults(results);
}

function calculateResults() {
    let correctCount = 0;
    let totalScore = 0;
    const maxScore = currentQuestions.length * 10;

    currentQuestions.forEach((question, index) => {
        const userAnswer = userAnswers[index];
        let isCorrect = false;

        switch (question.type) {
            case 'single':
                if (userAnswer && Array.isArray(userAnswer) && userAnswer.length === 1) {
                    isCorrect = JSON.stringify(userAnswer.sort()) === JSON.stringify(question.correctAnswer.sort());
                }
                break;

            case 'multiple':
                if (userAnswer && Array.isArray(userAnswer)) {
                    isCorrect = JSON.stringify(userAnswer.sort()) === JSON.stringify(question.correctAnswer.sort());
                }
                break;

            case 'image-hotspot':
                if (userAnswer && userAnswer.correct) {
                    isCorrect = true;
                }
                break;

            case 'true-false-list':
                if (userAnswer && typeof userAnswer === 'object') {
                    let allCorrect = true;
                    question.items.forEach((item, itemIndex) => {
                        if (userAnswer[itemIndex] !== item.correct) {
                            allCorrect = false;
                        }
                    });
                    // Check if all items have answers
                    const allAnswered = question.items.every((item, itemIndex) => userAnswer.hasOwnProperty(itemIndex));
                    isCorrect = allCorrect && allAnswered;
                }
                break;
        }

        if (isCorrect) {
            correctCount++;
            totalScore += question.score || 10;
        }
    });

    return {
        score: totalScore,
        maxScore: maxScore,
        correctCount: correctCount,
        incorrectCount: currentQuestions.length - correctCount,
        totalQuestions: currentQuestions.length,
        percentage: Math.round((totalScore / maxScore) * 100)
    };
}

function showResults(results) {
    showPage('results-page');

    // Update level badge
    document.getElementById('results-level-name').textContent = currentLevel;

    // Update score
    document.getElementById('score-value').textContent = results.score;
    document.getElementById('max-score').textContent = results.maxScore;
    document.getElementById('score-percent').textContent = results.percentage + '%';

    // Update stats
    document.getElementById('correct-count').textContent = results.correctCount;
    document.getElementById('incorrect-count').textContent = results.incorrectCount;
    document.getElementById('total-count').textContent = results.totalQuestions;

    // Update circular progress
    const circumference = 2 * Math.PI * 90;
    const offset = circumference - (results.percentage / 100) * circumference;
    const scoreCircle = document.getElementById('score-circle');
    scoreCircle.style.strokeDashoffset = offset;
}

function restartTest() {
    startTest(currentLevel);
}

function goHome() {
    showPage('home-page');
    currentLevel = null;
    currentQuestions = [];
    currentQuestionIndex = 0;
    userAnswers = [];
    testStarted = false;
}

