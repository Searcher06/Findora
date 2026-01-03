import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
export const SearchBar = ({ className }) => {
  return (
    <div className={`flex gap-1 ${className} `}>
      <div className="flex items-center gap-2 bg-white  border-[1px] w-60 border-gray-200 rounded-sm">
        <input
          type="text"
          className="w-52 h-[29px] pl-2 text-xs border-none font-sans outline-0"
          placeholder="Search by item name, category"
        />
        <Search size={17} className="text-gray-500 pr-1" />
      </div>
      <Button className={`h-[29px] rounded-[3px] `}>
        <Search />
      </Button>
    </div>
  );
};
