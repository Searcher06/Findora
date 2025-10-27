import { ItemCard } from "./ItemCard";

export const ItemsContainer = ({ className }) => {
  return (
    <div className={`${className} w-full`}>
      <ItemCard />
    </div>
  );
};
