import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useItemType } from "@/features/items/context/ItemTypeContext"; // adjust path
import { ChevronDown } from "lucide-react"; // optional chevron icon

export const TabsBar = ({
  className = "",
  onCategoryChange,
  onDateChange,
  categoryValue,
  dateValue,
}) => {
  const { bar, setBar } = useItemType();

  return (
    <div className={`w-full ${className} px-3 py-2`}>
      <div className="flex items-center w-full">
        {/* Lost */}
        <div className="flex-1 flex justify-center">
          <button
            type="button"
            onClick={() => setBar("lost")}
            className={`text-sm font-medium px-1 py-1 ${
              bar === "lost" ? "text-black" : "text-gray-600"
            }`}
          >
            Lost
          </button>
        </div>

        {/* Found */}
        <div className="flex-1 flex justify-center">
          <button
            type="button"
            onClick={() => setBar("found")}
            className={`text-sm font-medium px-1 py-1 ${
              bar === "found" ? "text-black" : "text-gray-600"
            }`}
          >
            Found
          </button>
        </div>

        {/* Category */}
        <div className="flex-1 flex justify-center">
          <Select
            onValueChange={(val) => onCategoryChange?.(val)}
            value={categoryValue}
          >
            <SelectTrigger
              aria-label="Category"
              className="h-8 px-0 text-sm flex items-center justify-center gap-1 bg-transparent border-0 shadow-none"
            >
              <SelectValue
                placeholder="Category"
                className="truncate max-w-[70%]"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Electronics">Electronics</SelectItem>
              <SelectItem value="Books & Stationary">
                Books & Stationary
              </SelectItem>
              <SelectItem value="Bags & Accessories">
                Bags & Accessories
              </SelectItem>
              <SelectItem value="Clothing & Wearables">
                Clothing & Wearables
              </SelectItem>
              <SelectItem value="ID & Cards">ID & Cards</SelectItem>
              <SelectItem value="Keys & Locks">Keys & Locks</SelectItem>
              <SelectItem value="Documents">Documents</SelectItem>
              <SelectItem value="Personal Items">Personal Items</SelectItem>
              <SelectItem value="Sports & Equipment">
                Sports & Equipment
              </SelectItem>
              <SelectItem value="Others">Others</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Date */}
        <div className="flex-1 flex justify-center">
          <Select
            onValueChange={(val) => onDateChange?.(val)}
            value={dateValue}
          >
            <SelectTrigger
              aria-label="Date"
              className="h-8 px-0 text-sm flex items-center justify-center gap-1 bg-transparent border-0 shadow-none"
            >
              <SelectValue
                placeholder="Date"
                className="truncate max-w-[70%]"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Latest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="last7">Last 7 days</SelectItem>
              <SelectItem value="last30">Last 30 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
