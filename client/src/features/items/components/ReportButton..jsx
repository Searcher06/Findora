import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useItemType } from "../context/ItemTypeContext";
import { useNavigate } from "react-router-dom";
export default function ReportButton() {
  const { setPostType } = useItemType();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="fixed bottom-6 right-6 z-5">
      {/* Floating button */}
      <Button
        onClick={() => setOpen(!open)}
        className=" text-white rounded-full w-11 h-11 flex items-center justify-center shadow-lg active:scale-95 transition-transform duration-200 text-3xl"
      >
        <PlusIcon />
      </Button>

      {/* Popup */}
      {open && (
        <div className="absolute bottom-17 right-0 bg-white text-gray-800 rounded-2xl shadow-lg w-48 py-1 animate-fadeIn text-[13px] font-sans">
          <button
            className="w-full text-left px-4 py-3 active:bg-gray-200 rounded-t-2xl"
            onClick={() => {
              navigate("/report");
              setPostType("lost");
            }}
          >
            Report Lost Item
          </button>
          <button
            className="w-full text-left px-4 py-3 active:bg-gray-200 rounded-b-2xl"
            onClick={() => {
              navigate("/report");
              setPostType("found");
            }}
          >
            Report Found Item
          </button>
        </div>
      )}
    </div>
  );
}
