import React, { useEffect, useState, useRef } from "react";
import "./bubbleChart.scss";
import { getCurrentMovies } from "../../helpers/apiCalls";
import Chart from "chart.js/auto";

const BubbleChart = () => {
  const access = localStorage.getItem("access");

  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    (async function () {
      const res = await getCurrentMovies(access, "rent-store/movies/");
      if (res.error) console.log(res.error);
      console.log(res);

      const allMovies = await getCurrentMovies(
        access,
        `rent-store/movies?page_size=${res.count}`
      );

      const filteredYears = allMovies.results.filter(
        (item) => item.pub_date < 2025 && item.pub_date > 1920
      );

      const movieCountByYear = filteredYears.reduce((acc, movie) => {
        const existingYear = acc.find((entry) => entry.x === movie.pub_date);

        if (existingYear) {
          existingYear.r++;
          existingYear.y++;
        } else {
          acc.push({ x: movie.pub_date, y: 1, r: 1 });
        }

        return acc;
      }, []);

      console.log(movieCountByYear);

      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      const myChartRef = chartRef.current.getContext("2d");

      chartInstance.current = new Chart(myChartRef, {
        type: "bubble",
        data: {
          datasets: [
            {
              label: "Movies By year",
              data: movieCountByYear,
              backgroundColor: "rgb(159, 6, 141)",
            },
          ],
        },
      });
    })();
  }, []);

  return (
    <div>
      {" "}
      <div className="chartContainer">
        <canvas ref={chartRef} />
      </div>
    </div>
  );
};

export default BubbleChart;
