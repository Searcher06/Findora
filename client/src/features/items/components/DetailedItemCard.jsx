import { Button } from "@/components/ui/button";
import { imagesample } from "..";
import { ItemInfo } from "./ItemInfo";
import { useAuthStore } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { DeleteItemButton } from "./AlertDialogBox";
export const DetailedItemCard = ({ item }) => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { status, reportedBy, _id, name } = item;
  return (
    <div className="w-full mt-2 flex flex-col items-center">
      <img src={imagesample} className="w-[90%] border rounded-lg" />
      <ItemInfo item={item} />
      <div className="mt-5 w-full flex justify-center items-center">
        {user._id == reportedBy._id ? (
          <div className="w-full gap-3 flex justify-center">
            <DeleteItemButton
              itemId={_id}
              itemName={name}
              className={"w-30 bg-red-500"}
            />
            <Button
              className={"w-30 active:scale-95 rounded-sm"}
              onClick={() => {
                navigate(`/update/${_id}`);
              }}
            >
              Update
            </Button>
          </div>
        ) : (
          <Button className={"w-[70%] active:scale-95  bg-blue-600"}>
            {status == "lost" ? "Mark as found" : "Claim This Item"}
          </Button>
        )}
      </div>

      <p className="font-sans text-[12px] mt-0.5 text-gray-800">
        Request must be verified before chat access
      </p>
    </div>
  );
};
