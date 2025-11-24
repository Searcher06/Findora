import { PenIcon, Trash2 } from "lucide-react";
export const QuestionCard = () => {
  return (
    <div
      className={
        "flex items-center w-full justify-between gap-2 py-[6px] px-3 border-[1px] border-gray-200"
      }
    >
      <p className="font-sans text-[13px] font-medium">
        What is the name of the item ?
      </p>
      <div className="flex gap-3">
        <PenIcon size={16} className="text-gray-700" />
        <Trash2 size={16} className="text-gray-700" />
      </div>
    </div>
  );
};
