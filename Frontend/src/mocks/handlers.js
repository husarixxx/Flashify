import { http, HttpResponse } from "msw";
import mySubjects from "../exampleData";

export const handlers = [
  http.get("api/flashcards", () => {
    return HttpResponse.json([
      { id: 1, name: "Jan Kowalski" },
      { id: 2, name: "Anna Nowak" },
    ]);
  }),

  // Tu powinno zwracac array z obiektami subject w formie
  // {
  //     id: id,
  //     name: name,
  //     flashcardsCount: ilosc flashcardsow w tym subject,
  //     quizzesCount: ilosc quizzow w tym subject,
  //     notesCount: ilosc notatek w tym subject,
  //   }
  http.get("api/subjects", () => {
    const subjectsList = Object.entries(mySubjects).map(([key, subject]) => ({
      id: key,
      name: key[0].toUpperCase() + key.slice(1),
      flashcardsCount: subject.flashcards.length,
      quizzesCount: subject.quizzes.length,
      notesCount: subject.notes.length,
    }));
    return HttpResponse.json(subjectsList);
  }),
  http.put("api/subjects", async ({ request }) => {
    const newSubject = await request.json();
    mySubjects[newSubject.name] = {
      id: crypto.randomUUID(),
      flashcards: [],
      quizzes: [],
      notes: [],
    };
    const subjectsList = Object.entries(mySubjects).map(([key, subject]) => ({
      id: key,
      name: key[0].toUpperCase() + key.slice(1),
      flashcardsCount: subject.flashcards.length,
      quizzesCount: subject.quizzes.length,
      notesCount: subject.notes.length,
    }));
    return HttpResponse.json(subjectsList);
  }),
  // Tu jest endpoint ktory zwraca flashcardy z konkretnego subjecta w formie array z flashcardami
  // {
  //   id: id,
  //   definition: definition,
  //   explanation: explanation,
  // }

  http.get("api/subjects/:subjectId/flashcards", (req) => {
    const { subjectId } = req.params;
    console.log(subjectId);
    return HttpResponse.json(mySubjects[subjectId].flashcards);
  }),

  // Tu endpoint usuwajacy konkretny flashcard. Zwraca to samo co poprzedni tylko z usunietym juz flashcardem
  // {
  //   id: id,
  //   definition: definition,
  //   explanation: explanation,
  // }

  http.delete("api/subjects/:subjectId/flashcards/:flashcardId", (req) => {
    const { subjectId, flashcardId } = req.params;
    console.log(subjectId);
    mySubjects[subjectId].flashcards = mySubjects[subjectId].flashcards.filter(
      (flashcard) => flashcard.id != flashcardId
    );
    return HttpResponse.json(mySubjects[subjectId].flashcards);
  }),

  // Zwraca w takiej samej formie co wyzej, tylko zamiast usuwania to aktualizuje
  // {
  //   id: id,
  //   definition: definition,
  //   explanation: explanation,
  // }
  http.put(
    "api/subjects/:subjectId/flashcards/:flashcardId",
    async ({ request, params }) => {
      const { subjectId, flashcardId } = params;
      const updatedFlashcard = await request.json();
      console.log(subjectId);
      console.log(updatedFlashcard);

      mySubjects[subjectId].flashcards = mySubjects[subjectId].flashcards.map(
        (flashcard) =>
          flashcard.id == flashcardId
            ? { ...updatedFlashcard, id: updatedFlashcard }
            : flashcard
      );
      return HttpResponse.json(mySubjects[subjectId].flashcards);
    }
  ),
  // Zwraca w takiej samej formie co wyzej, tylko zamiast aktualizowania to dodaje nowy flashcard
  // {
  //   id: id,
  //   definition: definition,
  //   explanation: explanation,
  // }
  http.post(
    "api/subjects/:subjectId/flashcards",
    async ({ request, params }) => {
      const { subjectId } = params;
      const updatedFlashcard = await request.json();
      console.log(subjectId);
      console.log(updatedFlashcard);

      mySubjects[subjectId].flashcards = [
        ...mySubjects[subjectId].flashcards,
        {
          ...updatedFlashcard,
          id: crypto.randomUUID(),
        },
      ];

      return HttpResponse.json(mySubjects[subjectId].flashcards);
    }
  ),
  // Zwraca array z obiektami quiz z konkretnego subjectu w formie:
  // id: id,
  // title: title,
  // questions: [
  //   {
  //     id: id,
  //     question: question,
  //     type: "multiple-choice / single-choice / true-false",
  //     answers: [
  //       { id: id, text: text, isCorrect: false },
  //       {
  //         id: id,
  //         text: text,
  //         isCorrect: true,
  //       },
  //       { id: id, text: text, isCorrect: false },
  //       { id: id, text: text, isCorrect: false },
  //     ],
  //   },
  http.get("api/subjects/:subjectId/quizzes", (req) => {
    const { subjectId } = req.params;
    return HttpResponse.json(mySubjects[subjectId].quizzes);
  }),
  http.put("api/subjects/:subjectId/quizzes", async ({ request, params }) => {
    const { subjectId } = params;
    const newQuiz = await request.json();
    console.log("newQuiz");
    console.log(newQuiz);
    mySubjects[subjectId].quizzes = [
      ...mySubjects[subjectId].quizzes,
      { id: crypto.randomUUID(), title: newQuiz.name, questions: [] },
    ];
    return HttpResponse.json(mySubjects[subjectId].quizzes);
  }),

  // Usuwa konkretne pytanie i zwraca array z obiektami quiz z konkretnego subjectu w formie:
  // id: id,
  // title: title,
  // questions: [
  //   {
  //     id: id,
  //     question: question,
  //     type: "multiple-choice / single-choice / true-false",
  //     answers: [
  //       { id: id, text: text, isCorrect: false },
  //       {
  //         id: id,
  //         text: text,
  //         isCorrect: true,
  //       },
  //       { id: id, text: text, isCorrect: false },
  //       { id: id, text: text, isCorrect: false },
  //     ],
  //   },
  http.delete(
    "api/subjects/:subjectId/quizzes/:quizzesId/questions/:questionsId",
    (req) => {
      const { subjectId, quizzesId, questionsId } = req.params;
      console.log(subjectId);
      mySubjects[subjectId].quizzes = mySubjects[subjectId].quizzes.map(
        (quiz) => {
          return quiz.id == quizzesId
            ? {
                ...quiz,
                questions: quiz.questions.filter(
                  (question) => question.id != questionsId
                ),
              }
            : quiz;
        }
      );

      return HttpResponse.json(mySubjects[subjectId].quizzes);
    }
  ),

  http.put(
    "api/subjects/:subjectId/quizzes/:quizzesId/questions/:questionId",
    async ({ request, params }) => {
      const { subjectId, quizzesId, questionId } = params;
      const newQuestion = await request.json();
      console.log(subjectId);
      console.log("newQuestion");

      console.log(newQuestion);

      mySubjects[subjectId].quizzes = mySubjects[subjectId].quizzes.map(
        (quiz) => {
          return quiz.id == quizzesId
            ? {
                ...quiz,
                questions: [
                  ...quiz.questions.map((question) =>
                    question.id == questionId ? newQuestion : question
                  ),
                ],
              }
            : quiz;
        }
      );

      return HttpResponse.json(mySubjects[subjectId].quizzes);
    }
  ),
  http.post(
    "api/subjects/:subjectId/quizzes/:quizzesId/questions",
    async ({ request, params }) => {
      const { subjectId, quizzesId } = params;
      const newQuestion = await request.json();
      console.log(subjectId);
      console.log("newQuestion");

      console.log(newQuestion);
      newQuestion.answers = newQuestion.answers.map((answer) => {
        return { ...answer, id: crypto.randomUUID() };
      });
      console.log(newQuestion);

      mySubjects[subjectId].quizzes = mySubjects[subjectId].quizzes.map(
        (quiz) => {
          return quiz.id == quizzesId
            ? {
                ...quiz,
                questions: [
                  ...quiz.questions,
                  { ...newQuestion, id: crypto.randomUUID() },
                ],
              }
            : quiz;
        }
      );

      return HttpResponse.json(mySubjects[subjectId].quizzes);
    }
  ),

  // Zwraca array z obiektami note z konkretnego subjectu w formie:
  // {
  //   id: id,
  //   title: title,
  //   note: "<h3>Zmienne w JavaScript</h3><ul><li>Deklarujemy za pomocą: <code>let</code>, <code>const</code>, lub <code>var</code>.</li><li><code>let</code> – zmienna, którą można zmieniać.</li><li><code>const</code> – wartość stała, której nie można nadpisać.</li><li><code>var</code> – stara metoda, rzadziej używana.</li></ul>",
  // },

  http.get("api/subjects/:subjectId/notes", (req) => {
    const { subjectId } = req.params;
    console.log(subjectId);
    return HttpResponse.json(mySubjects[subjectId].notes);
  }),
  http.put(
    "api/subjects/:subjectId/notes/:notesId",
    async ({ request, params }) => {
      const { subjectId, notesId } = params;
      const newNote = await request.json();
      console.log(subjectId);
      console.log("newNote");

      console.log(newNote);

      mySubjects[subjectId].notes = mySubjects[subjectId].notes.map((note) => {
        return note.id == notesId ? newNote : note;
      });

      return HttpResponse.json(mySubjects[subjectId].notes);
    }
  ),
  http.post("api/subjects/:subjectId/notes", async ({ request, params }) => {
    const { subjectId } = params;
    const newNote = await request.json();
    console.log(subjectId);
    console.log(newNote);

    mySubjects[subjectId].notes = [
      ...mySubjects[subjectId].notes,
      {
        ...newNote,
        id: crypto.randomUUID(),
      },
    ];

    return HttpResponse.json(mySubjects[subjectId].notes);
  }),
];
