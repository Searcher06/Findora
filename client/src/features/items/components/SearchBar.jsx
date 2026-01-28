import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export const SearchBar = ({ className, onChange, value = "" }) => {
  return (
    <div className={`flex gap-1 ${className}`}>
      <div className="flex items-center gap-2 bg-white border w-60 md:w-80 lg:w-96 border-gray-200 rounded-sm">
        <input
          type="text"
          className="w-52 md:w-72 lg:w-88 h-7.25 md:h-9 lg:h-10.5 pl-2 md:pl-3 text-xs md:text-sm lg:text-base border-none font-sans outline-0"
          placeholder="Search by item name, category"
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
        />
        <Search
          size={17}
          className="text-gray-500 pr-1 md:w-5 md:h-5 lg:w-6 lg:h-6"
        />
      </div>
      <Button className="h-7.25 md:h-9 lg:h-10.5 rounded-[3px]">
        <Search className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
      </Button>
    </div>
  );
};
