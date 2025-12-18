// Massivni tasodifiy tartiblash funksiyasi (Fisher-Yates algoritmi)
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Dastur holati
let currentQuestionIndex = 0;
let userScore = 0;
let userAnswers = [];
let testStarted = false;
let timeLeft = 2700; // 45 daqiqa soniyada
let timerInterval = null;
const MAX_SCORE = 840; // 84 savol * 10 ball

// DOM elementlari
const loginPage = document.getElementById("loginPage");
const testInterface = document.getElementById("testInterface");
const resultPage = document.getElementById("resultPage");
const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("loginError");
const logoutBtn = document.getElementById("logoutBtn");
const resultLogoutBtn = document.getElementById("resultLogoutBtn");
const currentQuestionElement = document.getElementById("currentQuestion");
const totalQuestionsElement = document.getElementById("totalQuestions");
const currentScoreElement = document.getElementById("currentScore");
const timerElement = document.getElementById("timer");
const progressBar = document.getElementById("progressBar");
const questionContainer = document.getElementById("questionContainer");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const checkAnswerBtn = document.getElementById("checkAnswerBtn");
const restartBtn = document.getElementById("restartBtn");

// Login ma'lumotlari
const VALID_CREDENTIALS = {
  username: "ic3student",
  password: "admin123",
};

// Dasturni ishga tushirish
document.addEventListener("DOMContentLoaded", function () {
  totalQuestionsElement.textContent = questions.length;

  // Login formasi
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (
      username === VALID_CREDENTIALS.username &&
      password === VALID_CREDENTIALS.password
    ) {
      loginError.style.display = "none";
      startTest();
    } else {
      loginError.style.display = "block";
    }
  });

  // Chiqish tugmalari
  logoutBtn.addEventListener("click", logout);
  resultLogoutBtn.addEventListener("click", logout);

  // Navigatsiya tugmalari
  prevBtn.addEventListener("click", goToPreviousQuestion);
  nextBtn.addEventListener("click", goToNextQuestion);
  checkAnswerBtn.addEventListener("click", checkAnswer);
  restartBtn.addEventListener("click", restartTest);

  // Foydalanuvchi javoblari massivini ishga tushirish
  userAnswers = new Array(questions.length).fill(null);
});

// Testni boshlash
function startTest() {
  loginPage.style.display = "none";
  testInterface.style.display = "block";
  testStarted = true;

  // Barcha savollarning variantlarini tasodifiy tartiblash
  shuffleAllQuestions();

  // Taymerni boshlash
  startTimer();

  // Birinchi savolni ko'rsatish
  displayQuestion(currentQuestionIndex);
}

// Barcha savollarning variantlarini tasodifiy tartiblash
function shuffleAllQuestions() {
  questions.forEach((question) => {
    if (question.options) {
      // Har bir savol uchun alohida tasodifiy tartib yaratish
      question.displayOptions = shuffleArray([...question.options]);
    }
  });
}

// Taymerni boshlash
function startTimer() {
  updateTimerDisplay();
  timerInterval = setInterval(function () {
    timeLeft--;
    updateTimerDisplay();

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      endTest();
    }
  }, 1000);
}

// Taymerni yangilash
function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerElement.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

