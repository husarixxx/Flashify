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
import { FlashcardProvider } from "./context/FlashcardContext";
import { LoggedInProvider } from "./context/LoggedInContext";
import Authenticate from "./components/Authenticate";
import QuizzesSet from "./pages/Quizzes/QuizzesSet";
import QuizEdit from "./pages/Quizzes/QuizEdit";
import QuizLearn from "./pages/Quizzes/QuizLearn";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <LoggedInProvider>
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
                <FlashcardProvider>
                  <FlashcardsLearn />
                </FlashcardProvider>
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </LoggedInProvider>
    </BrowserRouter>
  </StrictMode>
);
