// Test.js - IC3 GS6 Test Platformasi uchun savol turlarini boshqarish moduli

class TestManager {
    constructor() {
        this.currentQuestion = null;
        this.userAnswers = new Map();
        this.questionStatus = new Map(); // { questionId: { answered: boolean, correct: boolean, userAnswer: any } }
        this.currentIndex = 0;
        this.questions = [];
        this.currentLevel = 1;
        
        // Callback functions
        this.onUpdateStats = null;
        this.onUpdateProgress = null;
        this.onQuestionRendered = null;
    }

    // Initialize test with questions
    init(questions, level) {
        this.questions = questions;
        this.currentLevel = level;
        this.currentIndex = 0;
        this.userAnswers.clear();
        this.questionStatus.clear();
        
        // Initialize question status
        this.questions.forEach((q, index) => {
            this.questionStatus.set(q.id, {
                answered: false,
                correct: false,
                userAnswer: null,
                index: index
            });
        });
    }

    // Get current question
    getCurrentQuestion() {
        return this.questions[this.currentIndex];
    }

    // Move to next question
    nextQuestion() {
        if (this.currentIndex < this.questions.length - 1) {
            this.currentIndex++;
            return true;
        }
        return false;
    }

    // Move to previous question
    prevQuestion() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            return true;
        }
        return false;
    }

    // Check if question is answered
    isQuestionAnswered(questionId) {
        const status = this.questionStatus.get(questionId);
        return status ? status.answered : false;
    }

    // Get question status
    getQuestionStatus(questionId) {
        return this.questionStatus.get(questionId) || { answered: false, correct: false };
    }

    // Calculate statistics
    getStats() {
        let correct = 0;
        let incorrect = 0;
        
        this.questionStatus.forEach(status => {
            if (status.answered) {
                if (status.correct) {
                    correct++;
                } else {
                    incorrect++;
                }
            }
        });
        
        const total = correct + incorrect;
        const percent = total > 0 ? Math.round((correct / total) * 100) : 0;
        
        return { correct, incorrect, percent, total: this.questions.length };
    }

    // Get progress percentage
    getProgress() {
        const answered = Array.from(this.questionStatus.values()).filter(s => s.answered).length;
        return (answered / this.questions.length) * 100;
    }

    // Set answer for current question
    setAnswer(questionId, answer) {
        const status = this.questionStatus.get(questionId);
        if (status) {
            status.userAnswer = answer;
            status.answered = true;
            this.questionStatus.set(questionId, status);
            
            // Trigger callbacks
            if (this.onUpdateStats) this.onUpdateStats(this.getStats());
            if (this.onUpdateProgress) this.onUpdateProgress(this.getProgress());
        }
    }

    // Check answer correctness
    checkAnswer(question, userAnswer) {
        let isCorrect = false;
        
        switch(question.type) {
            case 1: // Radio - single answer
                isCorrect = this.checkType1(question, userAnswer);
                break;
            case 2: // Checkbox - multiple answers
                isCorrect = this.checkType2(question, userAnswer);
                break;
            case 3: // True/False grid
                isCorrect = this.checkType3(question, userAnswer);
                break;
            case 4: // Drag & Drop
                isCorrect = this.checkType4(question, userAnswer);
                break;
            case 5: // Matching
                isCorrect = this.checkType5(question, userAnswer);
                break;
            default:
                isCorrect = false;
        }
        
        // Update question status with correctness
        const status = this.questionStatus.get(question.id);
        if (status) {
            status.correct = isCorrect;
            this.questionStatus.set(question.id, status);
        }
        
        // Trigger callbacks
        if (this.onUpdateStats) this.onUpdateStats(this.getStats());
        
        return isCorrect;
    }

    // Type 1 checker (Radio)
    checkType1(question, userAnswer) {
        return userAnswer === question.correct;
    }

    // Type 2 checker (Checkbox)
    checkType2(question, userAnswer) {
        if (!userAnswer || !Array.isArray(userAnswer)) return false;
        
        // Sort both arrays for comparison
        const correctSorted = [...question.correct].sort();
        const userSorted = [...userAnswer].sort();
        
        if (correctSorted.length !== userSorted.length) return false;
        
        return correctSorted.every((val, index) => val === userSorted[index]);
    }

    // Type 3 checker (True/False grid)
    checkType3(question, userAnswer) {
        if (!userAnswer || !Array.isArray(userAnswer)) return false;
        if (userAnswer.length !== question.correct.length) return false;
        
        return userAnswer.every((val, index) => val === question.correct[index]);
    }

    // Type 4 checker (Drag & Drop)
    checkType4(question, userAnswer) {
        // For ranking/drag-drop questions
        if (!userAnswer || !Array.isArray(userAnswer)) return false;
        
        // Compare with correct order
        return JSON.stringify(userAnswer) === JSON.stringify(question.correct);
    }

    // Type 5 checker (Matching)
    checkType5(question, userAnswer) {
        if (!userAnswer || typeof userAnswer !== 'object') return false;
        
        // Check each match
        for (let [key, value] of Object.entries(userAnswer)) {
            if (question.correct[key] !== value) {
                return false;
            }
        }
        return true;
    }

    // Get all incorrect questions for review
    getIncorrectQuestions() {
        const incorrect = [];
        this.questionStatus.forEach((status, questionId) => {
            if (status.answered && !status.correct) {
                const question = this.questions.find(q => q.id === questionId);
                if (question) {
                    incorrect.push({
                        ...question,
                        userAnswer: status.userAnswer
                    });
                }
            }
        });
        return incorrect;
    }

    // Reset test
    reset() {
        this.currentIndex = 0;
        this.userAnswers.clear();
        this.questionStatus.clear();
        
        this.questions.forEach((q, index) => {
            this.questionStatus.set(q.id, {
                answered: false,
                correct: false,
                userAnswer: null,
                index: index
            });
        });
        
        if (this.onUpdateStats) this.onUpdateStats(this.getStats());
        if (this.onUpdateProgress) this.onUpdateProgress(this.getProgress());
    }
}