// Savolni ko'rsatish
function displayQuestion(index) {
  const question = questions[index];

  // Progressni yangilash
  currentQuestionElement.textContent = index + 1;
  progressBar.style.width = `${((index + 1) / questions.length) * 100}%`;

  // Oldingi savolni tozalash
  questionContainer.innerHTML = "";

  // Savol HTML yaratish
  let questionHTML = "";

  // Savol matnini ko'rsatish
  if (Array.isArray(question.question)) {
    questionHTML += `<div class="question-text">${
      question.question[0].savol ||
      question.question[0].question ||
      question.question[0]
    }</div>`;
    if (
      question.question[1] &&
      (question.question[1].imgSrc || question.question[1].imgScr)
    ) {
      const imgSrc = question.question[1].imgSrc || question.question[1].imgScr;
      questionHTML += `<img src="${imgSrc}" alt="Savol rasmi" class="question-image">`;
    }
  } else {
    questionHTML += `<div class="question-text">${question.question}</div>`;
  }

  // Savol turiga qarab interfeys yaratish
  if (question.options) {
    // Tasodifiy tartiblangan variantlardan foydalanish
    const optionsToShow =
      question.displayOptions || shuffleArray([...question.options]);

    // Ko'p tanlovli savol
    questionHTML += '<div class="options-container">';

    // Agar bir nechta to'g'ri javob bo'lsa (correctKeys), checkbox, aks holda radio
    const isMultipleChoice =
      question.correctKeys && question.correctKeys.length > 1;
    const inputType = isMultipleChoice ? "checkbox" : "radio";
    const inputName = isMultipleChoice
      ? `question_${index}`
      : `question_${index}_single`;

    optionsToShow.forEach((option) => {
      const isSelected =
        userAnswers[index] && userAnswers[index].includes(option.key);
      questionHTML += `
                <div class="option">
                    <input type="${inputType}" id="option_${index}_${
        option.key
      }" 
                           name="${inputName}" value="${option.key}" 
                           ${isSelected ? "checked" : ""}>
                    <label for="option_${index}_${
        option.key
      }" class="option-label">
                        
                        <div class="option-text">${option.text}</div>
                    </label>
                </div>
            `;
    });
    questionHTML += "</div>";

    // Inputlarni qayta ishlash
    setTimeout(() => {
      document.querySelectorAll(`.option input`).forEach((input) => {
        input.addEventListener("change", function () {
          handleOptionSelection(this, index, isMultipleChoice);
        });
      });
    }, 10);
  } else if (question.statements) {
    // To'g'ri/Noto'g'ri bayonotlar
    questionHTML += '<div class="statements-container">';
    question.statements.forEach((statement, i) => {
      const userAnswer = userAnswers[index] ? userAnswers[index][i] : null;
      questionHTML += `
                <div class="statement">
                    <div class="statement-text">${statement.text}</div>
                    <div class="statement-options">
                        <label class="true-false-label ${
                          userAnswer === "True" ? "selected" : ""
                        }">
                            <input type="radio" name="statement_${index}_${i}" 
                                   value="True" ${
                                     userAnswer === "True" ? "checked" : ""
                                   }>
                            <span>True</span>
                        </label>
                        <label class="true-false-label ${
                          userAnswer === "False" ? "selected" : ""
                        }">
                            <input type="radio" name="statement_${index}_${i}" 
                                   value="False" ${
                                     userAnswer === "False" ? "checked" : ""
                                   }>
                            <span>False</span>
                        </label>
                    </div>
                </div>
            `;
    });
    questionHTML += "</div>";

    // True/False radio buttonlari
    setTimeout(() => {
      document
        .querySelectorAll('.statement input[type="radio"]')
        .forEach((radio) => {
          radio.addEventListener("change", function () {
            handleStatementSelection(this, index);
          });
        });
    }, 10);
  } else if (question.steps) {
    // Qadamlarni tartiblash
    questionHTML += '<div class="steps-container">';
    questionHTML += '<div class="steps-list" id="stepsList">';

    const stepsToShow = userAnswers[index]
      ? userAnswers[index]
      : [...question.steps];

    stepsToShow.forEach((step, i) => {
      questionHTML += `
                <div class="step" draggable="true">
                    <div class="step-number">${i + 1}</div>
                    <div class="step-text">${step}</div>
                </div>
            `;
    });
    questionHTML += "</div>";
    if (question.note) {
      questionHTML += `<p class="note-text">${question.note}</p>`;
    }
    questionHTML += "</div>";

    // Qadamlar uchun drag & drop
    setTimeout(() => {
      setupDragAndDrop(index);
    }, 10);
  } else if (question.fillInTheBlanks) {
    // Bo'sh joylarni to'ldirish
    questionHTML += '<div class="fill-blanks-container">';
    question.fillInTheBlanks.forEach((fillBlank, i) => {
      let sentence = fillBlank.sentence;
      fillBlank.blanks.forEach((blank, j) => {
        const userAnswer = userAnswers[index]
          ? userAnswers[index][i] && userAnswers[index][i][j]
          : null;
        const optionsHTML = blank.options
          .map(
            (opt) =>
              `<option value="${opt}" ${
                userAnswer === opt ? "selected" : ""
              }>${opt}</option>`
          )
          .join("");
        sentence = sentence.replace(
          "_____",
          `<select class="blank-select" data-blank-index="${i}" data-option-index="${j}">${optionsHTML}</select>`
        );
      });
      questionHTML += `<div class="fill-sentence">${sentence}</div>`;
    });
    questionHTML += "</div>";

    // Dropdown o'zgarishlari
    setTimeout(() => {
      document.querySelectorAll(".blank-select").forEach((select) => {
        select.addEventListener("change", function () {
          handleFillBlankSelection(this, index);
        });
      });
    }, 10);
  } else if (question.matching) {
    // Moslashtirish savoli
    questionHTML += '<div class="matching-container">';
    if (question.matching && question.matching.items) {
      // Moslashtirish elementlarini tasodifiy tartiblash
      const shuffledItems = shuffleArray([...question.matching.items]);

      shuffledItems.forEach((item, i) => {
        const userAnswer = userAnswers[index] ? userAnswers[index][i] : null;
        questionHTML += `
                    <div class="matching-item">
                        <div class="matching-tool">${item.tool}</div>
                        <div class="matching-arrow">→</div>
                        <select class="matching-select" data-item-index="${i}">
                            <option value="">Select threat</option>
                            ${shuffledItems
                              .map(
                                (matchItem) =>
                                  `<option value="${matchItem.threat}" ${
                                    userAnswer === matchItem.threat
                                      ? "selected"
                                      : ""
                                  }>${matchItem.threat}</option>`
                              )
                              .join("")}
                        </select>
                    </div>
                `;
      });
    }
    questionHTML += "</div>";

    // Moslashtirish tanlash
    setTimeout(() => {
      document.querySelectorAll(".matching-select").forEach((select) => {
        select.addEventListener("change", function () {
          handleMatchingSelection(this, index);
        });
      });
    }, 10);
  } else if (question.imageBased && question.questions) {
    // Rasm asosidagi savollar
    questionHTML += '<div class="image-question-container">';
    if (
      question.imgSrc ||
      (question.question && question.question[1] && question.question[1].imgSrc)
    ) {
      const imgSrc = question.imgSrc || question.question[1].imgSrc;
      questionHTML += `<img src="${imgSrc}" alt="Savol rasmi" class="question-image">`;
    }
    question.questions.forEach((subQuestion, i) => {
      const userAnswer = userAnswers[index] ? userAnswers[index][i] : null;
      questionHTML += `<div class="sub-question">
                <div class="sub-question-text">${subQuestion.question}</div>
                <select class="sub-question-select" data-subquestion-index="${i}">
                    <option value="">Select option</option>
                    ${subQuestion.options
                      .map(
                        (opt) =>
                          `<option value="${opt}" ${
                            userAnswer === opt ? "selected" : ""
                          }>${opt}</option>`
                      )
                      .join("")}
                </select>
            </div>`;
    });
    questionHTML += "</div>";

    // Sub-savol tanlash
    setTimeout(() => {
      document.querySelectorAll(".sub-question-select").forEach((select) => {
        select.addEventListener("change", function () {
          handleSubQuestionSelection(this, index);
        });
      });
    }, 10);
  }

  // HTML ni sahifaga qo'shish
  questionContainer.innerHTML = questionHTML;

  // Tugma holatlarini yangilash
  prevBtn.disabled = index === 0;
  nextBtn.disabled = index === questions.length - 1;

  // Javob tekshirish tugmasini yangilash
  if (userAnswers[index] !== null) {
    checkAnswerBtn.textContent = "✓ Checked";
    checkAnswerBtn.disabled = true;
    checkAnswerBtn.style.backgroundColor = "#6c757d";
  } else {
    checkAnswerBtn.textContent = "Check Answer";
    checkAnswerBtn.disabled = false;
    checkAnswerBtn.style.backgroundColor = "#2a5298";
  }

  // Oxirgi savol bo'lsa
  if (index === questions.length - 1) {
    nextBtn.textContent = "Finish Test";
    nextBtn.onclick=endTest();
  } else {
    nextBtn.textContent = "Next";
  }
}

