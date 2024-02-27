import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { fetchDataFromApi } from "../utils/api";
import { Context } from "../context/ContextAPI";
import LeftNav from "./LeftNav";
import SearchResultVideoCard from "./SearchResultVideoCard";

const SearchResult = () => {
  const [result, setResult] = useState();
  const searchQuery = useParams();
  const { setLoading } = useContext(Context);

  useEffect(() => {
    document.getElementById("root").classList.remove("custom-h");
    fetchSearchResult();
  }, [searchQuery]);

  const fetchSearchResult = async () => {
    try {
      setLoading(true)
      const apiKey = process.env.REACT_APP_YOUTUBE_KEY;
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${searchQuery}&key=${apiKey}`
      );
      console.log(response)
      // setResult(response.data?.items[0]);
      setLoading(false)
    } catch (error) {
      console.error("Error fetching video details:", error);
    }
  };

  return (
    <div className="flex flex-row h-[calc(100%-56px)]">
      <LeftNav />
      <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black">
        <div className="grid grid-cols-1 gap-2 p-5">
          {result?.map((item) => {
            return (
              <SearchResultVideoCard key={item?.id?.videoId} video={item} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
