/* eslint-disable no-unused-vars */
import { QuestionLabelAndInput } from "./QuestionLabelAndInput";
import { Button } from "@/components/ui/button";
export const InputsForm = ({ className, questions, setQuestions }) => {
  const handleQuestion = (index, answer) => {
    let copy = [...questions];
    copy[index] = { ...copy[index], answer: answer };
    setQuestions(copy);
  };
  return (
    <form
      className={`${className} w-full border rounded-lg p-4`}
      onSubmit={(e) => e.preventDefault()}
    >
      {questions.map((question, index) => (
        <QuestionLabelAndInput
          text={question.question}
          htmlFor={question.question}
          key={question._id}
          answer={question.answer}
          onChange={(answer) => handleQuestion(index, answer)}
        />
      ))}
      <Button
        className={"text-xs mt-3 font-sans mb-3 w-full"}
        onClick={() => console.log(questions)}
      >
        Send Answers
      </Button>
    </form>
  );
};