// Variant tanlashni boshqarish
function handleOptionSelection(inputElement, questionIndex, isMultipleChoice) {
  if (isMultipleChoice) {
    // Checkbox - bir nechta tanlash
    const selectedCheckboxes = Array.from(
      document.querySelectorAll(`.option input[type="checkbox"]:checked`)
    ).map((cb) => cb.value);

    userAnswers[questionIndex] = selectedCheckboxes;

    // UI ni yangilash
    document.querySelectorAll(".option").forEach((option) => {
      const checkbox = option.querySelector('input[type="checkbox"]');
      if (checkbox && checkbox.checked) {
        option.classList.add("selected");
      } else {
        option.classList.remove("selected");
      }
    });
  } else {
    // Radio - bitta tanlash
    const selectedValue = inputElement.value;
    userAnswers[questionIndex] = [selectedValue];

    // UI ni yangilash
    document.querySelectorAll(".option").forEach((option) => {
      const radio = option.querySelector('input[type="radio"]');
      if (radio && radio.checked) {
        option.classList.add("selected");
      } else {
        option.classList.remove("selected");
      }
    });
  }
}

// Bayonot tanlashni boshqarish
function handleStatementSelection(radioElement, questionIndex) {
  const nameParts = radioElement.name.split("_");
  const statementIndex = parseInt(nameParts[2]);
  const value = radioElement.value;

  // Javoblarni saqlash
  if (!userAnswers[questionIndex]) {
    userAnswers[questionIndex] = [];
  }

  userAnswers[questionIndex][statementIndex] = value;

  // UI ni yangilash
  const statementDiv = radioElement.closest(".statement");
  statementDiv.querySelectorAll(".true-false-label").forEach((label) => {
    label.classList.remove("selected");
  });
  radioElement.closest(".true-false-label").classList.add("selected");
}

