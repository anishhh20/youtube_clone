import React, { useEffect, useState } from "react";
import { abbreviateNumber } from "js-abbreviation-number";
import { Link } from "react-router-dom";
import { BsFillCheckCircleFill } from "react-icons/bs";
import axios from "axios";
import { formatDistanceToNow, parseISO } from "date-fns";

import VideoLength from "../shared/VideoLength";

const VideoCard = ({ video }) => {
  const [videoDetails, setVideoDetails] = useState();
  const [publishedTime, setPublishedTime] = useState(null);

  useEffect(() => {
     const fetchVideoDetails = async () => {
      try {
        if (video?.videoId !== undefined) {
          const apiKey = process.env.REACT_APP_YOUTUBE_KEY;
          const response = await axios.get(
            `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet,statistics&id=${video?.videoId}&key=${apiKey}`
          );
          setVideoDetails(response.data?.items[0]);

          const publishedAt = response.data.items[0]?.snippet?.publishedAt;
          if (publishedAt) {
            const parsedDate = parseISO(publishedAt);
            const formattedTime = formatDistanceToNow(parsedDate, {
              addSuffix: true,
              includeSeconds: false, // to exclude seconds from the output
            roundingMethod: "floor",
            });
            const timeWithoutAbout = formattedTime.replace(/(about|over)\s/, "");
            setPublishedTime(timeWithoutAbout);
          }
        }
      } catch (error) {
        console.error("Error fetching video details:", error);
      }
    };
    fetchVideoDetails();
  }, [video?.videoId]);

  const duration = videoDetails?.contentDetails?.duration;
  const views = videoDetails?.statistics?.viewCount;

  return (
    <Link to={`/video/${video?.videoId}`}>
      <div className="flex flex-col mb-8">
        <div className="relative h-48 md:h-40 md:rounded-xl overflow-hidden">
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
          {duration && (
            <>
              <VideoLength duration={duration} isLive={video?.isLive} />
            </>
          )}
        </div>
        <div className="flex text-white mt-3">
          {/* <div className="flex items-start"> */}
          {/* <div className="flex h-9 w-9 rounded-full overflow-hidden">
              <img
                className="h-full w-full object-cover"
                src={video?.author?.avatar[0]?.url}
                alt="Avatar"
              />
            </div> */}
          {/* </div> */}
          <div className="flex flex-col ml-3 overflow-hidden">
            <span className="text-sm font-bold line-clamp-2">
              {video.title}
            </span>
            <span className="text-[14px] font-semibold mt-2 text-white/[0.7] flex items-center">
              {video?.channelTitle}
              {video?.author?.badges[0]?.type === "VERIFIED_CHANNEL" && (
                <BsFillCheckCircleFill className="text-white/[0.5] text-[12px] ml-1" />
              )}
            </span>
            <div className="flex text-[14px] font-semibold text-white/[0.7] truncate overflow-hidden">
              <span>{`${abbreviateNumber(views, 0)} views`}</span>
              <span className="flex text-[24px] leading-none font-bold text-white/[0.7] relative top-[-10px] mx-1">
                .
              </span>
              <span className="truncat text-[14px] font-semibold">
                {publishedTime}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
