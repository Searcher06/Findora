import { Button } from "@/components/ui/button";
import { QuestionCard } from "./QuestionCard";
import { ChevronRight, PlusIcon } from "lucide-react";
const QuestionsSections = ({ className }) => {
  return (
    <div className={`${className}`}>
      <h1 className="font-sans text-[14px] font-medium text-gray-900">
        Existing Questions
      </h1>

      <div className="mt-2 w-full">
        <QuestionCard />
        <QuestionCard />
      </div>

      <div className="mt-5 flex flex-col gap-2">
        <textarea
          rows={4}
          className="block outline-0 text-xs font-sans p-[10px] border-[1.8px] border-gray-200 rounded-md resize-none w-full"
        ></textarea>
        <Button className={"text-xs bg-blue-600 h-[34px] rounded-sm"}>
          <PlusIcon />
          Add Question
        </Button>
      </div>

      <div className="mt-3 flex justify-between font-sans items-center">
        <p className="text-xs font-bold">Suggested Questions</p>
        <ChevronRight size={20} className="text-gray-700" />
      </div>
      <Button className={"w-40 mt-3 text-xs h-[34px] rounded-sm mb-6"}>
        Send Questions
      </Button>
    </div>
  );
};

export default QuestionsSections;
