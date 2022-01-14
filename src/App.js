import React, { useState, useEffect } from "react";
import "./App.css";
import { AverageSlider } from "./AverageSlider";
import { CuisineDropdown } from "./CuisineDropdown";
import axios from "axios";
import { BASE_URL } from "./config";
import { RestaurantCard } from "./RestaurantCard";

function App() {
  const [query, setQuery] = useState({ limit: 10, page: 1 });
  const [data, setData] = useState([]);

  const fetchMore = async () => {
    await axios.get(`${BASE_URL}/search`, { params: query }).then((res) => {
      setData((prevData) => {
        return [...prevData, ...res.data.data];
      });
    });
  };

  useEffect(() => {}, [data]);
  useEffect(async () => {
    await axios.get(`${BASE_URL}/search`, { params: query }).then((res) => {
      setData(res.data.data);
      console.log(res.data.data);
    });
  }, [query]);

  return (
    <div className="py-10 w-full min-h-screen bg-purple-100 flex flex-col justify-start items-center">
      <div className="text-6xl text-purple-900 font-bold mt-10">
        {" "}
        Find your taste.
      </div>
      <div className="text-xl text-gray-500 my-4">
        {" "}
        Search for restaurants by name, cuisine, street or rating.{" "}
      </div>
      <div className="w-1/3 h-12 my-1 flex">
        <input
          onChange={(v) =>
            setQuery((oldQuery) => {
              return { ...oldQuery, name: v.target.value, limit: 10, page: 1 };
            })
          }
          className="w-2/3 h-12 shadow-md rounded-md p-2 mr-1"
          placeholder="Type name of restaurant"
        />
        <div className="flex justify-center items-center w-1/3 bg-red rounded-md ml-1">
          {" "}
          <CuisineDropdown
            onChange={(v) =>
              setQuery((oldQuery) => {
                return { ...oldQuery, cuisine: v, limit: 10, page: 1 };
              })
            }
            className="w-full h-full shadow-md p-0 m-0 rounded-md"
            controlClassName="w-full h-full p-0 m-0 rounded-md"
          />
        </div>
      </div>
      <input
        onChange={(v) =>
          setQuery((oldQuery) => {
            return { ...oldQuery, street: v.target.value, limit: 10, page: 1 };
          })
        }
        className="w-1/3 h-12 shadow-md rounded-md mt-1 p-2"
        placeholder="Type location of restaurant"
      />
      <div className="w-full flex justify-center items-center">
        <div className="text-gray-600 mx-6 mt-3">Score</div>
        <AverageSlider
          onChange={(v) =>
            setQuery((oldQuery) => {
              console.log(v);
              return {
                ...oldQuery,
                minAverageGrade: v[0],
                maxAverageGrade: v[1],
              };
            })
          }
        />
      </div>
      {!data && <div> Loading data...</div>}

      <div className="px-32 flex flex-wrap justify-center items-stretch">
        {data &&
          data.map((restaurant) => (
            <RestaurantCard
              key={restaurant._id + restaurant.restaurant_id}
              restaurant={restaurant}
            />
          ))}
      </div>
      <div
        className="bg-purple-900 text-white font-bold px-4 py-2 rounded-md mt-4"
        onClick={() => {
          setQuery((oldQuery) => {
            return { ...oldQuery, page: oldQuery.page + 1 };
          });
          fetchMore();
        }}
      >
        {" "}
        Fetch More{" "}
      </div>
      <div className="flex justify-center items-center mt-10">
        <div className="mx-2"> Limit </div>
        <input
          onChange={(v) =>
            setQuery((oldQuery) => {
              return { ...oldQuery, limit: parseInt(v.target.value) };
            })
          }
          className="w-12 h-12 shadow-md rounded-md p-2 mr-1 text-center"
          value={query.limit}
        />
      </div>
    </div>
  );
}

export default App;
