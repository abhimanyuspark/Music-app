import React from "react";
import SongsCards from "./SongsCards";
import Loader from "../components/Loader";
import { useSelector } from "react-redux";
import Error from "../components/Error";

const Discover = ({ type }) => {
  const {
    currentSongs,
    currentSongsError,
    currentSongsLoading,
    activeSong,
    isPlaying,
  } = useSelector((state) => state.player);
  const songs = currentSongs;

  if (currentSongsLoading) {
    return <Loader color="white" />;
  }

  if (currentSongsError) {
    return <Error />;
  }

  return (
    <div className="mx-auto max-w-full p-4 sm:p-6 lg:max-w-7xl lg:px-8">
      <h2 className="text-2xl font-bold tracking-tight text-white">
        Discovers {type}
      </h2>
      <div className="mt-6">
        {songs?.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {songs?.map((item, i) => (
              <SongsCards
                songs={item}
                key={i}
                isPlaying={isPlaying}
                activeSong={activeSong}
                i={i}
              />
            ))}
          </div>
        ) : (
          <Error />
        )}
      </div>
    </div>
  );
};

export default Discover;
