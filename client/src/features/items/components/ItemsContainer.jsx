/* eslint-disable no-unused-vars */
import { ItemCard } from "./ItemCard";
import itemImage from "../item.png";
import { useItemType } from "../context/ItemTypeContext";
import { useItems } from "../hooks/useItems";
let items = [
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
  const { bar } = useItemType();
  return (
    <div
      className={`${className} w-full flex flex-wrap justify-center gap-2.5`}
    >
      {bar == "lost"
        ? items
            .filter((current) => {
              return current.status == "lost";
            })
            .map((current, index) => (
              <ItemCard
                name={current.name}
                location={current.location}
                date={current.date}
                image={itemImage}
                description={current.description}
                status={current.status}
                key={index}
                id={index}
              />
            ))
        : items
            .filter((current) => {
              return current.status == bar;
            })
            .map((current, index) => (
              <ItemCard
                name={current.name}
                location={current.location}
                date={current.date}
                image={itemImage}
                description={current.description}
                status={current.status}
                key={index}
                id={index}
              />
            ))}
    </div>
  );
};
