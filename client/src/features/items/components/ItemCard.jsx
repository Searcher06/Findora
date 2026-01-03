import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatDate } from "@/utils/formatDate";
import { MapPin, CalendarDays } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ItemCard = ({ image, name, description, location, date, id }) => {
  const dateReported = formatDate(date);
  const navigate = useNavigate();

  return (
    <Card className={`w-60 shadow-gray-300 pb-3 flex flex-col`}>
      <div className="w-full pr-4 pl-4 pt-0 flex flex-col gap-2 flex-1">
        {/* Image section */}
        <img src={image} alt={name} className="w-full" />

        {/* Content section with fixed minimum height */}
        <div className="flex flex-col flex-1 min-h-[120px]">
          <h1 className="font-display font-semibold line-clamp-1 mb-1">
            {name}
          </h1>

          {/* Description with consistent height */}
          <div className="min-h-[40px] mb-2">
            <p className="text-[13px] font-sans line-clamp-2 leading-tight">
              {description}
            </p>
          </div>

          {/* Location and date info */}
          <div className="space-y-1">
            <div className="text-[13px] flex items-center">
              <MapPin className="text-[13px] text-white fill-gray-700 flex-shrink-0" />
              <p className="line-clamp-1 pl-1 flex-1">{location}</p>
            </div>
            <div className="text-[13px] flex items-center">
              <CalendarDays className="text-[13px] text-gray-700 flex-shrink-0" />
              <p className="pl-1 flex-1">{dateReported}</p>
            </div>
          </div>
        </div>

        {/* Button at consistent position */}
        <Button
          onClick={() => {
            navigate(`items/${id}`);
          }}
          className="mt-auto"
        >
          view more
        </Button>
      </div>
    </Card>
  );
};
