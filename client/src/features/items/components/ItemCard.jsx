/* eslint-disable no-unused-vars */
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
    <Card className={`w-60 shadow-gray-300 pb-3`}>
      <div className="w-full pr-4 pl-4 pt-0 flex flex-col gap-2">
        <img src={image} alt="" className="w-full " />
        <h1 className="font-display font-semibold line-clamp-1">{name}</h1>
        <p className="text-[13px] font-sans line-clamp-2">{description}</p>
        <div className="">
          <div className="text-[13px] flex items-center">
            <p>
              {<MapPin className="text-[13px] text-white fill-gray-700" />}{" "}
            </p>
            <p className="line-clamp-1 pl-1">{location}</p>
          </div>
          <div className="text-[13px] flex items-center">
            <p>{<CalendarDays className="text-[13px] text-gray-700" />} </p>
            <p className="pl-1">{date}</p>
          </div>
        </div>
        <Button className={""}>view more</Button>
      </div>
    </Card>
  );
};
