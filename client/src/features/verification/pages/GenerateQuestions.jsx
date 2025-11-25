/* eslint-disable no-unused-vars */
import { Header } from "@/components/Header";
import { Progress } from "@/components/ui/progress";
import itemImage from "../../items/item.png";
import ItemCardHorizontal from "../components/ItemCardHorizontal";
import { useState } from "react";
import QuestionsSections from "../components/QuestionsSection";
const GenerateQuestions = () => {
  const [questions, setQuestions] = useState([
    { question: "What is the name of the item" },
    { question: "Where do you lost it" },
  ]);

  return (
    <div className="mt-14 px-4 w-full">
      <Header className={"text-xl pt-1 text-center"}>
        Create Verification Questions
      </Header>
      <Progress value={62} className={"h-1 mt-2 [&>div]:bg-blue-500"} />
      <p className="font-sans text-[13px] text-gray-500  mt-2">
        Step 2 of 3 - Verification Questions
      </p>
      <ItemCardHorizontal image={itemImage} className={"mt-3"} />
      <QuestionsSections
        className={"mt-3"}
        questions={questions}
        setQuestions={setQuestions}
      />
    </div>
  );
};

export default GenerateQuestions;
