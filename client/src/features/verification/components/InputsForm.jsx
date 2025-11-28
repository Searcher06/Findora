import { useVerify } from "../hooks/useVerify";
import { QuestionLabelAndInput } from "./QuestionLabelAndInput";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";
export const InputsForm = ({
  className,
  questions,
  setQuestions,
  requestId,
}) => {
  const navigate = useNavigate();
  const { sendVerificationAnswers, loading } = useVerify();
  const handleQuestion = (index, answer) => {
    let copy = [...questions];
    copy[index] = { ...copy[index], answer: answer };
    setQuestions(copy);
  };
  const handelSubmint = async () => {
    console.log(questions);
    const finalQuestions = { answers: [...questions] };
    try {
      const response = await sendVerificationAnswers(requestId, finalQuestions);
      toast.success("Answers sent successfully, wait for review");
      console.log(response);
      navigate("/");
    } catch (error) {
      if (error.response) {
        // server responded with a non-2xx status
        toast.error(
          error?.response?.data?.message || "Failed to send answers!"
        );
      } else if (error.request) {
        toast.error("No response from server");
      } else {
        // something else happended
        toast.error("An error occured.");
      }
      console.error(error);
    }
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
        onClick={handelSubmint}
      >
        {loading && <Spinner />}
        {loading ? "Sending..." : "Send Answers"}
      </Button>
    </form>
  );
};
