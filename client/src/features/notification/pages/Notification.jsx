import { Header } from "@/components/Header";
import Request from "../components/Request";
const Notification = () => {
  return (
    <div className="mt-14 w-full pl-2 pr-2">
      <div>
        <Header
          content={"Notifications"}
          className={"text-[26px] font-medium"}
        />
      </div>
      <div className="font-sans text-[13px] flex justify-between mt-4">
        <div className="h-6  px-4 py-[11px] flex items-center bg-blue-600 text-white rounded-sm">
          All
        </div>
        <div className="h-6 border px-4 py-[11px] flex items-center rounded-sm">
          Pending
        </div>
        <div className="h-6 border px-4 py-[11px] flex items-center rounded-sm">
          Actions Required
        </div>
      </div>

      <div className="mt-3 flex flex-col gap-2">
        <Request />
        <Request />
      </div>
    </div>
  );
};
export default Notification;
