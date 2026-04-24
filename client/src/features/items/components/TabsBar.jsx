import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useItemType } from "@/features/items/context/ItemTypeContext";

export const TabsBar = ({
  className = "",
  onCategoryChange,
  onDateChange,
  categoryValue,
  dateValue,
}) => {
  const { bar, setBar } = useItemType();

  return (
    <div className={`w-full ${className} font-display`}>
      <div className="rounded-2xl border border-slate-200/80 bg-white/85 p-3 shadow-[0_20px_50px_-40px_rgba(15,23,42,0.55)] backdrop-blur">
        <div className="flex flex-col items-stretch gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="inline-flex w-full items-center rounded-xl bg-slate-100 p-1 lg:w-auto">
            <button
              type="button"
              onClick={() => setBar("lost")}
              className={`h-9 flex-1 rounded-lg px-4 text-sm font-semibold transition lg:min-w-[92px] ${
                bar === "lost"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Lost
            </button>
            <button
              type="button"
              onClick={() => setBar("found")}
              className={`h-9 flex-1 rounded-lg px-4 text-sm font-semibold transition lg:min-w-[92px] ${
                bar === "found"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Found
            </button>
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:w-auto">
            <Select
              onValueChange={(val) => onCategoryChange?.(val)}
              value={categoryValue}
            >
              <SelectTrigger
                aria-label="Category"
                className="h-10 w-full min-w-[180px] rounded-xl border-slate-200 bg-slate-50 px-3 text-sm font-medium text-slate-700 shadow-none"
              >
                <SelectValue placeholder="Category" className="truncate" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-slate-200">
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

            <Select
              onValueChange={(val) => onDateChange?.(val)}
              value={dateValue}
            >
              <SelectTrigger
                aria-label="Date"
                className="h-10 w-full min-w-[160px] rounded-xl border-slate-200 bg-slate-50 px-3 text-sm font-medium text-slate-700 shadow-none"
              >
                <SelectValue placeholder="Date" className="truncate" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-slate-200">
                <SelectItem value="latest">Latest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="last7">Last 7 days</SelectItem>
                <SelectItem value="last30">Last 30 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};
