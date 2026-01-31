import "./App.css";
import { useEffect, useState } from "react";
import { changeWeather } from "./weatherSlice";
import { useSelector, useDispatch } from "react-redux";
import { fetchWeather } from "./weatherSlice";

// MATERIAL UI COMPONENTS
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import CloudIcon from "@mui/icons-material/Cloud";
import CircularProgress from "@mui/material/CircularProgress";

// import external libraries
import axios from "axios";
import moment from "moment/moment";
import "moment/min/locales";
import { useTranslation } from "react-i18next";
moment.locale("ar");

const theme = createTheme({
  typography: {
    fontFamily: ["BIM"],
  },
});
let cancelAxios = null;

function App() {
  const temp = useSelector((state) => state.weatherApi.weather);
  const isLoading = useSelector((state) => state.weatherApi.isLoading);
  const dispatch = useDispatch();
  // ===== states ====== //
  const { t, i18n } = useTranslation();
  const [locale, setLocale] = useState("ar");
  const [dateAndTime, setDateAndTime] = useState("");

  const direction = locale == "ar" ? "rtl" : "ltr";

  // ===== event handlers ====== //
  function handleTranslation() {
    if (locale == "ar") {
      setLocale("en");
      i18n.changeLanguage("en");
      moment.locale("en");
    } else {
      setLocale("ar");
      i18n.changeLanguage("ar");
      moment.locale("ar");
    }
    setDateAndTime(moment().format("MMMM Do YYYY, h:mm:ss a"));
  }
  useEffect(() => {
    console.log("dispatching fetch weather");
    dispatch(fetchWeather());
    i18n.changeLanguage(locale);
    // dispatch(changeWeather());
  }, []);
  useEffect(() => {
    setDateAndTime(moment().format("MMMM Do YYYY, h:mm:ss a"));
    // axios
    //   .get(
    //     "https://api.openweathermap.org/data/2.5/weather?lat=33.510414&lon=36.278336&appid=1558ee59d5b1692b23fa3be426bbaebe",
    //     {
    //       cancelToken: new axios.CancelToken((c) => {
    //         cancelAxios = c;
    //       }),
    //     },
    //   )
    //   .then(function (response) {
    //     // handle success
    //     const tempResponse = Math.round(response.data.main.temp - 272.15);
    //     const min = Math.round(response.data.main.temp_min - 272.15);
    //     const max = Math.round(response.data.main.temp_max - 272.15);
    //     const description = response.data.weather[0].description;
    //     const icon = response.data.weather[0].icon;

    //     setTemp({
    //       number: tempResponse,
    //       description: description,
    //       min: min,
    //       max: max,
    //       icon: `https://openweathermap.org/img/wn/${icon}@2x.png`,
    //     });
    //     console.log(tempResponse);
    //   })
    //   .catch(function (error) {
    //     // handle error
    //     console.log(error);
    //   });
    // return () => {
    //   console.log("cancelling");
    //   cancelAxios();
    // };
  }, []);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
          {/* CONTENT */}
          <div
            style={{
              height: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            {/* CARD */}
            <div
              dir={direction}
              style={{
                background: "rgb(28 52 91 / 23%)",
                color: "white",
                padding: "10px",
                borderRadius: "15px",
                boxShadow: "0px 11px 1px rgba(0, 0 ,0, 0.05)",
                width: "100%",
              }}
            >
              {/*  CONTENT */}
              <div>
                {/* CITY AND TIME */}
                <div
                  dir={direction}
                  style={{
                    display: "flex",
                    alignItems: "end",
                    justifyContent: "start",
                  }}
                >
                  <Typography
                    variant="h2"
                    style={{ marginRight: "20px", fontWeight: "600" }}
                  >
                    {t("Damascus")}
                  </Typography>
                  <Typography variant="h5" style={{ marginRight: "20px" }}>
                    {dateAndTime}
                  </Typography>
                </div>
                {/* === CITY AND TIME === */}
                <hr />
                {/* CONTAINER OF DEGREE AND CLOUD ICON */}
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  {/* DEGREE & DESCRIPTION */}
                  <div>
                    {/* TEMP */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {isLoading ? (
                        <CircularProgress style={{ color: "white" }} />
                      ) : (
                        ""
                      )}
                      <Typography variant="h1" style={{ textAlign: "right" }}>
                        {temp.number}
                      </Typography>
                      <img src={temp.icon} alt="pic" />
                    </div>
                    {/* === TEMP === */}
                    <Typography variant="h6">{t(temp.description)}</Typography>
                    {/* MIN & MAX TEMP */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <h5>
                        {t("min")}: {temp.min}
                      </h5>
                      <h5 style={{ margin: "0px 5px" }}>|</h5>
                      <h5>
                        {t("max")}: {temp.max}
                      </h5>
                    </div>
                    {/* === MIN & MAX TEMP === */}
                  </div>
                  {/* === DEGREE & DESCRIPTION === */}
                  <CloudIcon style={{ fontSize: "200px", color: "white" }} />
                </div>
                {/* === CONTAINER OF DEGREE AND CLOUD ICON === */}
              </div>

              {/* === CONTENT === */}
            </div>

            {/*===CARD === */}
            {/* TRANSLATION */}
            <div
              dir={direction}
              style={{
                width: "100%",
                marginTop: "20px",
                display: "flex",
                justifyContent: "end",
              }}
            >
              <Button
                style={{
                  color: "white",
                }}
                variant="text"
                onClick={handleTranslation}
              >
                {locale == "ar" ? "انجليزي" : "Arabic"}
              </Button>
            </div>
            {/* === TRANSLATION === */}
          </div>
          {/* === CONTENT === */}
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
