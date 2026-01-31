import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import { act } from "react";

export const fetchWeather = createAsyncThunk(
  "weatherApi/fetchWeather",
  async () => {
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather?lat=33.510414&lon=36.278336&appid=1558ee59d5b1692b23fa3be426bbaebe",
      // {
      //   cancelToken: new axios.CancelToken((c) => {
      //     cancelAxios = c;
      //   }),
      // },
    );
    console.log(response);
    // handle success
    const tempResponse = Math.round(response.data.main.temp - 272.15);
    const min = Math.round(response.data.main.temp_min - 272.15);
    const max = Math.round(response.data.main.temp_max - 272.15);
    const description = response.data.weather[0].description;
    const icon = response.data.weather[0].icon;

    return {
      number: tempResponse,
      min,
      max,
      description,
      icon: `https://openweathermap.org/img/wn/${icon}@2x.png`,
    };
  },
);

export const weatherSlice = createSlice({
  name: "weatherApiSlice",
  initialState: {
    weather: "empty",
    isLoading: false,
  },
  reducers: {
    changeWeather: (state, action) => {
      state.weather = "new weather";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchWeather.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.isLoading = false;
        state.weather = action.payload;
      })
      .addCase(fetchWeather.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default weatherSlice.reducer;
export const { changeWeather } = weatherSlice.actions;