// Question Renderer Class
class QuestionRenderer {
    constructor(containerId, testManager) {
        this.container = document.getElementById(containerId);
        this.testManager = testManager;
        this.currentAnswers = new Map();
    }

    // Main render method
    render(question) {
        if (!this.container) return;
        
        this.container.innerHTML = '';
        this.currentAnswers.clear();
        
        // Set question type display
        const typeElement = document.getElementById('question-type');
        if (typeElement) {
            const typeNames = {
                1: 'Single Answer',
                2: 'Multiple Answer',
                3: 'True/False Grid',
                4: 'Drag & Drop',
                5: 'Matching'
            };
            typeElement.textContent = typeNames[question.type] || `Type ${question.type}`;
        }
        
        // Render based on type
        switch(question.type) {
            case 1:
                this.renderType1(question);
                break;
            case 2:
                this.renderType2(question);
                break;
            case 3:
                this.renderType3(question);
                break;
            case 4:
                this.renderType4(question);
                break;
            case 5:
                this.renderType5(question);
                break;
            default:
                this.container.innerHTML = '<p>Unsupported question type</p>';
        }
        
        // Load previous answer if exists
        const status = this.testManager.getQuestionStatus(question.id);
        if (status.answered && status.userAnswer) {
            this.loadAnswer(question.type, status.userAnswer);
        }
        
        // Trigger callback
        if (this.testManager.onQuestionRendered) {
            this.testManager.onQuestionRendered(question);
        }
    }

    // Type 1: Single Answer (Radio)
    renderType1(question) {
        const wrapper = document.createElement('div');
        wrapper.className = 'type1-wrapper';
        
        question.options.forEach((option, index) => {
            const optionId = `opt-${question.id}-${index}`;
            const letter = option.charAt(0);
            
            const optionDiv = document.createElement('div');
            optionDiv.className = 'radio-option';
            
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = `question-${question.id}`;
            radio.value = letter;
            radio.id = optionId;
            
            const label = document.createElement('label');
            label.htmlFor = optionId;
            label.textContent = option;
            
            optionDiv.appendChild(radio);
            optionDiv.appendChild(label);
            
            // Add click handler
            optionDiv.addEventListener('click', (e) => {
                if (e.target !== radio) {
                    radio.checked = true;
                }
                this.handleType1Change(question, radio.value);
            });
            
            radio.addEventListener('change', () => {
                this.handleType1Change(question, radio.value);
            });
            
            wrapper.appendChild(optionDiv);
        });
        
        this.container.appendChild(wrapper);
    }

