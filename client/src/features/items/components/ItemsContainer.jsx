/* eslint-disable no-unused-vars */
import { ItemCard } from "./ItemCard";
import itemImage from "../item.png";
import { useItemType } from "../context/ItemTypeContext";
import { useItems } from "../hooks/useItems";
import { ItemCardSkeleton } from "./ItemCardSkeleton";
// let items = [
//   {
//     name: "Black HP Laptop",
//     location: "Foculty of engineering",
//     description:
//       "A black HP laptop, with 2 ports, last seen during a lecture room,",
//     date: "Oct 27,2025",
//     status: "lost",
//   },
//   {
//     name: "Pen Drive",
//     location: "Department of software engineering",
//     description: "512GB sand disk pen drive, with black color",
//     date: "Sep 30,2025",
//     status: "lost",
//   },
//   {
//     name: "Thermometre",
//     location: "Foculty of engineering",
//     description: "A thermal thermometre, with a broken glass",
//     date: "Oct 27,2025",
//     status: "found",
//   },
//   {
//     name: "Black HP Laptop",
//     location: "Foculty of engineering",
//     description:
//       "A black HP laptop, with 2 ports, last seen during a lecture room,",
//     date: "Oct 27,2025",
//     status: "lost",
//   },
//   {
//     name: "Pen Drive",
//     location: "Department of software engineering",
//     description: "512GB sand disk pen drive, with black color",
//     date: "Sep 30,2025",
//     status: "lost",
//   },
//   {
//     name: "Thermometre",
//     location: "Foculty of engineering",
//     description: "A thermal thermometre, with a broken glass",
//     date: "Oct 27,2025",
//     status: "found",
//   },
//   {
//     name: "Black HP Laptop",
//     location: "Foculty of engineering",
//     description:
//       "A black HP laptop, with 2 ports, last seen during a lecture room,",
//     date: "Oct 27,2025",
//     status: "lost",
//   },
//   {
//     name: "Pen Drive",
//     location: "Department of software engineering",
//     description: "512GB sand disk pen drive, with black color",
//     date: "Sep 30,2025",
//     status: "lost",
//   },
//   {
//     name: "Thermometre",
//     location: "Foculty of engineering",
//     description: "A thermal thermometre, with a broken glass",
//     date: "Oct 27,2025",
//     status: "found",
//   },
// ];

export const ItemsContainer = ({ className, filters = {} }) => {
  const { bar } = useItemType();
  const { items, loading, error } = useItems(filters);
  return (
    <div
      className={`${className} w-full flex flex-wrap justify-center gap-2.5`}
    >
      {loading
        ? Array.from({ length: 6 }).map((_, i) => <ItemCardSkeleton key={i} />)
        : error
        ? error
        : bar == "lost"
        ? items
            ?.filter((current) => {
              return current.status == "lost";
            })
            .map((current) => (
              <ItemCard
                name={current.name}
                location={current.location}
                date={current.dateReported}
                image={itemImage}
                description={current.description}
                status={current.status}
                id={current._id}
                key={current._id}
              />
            ))
        : items
            ?.filter((current) => {
              return current.status == bar;
            })
            .map((current) => (
              <ItemCard
                name={current.name}
                location={current.location}
                date={current.dateReported}
                image={itemImage}
                description={current.description}
                status={current.status}
                id={current._id}
                key={current._id}
              />
            ))}
    </div>
  );
};
