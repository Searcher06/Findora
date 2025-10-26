import { Header } from "@/components/Header";
import { SearchBar } from "../components/SearchBar";

const BrowsePage = () => {
  return (
    <div className="flex flex-col items-center">
      <Header
        content={"Browse Lost and found Items"}
        className={"text-[26px] font-medium pl-4 pr-4 leading-7 mt-1"}
      />
      <SearchBar className={`mt-2.5`} />
    </div>
  );
};

export default BrowsePage;
