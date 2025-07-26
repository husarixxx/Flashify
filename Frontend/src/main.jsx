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
import { FlashcardProvider } from "./context/FlashcardContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing></Landing>} />
        <Route path="/Sign-up" element={<SignUp />} />
        <Route path="/log-in" element={<LogIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/flashcards" element={<Flashcards />} />
        <Route path="/home/flashcards/:subject" element={<FlashcardsSet />} />

        <Route
          path="/home/flashcards/:subject/learn"
          element={
            <FlashcardProvider>
              <FlashcardsLearn />
            </FlashcardProvider>
          }
        />
        <Route
          path="/home/flashcards/:subject/edit"
          element={<FlashcardsEdit />}
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
