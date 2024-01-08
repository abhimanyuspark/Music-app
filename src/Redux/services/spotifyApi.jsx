import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const id = import.meta.env.VITE_APP_NODE_API;
const url = `https://v1.nocodeapi.com/${id}`;

export const getNewSongs = createAsyncThunk("newSongs", async () => {
  const response = await axios
    .get(`${url}/browse/new`)
    .then(function (response) {
      return response?.data?.albums?.items;
    })
    .catch(function (error) {
      return error;
    });
  return response;
});

export const getSearchSongs = createAsyncThunk(
  "searchSongs",
  async ({ search, track, artists }) => {
    const response = await axios
      .get(`${url}/search?q=${search}&type=${track}`)
      .then(function (response) {
        const data = response?.data?.tracks?.items;
        const filter = data.filter((d) => {
          return d?.artists[0]?.name === artists[0]?.name;
        });
        return filter;
      })
      .catch(function (error) {
        return error;
      });

    return response;
  }
);
