import React, { useEffect, useState } from "react";
import { abbreviateNumber } from "js-abbreviation-number";
import { Link } from "react-router-dom";
import { BsFillCheckCircleFill } from "react-icons/bs";
import axios from "axios";
import { formatDistanceToNow, parseISO } from "date-fns";

const SearchResultVideoCard = ({ video }) => {
  // console.log(video)
  return (
    <Link to={`/video/${video?.videoId}`}>
      <div className="flex flex-col md:flex-row mb-8 md:mb-3 lg:hover:bg-white/[0.1] rounded-xl md:p-4 ">
        <div className="relative flex shrink-0 h-48 md:h-28 lg:h-40 xl:h-48 w-full md:w-48 lg:w-64 xl:w-80 rounded-xl bg-slate-800 overflow-hidden">
          <img
            className="h-full w-full object-cover"
            src={
              video?.thumbnail?.maxres?.url ||
              video?.thumbnail?.standard?.url ||
              video?.thumbnail?.high?.url ||
              video?.thumbnail?.default?.url
            }
            alt="Thumnail"
          />
          {/* {duration && (
            <>
              <VideoLength duration={duration} isLive={video?.isLive} />
            </>
          )} */}
        </div>
      </div>
    </Link>
  );
};

export default SearchResultVideoCard;
