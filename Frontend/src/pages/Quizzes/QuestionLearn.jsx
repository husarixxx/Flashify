function QuestionLearn({ question, questionNumber, allQuestionsNumber }) {
  return (
    <>
      <div className="shadow-xl rounded-xl py-6 px-8 sm:px-28 sm:py-8 text-center md:w-[650px] md:h-[250px] flex justify-center items-center flex-col">
        <p className="text-purple-600">
          Question {questionNumber}/{allQuestionsNumber}
        </p>
        <h2>{question}</h2>
      </div>
    </>
  );
}

export default QuestionLearn;