    handleType1Change(question, value) {
        this.currentAnswers.set('selected', value);
    }

    // Type 2: Multiple Answer (Checkbox)
    renderType2(question) {
        const wrapper = document.createElement('div');
        wrapper.className = 'type2-wrapper';
        
        const selectedValues = new Set();
        
        question.options.forEach((option, index) => {
            const optionId = `chk-${question.id}-${index}`;
            const letter = option.charAt(0);
            
            const optionDiv = document.createElement('div');
            optionDiv.className = 'checkbox-option';
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.name = `question-${question.id}`;
            checkbox.value = letter;
            checkbox.id = optionId;
            
            const label = document.createElement('label');
            label.htmlFor = optionId;
            label.textContent = option;
            
            optionDiv.appendChild(checkbox);
            optionDiv.appendChild(label);
            
            // Add click handler
            optionDiv.addEventListener('click', (e) => {
                if (e.target !== checkbox) {
                    checkbox.checked = !checkbox.checked;
                }
                this.handleType2Change(question, checkbox, selectedValues);
            });
            
            checkbox.addEventListener('change', () => {
                this.handleType2Change(question, checkbox, selectedValues);
            });
            
            wrapper.appendChild(optionDiv);
        });
        
        this.container.appendChild(wrapper);
    }

    handleType2Change(question, checkbox, selectedSet) {
        if (checkbox.checked) {
            selectedSet.add(checkbox.value);
        } else {
            selectedSet.delete(checkbox.value);
        }
        this.currentAnswers.set('selected', Array.from(selectedSet));
    }

    // Type 3: True/False Grid
    renderType3(question) {
        const wrapper = document.createElement('div');
        wrapper.className = 'type3-wrapper';
        
        const answers = new Array(question.statements.length).fill(null);
        
        question.statements.forEach((statement, index) => {
            const row = document.createElement('div');
            row.className = 'truefalse-row';
            
            const statementText = document.createElement('div');
            statementText.className = 'statement-text';
            statementText.textContent = statement;
            
            const buttonGroup = document.createElement('div');
            buttonGroup.className = 'truefalse-buttons';
            
            const trueBtn = document.createElement('button');
            trueBtn.className = 'truefalse-btn';
            trueBtn.textContent = 'True';
            trueBtn.dataset.index = index;
            trueBtn.dataset.value = 'true';
            
            const falseBtn = document.createElement('button');
            falseBtn.className = 'truefalse-btn';
            falseBtn.textContent = 'False';
            falseBtn.dataset.index = index;
            falseBtn.dataset.value = 'false';
            
            // Add click handlers
            trueBtn.addEventListener('click', () => {
                this.handleType3Change(index, true, answers, [trueBtn, falseBtn]);
            });
            
            falseBtn.addEventListener('click', () => {
                this.handleType3Change(index, false, answers, [trueBtn, falseBtn]);
            });
            
            buttonGroup.appendChild(trueBtn);
            buttonGroup.appendChild(falseBtn);
            
            row.appendChild(statementText);
            row.appendChild(buttonGroup);
            wrapper.appendChild(row);
        });
        
        this.container.appendChild(wrapper);
    }

    handleType3Change(index, value, answersArray, buttons) {
        // Update UI
        buttons[0].classList.remove('selected', 'true');
        buttons[1].classList.remove('selected', 'false');
        
        if (value === true) {
            buttons[0].classList.add('selected', 'true');
        } else {
            buttons[1].classList.add('selected', 'false');
        }
        
        // Update answers
        answersArray[index] = value;
        this.currentAnswers.set('selected', [...answersArray]);
    }

