import { Header } from "@/components/Header";
import { Progress } from "@/components/ui/progress";
import itemImage from "../../items/item.png";
import ItemCardHorizontal from "../components/ItemCardHorizontal";
import { useFetchRequestById } from "../hooks/useSingleRequest";
import { useParams } from "react-router-dom";
import { QuestionAndAnswerForm } from "../components/QuestionAndAnswerForm";
const AnswerQuestions = () => {
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
    <div className="mt-14 w-full px-4">
      <Header className={"text-xl pt-1 text-center line-clamp-1"}>
        Answer Questions
      </Header>
      <Progress value={62} className={"h-1 mt-2 [&>div]:bg-blue-500"} />
      <p className="font-sans text-[13px] text-gray-500  mt-2">
        Step 3 of 5 - Verification Answer
      </p>
      <ItemCardHorizontal
        image={itemImage}
        className={"mt-3"}
        request={request}
        requestLoading={requestLoading}
        requestError={requestError}
      />
      <QuestionAndAnswerForm
        className={"mt-3"}
        questions={questions}
        setQuestions={setQuestions}
        requestLoading={requestLoading}
        requestError={requestError}
        requestId={requestId}
      />
    </div>
  );
};

export default AnswerQuestions;