// Drag and drop funksiyalari
function setupDragAndDrop(questionIndex) {
  const stepsList = document.getElementById("stepsList");
  if (!stepsList) return;

  let draggedStep = null;

  // Drag boshlanishi
  stepsList.querySelectorAll(".step").forEach((step) => {
    step.addEventListener("dragstart", function (e) {
      draggedStep = this;
      setTimeout(() => {
        this.style.opacity = "0.4";
      }, 0);
    });

    step.addEventListener("dragend", function (e) {
      setTimeout(() => {
        if (draggedStep) {
          draggedStep.style.opacity = "1";
          draggedStep = null;
          updateStepsOrder(questionIndex);
        }
      }, 0);
    });

    step.addEventListener("dragover", function (e) {
      e.preventDefault();
    });

    step.addEventListener("dragenter", function (e) {
      e.preventDefault();
      this.style.backgroundColor = "#e3ecff";
    });

    step.addEventListener("dragleave", function (e) {
      this.style.backgroundColor = "";
    });

    step.addEventListener("drop", function (e) {
      e.preventDefault();
      this.style.backgroundColor = "";

      if (draggedStep && draggedStep !== this) {
        const allSteps = Array.from(stepsList.querySelectorAll(".step"));
        const draggedIndex = allSteps.indexOf(draggedStep);
        const dropIndex = allSteps.indexOf(this);

        if (draggedIndex < dropIndex) {
          this.parentNode.insertBefore(draggedStep, this.nextSibling);
        } else {
          this.parentNode.insertBefore(draggedStep, this);
        }

        // Qadam raqamlarini yangilash
        updateStepNumbers();
        updateStepsOrder(questionIndex);
      }
    });
  });
}

// Qadam raqamlarini yangilash
function updateStepNumbers() {
  const steps = document.querySelectorAll(".step");
  steps.forEach((step, index) => {
    const stepNumber = step.querySelector(".step-number");
    if (stepNumber) {
      stepNumber.textContent = index + 1;
    }
  });
}

// Qadamlar tartibini yangilash
function updateStepsOrder(questionIndex) {
  const steps = Array.from(document.querySelectorAll(".step")).map((step) => {
    return step.querySelector(".step-text").textContent;
  });

  userAnswers[questionIndex] = steps;
}

// Bo'sh joyni to'ldirish
function handleFillBlankSelection(selectElement, questionIndex) {
  const blankIndex = parseInt(selectElement.getAttribute("data-blank-index"));
  const optionIndex = parseInt(selectElement.getAttribute("data-option-index"));
  const value = selectElement.value;

  if (!userAnswers[questionIndex]) {
    userAnswers[questionIndex] = [];
  }
  if (!userAnswers[questionIndex][blankIndex]) {
    userAnswers[questionIndex][blankIndex] = [];
  }

  userAnswers[questionIndex][blankIndex][optionIndex] = value;
}

// Moslashtirish
function handleMatchingSelection(selectElement, questionIndex) {
  const itemIndex = parseInt(selectElement.getAttribute("data-item-index"));
  const value = selectElement.value;

  if (!userAnswers[questionIndex]) {
    userAnswers[questionIndex] = [];
  }

  userAnswers[questionIndex][itemIndex] = value;
}

// Sub-savol tanlash
function handleSubQuestionSelection(selectElement, questionIndex) {
  const subQuestionIndex = parseInt(
    selectElement.getAttribute("data-subquestion-index")
  );
  const value = selectElement.value;

  if (!userAnswers[questionIndex]) {
    userAnswers[questionIndex] = [];
  }

  userAnswers[questionIndex][subQuestionIndex] = value;
}