    // Type 4: Drag & Drop (Ranking)
    renderType4(question) {
        const wrapper = document.createElement('div');
        wrapper.className = 'type4-wrapper';
        
        const dragContainer = document.createElement('div');
        dragContainer.className = 'drag-container';
        
        // Items container
        const itemsContainer = document.createElement('div');
        itemsContainer.className = 'drag-items';
        itemsContainer.innerHTML = '<h4>Drag to order:</h4>';
        
        // Create draggable items
        const items = [...question.items];
        const itemElements = [];
        
        items.forEach((item, index) => {
            const itemEl = document.createElement('div');
            itemEl.className = 'drag-item';
            itemEl.draggable = true;
            itemEl.textContent = item;
            itemEl.dataset.index = index;
            itemEl.dataset.item = item;
            
            itemEl.addEventListener('dragstart', this.handleDragStart.bind(this));
            itemEl.addEventListener('dragend', this.handleDragEnd.bind(this));
            
            itemsContainer.appendChild(itemEl);
            itemElements.push(itemEl);
        });
        
        // Targets container
        const targetsContainer = document.createElement('div');
        targetsContainer.className = 'drag-targets';
        targetsContainer.innerHTML = '<h4>Drop in order:</h4>';
        
        // Create drop targets
        const targetElements = [];
        for (let i = 0; i < items.length; i++) {
            const target = document.createElement('div');
            target.className = 'drag-target';
            target.dataset.position = i;
            
            target.addEventListener('dragover', this.handleDragOver.bind(this));
            target.addEventListener('drop', (e) => this.handleDrop(e, target, itemElements));
            
            targetsContainer.appendChild(target);
            targetElements.push(target);
        }
        
        dragContainer.appendChild(itemsContainer);
        dragContainer.appendChild(targetsContainer);
        wrapper.appendChild(dragContainer);
        
        this.container.appendChild(wrapper);
        
        // Store for later use
        this.dragState = {
            items: itemElements,
            targets: targetElements,
            currentOrder: []
        };
    }

    handleDragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.dataset.item);
        e.target.classList.add('dragging');
        this.dragState.draggedItem = e.target;
    }

    handleDragEnd(e) {
        e.target.classList.remove('dragging');
    }

    handleDragOver(e) {
        e.preventDefault();
    }

    handleDrop(e, target, itemElements) {
        e.preventDefault();
        
        const itemText = e.dataTransfer.getData('text/plain');
        const draggedItem = this.dragState.draggedItem;
        
        if (!draggedItem) return;
        
        // Clear target
        target.innerHTML = '';
        
        // Move item to target
        const clonedItem = draggedItem.cloneNode(true);
        clonedItem.draggable = false;
        clonedItem.classList.remove('dragging');
        clonedItem.textContent = itemText;
        
        target.appendChild(clonedItem);
        
        // Hide original item
        draggedItem.style.display = 'none';
        
        // Update order
        this.updateDragOrder();
    }

    updateDragOrder() {
        const order = [];
        this.dragState.targets.forEach(target => {
            if (target.children.length > 0) {
                order.push(target.children[0].textContent);
            }
        });
        
        if (order.length === this.dragState.items.length) {
            this.currentAnswers.set('selected', order);
        }
    }

    // Type 5: Matching
    renderType5(question) {
        const wrapper = document.createElement('div');
        wrapper.className = 'type5-wrapper';
        
        const matchingContainer = document.createElement('div');
        matchingContainer.className = 'matching-container';
        
        // Left side (items)
        const leftSide = document.createElement('div');
        leftSide.className = 'matching-left';
        leftSide.innerHTML = '<h4>Items:</h4>';
        
        const itemElements = [];
        question.items.forEach((item, index) => {
            const itemEl = document.createElement('div');
            itemEl.className = 'matching-item';
            itemEl.textContent = item;
            itemEl.dataset.item = item;
            itemEl.dataset.index = index;
            
            itemEl.addEventListener('click', () => {
                this.handleMatchingItemClick(itemEl, question);
            });
            
            leftSide.appendChild(itemEl);
            itemElements.push(itemEl);
        });
        
        // Right side (targets)
        const rightSide = document.createElement('div');
        rightSide.className = 'matching-right';
        rightSide.innerHTML = '<h4>Targets:</h4>';
        
        const targetElements = [];
        const matches = new Map();
        
        question.targets.forEach((target, index) => {
            const targetEl = document.createElement('div');
            targetEl.className = 'matching-target';
            targetEl.textContent = target;
            targetEl.dataset.target = target;
            targetEl.dataset.index = index;
            
            targetEl.addEventListener('click', () => {
                this.handleMatchingTargetClick(targetEl, question, matches, itemElements);
            });
            
            rightSide.appendChild(targetEl);
            targetElements.push(targetEl);
        });
        
        matchingContainer.appendChild(leftSide);
        matchingContainer.appendChild(rightSide);
        wrapper.appendChild(matchingContainer);
        
        this.container.appendChild(wrapper);
        
        // Store state
        this.matchingState = {
            items: itemElements,
            targets: targetElements,
            matches: matches,
            selectedItem: null
        };
    }

    handleMatchingItemClick(itemEl, question) {
        // Deselect previous
        if (this.matchingState.selectedItem) {
            this.matchingState.selectedItem.classList.remove('selected');
        }
        
        // Select new
        itemEl.classList.add('selected');
        this.matchingState.selectedItem = itemEl;
    }

    handleMatchingTargetClick(targetEl, question, matches, itemElements) {
        if (!this.matchingState.selectedItem) return;
        
        const item = this.matchingState.selectedItem.dataset.item;
        const target = targetEl.dataset.target;
        
        // Check if this target already has a match
        let existingItem = null;
        for (let [key, value] of matches.entries()) {
            if (value === target) {
                existingItem = key;
                break;
            }
        }
        
        // Remove existing match if any
        if (existingItem) {
            matches.delete(existingItem);
            // Re-enable the item
            itemElements.forEach(el => {
                if (el.dataset.item === existingItem) {
                    el.style.opacity = '1';
                    el.classList.remove('matched');
                }
            });
        }
        
        // Set new match
        matches.set(item, target);
        this.matchingState.selectedItem.style.opacity = '0.5';
        this.matchingState.selectedItem.classList.add('matched');
        targetEl.classList.add('matched');
        
        // Clear selection
        this.matchingState.selectedItem.classList.remove('selected');
        this.matchingState.selectedItem = null;
        
        // Check if all matched
        if (matches.size === question.items.length) {
            const matchesObj = {};
            matches.forEach((value, key) => {
                matchesObj[key] = value;
            });
            this.currentAnswers.set('selected', matchesObj);
        }
    }

    // Load previous answer
    loadAnswer(type, answer) {
        if (!answer) return;
        
        switch(type) {
            case 1:
                this.loadType1Answer(answer);
                break;
            case 2:
                this.loadType2Answer(answer);
                break;
            case 3:
                this.loadType3Answer(answer);
                break;
            case 4:
                this.loadType4Answer(answer);
                break;
            case 5:
                this.loadType5Answer(answer);
                break;
        }
    }

    loadType1Answer(answer) {
        const radio = document.querySelector(`input[type="radio"][value="${answer}"]`);
        if (radio) {
            radio.checked = true;
            radio.closest('.radio-option').classList.add('selected');
        }
        this.currentAnswers.set('selected', answer);
    }

    loadType2Answer(answer) {
        if (!Array.isArray(answer)) return;
        
        answer.forEach(value => {
            const checkbox = document.querySelector(`input[type="checkbox"][value="${value}"]`);
            if (checkbox) {
                checkbox.checked = true;
                checkbox.closest('.checkbox-option').classList.add('selected');
            }
        });
        this.currentAnswers.set('selected', answer);
    }

    loadType3Answer(answer) {
        if (!Array.isArray(answer)) return;
        
        const rows = document.querySelectorAll('.truefalse-row');
        rows.forEach((row, index) => {
            const btns = row.querySelectorAll('.truefalse-btn');
            if (answer[index] === true) {
                btns[0].classList.add('selected', 'true');
            } else if (answer[index] === false) {
                btns[1].classList.add('selected', 'false');
            }
        });
        this.currentAnswers.set('selected', answer);
    }

    loadType4Answer(answer) {
        // Complex loading - would require rebuilding the drag-drop UI
        console.log('Loading type 4 answer:', answer);
    }

    loadType5Answer(answer) {
        // Complex loading - would require rebuilding the matching UI
        console.log('Loading type 5 answer:', answer);
    }

    // Get current answer
    getCurrentAnswer() {
        return this.currentAnswers.get('selected');
    }

    // Clear selection
    clearSelection() {
        this.currentAnswers.clear();
        
        // Remove all selected classes
        document.querySelectorAll('.selected, .matched, .truefalse-btn.selected').forEach(el => {
            el.classList.remove('selected', 'matched', 'true', 'false');
        });
        
        // Uncheck all inputs
        document.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach(input => {
            input.checked = false;
        });
    }
}

// Export for use in script.js
window.TestManager = TestManager;
window.QuestionRenderer = QuestionRenderer;