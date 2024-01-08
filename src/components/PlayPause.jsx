import React from "react";
import { FaPause, FaPlay } from "react-icons/fa";

const PlayPause = ({ isPlaying, active, handlePause, handlePlay }) =>
  isPlaying && active ? (
    <FaPause
      size={20}
      color={active ? "white" : "black"}
      onClick={handlePause}
    />
  ) : (
    <FaPlay
      size={20}
      color={active ? "white" : "black"}
      className="ml-1"
      onClick={handlePlay}
    />
  );

export default PlayPause;
