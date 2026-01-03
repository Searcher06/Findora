import { Header } from "@/components/Header";
import { Progress } from "@/components/ui/progress";
import ItemCardHorizontal from "../components/ItemCardHorizontal";
import itemImage from "../../items/item.png";
import { useParams } from "react-router-dom";
import { useFetchRequestById } from "../hooks/useSingleRequest";
import { QuestionAndAnswerForm } from "../components/QuestionAndAnswerForm";
export const VerificationDecision = () => {
  const { requestId } = useParams();
  const {
    request,
    questions,
    setQuestions,
    loading: requestLoading,
    error: requestError,
  } = useFetchRequestById(requestId);
  console.log(questions);
  return (
    <div className="mt-14 px-4 w-full">
      <Header className={"text-xl pt-1 text-center"}>
        Send Verification Decision
      </Header>

      <Progress value={80} className={"h-1 mt-2 [&>div]:bg-blue-500"} />
      <p className="font-sans text-[13px] text-gray-500  mt-2">
        Step 4 of 5 - Verification Decision
      </p>

      <ItemCardHorizontal
        image={itemImage}
        className={"mt-3"}
        request={request}
        requestLoading={requestLoading}
        requestError={requestError}
      />
      <QuestionAndAnswerForm
        className={"mt-4"}
        questions={questions}
        setQuestions={setQuestions}
        requestLoading={requestLoading}
        requestError={requestError}
        requestId={requestId}
        request={request}
      />
    </div>
  );
};
