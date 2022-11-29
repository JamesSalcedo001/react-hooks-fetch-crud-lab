import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then((res) => res.json())
    .then((questions) => {
      setQuestions(questions);
    });
  }, [])

  function deleteClick(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
    .then((res) => res.json())
    .then(() => {
      const newQuestion = questions.filter((q) => q.id !== id);
      setQuestions(newQuestion)
    });
  }


  function answerChange(id, correctIndex) {
    fetch(`http://localhost:4000/questions${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex })
    })
    .then((res) => res.json())
    .then((newQuestion) => {
      const newQuestions = questions.map((q) => {
        if (q.id === newQuestion.id) return newQuestion;
        return q;
      })
    })
  }

  const questionMap = questions.map((q) => (
    <QuestionItem
    key={q.id}
    question={q}
    onDeleteClick={deleteClick}
    onAnswerChange={answerChange}
    />
  ))

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionMap}</ul>
    </section>
  );
}

export default QuestionList;
