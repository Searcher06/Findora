import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
const AddButton = ({ className }) => {
  return (
    <Button className={`w-11 h-11 rounded-full fixed ${className}`}>
      <PlusIcon />
    </Button>
  );
};

export default AddButton;
