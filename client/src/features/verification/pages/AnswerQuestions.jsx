import { Header } from "@/components/Header";
import { Progress } from "@/components/ui/progress";
import itemImage from "../../items/item.png";
import ItemCardHorizontal from "../components/ItemCardHorizontal";
const AnswerQuestions = () => {
  return (
    <div className="mt-14 w-full px-4">
      <Header className={"text-xl pt-1 text-center line-clamp-1"}>
        Answer Questions
      </Header>
      <Progress value={62} className={"h-1 mt-2 [&>div]:bg-blue-500"} />
      <p className="font-sans text-[13px] text-gray-500  mt-2">
        Step 3 of 5 - Verification Answer
      </p>
      <ItemCardHorizontal image={itemImage} className={"mt-3"} />
    </div>
  );
};

export default AnswerQuestions;
