import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Landing from "./pages/Landing";
import SignUp from "./pages/SignUp/SignUp";
import LogIn from "./pages/LogIn/LogIn";
import Home from "./pages/Home/Home";
import Flashcards from "./pages/Flashcards/Flashcards";
import FlashcardsSet from "./pages/Flashcards/FlashcardsSet";
import FlashcardsLearn from "./pages/Flashcards/FlashcardsLearn";
import FlashcardsEdit from "./pages/Flashcards/FlashcardsEdit";
import Quizzes from "./pages/Quizzes/Quizzes";
import NotFound from "./components/NotFound";
import { FlashcardSwipeProvider } from "./context/FlashcardSwipeContext";
import { LoggedInProvider } from "./context/LoggedInContext";
import Authenticate from "./components/Authenticate";
import QuizzesSet from "./pages/Quizzes/QuizzesSet";
import QuizEdit from "./pages/Quizzes/QuizEdit";
import QuizLearn from "./pages/Quizzes/QuizLearn";
import Notes from "./pages/Notes/Notes";
import NotesSet from "./pages/Notes/NotesSet";
import NoteEdit from "./pages/Notes/NoteEdit";
import NoteLearn from "./pages/Notes/NoteLearn";
import Subjects from "./pages/Subjects/Subjects";
import SubjectsSpecific from "./pages/Subjects/SubjectsSpecific";
import Settings from "./pages/Settings/Settings";
import { SubjectsProvider } from "./context/SubjectsContext";
import { FlashcardsProvider } from "./context/FlashcardsContext";
import { QuizzesProvider } from "./context/QuizzesContext";

if (import.meta.env.DEV) {
  const { worker } = await import("./mocks/browser");
  worker.start();
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <LoggedInProvider>
        <SubjectsProvider>
          <FlashcardsProvider>
            <QuizzesProvider>
              <Routes>
                <Route path="/" element={<Landing></Landing>} />
                <Route path="/Sign-up" element={<SignUp />} />
                <Route path="/log-in" element={<LogIn />} />
                <Route
                  path="/app"
                  element={
                    <Authenticate>
                      <Home />
                    </Authenticate>
                  }
                />
                <Route
                  path="/app/flashcards"
                  element={
                    <Authenticate>
                      <Flashcards />
                    </Authenticate>
                  }
                />
                <Route
                  path="/app/flashcards/:subject"
                  element={
                    <Authenticate>
                      <FlashcardsSet />
                    </Authenticate>
                  }
                />

                <Route
                  path="/app/flashcards/:subject/learn"
                  element={
                    <Authenticate>
                      <FlashcardSwipeProvider>
                        <FlashcardsLearn />
                      </FlashcardSwipeProvider>
                    </Authenticate>
                  }
                />
                <Route
                  path="/app/flashcards/:subject/edit"
                  element={
                    <Authenticate>
                      <FlashcardsEdit />
                    </Authenticate>
                  }
                />
                <Route
                  path="/app/quizzes"
                  element={
                    <Authenticate>
                      <Quizzes />
                    </Authenticate>
                  }
                />
                <Route
                  path="/app/quizzes/:subject"
                  element={
                    <Authenticate>
                      <QuizzesSet />
                    </Authenticate>
                  }
                />
                <Route
                  path="/app/quizzes/:subject/:quizTitle/edit"
                  element={
                    <Authenticate>
                      <QuizEdit />
                    </Authenticate>
                  }
                />
                <Route
                  path="/app/quizzes/:subject/:quizTitle/learn"
                  element={
                    <Authenticate>
                      <QuizLearn />
                    </Authenticate>
                  }
                />
                <Route
                  path="/app/notes"
                  element={
                    <Authenticate>
                      <Notes />
                    </Authenticate>
                  }
                />
                <Route
                  path="/app/notes/:subject"
                  element={
                    <Authenticate>
                      <NotesSet />
                    </Authenticate>
                  }
                />
                <Route
                  path="/app/notes/:subject/:noteTitle/edit"
                  element={
                    <Authenticate>
                      <NoteEdit />
                    </Authenticate>
                  }
                />
                <Route
                  path="/app/notes/:subject/:noteTitle/learn"
                  element={
                    <Authenticate>
                      <NoteLearn />
                    </Authenticate>
                  }
                />
                <Route path="*" element={<NotFound />} />
                <Route
                  path="/app/subjects"
                  element={
                    <Authenticate>
                      <Subjects />
                    </Authenticate>
                  }
                />
                <Route
                  path="/app/subjects/:subject"
                  element={
                    <Authenticate>
                      <SubjectsSpecific />
                    </Authenticate>
                  }
                />
                <Route
                  path="/app/settings"
                  element={
                    <Authenticate>
                      <Settings />
                    </Authenticate>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </QuizzesProvider>
          </FlashcardsProvider>
        </SubjectsProvider>
      </LoggedInProvider>
    </BrowserRouter>
  </StrictMode>
);