// Javobni tekshirish
function checkAnswer() {
  const question = questions[currentQuestionIndex];
  const userAnswer = userAnswers[currentQuestionIndex];

  // Javob tanlanmaganligini tekshirish
  if (
    !userAnswer ||
    (Array.isArray(userAnswer) && userAnswer.length === 0) ||
    (question.statements &&
      userAnswer.some((a) => a === undefined || a === null)) ||
    (question.fillInTheBlanks &&
      (!userAnswer[0] || userAnswer[0].some((a) => !a))) ||
    (question.matching && userAnswer.some((a) => !a)) ||
    (question.imageBased && question.questions && userAnswer.some((a) => !a))
  ) {
    alert("Please select an answer before checking.");
    return;
  }

  let isCorrect = false;
  let correctAnswerText = "";

  // Savol turiga qarab tekshirish
  if (question.correctKey) {
    // Bitta to'g'ri javob - variantlar tartibi o'zgargan bo'lsa ham
    isCorrect = userAnswer[0] === question.correctKey;
    correctAnswerText = `Correct answer: ${question.correctKey}`;
  } else if (question.correctKeys) {
    // Bir nechta to'g'ri javoblar - variantlar tartibi o'zgargan bo'lsa ham
    if (userAnswer.length !== question.correctKeys.length) {
      isCorrect = false;
    } else {
      // Tartib o'zgarganda ham to'g'ri tekshirish
      const sortedUserAnswers = [...userAnswer].sort();
      const sortedCorrectAnswers = [...question.correctKeys].sort();
      isCorrect = sortedUserAnswers.every(
        (answer, index) => answer === sortedCorrectAnswers[index]
      );
    }
    correctAnswerText = `Correct answers: ${question.correctKeys.join(", ")}`;
  } else if (question.statements) {
    // To'g'ri/Noto'g'ri bayonotlar
    isCorrect = question.statements.every((statement, index) => {
      return userAnswer[index] === statement.answer;
    });

    // To'g'ri javoblarni yig'ish
    const correctAnswers = question.statements
      .map((s, i) => `Statement ${i + 1}: ${s.answer}`)
      .join("<br>");
    correctAnswerText = `Correct answers:<br>${correctAnswers}`;
  } else if (question.fillInTheBlanks) {
    // Bo'sh joylarni to'ldirish
    isCorrect = question.fillInTheBlanks.every((fillBlank, i) => {
      return fillBlank.blanks.every((blank, j) => {
        return userAnswer[i] && userAnswer[i][j] === blank.correct;
      });
    });
  } else if (question.matching) {
    // Moslashtirish
    isCorrect = question.matching.items.every((item, i) => {
      return userAnswer[i] === item.threat;
    });
  } else if (question.steps) {
    // Qadamlarni tartiblash - har qanday tartib qabul qilinadi
    isCorrect = true;
    correctAnswerText = "Any correct order is accepted";
  } else if (question.imageBased && question.questions) {
    // Rasm asosidagi savollar
    isCorrect = question.questions.every((subQuestion, i) => {
      return userAnswer[i] === subQuestion.correctAnswer;
    });
  }

  // Ball qo'shish
  if (isCorrect) {
    userScore += 10;
    currentScoreElement.textContent = userScore;
  }

  // Tugmani yangilash
  checkAnswerBtn.textContent = isCorrect
    ? "✓ Correct! +10 points"
    : "✗ Incorrect";
  checkAnswerBtn.disabled = true;
  checkAnswerBtn.style.backgroundColor = isCorrect ? "#28a745" : "#dc3545";

  // Javobni rang bilan ajratish
  highlightAnswerFeedback(isCorrect, correctAnswerText);
}

