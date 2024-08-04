import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchQuestionsForQuiz, createQuestion, updateQuestion, deleteQuestion } from "./client";

interface Question {
  _id: string;
  title: string;
  points: number;
  questionVal: string;
  questionType: string;
  choices?: { text: string; isCorrect: boolean }[];
  trueFalse?: boolean;
  blanks?: { answer: string }[];
}

const QuizQuestionsEditor = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [newQuestion, setNewQuestion] = useState<Question>({
    _id: "",
    title: "",
    points: 0,
    questionVal: "",
    questionType: "Multiple Choice",
    choices: [{ text: "", isCorrect: false }],
  });

  useEffect(() => {
    const fetchQuestions = async () => {
      if (quizId) {
        const questionsData = await fetchQuestionsForQuiz(quizId);
        setQuestions(questionsData);
      }
    };
    fetchQuestions();
  }, [quizId]);

  const handleSaveQuestion = async () => {
    if (newQuestion._id) {
      await updateQuestion(quizId!, newQuestion);
    } else {
      await createQuestion(quizId!, newQuestion);
    }
    setNewQuestion({
      _id: "",
      title: "",
      points: 0,
      questionVal: "",
      questionType: "Multiple Choice",
      choices: [{ text: "", isCorrect: false }],
    });
    const questionsData = await fetchQuestionsForQuiz(quizId!);
    setQuestions(questionsData);
  };

  const handleEditQuestion = (question: Question) => {
    setNewQuestion(question);
  };

  const handleDeleteQuestion = async (questionId: string) => {
    await deleteQuestion(quizId!, questionId);
    const questionsData = await fetchQuestionsForQuiz(quizId!);
    setQuestions(questionsData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setNewQuestion({ ...newQuestion, [e.target.name]: e.target.value } as Question);
  };

  const handleChoiceChange = (index: number, field: string, value: string | boolean) => {
    const updatedChoices = newQuestion.choices!.map((choice, i) =>
      i === index ? { ...choice, [field]: value } : choice
    );
    setNewQuestion({ ...newQuestion, choices: updatedChoices });
  };

  const handleAddChoice = () => {
    setNewQuestion({ ...newQuestion, choices: [...newQuestion.choices!, { text: "", isCorrect: false }] });
  };

  const handleRemoveChoice = (index: number) => {
    const updatedChoices = newQuestion.choices!.filter((_, i) => i !== index);
    setNewQuestion({ ...newQuestion, choices: updatedChoices });
  };

  return (
    <div>
      <h1>Quiz Questions</h1>
      <button onClick={() => handleEditQuestion(newQuestion)}>New Question</button>
      <div>
        {questions.map((question) => (
          <div key={question._id}>
            <h2>{question.title}</h2>
            <p>{question.points} points</p>
            <p>{question.questionVal}</p>
            <button onClick={() => handleEditQuestion(question)}>Edit</button>
            <button onClick={() => handleDeleteQuestion(question._id)}>Delete</button>
          </div>
        ))}
      </div>
      <div>
        <h2>Edit Question</h2>
        <label>
          Title:
          <input type="text" name="title" value={newQuestion.title} onChange={handleChange} />
        </label>
        <label>
          Points:
          <input type="number" name="points" value={newQuestion.points} onChange={handleChange} />
        </label>
        <label>
          Question:
          <textarea name="questionVal" value={newQuestion.questionVal} onChange={handleChange} />
        </label>
        <label>
          Question Type:
          <select name="questionType" value={newQuestion.questionType} onChange={handleChange}>
            <option value="Multiple Choice">Multiple Choice</option>
            <option value="True/False">True/False</option>
            <option value="Fill in the Blanks">Fill in the Blanks</option>
          </select>
        </label>
        {newQuestion.questionType === "Multiple Choice" && (
          <div>
            <h3>Choices</h3>
            {newQuestion.choices!.map((choice, index) => (
              <div key={index}>
                <label>
                  Text:
                  <input
                    type="text"
                    value={choice.text}
                    onChange={(e) => handleChoiceChange(index, "text", e.target.value)}
                  />
                </label>
                <label>
                  Correct:
                  <input
                    type="checkbox"
                    checked={choice.isCorrect}
                    onChange={(e) => handleChoiceChange(index, "isCorrect", e.target.checked)}
                  />
                </label>
                <button onClick={() => handleRemoveChoice(index)}>Remove</button>
              </div>
            ))}
            <button onClick={handleAddChoice}>Add Choice</button>
          </div>
        )}
        <button onClick={handleSaveQuestion}>Save Question</button>
        <button onClick={() => setNewQuestion({
          _id: "",
          title: "",
          points: 0,
          questionVal: "",
          questionType: "Multiple Choice",
          choices: [{ text: "", isCorrect: false }],
        })}>Cancel</button>
      </div>
    </div>
  );
}

export default QuizQuestionsEditor;
