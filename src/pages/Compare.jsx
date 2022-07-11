import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

const Compare = ({ rakeshRows, vivekRows }) => {
  const labelAndDatasetHandler = (arr) => {
    const data = arr?.map((row) => {
      return { date: row.c.at(0), er: row.c.at(-1) };
    });
    //   console.log(data);
    const xAxis = data.map((data) => data.date.f);
    const yAxis = data.map((data) => data.er.v * 100 || 0);
    return { xAxis, yAxis };
  };

  const vivek = labelAndDatasetHandler(vivekRows);
  const rakesh = labelAndDatasetHandler(rakeshRows);

  return (
    <div className="compare-container">
      <div>
        <Line
          datasetIdKey="id"
          data={{
            labels: vivek.xAxis,
            datasets: [
              {
                id: 1,
                label: "Vivek",
                data: vivek.yAxis,
                borderColor: "#8508fa",
                backgroundColor: "#3f01a3",
              },
              {
                id: 2,
                label: "Rakesh",
                data: rakesh.yAxis,
                borderColor: "#ff7300",
                backgroundColor: "#6e3007",
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

export default Compare;