// Javob natijasini rang bilan ko'rsatish
function highlightAnswerFeedback(isCorrect, correctAnswerText) {
  const question = questions[currentQuestionIndex];

  if (question.options) {
    // Variantlarni rang bilan ajratish
    const isMultipleChoice =
      question.correctKeys && question.correctKeys.length > 1;

    document.querySelectorAll(".option").forEach((option) => {
      const input = option.querySelector("input");
      const key = input ? input.value : null;

      if (isMultipleChoice) {
        // Checkbox - bir nechta javob
        if (question.correctKeys.includes(key)) {
          option.classList.add("correct-option");
        } else if (
          input &&
          input.checked &&
          !question.correctKeys.includes(key)
        ) {
          option.classList.add("incorrect-option");
        }
      } else {
        // Radio - bitta javob
        if (key === question.correctKey) {
          option.classList.add("correct-option");
        } else if (input && input.checked && key !== question.correctKey) {
          option.classList.add("incorrect-option");
        }
      }

      // Inputni o'chirish
      if (input) input.disabled = true;
    });

    // To'g'ri javobni ko'rsatish
    if (!isCorrect && correctAnswerText) {
      const feedbackDiv = document.createElement("div");
      feedbackDiv.className = "answer-feedback";
      feedbackDiv.innerHTML = `<p>${correctAnswerText}</p>`;
      document.querySelector(".options-container").appendChild(feedbackDiv);
    }
  } else if (question.statements) {
    // True/False bayonotlari
    document.querySelectorAll(".statement").forEach((statement, index) => {
      const correctAnswer = question.statements[index].answer;
      const trueLabel = statement.querySelector(
        ".true-false-label:first-child"
      );
      const falseLabel = statement.querySelector(
        ".true-false-label:last-child"
      );

      if (correctAnswer === "True") {
        trueLabel.classList.add("correct-tf");
        if (userAnswers[currentQuestionIndex][index] === "False") {
          falseLabel.classList.add("incorrect-tf");
        }
      } else {
        falseLabel.classList.add("correct-tf");
        if (userAnswers[currentQuestionIndex][index] === "True") {
          trueLabel.classList.add("incorrect-tf");
        }
      }

      // Radio buttonlarni o'chirish
      statement.querySelectorAll('input[type="radio"]').forEach((radio) => {
        radio.disabled = true;
      });
    });
  } else if (question.fillInTheBlanks) {
    // Bo'sh joylarni to'ldirish natijalari
    document.querySelectorAll(".blank-select").forEach((select) => {
      const blankIndex = parseInt(select.getAttribute("data-blank-index"));
      const optionIndex = parseInt(select.getAttribute("data-option-index"));
      const correctAnswer =
        question.fillInTheBlanks[blankIndex].blanks[optionIndex].correct;

      if (select.value === correctAnswer) {
        select.style.backgroundColor = "#d4edda";
        select.style.borderColor = "#28a745";
        select.style.color = "#155724";
      } else {
        select.style.backgroundColor = "#f8d7da";
        select.style.borderColor = "#dc3545";
        select.style.color = "#721c24";

        // To'g'ri javobni ko'rsatish
        const correctOption = Array.from(select.options).find(
          (opt) => opt.value === correctAnswer
        );
        if (correctOption) {
          select.insertAdjacentHTML(
            "afterend",
            `<small class="correct-answer-hint">Correct: ${correctAnswer}</small>`
          );
        }
      }

      select.disabled = true;
    });
  } else if (question.matching) {
    // Moslashtirish natijalari
    document.querySelectorAll(".matching-select").forEach((select) => {
      const itemIndex = parseInt(select.getAttribute("data-item-index"));
      const correctAnswer = question.matching.items[itemIndex].threat;

      if (select.value === correctAnswer) {
        select.style.backgroundColor = "#d4edda";
        select.style.borderColor = "#28a745";
      } else {
        select.style.backgroundColor = "#f8d7da";
        select.style.borderColor = "#dc3545";

        // To'g'ri javobni ko'rsatish
        select.insertAdjacentHTML(
          "afterend",
          `<small class="correct-answer-hint">Correct match: ${correctAnswer}</small>`
        );
      }

      select.disabled = true;
    });
  }
}

// Oldingi savolga o'tish
function goToPreviousQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    displayQuestion(currentQuestionIndex);
  }
}

// Keyingi savolga o'tish
function goToNextQuestion() {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    displayQuestion(currentQuestionIndex);
  } else {
    // Oxirgi savol - testni tugatish
    endTest();
  }
}

// Testni tugatish
function endTest() {
  clearInterval(timerInterval);

  testInterface.style.display = "none";
  resultPage.style.display = "block";

  // Natijalarni hisoblash
  const correctCount = Math.floor(userScore / 10);
  const incorrectCount = questions.length - correctCount;
  const percentage = Math.round((userScore / MAX_SCORE) * 100);

  // Natijalarni ko'rsatish
  document.getElementById("finalScore").textContent = userScore;
  document.getElementById("resultTotalQuestions").textContent =
    questions.length;
  document.getElementById("resultCorrectAnswers").textContent = correctCount;
  document.getElementById("resultIncorrectAnswers").textContent =
    incorrectCount;
  document.getElementById("resultPercentage").textContent = `${percentage}%`;
  document.getElementById("resultTimeTaken").textContent =
    timerElement.textContent;

  // Ball aylanasi
  const scoreCircle = document.querySelector(".score-circle");
  const percentageForCircle = Math.min(percentage, 100);
  scoreCircle.style.background = `conic-gradient(#2a5298 0% ${percentageForCircle}%, #e0e0e0 ${percentageForCircle}% 100%)`;
}

