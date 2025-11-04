import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
const AddButton = ({ className }) => {
  const navigate = useNavigate();
  return (
    <Button
      className={`${className}`}
      onClick={() => {
        navigate("/report");
      }}
    >
      <PlusIcon />
    </Button>
  );
};

export default AddButton;
