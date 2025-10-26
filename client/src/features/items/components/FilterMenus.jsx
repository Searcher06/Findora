import { useState } from "react";
import { ChevronDown } from "lucide-react";

export const FilterMenus = () => {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <div className="flex gap-6 text-[13px]">
      {/* Category */}
      <div className="">
        <button
          onClick={() => toggleMenu("category")}
          className="flex items-center gap-1 hover:text-black transition"
        >
          Category
          <ChevronDown className="w-3.5 h-3.5" />
        </button>

        {openMenu === "category" && (
          <div className="absolute mt-1 bg-white border border-gray-200 rounded-lg shadow-md">
            <ul className="py-1 text-[13px]">
              {["Phones", "Laptops", "Wallets", "ID Cards", "Books"].map(
                (item) => (
                  <li
                    key={item}
                    className="px-3 py-1.5 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setOpenMenu(null)}
                  >
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>
        )}
      </div>

      {/* Date */}
      <div className="">
        <button
          onClick={() => toggleMenu("date")}
          className="flex items-center gap-1 hover:text-black transition"
        >
          Date
          <ChevronDown className="w-3.5 h-3.5" />
        </button>

        {openMenu === "date" && (
          <div className="absolute mt-1 bg-white border border-gray-200 rounded-lg shadow-md">
            <ul className="py-1 text-[13px]">
              {["Today", "This Week", "This Month", "Older"].map((item) => (
                <li
                  key={item}
                  className="px-3 py-1.5 hover:bg-gray-100 cursor-pointer"
                  onClick={() => setOpenMenu(null)}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
