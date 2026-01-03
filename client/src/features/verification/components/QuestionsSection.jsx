import { Button } from "@/components/ui/button";
import { QuestionCard } from "./QuestionCard";
import { ChevronRight, PlusIcon } from "lucide-react";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";

const QuestionsSections = ({
  className,
  questions,
  setQuestions,
  handleSubmit,
  loading,
}) => {
  const [addQuestion, setAddQuestion] = useState("");

  const handleAddQuestion = () => {
    if (addQuestion.trim()) {
      setQuestions([...questions, { question: addQuestion.trim() }]);
      setAddQuestion(""); // Clear input after adding
    }
  };

  const handleEditQuestion = (index, newQuestion) => {
    const updatedQuestions = [...questions]; // create a new copy of the questions
    updatedQuestions[index] = { question: newQuestion }; // use the current index to update the question with the new value
    setQuestions(updatedQuestions); // add the updated question to the question container
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  return (
    <div className={`${className}`}>
      <h1 className="font-sans text-[14px] font-medium text-gray-900">
        Existing Questions
      </h1>

      <div className="mt-2 w-full h-43 border border-gray-200 rounded-md overflow-y-auto">
        <div className="p-2 space-y-1.5">
          {questions.length > 0 ? (
            questions.map((question, index) => (
              <QuestionCard
                key={index}
                question={question.question}
                onEdit={(newText) => handleEditQuestion(index, newText)}
                onDelete={() => handleDeleteQuestion(index)}
              />
            ))
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500 text-sm">
              No questions added yet
            </div>
          )}
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-2">
        <textarea
          placeholder="Enter a new question..."
          rows={3}
          className="block outline-0 text-xs font-sans p-[10px] border-[1.8px] border-gray-200 rounded-md resize-none w-full"
          value={addQuestion}
          onChange={(e) => setAddQuestion(e.target.value)}
        ></textarea>
        <Button
          className="text-xs bg-blue-600 h-[34px] rounded-sm"
          onClick={handleAddQuestion}
          disabled={!addQuestion.trim()}
        >
          <PlusIcon size={16} />
          Add Question
        </Button>
      </div>

      <div className="mt-3 flex justify-between font-sans items-center">
        <p className="text-xs font-bold">Suggested Questions</p>
        <ChevronRight size={20} className="text-gray-700" />
      </div>

      <Button
        className="w-40 mt-3 text-xs h-[34px] rounded-sm mb-6"
        onClick={handleSubmit}
        disabled={loading || questions.length === 0}
      >
        {loading ? <Spinner /> : null}
        {loading ? "Sending" : "Send Questions"}
      </Button>
    </div>
  );
};

export default QuestionsSections;
