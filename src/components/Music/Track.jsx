import React from "react";
import { Link } from "react-router-dom";

const Track = ({ isPlaying, isActive, activeSong, error }) => (
  <div className="flex-1 flex items-center justify-start gap-4">
    <div className={`h-14 w-14 rounded-full overflow-hidden`}>
      {activeSong?.name && (
        <img
          src={activeSong?.album?.images[0]?.url}
          alt="cover"
          className={`${
            isPlaying && isActive ? "animate-[spin_3s_linear_infinite]" : ""
          }`}
        />
      )}
    </div>
    <div className="w-[50%] hidden sm:hidden md:hidden lg:block">
      <p className="truncate text-white font-bold text-lg">
        {activeSong?.name ? activeSong?.name : "No active Song"}
      </p>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <div className="truncate text-gray-300 flex gap-1">
        {activeSong?.artists?.map((d, i) => (
          <p key={i} className="truncate">
            <Link to={`/${d?.name}`}>{d?.name}</Link>,
          </p>
        ))}
      </div>
    </div>
  </div>
);

export default Track;
