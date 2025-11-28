import { Label } from "@/features/items";
export const QuestionLabelAndInput = ({
  text,
  htmlFor,
  answer: questionAnswer,
  onChange,
}) => {
  return (
    <>
      <Label text={text} htmlFor={htmlFor} />
      <input
        id={htmlFor}
        type="text"
        name={htmlFor}
        placeholder="Answer Question"
        className="mb-2 p-2 border border-gray-300 outline-0 text-xs w-full h-8 rounded-sm"
        value={questionAnswer}
        onChange={(e) => onChange(e.target.value)}
      />
    </>
  );
};
