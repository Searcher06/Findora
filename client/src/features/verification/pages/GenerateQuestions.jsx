import { Header } from "@/components/Header";
import { Progress } from "@/components/ui/progress";
import itemImage from "../../items/item.png";
import ItemCardHorizontal from "../components/ItemCardHorizontal";
import { useState } from "react";
import QuestionsSections from "../components/QuestionsSection";
import { useNavigate, useParams } from "react-router-dom";
import { useVerify } from "../hooks/useVerify";
import { toast } from "react-toastify";
import { useFetchRequestById } from "../hooks/useSingleRequest";
const GenerateQuestions = () => {
  const { requestId } = useParams();
  const {
    request,
    loading: requestLoading,
    error: requestError,
  } = useFetchRequestById(requestId);
  const { sendVerificationQuestions, loading } = useVerify();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const handleSubmit = async () => {
    try {
      const finalQuestion = {
        questions,
      };
      const response = await sendVerificationQuestions(
        requestId,
        finalQuestion
      );
      toast.success("Verification Questions Sent Successfully!");
      console.log(response);
      navigate("/");
    } catch (error) {
      if (error.response) {
        // server responded with a non-2xx status
        toast.error(
          error?.response?.data?.message || "Failed to send questions!"
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
    <div className="mt-14 px-4 w-full">
      <Header className={"text-xl pt-1 text-center"}>
        Create Verification Questions
      </Header>
      <Progress value={40} className={"h-1 mt-2 [&>div]:bg-blue-500"} />
      <p className="font-sans text-[13px] text-gray-500  mt-2">
        Step 2 of 5 - Verification Questions
      </p>
      <ItemCardHorizontal
        image={itemImage}
        className={"mt-3"}
        request={request}
        requestLoading={requestLoading}
        requestError={requestError}
      />
      <QuestionsSections
        className={"mt-3"}
        questions={questions}
        setQuestions={setQuestions}
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
};

export default GenerateQuestions;
