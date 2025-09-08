const mySubjects = {
  angielski: {
    id: "subject_angielski",
    flashcards: [
      {
        id: "ang_flash_1",
        definition: "to procrastinate",
        explanation:
          "to delay doing something, especially because you do not want to do it",
        tags: ["verbs", "B2"],
      },
      {
        id: "ang_flash_2",
        definition: "ubiquitous",
        explanation: "present or existing everywhere; very common",
        tags: ["adjectives", "C1"],
      },
      {
        id: "ang_flash_3",
        definition: "to enhance",
        explanation: "to improve the quality, amount, or strength of something",
        tags: ["verbs", "C1"],
      },
      {
        id: "ang_flash_4",
        definition: "to dane",
        explanation: "to move like beast",
        tags: ["verbs", "C1"],
      },
    ],
    quizzes: [
      {
        id: "ang_quiz_1",
        title: "Basics of Vocabulary",
        questions: [
          {
            id: "ang_q_1_1",
            question: "What does 'to procrastinate' mean?",
            type: "multiple-choice",
            answers: [
              {
                id: "ang_a_1_1_1",
                text: "To act immediately",
                isCorrect: false,
              },
              {
                id: "ang_a_1_1_2",
                text: "To delay doing something",
                isCorrect: true,
              },
              { id: "ang_a_1_1_3", text: "To plan ahead", isCorrect: false },
              { id: "ang_a_1_1_4", text: "To finish early", isCorrect: false },
            ],
          },
          {
            id: "ang_q_1_2",
            question: "'Ubiquitous' is closest in meaning to:",
            type: "multiple-choice",
            answers: [
              { id: "ang_a_1_2_1", text: "Rare", isCorrect: false },
              { id: "ang_a_1_2_2", text: "Common", isCorrect: true },
              { id: "ang_a_1_2_3", text: "Expensive", isCorrect: false },
              { id: "ang_a_1_2_4", text: "Boring", isCorrect: false },
            ],
          },
          {
            id: "ang_q_1_3",
            question: "True or false: 'To procrastinate' means to hurry up.",
            type: "true-false",
            answers: [
              { id: "ang_a_1_3_1", text: "True", isCorrect: false },
              { id: "ang_a_1_3_2", text: "False", isCorrect: true },
            ],
          },
        ],
      },
      {
        id: "ang_quiz_2",
        title: "Advanced Vocabulary Challenge",
        questions: [
          {
            id: "ang_q_2_1",
            question: "What does 'to enhance' mean?",
            type: "multiple-choice",
            answers: [
              {
                id: "ang_a_2_1_1",
                text: "To damage something",
                isCorrect: false,
              },
              {
                id: "ang_a_2_1_2",
                text: "To observe something",
                isCorrect: false,
              },
              {
                id: "ang_a_2_1_3",
                text: "To improve something",
                isCorrect: true,
              },
              {
                id: "ang_a_2_1_4",
                text: "To delete something",
                isCorrect: false,
              },
            ],
          },
          {
            id: "ang_q_2_2",
            question: "Which word means 'everywhere at once'?",
            type: "multiple-choice",
            answers: [
              { id: "ang_a_2_2_1", text: "Transparent", isCorrect: false },
              { id: "ang_a_2_2_2", text: "Obvious", isCorrect: false },
              { id: "ang_a_2_2_3", text: "Ubiquitous", isCorrect: true },
              { id: "ang_a_2_2_4", text: "Mysterious", isCorrect: false },
            ],
          },
          {
            id: "ang_q_2_3",
            question: "What is a synonym of 'to delay'?",
            type: "multiple-choice",
            answers: [
              { id: "ang_a_2_3_1", text: "To accelerate", isCorrect: false },
              { id: "ang_a_2_3_2", text: "To begin", isCorrect: false },
              { id: "ang_a_2_3_3", text: "To procrastinate", isCorrect: true },
              { id: "ang_a_2_3_4", text: "To hurry", isCorrect: false },
            ],
          },
          {
            id: "ang_q_2_4",
            question: "Select all words that are verbs:",
            type: "single-choice",
            answers: [
              { id: "ang_a_2_4_1", text: "to enhance", isCorrect: true },
              { id: "ang_a_2_4_2", text: "ubiquitous", isCorrect: false },
              { id: "ang_a_2_4_3", text: "to procrastinate", isCorrect: true },
              { id: "ang_a_2_4_4", text: "beautiful", isCorrect: false },
            ],
          },
        ],
      },
    ],
    notes: [
      {
        id: "ang_note_1",
        title: "Present Perfect",
        note: "<h3>Present Perfect</h3><ul><li>Używamy, gdy czynność <b>ma skutek teraz</b>.</li><li>Typowe słowa klucze: <i>already, yet, just, ever, never</i>.</li><li>Przykład: <i>I have finished my homework.</i></li></ul>",
      },
      {
        id: "ang_note_2",
        title: "Tryb warunkowy typu 2",
        note: "<h3>Tryb warunkowy typu 2</h3><ul><li>Konstrukcja: <code>If + Past Simple, would + verb</code></li><li>Używamy do mówienia o <b>hipotetycznych sytuacjach</b>.</li><li>Przykład: <i>If I were you, I would study more.</i></li></ul>",
      },
    ],
  },

  matematyka: {
    id: "subject_matematyka",
    flashcards: [
      {
        id: "mat_flash_1",
        definition: "Pitagoras' theorem",
        explanation: "In a right-angled triangle: a² + b² = c²",
        tags: ["geometry", "theorem"],
      },
      {
        id: "mat_flash_2",
        definition: "Derivative",
        explanation: "A measure of how a function changes as its input changes",
        tags: ["calculus"],
      },
      {
        id: "mat_flash_3",
        definition: "Logarithm",
        explanation: "The inverse operation to exponentiation",
        tags: ["algebra"],
      },
    ],
    quizzes: [
      {
        id: "mat_quiz_1",
        title: "Podstawy geometrii",
        questions: [
          {
            id: "mat_q_1_1",
            question: "What is the sum of angles in a triangle?",
            type: "single-choice",
            answers: [
              { id: "mat_a_1_1_1", text: "90°", isCorrect: false },
              { id: "mat_a_1_1_2", text: "180°", isCorrect: true },
              { id: "mat_a_1_1_3", text: "270°", isCorrect: false },
              { id: "mat_a_1_1_4", text: "360°", isCorrect: false },
            ],
          },
          {
            id: "mat_q_1_2",
            question: "Which of the following are types of triangles?",
            type: "multiple-choice",
            answers: [
              { id: "mat_a_1_2_1", text: "Equilateral", isCorrect: true },
              { id: "mat_a_1_2_2", text: "Isosceles", isCorrect: true },
              { id: "mat_a_1_2_3", text: "Scalene", isCorrect: true },
              { id: "mat_a_1_2_4", text: "Circular", isCorrect: false },
            ],
          },
          {
            id: "mat_q_1_3",
            question:
              "True or false: All equilateral triangles are also isosceles.",
            type: "true-false",
            answers: [
              { id: "mat_a_1_3_1", text: "True", isCorrect: true },
              { id: "mat_a_1_3_2", text: "False", isCorrect: false },
            ],
          },
        ],
      },
      {
        id: "mat_quiz_2",
        title: "Rachunek różniczkowy",
        questions: [
          {
            id: "mat_q_2_1",
            question: "What is the derivative of x²?",
            type: "single-choice",
            answers: [
              { id: "mat_a_2_1_1", text: "x", isCorrect: false },
              { id: "mat_a_2_1_2", text: "2x", isCorrect: true },
              { id: "mat_a_2_1_3", text: "x²", isCorrect: false },
              { id: "mat_a_2_1_4", text: "1", isCorrect: false },
            ],
          },
          {
            id: "mat_q_2_2",
            question: "Select all correct rules of derivatives:",
            type: "multiple-choice",
            answers: [
              {
                id: "mat_a_2_2_1",
                text: "d/dx(c) = 0 for constant c",
                isCorrect: true,
              },
              { id: "mat_a_2_2_2", text: "d/dx(xⁿ) = n·xⁿ⁻¹", isCorrect: true },
              {
                id: "mat_a_2_2_3",
                text: "d/dx(sin x) = cos x",
                isCorrect: true,
              },
              {
                id: "mat_a_2_2_4",
                text: "d/dx(cos x) = sin x",
                isCorrect: false,
              },
            ],
          },
          {
            id: "mat_q_2_3",
            question: "True or false: derivative of ln(x) is 1/x.",
            type: "true-false",
            answers: [
              { id: "mat_a_2_3_1", text: "True", isCorrect: true },
              { id: "mat_a_2_3_2", text: "False", isCorrect: false },
            ],
          },
        ],
      },
    ],
    notes: [
      {
        id: "mat_note_1",
        title: "Wzory skróconego mnożenia",
        note: "<h3>Wzory skróconego mnożenia</h3><ul><li>(a+b)² = a² + 2ab + b²</li><li>(a-b)² = a² - 2ab + b²</li><li>(a+b)(a-b) = a² - b²</li></ul>",
      },
      {
        id: "mat_note_2",
        title: "Pochodne – podstawowe wzory",
        note: "<ul><li>d/dx(c) = 0</li><li>d/dx(xⁿ) = n·xⁿ⁻¹</li><li>d/dx(sin x) = cos x</li><li>d/dx(cos x) = -sin x</li><li>d/dx(eˣ) = eˣ</li></ul>",
      },
    ],
  },

  biologia: {
    id: "subject_biologia",
    flashcards: [
      {
        id: "bio_flash_1",
        definition: "Mitochondrion",
        explanation: "Organelle responsible for energy production in cells",
        tags: ["cell biology"],
      },
      {
        id: "bio_flash_2",
        definition: "Osmosis",
        explanation:
          "Movement of water molecules through a semipermeable membrane",
        tags: ["cell transport"],
      },
    ],
    quizzes: [
      {
        id: "bio_quiz_1",
        title: "Komórka – podstawy",
        questions: [
          {
            id: "bio_q_1_1",
            question: "Which part of the cell produces energy?",
            type: "multiple-choice",
            answers: [
              { id: "bio_a_1_1_1", text: "Nucleus", isCorrect: false },
              { id: "bio_a_1_1_2", text: "Mitochondrion", isCorrect: true },
              { id: "bio_a_1_1_3", text: "Chloroplast", isCorrect: false },
              { id: "bio_a_1_1_4", text: "Ribosome", isCorrect: false },
            ],
          },
          {
            id: "bio_q_1_2",
            question: "What is osmosis?",
            type: "multiple-choice",
            answers: [
              {
                id: "bio_a_1_2_1",
                text: "Water movement across a membrane",
                isCorrect: true,
              },
              { id: "bio_a_1_2_2", text: "Cell division", isCorrect: false },
              {
                id: "bio_a_1_2_3",
                text: "Protein synthesis",
                isCorrect: false,
              },
              { id: "bio_a_1_2_4", text: "DNA replication", isCorrect: false },
            ],
          },
          {
            id: "bio_q_1_3",
            question:
              "True or false: Ribosomes are responsible for energy production.",
            type: "true-false",
            answers: [
              { id: "bio_a_1_3_1", text: "True", isCorrect: false },
              { id: "bio_a_1_3_2", text: "False", isCorrect: true },
            ],
          },
        ],
      },
      {
        id: "bio_quiz_2",
        title: "Organelles and Functions",
        questions: [
          {
            id: "bio_q_2_1",
            question: "Which organelle contains genetic material?",
            type: "multiple-choice",
            answers: [
              { id: "bio_a_2_1_1", text: "Nucleus", isCorrect: true },
              { id: "bio_a_2_1_2", text: "Ribosome", isCorrect: false },
              { id: "bio_a_2_1_3", text: "Golgi apparatus", isCorrect: false },
              { id: "bio_a_2_1_4", text: "Lysosome", isCorrect: false },
            ],
          },
          {
            id: "bio_q_2_2",
            question: "Where does photosynthesis occur?",
            type: "multiple-choice",
            answers: [
              { id: "bio_a_2_2_1", text: "Mitochondrion", isCorrect: false },
              { id: "bio_a_2_2_2", text: "Nucleus", isCorrect: false },
              { id: "bio_a_2_2_3", text: "Chloroplast", isCorrect: true },
              { id: "bio_a_2_2_4", text: "Cell wall", isCorrect: false },
            ],
          },
          {
            id: "bio_q_2_3",
            question: "Select all organelles present in plant cells:",
            type: "multiple-choice",
            answers: [
              { id: "bio_a_2_3_1", text: "Chloroplast", isCorrect: true },
              { id: "bio_a_2_3_2", text: "Mitochondrion", isCorrect: true },
              { id: "bio_a_2_3_3", text: "Cell wall", isCorrect: true },
              { id: "bio_a_2_3_4", text: "Centrioles", isCorrect: false },
            ],
          },
        ],
      },
    ],
    notes: [
      {
        id: "bio_note_1",
        title: "DNA",
        note: "<h3>DNA</h3><ul><li>Materiał genetyczny znajduje się w <b>jądrze komórkowym</b>.</li><li>DNA zawiera informacje potrzebne do syntezy białek.</li></ul>",
      },
      {
        id: "bio_note_2",
        title: "Fotosynteza",
        note: "<h3>Fotosynteza</h3><ul><li>Zachodzi w <b>chloroplastach</b>.</li><li>Wymaga: <i>światła słonecznego, wody i dwutlenku węgla</i>.</li><li>Produkty: <b>glukoza</b> + <b>tlen</b>.</li></ul>",
      },
    ],
  },

  informatyka: {
    id: "subject_informatyka",
    flashcards: [
      {
        id: "inf_flash_1",
        definition: "Variable",
        explanation: "A named space in memory to store a value",
        tags: ["programming basics"],
      },
      {
        id: "inf_flash_2",
        definition: "Function",
        explanation: "Reusable block of code that performs a specific task",
        tags: ["programming"],
      },
      {
        id: "inf_flash_3",
        definition: "Boolean",
        explanation: "A data type with only two possible values: true or false",
        tags: ["data types"],
      },
    ],
    quizzes: [
      {
        id: "inf_quiz_1",
        title: "Podstawy programowania",
        questions: [
          {
            id: "inf_q_1_1",
            question: "What is a function?",
            type: "multiple-choice",
            answers: [
              { id: "inf_a_1_1_1", text: "A loop", isCorrect: false },
              {
                id: "inf_a_1_1_2",
                text: "A reusable code block",
                isCorrect: true,
              },
              { id: "inf_a_1_1_3", text: "A comment", isCorrect: false },
              { id: "inf_a_1_1_4", text: "A number", isCorrect: false },
            ],
          },
          {
            id: "inf_q_1_2",
            question: "Which of the following is a boolean value?",
            type: "multiple-choice",
            answers: [
              { id: "inf_a_1_2_1", text: '"maybe"', isCorrect: false },
              { id: "inf_a_1_2_2", text: '"true"', isCorrect: true },
              { id: "inf_a_1_2_3", text: '"42"', isCorrect: false },
              { id: "inf_a_1_2_4", text: '"null"', isCorrect: false },
            ],
          },
          {
            id: "inf_q_1_3",
            question:
              "True or false: A variable can hold different types of data during execution.",
            type: "true-false",
            answers: [
              { id: "inf_a_1_3_1", text: "True", isCorrect: true },
              { id: "inf_a_1_3_2", text: "False", isCorrect: false },
            ],
          },
        ],
      },
      {
        id: "inf_quiz_2",
        title: "Zmienne i typy danych",
        questions: [
          {
            id: "inf_q_2_1",
            question: "Which of these is a valid variable name in JavaScript?",
            type: "multiple-choice",
            answers: [
              { id: "inf_a_2_1_1", text: "2value", isCorrect: false },
              { id: "inf_a_2_1_2", text: "value_2", isCorrect: true },
              { id: "inf_a_2_1_3", text: "value-2", isCorrect: false },
              { id: "inf_a_2_1_4", text: "value 2", isCorrect: false },
            ],
          },
          {
            id: "inf_q_2_2",
            question: "What data type is used for 'true' and 'false'?",
            type: "multiple-choice",
            answers: [
              { id: "inf_a_2_2_1", text: "String", isCorrect: false },
              { id: "inf_a_2_2_2", text: "Integer", isCorrect: false },
              { id: "inf_a_2_2_3", text: "Boolean", isCorrect: true },
              { id: "inf_a_2_2_4", text: "Array", isCorrect: false },
            ],
          },
          {
            id: "inf_q_2_3",
            question: "Select all correct ways to declare variables in JS:",
            type: "multiple-choice",
            answers: [
              { id: "inf_a_2_3_1", text: "let", isCorrect: true },
              { id: "inf_a_2_3_2", text: "var", isCorrect: true },
              { id: "inf_a_2_3_3", text: "constant", isCorrect: false },
              { id: "inf_a_2_3_4", text: "const", isCorrect: true },
            ],
          },
        ],
      },
    ],
    notes: [
      {
        id: "inf_note_1",
        title: "Zmienne w JavaScript",
        note: "<h3>Zmienne w JavaScript</h3><ul><li>Deklarujemy za pomocą: <code>let</code>, <code>const</code>, lub <code>var</code>.</li><li><code>let</code> – zmienna, którą można zmieniać.</li><li><code>const</code> – wartość stała, której nie można nadpisać.</li><li><code>var</code> – stara metoda, rzadziej używana.</li></ul>",
      },
      {
        id: "inf_note_2",
        title: "Funkcje",
        note: "<h3>Funkcje</h3><ul><li>Funkcja może przyjmować <b>parametry</b>.</li><li>Może <b>zwracać wartość</b> za pomocą <code>return</code>.</li><li>Możemy pisać funkcje tradycyjne lub tzw. <i>arrow functions</i>.</li></ul>",
      },
    ],
  },
};

export default mySubjects;
