import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, CalendarDays } from "lucide-react";
export const ItemCard = ({
  image,
  name,
  description,
  location,
  date,
  status,
}) => {
  return (
    <Card className={`w-60 pr-4 pl-4`}>
      <img src={image} alt="" className="w-full" />
      <h1 className="font-display font-semibold leading-0">{name}</h1>
      <p className="text-[13px] font-sans line-clamp-2">{description}</p>
      <div className="">
        <p className="text-[13px] flex items-center">
          <p>{<MapPin className="text-[13px] text-white fill-blue-800" />} </p>
          <p className="line-clamp-1">{location}</p>
        </p>
        <p className="text-[13px] flex items-center">
          <p>{<CalendarDays className="text-[13px] text-blue-800" />} </p>
          <p>{date}</p>
        </p>
      </div>
      <Button className={""}>
        {status == "lost" ? "Claim" : "Mark as found"}
      </Button>
    </Card>
  );
};
