import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { playPause, setActiveSong } from "../../Redux/features/playerReducers";
import Controls from "./Controls";
import Player from "./Player";
import Seekbar from "./Seekbar";
import Track from "./Track";
import VolumeBar from "./VolumeBar";
import { getSearchSongs } from "../../Redux/services/spotifyApi";

const MusicPlayer = () => {
  const {
    loading,
    activeSong,
    currentSongs,
    error,
    currentIndex,
    isActive,
    isPlaying,
  } = useSelector((state) => state.player);
  const [duration, setDuration] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [appTime, setAppTime] = useState(0);
  const [volume, setVolume] = useState(0.3);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (activeSong?.length > 0) dispatch(playPause(true));
  }, [currentIndex]);

  const handlePlayPause = () => {
    if (!isActive) return;

    if (isPlaying) {
      dispatch(playPause(false));
    } else {
      dispatch(playPause(true));
    }
  };

  const handleNextSong = async () => {
    await dispatch(playPause(false));
    const index = !shuffle
      ? currentIndex + (1 % currentSongs?.length)
      : Math.floor(Math.random() * currentSongs?.length);
    const song = currentSongs[index];
    const search = song?.name;
    const artists = song?.artists;
    const track = "track";
    await dispatch(getSearchSongs({ search, track, artists }));
    await dispatch(setActiveSong(index));
  };

  const handlePrevSong = async () => {
    const index =
      currentIndex === 0
        ? currentSongs?.length - 1
        : shuffle
        ? Math.floor(Math.random() * currentSongs?.length)
        : currentIndex - 1;

    const song = currentSongs[index];
    const search = song?.name;
    const artists = song?.artists;
    const track = "track";
    await dispatch(getSearchSongs({ search, track, artists }));
    await dispatch(setActiveSong(index));
  };

  return (
    <div className="bg-slate-700 text-white relative sm:px-12 px-8 w-full flex items-center justify-between">
      <Track
        isPlaying={isPlaying}
        isActive={isActive}
        activeSong={activeSong}
        error={error}
      />
      <div className="flex-1 flex flex-col items-center justify-center">
        <Controls
          isPlaying={isPlaying}
          isActive={isActive}
          repeat={repeat}
          setRepeat={setRepeat}
          shuffle={shuffle}
          setShuffle={setShuffle}
          currentSongs={currentSongs}
          handlePlayPause={handlePlayPause}
          handlePrevSong={handlePrevSong}
          handleNextSong={handleNextSong}
          loading={loading}
        />
        <Seekbar
          value={appTime}
          min="0"
          max={duration}
          onInput={(event) => setSeekTime(event.target.value)}
          setSeekTime={setSeekTime}
          appTime={appTime}
        />
        <Player
          activeSong={activeSong}
          volume={volume}
          isPlaying={isPlaying}
          seekTime={seekTime}
          repeat={repeat}
          currentIndex={currentIndex}
          onEnded={handleNextSong}
          onTimeUpdate={(event) => setAppTime(event.target.currentTime)}
          onLoadedData={(event) => setDuration(event.target.duration)}
        />
      </div>
      <VolumeBar
        value={volume}
        min="0"
        max="1"
        onChange={(event) => setVolume(event.target.value)}
        setVolume={setVolume}
      />
    </div>
  );
};

export default MusicPlayer;
