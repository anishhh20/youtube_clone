import React, { useContext, useEffect } from "react";

import { Context } from "../context/ContextAPI";
import LeftNav from "./LeftNav";
import VideoCard from "./VideoCard";

const Feed = () => {
  const { loading, searchResults } = useContext(Context);

  useEffect(() => {
    document.getElementById("root").classList.remove("custom-h");
  }, []);

  return (
    <div className="flex flex-row h-[calc(100%-56px)]">
      <LeftNav />
      <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-5">
          {!loading &&
            searchResults &&
            searchResults?.map((item) => {
              {/* {console.log(item)} */}
              {/* if (item?.type !== "video") return false; */}
              return (  
                <VideoCard key={item?.videoId} video={item} />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Feed;