// Testni qayta boshlash
function restartTest() {
  currentQuestionIndex = 0;
  userScore = 0;
  userAnswers = new Array(questions.length).fill(null);
  timeLeft = 2700;

  currentScoreElement.textContent = "0";
  resultPage.style.display = "none";
  testInterface.style.display = "block";

  // Yangi tasodifiy tartiblash
  shuffleAllQuestions();

  startTimer();
  displayQuestion(currentQuestionIndex);
}

// Chiqish
function logout() {
  currentQuestionIndex = 0;
  userScore = 0;
  userAnswers = new Array(questions.length).fill(null);
  timeLeft = 2700;

  clearInterval(timerInterval);

  loginPage.style.display = "flex";
  testInterface.style.display = "none";
  resultPage.style.display = "none";

  loginForm.reset();
  loginError.style.display = "none";
}

// Himoya funksiyalari
document.addEventListener("contextmenu", function (e) {
  if (testStarted) {
    e.preventDefault();
    alert("Copying test content is prohibited.");
    return false;
  }
});

document.addEventListener("selectstart", function (e) {
  if (testStarted) {
    e.preventDefault();
    return false;
  }
});

document.addEventListener("keydown", function (e) {
  if (testStarted) {
    if (
      e.ctrlKey &&
      (e.key === "c" || e.key === "v" || e.key === "a" || e.key === "x")
    ) {
      e.preventDefault();
      return false;
    }

    if (e.key === "F12") {
      e.preventDefault();
      return false;
    }

    if (e.key === "PrintScreen") {
      e.preventDefault();
      return false;
    }
  }
});

window.addEventListener("beforeunload", function (e) {
  if (testStarted) {
    e.preventDefault();
    e.returnValue = "Test is in progress. Are you sure you want to leave?";
  }
});

// Testni tugatish
function endTest() {
  clearInterval(timerInterval);

  // Test interfeysini yashirish, natija sahifasini ko'rsatish
  testInterface.style.display = "none";
  resultPage.style.display = "block";

  // Natijalarni hisoblash
  const correctCount = Math.floor(userScore / 10);
  const incorrectCount = questions.length - correctCount;
  const percentage = Math.round((userScore / MAX_SCORE) * 100);

  // Natijalarni ko'rsatish
  document.getElementById("finalScore").textContent = userScore;
  document.getElementById("resultTotalQuestions").textContent =
    questions.length;
  document.getElementById("resultCorrectAnswers").textContent = correctCount;
  document.getElementById("resultIncorrectAnswers").textContent =
    incorrectCount;
  document.getElementById("resultPercentage").textContent = `${percentage}%`;
  document.getElementById("resultTimeTaken").textContent =
    timerElement.textContent;

  // Certificate holatini aniqlash va ko'rsatish
  const certificateStatus = getCertificateStatus(percentage);
  document.getElementById("certificateStatus").textContent =
    certificateStatus.text;
  document.getElementById(
    "certificateStatus"
  ).className = `certificate-status ${certificateStatus.class}`;

  // Ball aylanasi
  const scoreCircle = document.querySelector(".score-circle");
  const percentageForCircle = Math.min(percentage, 100);
  scoreCircle.style.background = `conic-gradient(#2a5298 0% ${percentageForCircle}%, #e0e0e0 ${percentageForCircle}% 100%)`;

  // Savol-qayta ko'rish uchun jadval yaratish
  createResultsTable();
}

// Certificate holatini aniqlash
function getCertificateStatus(percentage) {
  if (percentage >= 85) {
    return {
      text: "Excellent! You passed with distinction",
      class: "distinction",
    };
  } else if (percentage >= 70) {
    return {
      text: "Congratulations! You passed the test",
      class: "passed",
    };
  } else if (percentage >= 50) {
    return {
      text: "You need more practice",
      class: "practice",
    };
  } else {
    return {
      text: "Failed - Please study and try again",
      class: "failed",
    };
  }
}

