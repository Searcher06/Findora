import { Header } from "@/components/Header";
import { SearchBar } from "../components/SearchBar";
import { TabsBar } from "../components/TabsBar";
import { ItemsContainer } from "../components/ItemsContainer";
import ReportButton from "../components/ReportButton.";
import { useState } from "react";

const BrowsePage = () => {
  const [filters, setFilters] = useState({
    category: "all",
    date: "latest",
  });
  const [searchQuery, setSearchQuery] = useState("");

  const handleCategoryChange = (category) => {
    setFilters((prev) => ({ ...prev, category }));
  };

  const handleDateChange = (date) => {
    setFilters((prev) => ({ ...prev, date }));
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="flex flex-col items-center mt-14 md:mt-20">
      {/* Header - Responsive text size with more top spacing on larger screens */}
      <Header className="text-[22px] sm:text-[26px] md:text-[30px] lg:text-[34px] font-medium pl-4 pr-4 leading-7 mt-1 md:mt-3">
        Browse Lost and found Items
      </Header>

      {/* Search Bar Container - Responsive height */}
      <div className="mt-3 bg-[linear-gradient(90deg,#A8C5FF_0%,#F3D9FF_100%)] h-14 md:h-16 lg:h-20 w-[97%] flex items-center justify-center rounded-[3px]">
        <SearchBar onChange={handleSearchChange} value={searchQuery} />
      </div>

      <TabsBar
        className="mt-3"
        onCategoryChange={handleCategoryChange}
        onDateChange={handleDateChange}
        dateValue={filters.date}
        categoryValue={filters.category}
      />

      <ItemsContainer
        className="mt-3"
        filters={filters}
        searchQuery={searchQuery}
      />

      <ReportButton />
    </div>
  );
};

export default BrowsePage;
