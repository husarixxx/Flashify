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
    console.log(subjectId);
    return HttpResponse.json(mySubjects[subjectId].quizzes);
  }),

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
];
