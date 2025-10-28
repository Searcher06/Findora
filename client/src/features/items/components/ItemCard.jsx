import { Card } from "@/components/ui/card";
import { MapPin, Calendar1Icon } from "lucide-react";
export const ItemCard = ({ image, name, description, location, date }) => {
  return (
    <Card className={`w-60`}>
      <img src={image} alt="" className="w-full" />
      <h1 className="font-display font-semibold leading-0">{name}</h1>
      <p className="text-[13px] font-sans">{description}</p>
      <div>
        <p className="text-[13px] flex items-center">
          <p>{<MapPin className="text-[13px] text-blue-800" />} </p>
          <p>{location}</p>
        </p>
        <p className="text-[13px] flex items-center">
          <p>{<Calendar1Icon className="text-[13px] text-blue-800" />} </p>
          <p>{date}</p>
        </p>
      </div>
    </Card>
  );
};
