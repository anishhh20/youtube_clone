import React from "react";
import { HiMiniSignal } from "react-icons/hi2";

const VideoLength = ({ duration, isLive }) => {
  const live = isLive === "live" ? true : false;
  const parseISO8601Duration = (duration) => {
    const match = duration.match(/PT(\d*H)?(\d*M)?(\d*S)?/);

    if (!match) {
      console.error("Invalid duration format:", duration);
      return "00:00:00"; // Return default value for invalid formats
    }

    const hours = parseInt(match[1], 10) || 0;
    const minutes = parseInt(match[2], 10) || 0;
    const seconds = parseInt(match[3], 10) || 0;

    // Conditionally include hours, minutes, and seconds in the formatted string
    const formattedHours =
      hours > 0 ? `${String(hours).padStart(2, "0")}:` : "";
    const formattedMinutes =
      minutes > 0 || hours > 0 ? `${String(minutes).padStart(2, "0")}:` : "";
    const formattedSeconds =
      seconds > 0 || minutes > 0 || hours > 0
        ? `${String(seconds).padStart(2, "0")}`
        : "00";

    return `${formattedHours}${formattedMinutes}${formattedSeconds}`;
  };

  const formatted = parseISO8601Duration(duration);

  return (
    <span
      className={`absolute bottom-2 right-2 py-1 px-2 text-white text-xs rounded-md ${
        live ? "bg-red-700" : "bg-black"
      }`}
    >
      {isLive === "live" ? (
        <div className="flex items-center justify-center gap-1 font-bold">
          <HiMiniSignal size={18} /> <span> LIVE</span>
        </div>
      ) : (
        <>{formatted}</>
      )}
    </span>
  );
};

export default VideoLength;
