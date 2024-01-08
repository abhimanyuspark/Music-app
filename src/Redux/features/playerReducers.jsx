import { createSlice } from "@reduxjs/toolkit";
import { getNewSongs, getSearchSongs } from "../services/spotifyApi";

const initialState = {
  currentSongsLoading: false,
  currentSongsError: null,
  currentSongs: [],
  currentIndex: 0,
  isActive: false,
  isPlaying: false,

  loading: false,
  activeSong: {},
  error: null,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setActiveSong: (state, action) => {
      state.currentIndex = action?.payload;
      state.isActive = true;
    },

    playPause: (state, action) => {
      state.isPlaying = action?.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNewSongs.pending, (state) => {
        state.currentSongsLoading = true;
      })
      .addCase(getNewSongs.fulfilled, (state, action) => {
        state.currentSongsLoading = false;
        state.currentSongs = action?.payload;
      })
      .addCase(getNewSongs.rejected, (state, action) => {
        state.currentSongsLoading = false;
        state.currentSongsError = action?.error.message;
      })
      .addCase(getSearchSongs.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSearchSongs.fulfilled, (state, action) => {
        state.loading = false;
        state.activeSong = action?.payload[0];
      })
      .addCase(getSearchSongs.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      });
  },
});

export const { setActiveSong, playPause } = playerSlice.actions;

export default playerSlice.reducer;
