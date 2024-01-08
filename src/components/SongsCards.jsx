import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSearchSongs } from "../Redux/services/spotifyApi";
import { playPause, setActiveSong } from "../Redux/features/playerReducers";
import PlayPause from "./PlayPause";
import Loader from "./Loader";

const SongsCards = ({ songs, isPlaying, activeSong, i }) => {
  const { images, name, artists } = songs && songs;
  const { loading } = useSelector((state) => state.player);
  const dispatch = useDispatch();
  const active = activeSong?.name === songs?.name;

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = async () => {
    if (songs?.name !== activeSong?.name) {
      const search = songs?.name;
      const artists = songs?.artists;
      const track = "track";
      await dispatch(getSearchSongs({ search, track, artists }));
      await dispatch(setActiveSong(i));
    }
    await dispatch(playPause(true));
  };

  return (
    <div
      className={`rounded-md hover:bg-gray-600 p-3 flex gap-2 flex-col group/item select-none ${
        active ? "bg-gray-500" : "bg-gray-700"
      }`}
    >
      <div className="relative aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none lg:h-50">
        <img
          lazy="loading"
          src={images[0]?.url}
          alt="profile"
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
        <div
          className={`group/play group-hover/item:visible absolute bottom-[5px] right-[5px] rounded-[50%] w-[45px] h-[45px] flex items-center justify-center hover:scale-[1.15] transition-all ${
            active ? "visible bg-green-600" : "invisible bg-white"
          }`}
        >
          {loading ? (
            <Loader size="6" height="100vh" color="green" />
          ) : (
            <PlayPause
              isPlaying={isPlaying}
              active={active}
              handlePause={handlePauseClick}
              handlePlay={handlePlayClick}
            />
          )}
        </div>
      </div>
      <div className="text-white flex gap-1 flex-col font-semibold">
        <h3
          className={`sm:truncate sm:w-44 ${
            active && "text-green-500 font-bold"
          }`}
        >
          <Link className="hover:text-green-500" to={`/${name}`}>
            {name}
          </Link>
        </h3>
        <div>
          {artists !== undefined && artists[0] && (
            <Link
              to={`/${artists[0]?.name}`}
              key={i}
              className="sm:truncate sm:w-44 text-sm hover:text-green-500"
            >
              {artists[0]?.name}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default SongsCards;
