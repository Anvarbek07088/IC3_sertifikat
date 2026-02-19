// Test.js - IC3 GS6 Test Platformasi
// Rasm qo'llab-quvvatlash bilan

class TestManager {
  constructor() {
    this.currentQuestion = null;
    this.userAnswers = new Map();
    this.questionStatus = new Map();
    this.currentIndex = 0;
    this.questions = [];
    this.currentLevel = 1;

    this.onUpdateStats = null;
    this.onUpdateProgress = null;
    this.onQuestionRendered = null;
  }

  init(questions, level) {
    this.questions = questions;
    this.currentLevel = level;
    this.currentIndex = 0;
    this.userAnswers.clear();
    this.questionStatus.clear();

    this.questions.forEach((q, index) => {
      this.questionStatus.set(q.id, {
        answered: false,
        correct: false,
        userAnswer: null,
        index: index,
      });
    });
  }

  getCurrentQuestion() {
    return this.questions[this.currentIndex];
  }

  nextQuestion() {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
      return true;
    }
    return false;
  }

  prevQuestion() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      return true;
    }
    return false;
  }

  isQuestionAnswered(questionId) {
    const status = this.questionStatus.get(questionId);
    return status ? status.answered : false;
  }

  getQuestionStatus(questionId) {
    return (
      this.questionStatus.get(questionId) || { answered: false, correct: false }
    );
  }

  getStats() {
    let correct = 0;
    let incorrect = 0;

    this.questionStatus.forEach((status) => {
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

    return {
      correct,
      incorrect,
      percent,
      total: this.questions.length,
      answered: total,
    };
  }

  getProgress() {
    const answered = Array.from(this.questionStatus.values()).filter(
      (s) => s.answered,
    ).length;
    return (answered / this.questions.length) * 100;
  }

  setAnswer(questionId, answer) {
    const status = this.questionStatus.get(questionId);
    if (status) {
      status.userAnswer = answer;
      status.answered = true;
      this.questionStatus.set(questionId, status);

      if (this.onUpdateStats) this.onUpdateStats(this.getStats());
      if (this.onUpdateProgress) this.onUpdateProgress(this.getProgress());
    }
  }

  // ========== CHECK ANSWER METHODS ==========

  /**
   * Type 1: Single Answer (Radio)
   * userAnswer: string (e.g., "A", "B", "C", "D")
   */
  checkType1(question, userAnswer) {
    // Agar userAnswer mavjud bo'lmasa
    if (userAnswer === undefined || userAnswer === null) {
      return false;
    }

    // To'g'ri javob bilan solishtirish
    const isCorrect =
      String(userAnswer).trim() === String(question.correct).trim();

    console.log(
      `Type 1 check: User=${userAnswer}, Correct=${question.correct}, Result=${isCorrect}`,
    );
    return isCorrect;
  }

  /**
   * Type 2: Multiple Answer (Checkbox)
   * userAnswer: array of strings (e.g., ["A", "C"])
   */
  checkType2(question, userAnswer) {
    // Agar userAnswer mavjud bo'lmasa yoki array bo'lmasa
    if (!userAnswer || !Array.isArray(userAnswer)) {
      console.log("Type 2: Invalid userAnswer", userAnswer);
      return false;
    }

    // Agar question.correct array bo'lmasa
    if (!Array.isArray(question.correct)) {
      console.log("Type 2: question.correct is not an array", question.correct);
      return false;
    }

    // Sort both arrays for comparison
    const correctSorted = [...question.correct].sort();
    const userSorted = [...userAnswer].sort();

    // Uzunliklarni tekshirish
    if (correctSorted.length !== userSorted.length) {
      console.log(
        `Type 2: Length mismatch - Correct:${correctSorted.length}, User:${userSorted.length}`,
      );
      return false;
    }

    // Har bir elementni solishtirish
    const isCorrect = correctSorted.every(
      (val, index) => String(val).trim() === String(userSorted[index]).trim(),
    );

    console.log(
      `Type 2 check: User=${userSorted}, Correct=${correctSorted}, Result=${isCorrect}`,
    );
    return isCorrect;
  }

  /**
   * Type 3: True/False Grid
   * userAnswer: array of booleans (e.g., [true, false, true])
   */
  checkType3(question, userAnswer) {
    // Agar userAnswer mavjud bo'lmasa yoki array bo'lmasa
    if (!userAnswer || !Array.isArray(userAnswer)) {
      console.log("Type 3: Invalid userAnswer", userAnswer);
      return false;
    }

    // Agar question.correct mavjud bo'lmasa
    if (!question.correct || !Array.isArray(question.correct)) {
      console.log("Type 3: question.correct is not an array", question.correct);
      return false;
    }

    // Uzunliklarni tekshirish
    if (userAnswer.length !== question.correct.length) {
      console.log(
        `Type 3: Length mismatch - Correct:${question.correct.length}, User:${userAnswer.length}`,
      );
      return false;
    }

    // Har bir javobni solishtirish
    const isCorrect = userAnswer.every(
      (val, index) => val === question.correct[index],
    );

    console.log(`Type 3 check: Result=${isCorrect}`);
    return isCorrect;
  }

  /**
   * Type 4: Drag & Drop (Ranking)
   * userAnswer: array of strings in correct order
   */
  checkType4(question, userAnswer) {
    // Agar userAnswer mavjud bo'lmasa yoki array bo'lmasa
    if (!userAnswer || !Array.isArray(userAnswer)) {
      console.log("Type 4: Invalid userAnswer", userAnswer);
      return false;
    }

    // Agar question.correct mavjud bo'lmasa
    if (!question.correct || !Array.isArray(question.correct)) {
      console.log("Type 4: question.correct is not an array", question.correct);
      return false;
    }

    // Uzunliklarni tekshirish
    if (userAnswer.length !== question.correct.length) {
      console.log(
        `Type 4: Length mismatch - Correct:${question.correct.length}, User:${userAnswer.length}`,
      );
      return false;
    }

    // Har bir elementni solishtirish (tartib bilan)
    const isCorrect = userAnswer.every(
      (val, index) =>
        String(val).trim() === String(question.correct[index]).trim(),
    );

    console.log(`Type 4 check: Result=${isCorrect}`);
    return isCorrect;
  }

  /**
   * Type 5: Matching
   * userAnswer: object with key-value pairs (e.g., {"item1": "target1", "item2": "target2"})
   */
  checkType5(question, userAnswer) {
    // Agar userAnswer mavjud bo'lmasa yoki object bo'lmasa
    if (
      !userAnswer ||
      typeof userAnswer !== "object" ||
      Array.isArray(userAnswer)
    ) {
      console.log("Type 5: Invalid userAnswer", userAnswer);
      return false;
    }

    // Agar question.correct mavjud bo'lmasa
    if (!question.correct || typeof question.correct !== "object") {
      console.log(
        "Type 5: question.correct is not an object",
        question.correct,
      );
      return false;
    }

    // UserAnswer dagi elementlar sonini tekshirish
    const userKeys = Object.keys(userAnswer);
    const correctKeys = Object.keys(question.correct);

    if (userKeys.length !== correctKeys.length) {
      console.log(
        `Type 5: Key count mismatch - Correct:${correctKeys.length}, User:${userKeys.length}`,
      );
      return false;
    }

    // Har bir moslikni tekshirish
    for (let [key, value] of Object.entries(userAnswer)) {
      // Agar key question.correct da mavjud bo'lmasa
      if (question.correct[key] === undefined) {
        console.log(`Type 5: Key "${key}" not found in correct answers`);
        return false;
      }

      // Qiymatlarni solishtirish
      if (String(question.correct[key]).trim() !== String(value).trim()) {
        console.log(
          `Type 5: Mismatch for key "${key}": Correct=${question.correct[key]}, User=${value}`,
        );
        return false;
      }
    }

    console.log(`Type 5 check: Result=true`);
    return true;
  }

  // ========== MAIN CHECK ANSWER ==========

  checkAnswer(question, userAnswer) {
    let isCorrect = false;

    console.log(
      `Checking question type ${question.type} with ID ${question.id}`,
    );

    switch (question.type) {
      case 1:
        isCorrect = this.checkType1(question, userAnswer);
        break;
      case 2:
        isCorrect = this.checkType2(question, userAnswer);
        break;
      case 3:
        isCorrect = this.checkType3(question, userAnswer);
        break;
      case 4:
        isCorrect = this.checkType4(question, userAnswer);
        break;
      case 5:
        isCorrect = this.checkType5(question, userAnswer);
        break;
      default:
        console.log(`Unknown question type: ${question.type}`);
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

    console.log(
      `Question ${question.id} is ${isCorrect ? "CORRECT" : "INCORRECT"}`,
    );
    return isCorrect;
  }

  getIncorrectQuestions() {
    const incorrect = [];
    this.questionStatus.forEach((status, questionId) => {
      if (status.answered && !status.correct) {
        const question = this.questions.find((q) => q.id === questionId);
        if (question) {
          incorrect.push({
            ...question,
            userAnswer: status.userAnswer,
          });
        }
      }
    });
    return incorrect;
  }

  reset() {
    this.currentIndex = 0;
    this.userAnswers.clear();
    this.questionStatus.clear();

    this.questions.forEach((q, index) => {
      this.questionStatus.set(q.id, {
        answered: false,
        correct: false,
        userAnswer: null,
        index: index,
      });
    });

    if (this.onUpdateStats) this.onUpdateStats(this.getStats());
    if (this.onUpdateProgress) this.onUpdateProgress(this.getProgress());
  }
}

class QuestionRenderer {
  constructor(containerId, testManager) {
    this.container = document.getElementById(containerId);
    this.testManager = testManager;
    this.currentAnswers = new Map();
    this.dragState = null;
    this.matchingState = null;
  }

  render(question) {
    if (!this.container) {
      console.error("Container not found");
      return;
    }

    this.container.innerHTML = "";
    this.currentAnswers.clear();

    // Set question type display
    const typeElement = document.getElementById("question-type");
    if (typeElement) {
      const typeNames = {
        1: "Single Answer",
        2: "Multiple Answer",
        3: "True/False Grid",
        4: "Drag & Drop",
        5: "Matching",
      };
      typeElement.textContent =
        typeNames[question.type] || `Type ${question.type}`;
    }

    // Create question container with image support
    const questionContainer = document.createElement("div");
    questionContainer.className = "question-container";

    // Add image if exists
    if (question.img || question.image) {
      this.renderImage(questionContainer, question.img || question.image);
    }

    // Render based on type
    const contentDiv = document.createElement("div");
    contentDiv.className = "question-content-inner";

    switch (question.type) {
      case 1:
        this.renderType1(contentDiv, question);
        break;
      case 2:
        this.renderType2(contentDiv, question);
        break;
      case 3:
        this.renderType3(contentDiv, question);
        break;
      case 4:
        this.renderType4(contentDiv, question);
        break;
      case 5:
        this.renderType5(contentDiv, question);
        break;
      default:
        contentDiv.innerHTML =
          '<p style="color: red; padding: 20px;">Unsupported question type</p>';
    }

    questionContainer.appendChild(contentDiv);
    this.container.appendChild(questionContainer);

    // Load previous answer if exists
    const status = this.testManager.getQuestionStatus(question.id);
    if (status.answered && status.userAnswer) {
      this.loadAnswer(question.type, status.userAnswer);

      if (status.correct !== undefined) {
        this.highlightAnswers(question, status.userAnswer, status.correct);
      }
    }

    if (this.testManager.onQuestionRendered) {
      this.testManager.onQuestionRendered(question);
    }
  }

  // ========== IMAGE RENDERING ==========

  renderImage(container, imageSource) {
    const imageContainer = document.createElement("div");
    imageContainer.className = "question-image-container";

    const img = document.createElement("img");
    img.src = imageSource;
    img.alt = "Question image";
    img.className = "question-image";

    // Error handling for image
    img.onerror = function () {
      this.style.display = "none";
      const errorMsg = document.createElement("p");
      errorMsg.className = "image-error";
      errorMsg.textContent = "⚠️ Image could not be loaded";
      imageContainer.appendChild(errorMsg);
    };

    imageContainer.appendChild(img);
    container.appendChild(imageContainer);
  }

  // ========== TYPE 1: Single Answer (Radio) ==========

  renderType1(container, question) {
    const wrapper = document.createElement("div");
    wrapper.className = "type1-wrapper";

    question.options.forEach((option, index) => {
      const optionId = `opt-${question.id}-${index}`;
      const letter = option.charAt(0);

      const optionDiv = document.createElement("div");
      optionDiv.className = "radio-option";
      optionDiv.dataset.value = letter;

      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = `question-${question.id}`;
      radio.value = letter;
      radio.id = optionId;

      const label = document.createElement("label");
      label.htmlFor = optionId;
      label.textContent = option;

      optionDiv.appendChild(radio);
      optionDiv.appendChild(label);

      optionDiv.addEventListener("click", (e) => {
        if (e.target !== radio) {
          radio.checked = true;
        }
        this.handleType1Change(question, radio.value, optionDiv);
      });

      radio.addEventListener("change", () => {
        this.handleType1Change(question, radio.value, optionDiv);
      });

      wrapper.appendChild(optionDiv);
    });

    container.appendChild(wrapper);
  }

  handleType1Change(question, value, optionDiv) {
    this.currentAnswers.set("selected", value);

    document.querySelectorAll(".radio-option").forEach((opt) => {
      opt.classList.remove("selected");
    });

    if (optionDiv) {
      optionDiv.classList.add("selected");
    } else {
      document.querySelectorAll(".radio-option").forEach((opt) => {
        const radio = opt.querySelector('input[type="radio"]');
        if (radio && radio.value === value) {
          opt.classList.add("selected");
        }
      });
    }
  }

  // ========== TYPE 2: Multiple Answer (Checkbox) ==========

  renderType2(container, question) {
    const wrapper = document.createElement("div");
    wrapper.className = "type2-wrapper";

    const selectedValues = new Set();

    question.options.forEach((option, index) => {
      const optionId = `chk-${question.id}-${index}`;
      const letter = option.charAt(0);

      const optionDiv = document.createElement("div");
      optionDiv.className = "checkbox-option";
      optionDiv.dataset.value = letter;

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.name = `question-${question.id}`;
      checkbox.value = letter;
      checkbox.id = optionId;

      const label = document.createElement("label");
      label.htmlFor = optionId;
      label.textContent = option;

      optionDiv.appendChild(checkbox);
      optionDiv.appendChild(label);

      optionDiv.addEventListener("click", (e) => {
        if (e.target !== checkbox) {
          checkbox.checked = !checkbox.checked;
        }
        this.handleType2Change(question, checkbox, selectedValues, optionDiv);
      });

      checkbox.addEventListener("change", () => {
        this.handleType2Change(question, checkbox, selectedValues, optionDiv);
      });

      wrapper.appendChild(optionDiv);
    });

    container.appendChild(wrapper);
  }

  handleType2Change(question, checkbox, selectedSet, optionDiv) {
    if (checkbox.checked) {
      selectedSet.add(checkbox.value);
      optionDiv.classList.add("selected");
    } else {
      selectedSet.delete(checkbox.value);
      optionDiv.classList.remove("selected");
    }
    this.currentAnswers.set("selected", Array.from(selectedSet));
  }

  // ========== TYPE 3: True/False Grid ==========

  renderType3(container, question) {
    const wrapper = document.createElement("div");
    wrapper.className = "type3-wrapper";

    const answers = new Array(question.statements.length).fill(null);

    question.statements.forEach((statement, index) => {
      const row = document.createElement("div");
      row.className = "truefalse-row";
      row.dataset.index = index;

      const statementText = document.createElement("div");
      statementText.className = "statement-text";
      statementText.textContent = statement;

      const buttonGroup = document.createElement("div");
      buttonGroup.className = "truefalse-buttons";

      const trueBtn = document.createElement("button");
      trueBtn.className = "truefalse-btn";
      trueBtn.textContent = "True";
      trueBtn.dataset.index = index;
      trueBtn.dataset.value = "true";

      const falseBtn = document.createElement("button");
      falseBtn.className = "truefalse-btn";
      falseBtn.textContent = "False";
      falseBtn.dataset.index = index;
      falseBtn.dataset.value = "false";

      trueBtn.addEventListener("click", () => {
        this.handleType3Change(index, true, answers, [trueBtn, falseBtn], row);
      });

      falseBtn.addEventListener("click", () => {
        this.handleType3Change(index, false, answers, [trueBtn, falseBtn], row);
      });

      buttonGroup.appendChild(trueBtn);
      buttonGroup.appendChild(falseBtn);

      row.appendChild(statementText);
      row.appendChild(buttonGroup);
      wrapper.appendChild(row);
    });

    container.appendChild(wrapper);
  }

  handleType3Change(index, value, answersArray, buttons, row) {
    buttons[0].classList.remove("selected", "true");
    buttons[1].classList.remove("selected", "false");

    if (value === true) {
      buttons[0].classList.add("selected", "true");
    } else {
      buttons[1].classList.add("selected", "false");
    }

    answersArray[index] = value;
    this.currentAnswers.set("selected", [...answersArray]);
  }

  // ========== TYPE 4: Drag & Drop (simplified) ==========

  renderType4(container, question) {
    const wrapper = document.createElement("div");
    wrapper.className = "type4-wrapper";

    const instructions = document.createElement("p");
    instructions.textContent =
      "Click items in correct order (1 = first, 2 = second, etc.)";
    instructions.style.marginBottom = "15px";
    instructions.style.fontWeight = "500";
    wrapper.appendChild(instructions);

    const itemsContainer = document.createElement("div");
    itemsContainer.className = "drag-items-simple";
    itemsContainer.style.display = "flex";
    itemsContainer.style.flexDirection = "column";
    itemsContainer.style.gap = "10px";

    const items = [...question.items];
    const selectedOrder = [];

    items.forEach((item, index) => {
      const itemBtn = document.createElement("button");
      itemBtn.className = "drag-item-btn";
      itemBtn.textContent = item;
      itemBtn.dataset.item = item;
      itemBtn.dataset.index = index;
      itemBtn.style.padding = "12px";
      itemBtn.style.border = "2px solid #3B82F6";
      itemBtn.style.borderRadius = "8px";
      itemBtn.style.background = "white";
      itemBtn.style.cursor = "pointer";
      itemBtn.style.fontSize = "16px";
      itemBtn.style.transition = "all 0.3s";
      itemBtn.style.margin = "0";

      itemBtn.addEventListener("click", () => {
        if (itemBtn.disabled) return;

        const position = selectedOrder.length + 1;
        itemBtn.textContent = `${position}. ${item}`;
        itemBtn.style.background = "#22C55E";
        itemBtn.style.color = "white";
        itemBtn.style.borderColor = "#16A34A";
        itemBtn.disabled = true;

        selectedOrder.push(item);
        this.currentAnswers.set("selected", selectedOrder);

        if (selectedOrder.length === items.length) {
          this.showMessage(
            container,
            "All items ordered! Click Check Answer.",
            "success",
          );
        }
      });

      itemsContainer.appendChild(itemBtn);
    });

    wrapper.appendChild(itemsContainer);
    container.appendChild(wrapper);
  }

  // ========== TYPE 5: Matching (simplified) ==========

  renderType5(container, question) {
    const wrapper = document.createElement("div");
    wrapper.className = "type5-wrapper";

    const instructions = document.createElement("p");
    instructions.textContent =
      "Match items by clicking on an item then on its target";
    instructions.style.marginBottom = "15px";
    instructions.style.fontWeight = "500";
    wrapper.appendChild(instructions);

    const matchContainer = document.createElement("div");
    matchContainer.style.display = "flex";
    matchContainer.style.gap = "30px";
    matchContainer.style.flexWrap = "wrap";

    // Left side - items
    const leftDiv = document.createElement("div");
    leftDiv.style.flex = "1";
    leftDiv.style.minWidth = "250px";

    const leftTitle = document.createElement("h4");
    leftTitle.textContent = "Items:";
    leftTitle.style.marginBottom = "10px";
    leftDiv.appendChild(leftTitle);

    const items = [...question.items];
    const itemElements = [];
    const matches = {};

    items.forEach((item, index) => {
      const itemDiv = document.createElement("div");
      itemDiv.className = "matching-item-simple";
      itemDiv.textContent = item;
      itemDiv.dataset.item = item;
      itemDiv.style.padding = "12px";
      itemDiv.style.marginBottom = "8px";
      itemDiv.style.border = "2px solid #3B82F6";
      itemDiv.style.borderRadius = "8px";
      itemDiv.style.background = "white";
      itemDiv.style.cursor = "pointer";
      itemDiv.style.transition = "all 0.3s";

      itemDiv.addEventListener("click", () => {
        document.querySelectorAll(".matching-item-simple").forEach((el) => {
          el.style.background = "white";
          el.style.borderColor = "#3B82F6";
        });

        itemDiv.style.background = "#DBEAFE";
        itemDiv.style.borderColor = "#2563EB";
        this.matchingSelectedItem = item;
      });

      leftDiv.appendChild(itemDiv);
      itemElements.push(itemDiv);
    });

    // Right side - targets
    const rightDiv = document.createElement("div");
    rightDiv.style.flex = "1";
    rightDiv.style.minWidth = "250px";

    const rightTitle = document.createElement("h4");
    rightTitle.textContent = "Targets:";
    rightTitle.style.marginBottom = "10px";
    rightDiv.appendChild(rightTitle);

    const targets = [...question.targets];

    targets.forEach((target, index) => {
      const targetDiv = document.createElement("div");
      targetDiv.className = "matching-target-simple";
      targetDiv.textContent = target;
      targetDiv.dataset.target = target;
      targetDiv.style.padding = "12px";
      targetDiv.style.marginBottom = "8px";
      targetDiv.style.border = "2px dashed #9CA3AF";
      targetDiv.style.borderRadius = "8px";
      targetDiv.style.background = "#F3F4F6";
      targetDiv.style.cursor = "pointer";
      targetDiv.style.transition = "all 0.3s";

      targetDiv.addEventListener("click", () => {
        if (!this.matchingSelectedItem) {
          alert("Please select an item first");
          return;
        }

        if (targetDiv.classList.contains("matched")) {
          alert("This target is already matched");
          return;
        }

        const selectedItem = this.matchingSelectedItem;
        matches[selectedItem] = target;

        targetDiv.textContent = `${selectedItem} → ${target}`;
        targetDiv.style.background = "#22C55E";
        targetDiv.style.color = "white";
        targetDiv.style.border = "2px solid #16A34A";
        targetDiv.classList.add("matched");

        itemElements.forEach((el) => {
          if (el.dataset.item === selectedItem) {
            el.style.background = "#D1FAE5";
            el.style.borderColor = "#22C55E";
            el.style.cursor = "not-allowed";
            el.style.opacity = "0.7";
            el.classList.add("matched");
          }
        });

        this.matchingSelectedItem = null;
        this.currentAnswers.set("selected", { ...matches });

        if (Object.keys(matches).length === items.length) {
          this.showMessage(
            container,
            "All items matched! Click Check Answer.",
            "success",
          );
        }
      });

      rightDiv.appendChild(targetDiv);
    });

    matchContainer.appendChild(leftDiv);
    matchContainer.appendChild(rightDiv);
    wrapper.appendChild(matchContainer);
    container.appendChild(wrapper);
  }

  showMessage(container, message, type) {
    const msgDiv = document.createElement("div");
    msgDiv.textContent = message;
    msgDiv.style.padding = "10px";
    msgDiv.style.marginTop = "15px";
    msgDiv.style.borderRadius = "8px";
    msgDiv.style.background = type === "success" ? "#D1FAE5" : "#DBEAFE";
    msgDiv.style.color = type === "success" ? "#065F46" : "#1E40AF";
    msgDiv.style.border = `2px solid ${type === "success" ? "#22C55E" : "#3B82F6"}`;
    msgDiv.style.fontWeight = "600";

    const existingMsg = container.querySelector(".temp-message");
    if (existingMsg) existingMsg.remove();

    msgDiv.className = "temp-message";
    container.appendChild(msgDiv);

    setTimeout(() => {
      msgDiv.remove();
    }, 3000);
  }

  // ========== HIGHLIGHT ANSWERS ==========

  highlightAnswers(question, userAnswer, isCorrect) {
    switch (question.type) {
      case 1:
        this.highlightType1(question, userAnswer);
        break;
      case 2:
        this.highlightType2(question, userAnswer);
        break;
      case 3:
        this.highlightType3(question, userAnswer);
        break;
      case 4:
        this.highlightType4(question, userAnswer);
        break;
      case 5:
        this.highlightType5(question, userAnswer);
        break;
    }
  }

  highlightType1(question, userAnswer) {
    const options = document.querySelectorAll(".radio-option");

    options.forEach((option) => {
      const radio = option.querySelector('input[type="radio"]');
      if (!radio) return;

      const optionValue = radio.value;

      option.classList.remove("correct-answer", "incorrect-answer");

      if (optionValue === question.correct) {
        option.classList.add("correct-answer");
      }

      if (
        userAnswer &&
        optionValue === userAnswer &&
        userAnswer !== question.correct
      ) {
        option.classList.add("incorrect-answer");
      }
    });
  }

  highlightType2(question, userAnswer) {
    const options = document.querySelectorAll(".checkbox-option");
    const correctAnswers = question.correct;

    options.forEach((option) => {
      const checkbox = option.querySelector('input[type="checkbox"]');
      if (!checkbox) return;

      const optionValue = checkbox.value;

      option.classList.remove("correct-answer", "incorrect-answer");

      if (correctAnswers.includes(optionValue)) {
        option.classList.add("correct-answer");
      }

      if (
        userAnswer &&
        userAnswer.includes(optionValue) &&
        !correctAnswers.includes(optionValue)
      ) {
        option.classList.add("incorrect-answer");
      }
    });
  }

  highlightType3(question, userAnswer) {
    const rows = document.querySelectorAll(".truefalse-row");

    rows.forEach((row, index) => {
      row.classList.remove("correct-statement", "incorrect-statement");

      const correctValue = question.correct[index];
      const userValue = userAnswer ? userAnswer[index] : null;

      if (userValue !== null) {
        if (userValue === correctValue) {
          row.classList.add("correct-statement");
        } else {
          row.classList.add("incorrect-statement");
        }
      }
    });
  }

  highlightType4(question, userAnswer) {
    const items = document.querySelectorAll(".drag-item-btn");

    items.forEach((btn, index) => {
      btn.classList.remove("correct-answer", "incorrect-answer");

      if (userAnswer && userAnswer[index]) {
        const correctOrder = question.correct;
        if (userAnswer[index] === correctOrder[index]) {
          btn.classList.add("correct-answer");
        } else {
          btn.classList.add("incorrect-answer");
        }
      }
    });
  }

  highlightType5(question, userAnswer) {
    const items = document.querySelectorAll(".matching-item-simple");
    const targets = document.querySelectorAll(".matching-target-simple");

    items.forEach((item) => {
      item.classList.remove("correct-answer", "incorrect-answer");
    });

    targets.forEach((target) => {
      target.classList.remove("correct-answer", "incorrect-answer");
    });

    if (userAnswer) {
      for (let [item, target] of Object.entries(userAnswer)) {
        const correctTarget = question.correct[item];

        targets.forEach((t) => {
          if (t.textContent.includes(target) || t.textContent === target) {
            if (target === correctTarget) {
              t.classList.add("correct-answer");
            } else {
              t.classList.add("incorrect-answer");
            }
          }
        });

        items.forEach((i) => {
          if (i.dataset.item === item) {
            if (target === correctTarget) {
              i.classList.add("correct-answer");
            } else {
              i.classList.add("incorrect-answer");
            }
          }
        });
      }
    }
  }

  // ========== LOAD ANSWER ==========

  loadAnswer(type, answer) {
    if (!answer) return;

    switch (type) {
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
    const radio = document.querySelector(
      `input[type="radio"][value="${answer}"]`,
    );
    if (radio) {
      radio.checked = true;
      radio.closest(".radio-option").classList.add("selected");
    }
    this.currentAnswers.set("selected", answer);
  }

  loadType2Answer(answer) {
    if (!Array.isArray(answer)) return;

    answer.forEach((value) => {
      const checkbox = document.querySelector(
        `input[type="checkbox"][value="${value}"]`,
      );
      if (checkbox) {
        checkbox.checked = true;
        checkbox.closest(".checkbox-option").classList.add("selected");
      }
    });
    this.currentAnswers.set("selected", answer);
  }

  loadType3Answer(answer) {
    if (!Array.isArray(answer)) return;

    const rows = document.querySelectorAll(".truefalse-row");
    rows.forEach((row, index) => {
      const btns = row.querySelectorAll(".truefalse-btn");
      if (answer[index] === true) {
        btns[0].classList.add("selected", "true");
      } else if (answer[index] === false) {
        btns[1].classList.add("selected", "false");
      }
    });
    this.currentAnswers.set("selected", answer);
  }

  loadType4Answer(answer) {
    console.log("Type 4 answer loading:", answer);
  }

  loadType5Answer(answer) {
    console.log("Type 5 answer loading:", answer);
  }

  getCurrentAnswer() {
    return this.currentAnswers.get("selected");
  }

  clearSelection() {
    this.currentAnswers.clear();
    this.matchingSelectedItem = null;

    document
      .querySelectorAll(
        ".selected, .matched, .truefalse-btn.selected, .correct-answer, .incorrect-answer, .correct-statement, .incorrect-statement",
      )
      .forEach((el) => {
        el.classList.remove(
          "selected",
          "matched",
          "true",
          "false",
          "correct-answer",
          "incorrect-answer",
          "correct-statement",
          "incorrect-statement",
        );
      });

    document
      .querySelectorAll('input[type="radio"], input[type="checkbox"]')
      .forEach((input) => {
        input.checked = false;
      });
  }
}

// Export for use in script.js
window.TestManager = TestManager;
window.QuestionRenderer = QuestionRenderer;
