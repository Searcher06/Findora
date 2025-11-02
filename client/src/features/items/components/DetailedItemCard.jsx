import { Button } from "@/components/ui/button";
import { imagesample } from "..";
import { ItemInfo } from "./ItemInfo";
export const DetailedItemCard = () => {
  return (
    <div className="w-full mt-2 flex flex-col items-center">
      <img src={imagesample} className="w-[90%] border rounded-lg" />
      <ItemInfo />
      <Button className={"w-[70%] mt-5 bg-blue-600"}>Claim This Item</Button>
      <p className="font-sans text-[12px] mt-0.5 text-gray-800">
        Your claim will be verified before chat access
      </p>
    </div>
  );
};
