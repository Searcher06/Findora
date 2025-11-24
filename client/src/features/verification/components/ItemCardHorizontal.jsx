const ItemCardHorizontal = ({ image, className }) => {
  return (
    <div
      className={`flex items-center w-full h-20 gap-3 ${className} p-3 rounded-lg 
                 border border-gray-100 
                 bg-white 
                 shadow-sm 
                 hover:shadow-md 
                 hover:border-gray-200 
                 transition-all duration-200
                 hover:translate-y-[-1px]`}
    >
      <div
        className={`h-16 w-24 rounded-md overflow-hidden border border-gray-100 shadow-xs`}
      >
        <img
          src={image}
          alt="Item Image"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col">
        <h1 className="font-sans text-sm font-semibold text-gray-900">
          HeadPhones
        </h1>
        <p className="font-sans text-xs text-gray-600">
          Claimer: Courtney Henry
        </p>
      </div>
    </div>
  );
};
export default ItemCardHorizontal;
