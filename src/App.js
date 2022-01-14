import React, { useState, useEffect } from "react";
import "./App.css";
import { AverageSlider } from "./AverageSlider";
import { CuisineDropdown } from "./CuisineDropdown";
import axios from "axios";
import { BASE_URL } from "./config";

function App() {
  const [query, setQuery] = useState({});
  const [data, setData] = useState([]);

  useEffect(async () => {
    console.log(query);
    await axios.get(`${BASE_URL}/search`, { params: query }).then((res) => {
      setData(res.data.data);
      console.log(res.data.data);
    });
  }, [query]);

  return (
    <div className="w-full h-screen bg-purple-100 flex flex-col justify-start items-center">
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
              return { ...oldQuery, name: v.target.value };
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
                return { ...oldQuery, cuisine: v };
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
            return { ...oldQuery, street: v.target.value };
          })
        }
        className="w-1/3 h-12 shadow-md rounded-md mt-1 p-2"
        placeholder="Type location of restaurant"
      />
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
      {!data && <div> Loading data...</div>}
      {data &&
        data.map((restaurant) => (
          <div key={restaurant.name}> {restaurant.name}</div>
        ))}
    </div>
  );
}

export default App;
