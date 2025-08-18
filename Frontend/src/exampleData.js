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
        title: "Basics of Vocabulary",
        questions: [
          {
            question: "What does 'to procrastinate' mean?",
            type: "multiple-choice",
            answers: [
              { text: "To act immediately", isCorrect: false },
              { text: "To delay doing something", isCorrect: true },
              { text: "To plan ahead", isCorrect: false },
              { text: "To finish early", isCorrect: false },
            ],
          },
          {
            question: "'Ubiquitous' is closest in meaning to:",
            type: "multiple-choice",
            answers: [
              { text: "Rare", isCorrect: false },
              { text: "Common", isCorrect: true },
              { text: "Expensive", isCorrect: false },
              { text: "Boring", isCorrect: false },
            ],
          },
        ],
      },
      {
        title: "Advanced Vocabulary Challenge",
        questions: [
          {
            question: "What does 'to enhance' mean?",
            type: "multiple-choice",
            answers: [
              { text: "To damage something", isCorrect: false },
              { text: "To observe something", isCorrect: false },
              { text: "To improve something", isCorrect: true },
              { text: "To delete something", isCorrect: false },
            ],
          },
          {
            question: "Which word means 'everywhere at once'?",
            type: "multiple-choice",
            answers: [
              { text: "Transparent", isCorrect: false },
              { text: "Obvious", isCorrect: false },
              { text: "Ubiquitous", isCorrect: true },
              { text: "Mysterious", isCorrect: false },
            ],
          },
          {
            question: "What is a synonym of 'to delay'?",
            type: "multiple-choice",
            answers: [
              { text: "To accelerate", isCorrect: false },
              { text: "To begin", isCorrect: false },
              { text: "To procrastinate", isCorrect: true },
              { text: "To hurry", isCorrect: false },
            ],
          },
        ],
      },
    ],
    notes: [
      {
        title: "Present Perfect",
        note: "<h3>Present Perfect</h3><ul><li>Używamy, gdy czynność <b>ma skutek teraz</b>.</li><li>Typowe słowa klucze: <i>already, yet, just, ever, never</i>.</li><li>Przykład: <i>I have finished my homework.</i></li></ul>",
      },
      {
        title: "Tryb warunkowy typu 2",
        note: "<h3>Tryb warunkowy typu 2</h3><ul><li>Konstrukcja: <code>If + Past Simple, would + verb</code></li><li>Używamy do mówienia o <b>hipotetycznych sytuacjach</b>.</li><li>Przykład: <i>If I were you, I would study more.</i></li></ul>",
      },
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
        title: "Podstawy pochodnych",
        questions: [
          {
            question: "What is the derivative of x²?",
            type: "short-answer",
            answers: [{ text: "2x", isCorrect: true }],
          },
        ],
      },
      {
        title: "Geometria – trójkąty",
        questions: [
          {
            question:
              "What is the hypotenuse of a triangle with sides 3 and 4?",
            type: "multiple-choice",
            answers: [
              { text: "5", isCorrect: true },
              { text: "6", isCorrect: false },
              { text: "7", isCorrect: false },
              { text: "4", isCorrect: false },
            ],
          },
        ],
      },
      {
        title: "Rachunek różniczkowy – poziom 1",
        questions: [
          {
            question: "What is the derivative of a constant value?",
            type: "multiple-choice",
            answers: [
              { text: "1", isCorrect: false },
              { text: "x", isCorrect: false },
              { text: "0", isCorrect: true },
              { text: "Undefined", isCorrect: false },
            ],
          },
          {
            question: "What is the derivative of sin(x)?",
            type: "multiple-choice",
            answers: [
              { text: "cos(x)", isCorrect: true },
              { text: "-cos(x)", isCorrect: false },
              { text: "sin(x)", isCorrect: false },
              { text: "-sin(x)", isCorrect: false },
            ],
          },
        ],
      },
    ],
    notes: [
      {
        title: "Wzory skróconego mnożenia",
        note: "<h3>Wzory skróconego mnożenia</h3><ul><li><b>(a+b)² = a² + 2ab + b²</b></li><li><b>(a-b)² = a² - 2ab + b²</b></li><li><b>(a+b)(a-b) = a² - b²</b></li></ul>",
      },
      {
        title: "Pochodne",
        note: "<h3>Pochodne</h3><ul><li>Pochodna <b>funkcji stałej</b> = 0.</li><li>Pochodna <i>x<sup>n</sup></i> = <i>n·x<sup>n-1</sup></i>.</li><li>Pochodna <i>sin(x)</i> = <i>cos(x)</i>.</li><li>Pochodna <i>cos(x)</i> = <i>-sin(x)</i>.</li></ul>",
      },
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
        title: "Komórka – podstawy",
        questions: [
          {
            question: "Which part of the cell produces energy?",
            type: "multiple-choice",
            answers: [
              { text: "Nucleus", isCorrect: false },
              { text: "Mitochondrion", isCorrect: true },
              { text: "Chloroplast", isCorrect: false },
              { text: "Ribosome", isCorrect: false },
            ],
          },
          {
            question: "What is osmosis?",
            type: "multiple-choice",
            answers: [
              { text: "Water movement across a membrane", isCorrect: true },
              { text: "Cell division", isCorrect: false },
              { text: "Protein synthesis", isCorrect: false },
              { text: "DNA replication", isCorrect: false },
            ],
          },
        ],
      },
      {
        title: "Organelles and Functions",
        questions: [
          {
            question: "Which organelle contains genetic material?",
            type: "multiple-choice",
            answers: [
              { text: "Nucleus", isCorrect: true },
              { text: "Ribosome", isCorrect: false },
              { text: "Golgi apparatus", isCorrect: false },
              { text: "Lysosome", isCorrect: false },
            ],
          },
          {
            question: "Where does photosynthesis occur?",
            type: "multiple-choice",
            answers: [
              { text: "Mitochondrion", isCorrect: false },
              { text: "Nucleus", isCorrect: false },
              { text: "Chloroplast", isCorrect: true },
              { text: "Cell wall", isCorrect: false },
            ],
          },
        ],
      },
    ],
    notes: [
      {
        title: "DNA",
        note: "<h3>DNA</h3><ul><li>Materiał genetyczny znajduje się w <b>jądrze komórkowym</b>.</li><li>DNA zawiera informacje potrzebne do syntezy białek.</li></ul>",
      },
      {
        title: "Fotosynteza",
        note: "<h3>Fotosynteza</h3><ul><li>Zachodzi w <b>chloroplastach</b>.</li><li>Wymaga: <i>światła słonecznego, wody i dwutlenku węgla</i>.</li><li>Produkty: <b>glukoza</b> + <b>tlen</b>.</li></ul>",
      },
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
        title: "Podstawy programowania",
        questions: [
          {
            question: "What is a function?",
            type: "multiple-choice",
            answers: [
              { text: "A loop", isCorrect: false },
              { text: "A reusable code block", isCorrect: true },
              { text: "A comment", isCorrect: false },
              { text: "A number", isCorrect: false },
            ],
          },
          {
            question: "Which of the following is a boolean value?",
            type: "multiple-choice",
            answers: [
              { text: '"maybe"', isCorrect: false },
              { text: '"true"', isCorrect: true },
              { text: '"42"', isCorrect: false },
              { text: '"null"', isCorrect: false },
            ],
          },
        ],
      },
      {
        title: "Zmienne i typy danych",
        questions: [
          {
            question: "Which of these is a valid variable name in JavaScript?",
            type: "multiple-choice",
            answers: [
              { text: "2value", isCorrect: false },
              { text: "value_2", isCorrect: true },
              { text: "value-2", isCorrect: false },
              { text: "value 2", isCorrect: false },
            ],
          },
          {
            question: "What data type is used for 'true' and 'false'?",
            type: "multiple-choice",
            answers: [
              { text: "String", isCorrect: false },
              { text: "Integer", isCorrect: false },
              { text: "Boolean", isCorrect: true },
              { text: "Array", isCorrect: false },
            ],
          },
        ],
      },
    ],
    notes: [
      {
        title: "Zmienne w JavaScript",
        note: "<h3>Zmienne w JavaScript</h3><ul><li>Deklarujemy za pomocą: <code>let</code>, <code>const</code>, lub <code>var</code>.</li><li><code>let</code> – zmienna, którą można zmieniać.</li><li><code>const</code> – wartość stała, której nie można nadpisać.</li><li><code>var</code> – stara metoda, rzadziej używana.</li></ul>",
      },
      {
        title: "Funkcje",
        note: "<h3>Funkcje</h3><ul><li>Funkcja może przyjmować <b>parametry</b>.</li><li>Może <b>zwracać wartość</b> za pomocą <code>return</code>.</li><li>Możemy pisać funkcje tradycyjne lub tzw. <i>arrow functions</i>.</li></ul>",
      },
    ],
  },
};

export default mySubjects;
