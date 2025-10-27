import { Header } from "@/components/Header";
import { SearchBar } from "../components/SearchBar";
import { TabsBar } from "../components/TabsBar";
import { ItemsContainer } from "../components/ItemsContainer";

const BrowsePage = () => {
  return (
    <div className="flex flex-col items-center">
      <Header
        content={"Browse Lost and found Items"}
        className={"text-[26px] font-medium pl-4 pr-4 leading-7 mt-1"}
      />
      <div className="mt-3 bg-blue-100 h-14 w-[97%] flex items-center justify-center rounded-[3px]">
        <SearchBar />
      </div>
      <TabsBar className={`mt-3`} />
      <ItemsContainer />
    </div>
  );
};

export default BrowsePage;
