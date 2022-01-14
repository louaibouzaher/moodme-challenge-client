import React from "react";

export const RestaurantCard = ({ restaurant }) => {
  const score = "⭐".repeat(restaurant.average);

  return (
    <div className=" w-1/4 flex flex-col justify-start items-start bg-white p-6 rounded-md shadow-md m-2">
      <div className="text-4xl text-purple-900 font-bold">
        {restaurant.name}
      </div>
      <div>
        {" "}
        {restaurant.address?.street}, {restaurant.address?.building}{" "}
      </div>
      <div className="mt-3 border-2 py-1 px-2 border-purple-900 rounded-lg">
        {restaurant.cuisine}
      </div>
      <div className="mt-5 break-all"> {score} </div>
    </div>
  );
};
