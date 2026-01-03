import { InputsForm } from "./InputsForm";
import { InputsFormSkeleton } from "./InputsFormSkeleton"; // Import the skeleton
import { useLocation } from "react-router-dom";
export const QuestionAndAnswerForm = ({
  className,
  questions,
  setQuestions,
  requestLoading,
  requestError,
  requestId,
  request,
}) => {
  const location = useLocation();
  if (requestLoading) {
    return (
      <div className={`${className} w-full`}>
        <h1 className="font-sans text-[13px] font-bold text-gray-900">
          {location.pathname.includes("/verification/decision")
            ? "Make Decision"
            : "Answer All Questions"}
        </h1>
        <InputsFormSkeleton className={"mt-2"} count={3} />
      </div>
    );
  } else if (requestError) {
    return <p>{requestError}</p>;
  }

  return (
    <div className={`${className} w-full`}>
      <h1 className="font-sans text-[13px] font-bold text-gray-900">
        {location.pathname.includes("/verification/decision")
          ? "Make Decision"
          : "Answer All Questions"}
      </h1>
      <InputsForm
        className={"mt-2"}
        questions={questions}
        setQuestions={setQuestions}
        requestId={requestId}
        location={location}
        request={request}
      />
    </div>
  );
};
