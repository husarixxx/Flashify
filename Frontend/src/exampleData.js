const mySubjects = {
  angielski: {
    flashcards: [
      {
        definition: "to procrastinate",
        explanation:
          "to delay doing something, especially because you do not want to do it",
        tags: ["verbs", "B2"],
      },
      {
        definition: "ubiquitous",
        explanation: "present or existing everywhere; very common",
        tags: ["adjectives", "C1"],
      },
      {
        definition: "to enhance",
        explanation: "to improve the quality, amount, or strength of something",
        tags: ["verbs", "C1"],
      },
      {
        definition: "to dane",
        explanation: "to move like beast",
        tags: ["verbs", "C1"],
      },
    ],
    quizzes: [
      {
        question: "What does 'to procrastinate' mean?",
        type: "multiple-choice",
        answers: [
          { text: "To act immediately", isCorrect: false },
          { text: "To delay doing something", isCorrect: true },
          { text: "To plan ahead", isCorrect: false },
        ],
      },
      {
        question: "'Ubiquitous' is closest in meaning to:",
        type: "multiple-choice",
        answers: [
          { text: "Rare", isCorrect: false },
          { text: "Common", isCorrect: true },
          { text: "Expensive", isCorrect: false },
        ],
      },
    ],
    notes: [
      "Present Perfect używamy, gdy czynność ma skutek teraz.",
      "Tryb warunkowy typu 2: If I were you, I would...",
    ],
  },

  matematyka: {
    flashcards: [
      {
        definition: "Pitagoras' theorem",
        explanation: "In a right-angled triangle: a² + b² = c²",
        tags: ["geometry", "theorem"],
      },
      {
        definition: "Derivative",
        explanation: "A measure of how a function changes as its input changes",
        tags: ["calculus"],
      },
    ],
    quizzes: [
      {
        question: "What is the derivative of x²?",
        type: "short-answer",
        answers: [{ text: "2x", isCorrect: true }],
      },
      {
        question: "What is the hypotenuse of a triangle with sides 3 and 4?",
        type: "multiple-choice",
        answers: [
          { text: "5", isCorrect: true },
          { text: "6", isCorrect: false },
          { text: "7", isCorrect: false },
        ],
      },
    ],
    notes: [
      "Wzór skróconego mnożenia: (a+b)² = a² + 2ab + b²",
      "Pochodna funkcji stałej to 0.",
    ],
  },

  biologia: {
    flashcards: [
      {
        definition: "Mitochondrion",
        explanation: "Organelle responsible for energy production in cells",
        tags: ["cell biology"],
      },
      {
        definition: "Osmosis",
        explanation:
          "Movement of water molecules through a semipermeable membrane",
        tags: ["cell transport"],
      },
    ],
    quizzes: [
      {
        question: "Which part of the cell produces energy?",
        type: "multiple-choice",
        answers: [
          { text: "Nucleus", isCorrect: false },
          { text: "Mitochondrion", isCorrect: true },
          { text: "Chloroplast", isCorrect: false },
        ],
      },
      {
        question: "What is osmosis?",
        type: "multiple-choice",
        answers: [
          { text: "Water movement across a membrane", isCorrect: true },
          { text: "Cell division", isCorrect: false },
          { text: "Protein synthesis", isCorrect: false },
        ],
      },
    ],
    notes: [
      "DNA znajduje się w jądrze komórkowym.",
      "Fotosynteza zachodzi w chloroplastach i wymaga światła słonecznego.",
    ],
  },

  informatyka: {
    flashcards: [
      {
        definition: "Variable",
        explanation: "A named space in memory to store a value",
        tags: ["programming basics"],
      },
      {
        definition: "Function",
        explanation: "Reusable block of code that performs a specific task",
        tags: ["programming"],
      },
      {
        definition: "Boolean",
        explanation: "A data type with only two possible values: true or false",
        tags: ["data types"],
      },
    ],
    quizzes: [
      {
        question: "What is a function?",
        type: "multiple-choice",
        answers: [
          { text: "A loop", isCorrect: false },
          { text: "A reusable code block", isCorrect: true },
          { text: "A comment", isCorrect: false },
        ],
      },
      {
        question: "Which of the following is a boolean value?",
        type: "multiple-choice",
        answers: [
          { text: `"maybe"`, isCorrect: false },
          { text: `"true"`, isCorrect: true },
          { text: `"42"`, isCorrect: false },
        ],
      },
    ],
    notes: [
      "W JavaScript deklarujemy zmienne za pomocą `let`, `const`, lub `var`.",
      "Funkcja może przyjmować parametry i zwracać wartość.",
    ],
  },
};

export default mySubjects;
