import { ItemCard } from "./ItemCard";
import itemImage from "../item.png";
const items = [
  {
    name: "Black HP Laptop",
    location: "Foculty of engineering",
    description:
      "A black HP laptop, with 2 ports, last seen during a lecture room,",
    date: "Oct 27,2025",
    status: "lost",
  },
  {
    name: "Pen Drive",
    location: "Department of software engineering",
    description: "512GB sand disk pen drive, with black color",
    date: "Sep 30,2025",
    status: "lost",
  },
  {
    name: "Thermometre",
    location: "Foculty of engineering",
    description: "A thermal thermometre, with a broken glass",
    date: "Oct 27,2025",
    status: "found",
  },
];
export const ItemsContainer = ({ className }) => {
  return (
    <div
      className={`${className} w-full flex flex-wrap justify-center gap-2.5`}
    >
      {items.map((current, index) => (
        <ItemCard
          name={current.name}
          location={current.location}
          date={current.date}
          image={itemImage}
          description={current.description}
          status={current.status}
          key={index}
        />
      ))}
    </div>
  );
};
