import { useLocation } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

const ItemCardHorizontal = ({
  image,
  className = "",
  request,
  requestLoading,
  requestError,
}) => {
  const location = useLocation();

  if (requestLoading) {
    return (
      <div
        className={`flex items-center w-full h-20 gap-3 p-3 rounded-lg border border-gray-100 bg-white ${className}`}
      >
        <Skeleton className="h-16 w-24 rounded-md flex-shrink-0" />
        <div className="flex flex-col flex-1 gap-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
    );
  }

  if (requestError) {
    return (
      <div
        className={`p-3 border border-destructive/50 bg-destructive/10 rounded-lg ${className}`}
      >
        <p className="text-sm text-destructive">{requestError}</p>
      </div>
    );
  }

  const displayClaimerOrFinder = () => {
    if (location.pathname.includes("/verification/questions")) {
      return `Claimer : ${request?.claimerId?.firstName} ${request?.claimerId?.lastName}`;
    } else if (location.pathname.includes("/verification/answers")) {
      return `Finder : ${request?.finderId?.firstName} ${request?.finderId?.lastName}`;
    } else if (location.pathname.includes("/verification/decision")) {
      return `Claimer : ${request?.claimerId?.firstName} ${request?.claimerId?.lastName}`;
    }
  };
  return (
    <div
      className={`flex items-center w-full h-20 gap-3 p-3 rounded-lg 
                 border border-gray-100 
                 bg-white 
                 shadow-sm 
                 hover:shadow-md 
                 hover:border-gray-200 
                 transition-all duration-200
                 hover:translate-y-[-1px] ${className}`}
    >
      <div
        className={`h-16 w-24 rounded-md overflow-hidden border border-gray-100 shadow-xs flex-shrink-0`}
      >
        <img
          src={request?.itemId?.image || image}
          alt="Item Image"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col min-w-0 flex-1">
        <h1 className="font-sans text-sm font-semibold text-gray-900 truncate">
          {request?.itemId?.name}
        </h1>
        <p className="font-sans text-xs text-gray-600 truncate">
          {displayClaimerOrFinder()}
        </p>
      </div>
    </div>
  );
};

export default ItemCardHorizontal;
