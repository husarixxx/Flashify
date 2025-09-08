import { http, HttpResponse } from "msw";
import mySubjects from "../exampleData";

export const handlers = [
  http.get("api/flashcards", () => {
    return HttpResponse.json([
      { id: 1, name: "Jan Kowalski" },
      { id: 2, name: "Anna Nowak" },
    ]);
  }),
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
  http.get("api/subjects/:subjectId/flashcards", (req) => {
    const { subjectId } = req.params;
    console.log(subjectId);
    return HttpResponse.json(mySubjects[subjectId].flashcards);
  }),
  http.get("api/subjects/:subjectId/quizzes", (req) => {
    const { subjectId } = req.params;
    console.log(subjectId);
    return HttpResponse.json(mySubjects[subjectId].quizzes);
  }),
  http.get("api/subjects/:subjectId/notes", (req) => {
    const { subjectId } = req.params;
    console.log(subjectId);
    return HttpResponse.json(mySubjects[subjectId].notes);
  }),
];
