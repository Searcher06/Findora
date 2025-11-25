import { PenIcon, Trash2 } from "lucide-react";
import { useState } from "react";

export const QuestionCard = ({ question, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(question);

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(editText.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(question);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center w-full justify-between gap-2 py-2 px-3 border border-gray-200 rounded-md bg-white">
      {isEditing ? (
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="flex-1 outline-none font-sans text-[13px] font-medium border-b border-gray-300"
            autoFocus
          />
          <button
            onClick={handleSave}
            className="text-xs text-blue-600 font-medium"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="text-xs text-gray-500 font-medium"
          >
            Cancel
          </button>
        </div>
      ) : (
        <>
          <p className="font-sans text-[13px] font-medium flex-1">{question}</p>
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <PenIcon size={16} className="text-gray-600" />
            </button>
            <button
              onClick={onDelete}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <Trash2 size={16} className="text-gray-600" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};
