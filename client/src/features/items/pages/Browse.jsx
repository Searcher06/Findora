import { Header } from "@/components/Header";
import { SearchBar } from "../components/SearchBar";
import { TabsBar } from "../components/TabsBar";
import { ItemsContainer } from "../components/ItemsContainer";

const BrowsePage = () => {
  return (
    <div className="flex flex-col items-center mt-14">
      <Header
        content={"Browse Lost and found Items"}
        className={"text-[26px] font-medium pl-4 pr-4 leading-7 mt-1"}
      />
      <div className="mt-3 bg-[linear-gradient(90deg,#A8C5FF_0%,#F3D9FF_100%)] h-14 w-[97%] flex items-center justify-center rounded-[3px]">
        <SearchBar />
      </div>
      <TabsBar className={`mt-3`} />
      <ItemsContainer className={"mt-3"} />
    </div>
  );
};

export default BrowsePage;