// Natijalar jadvalini yaratish
function createResultsTable() {
  const resultsTable = document.getElementById("resultsTable");
  if (!resultsTable) return;

  let tableHTML = `
        <table class="results-table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Question</th>
                    <th>Your Answer</th>
                    <th>Correct Answer</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
    `;

  questions.forEach((question, index) => {
    const userAnswer = userAnswers[index];
    const userAnswerText = formatUserAnswer(question, userAnswer);
    const correctAnswerText = formatCorrectAnswer(question);
    const status = checkAnswerStatus(question, userAnswer);

    tableHTML += `
            <tr class="result-row ${status.class}">
                <td class="question-number">${index + 1}</td>
                <td class="question-cell">${getQuestionPreview(question)}</td>
                <td class="user-answer">${userAnswerText}</td>
                <td class="correct-answer">${correctAnswerText}</td>
                <td class="status-cell">
                    <span class="status-badge ${status.class}">${
      status.text
    }</span>
                </td>
            </tr>
        `;
  });

  tableHTML += `
            </tbody>
        </table>
    `;

  resultsTable.innerHTML = tableHTML;
}

// Foydalanuvchi javobini formatlash
function formatUserAnswer(question, userAnswer) {
  if (!userAnswer || (Array.isArray(userAnswer) && userAnswer.length === 0)) {
    return '<span class="not-answered">Not answered</span>';
  }

  if (question.steps) {
    // Steps savoli uchun
    const steps = userAnswer.map((step) => step.key).join(", ");
    return `Steps: [${steps}]`;
  } else if (question.statements) {
    // True/False savoli uchun
    const answers = userAnswer
      .map((ans, i) => `Statement ${i + 1}: ${ans || "Not answered"}`)
      .join("<br>");
    return answers;
  } else if (question.fillInTheBlanks) {
    // Bo'sh joyni to'ldirish uchun
    return "Fill in blanks";
  } else if (question.matching) {
    // Moslashtirish uchun
    return "Matching answers";
  } else if (question.correctKeys) {
    // Bir nechta javob uchun
    return userAnswer.sort().join(", ");
  } else {
    // Bitta javob uchun
    return userAnswer[0] || "Not answered";
  }
}

// To'g'ri javobni formatlash
function formatCorrectAnswer(question) {
  if (question.correctKey) {
    return question.correctKey;
  } else if (question.correctKeys) {
    return question.correctKeys.sort().join(", ");
  } else if (question.statements) {
    const answers = question.statements
      .map((stmt, i) => `Statement ${i + 1}: ${stmt.answer}`)
      .join("<br>");
    return answers;
  } else if (question.steps) {
    return question.correctKey.join(", ");
  } else if (question.fillInTheBlanks) {
    return "Completed text";
  } else if (question.matching) {
    return "Correct matches";
  }
  return "N/A";
}

// Javob holatini tekshirish
function checkAnswerStatus(question, userAnswer) {
  // Agar javob berilmagan bo'lsa
  if (!userAnswer || (Array.isArray(userAnswer) && userAnswer.length === 0)) {
    return {
      text: "Not answered",
      class: "not-answered",
    };
  }

  let isCorrect = false;

  // Savol turiga qarab tekshirish
  if (question.correctKey) {
    // Bitta to'g'ri javob
    isCorrect = userAnswer[0] === question.correctKey;
  } else if (question.correctKeys) {
    // Bir nechta to'g'ri javob
    if (userAnswer.length !== question.correctKeys.length) {
      isCorrect = false;
    } else {
      const sortedUser = [...userAnswer].sort();
      const sortedCorrect = [...question.correctKeys].sort();
      isCorrect = arraysEqual(sortedUser, sortedCorrect);
    }
  } else if (question.statements) {
    // True/False bayonotlar
    isCorrect = question.statements.every(
      (stmt, i) => userAnswer[i] === stmt.answer
    );
  } else if (question.steps) {
    // Steps tartibi
    const userOrder = userAnswer.map((step) => step.key);
    isCorrect = arraysEqual(userOrder, question.correctKey);
  }

  return {
    text: isCorrect ? "Correct" : "Incorrect",
    class: isCorrect ? "correct" : "incorrect",
  };
}

// Savol matnini qisqartirish
function getQuestionPreview(question) {
  let questionText = "";

  if (Array.isArray(question.question)) {
    questionText =
      question.question[0].savol || question.question[0].question || "";
  } else {
    questionText = question.question;
  }

  // 60 ta belgidan ortiq bo'lsa, qisqartirish
  if (questionText.length > 60) {
    return questionText.substring(0, 60) + "...";
  }

  return questionText;
}

// Massivlarni solishtirish
function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}
