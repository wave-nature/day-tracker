import React, { useState } from "react";
import { Doughnut, Pie } from "react-chartjs-2";

const colors = [
  "#e6194b",
  "#3cb44b",
  "#ffe119",
  "#4363d8",
  "#f58231",
  "#911eb4",
  "#46f0f0",
  "#f032e6",
  "#bcf60c",
  "#fabebe",
  "#008080",
  "#e6beff",
  "#9a6324",
  "#fffac8",
  "#800000",
  "#aaffc3",
  "#808000",
  "#ffd8b1",
  "#000075",
  "#808080",
  "#ffffff",
  "#000000",
  "#9400D3",
  "#808080",
  "#ADFF2F",
  "#B8860B",
];

const Vivek = ({ cols = [], rows = [] }) => {
  const [pie, setPie] = useState(false);
  const [timeline, setTimeline] = useState(-1);
  const frequencyCounter = {};

  const todayRows = rows?.at(timeline)?.c?.slice(1, -1) || []; //[{v:nothing}]

  for (const row of todayRows) {
    const task = (row && row.v) || "sleep";
    frequencyCounter[task] = (frequencyCounter[task] || 0) + 1;
  }
  const keys = Object.keys(frequencyCounter);
  const values = Object.values(frequencyCounter).map(
    (value) => (value / todayRows.length) * 100
  );

  const data = {
    labels: keys,
    datasets: [
      {
        label: "My First Dataset",
        data: values,
        backgroundColor: colors,
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="chart-container">
      <div>
        <button
          onClick={() => setPie((prev) => !prev)}
          className={pie ? "btn pie" : "btn dougnut"}
        >
          {pie ? "Dougnut" : "Pie"}
        </button>
        <span className="ms-3" style={{ fontWeight: "bold" }}>
          {new Date(rows?.at(timeline)?.c[0]?.f || "").toLocaleDateString(
            "en-in",
            {
              month: "long",
              day: "2-digit",
              year: "2-digit",
            }
          )}
        </span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      >
        {!(Math.abs(timeline) === rows.length - 1) && (
          <button
            className="arrow-btn"
            onClick={() =>
              setTimeline((prev) => {
                if (rows.length + prev === 1) return;
                return prev - 1;
              })
            }
          >
            &larr;
          </button>
        )}
        {pie && <Pie datasetIdKey="id" data={data} />}
        {!pie && <Doughnut datasetIdKey="id" data={data} />}
        {timeline < -1 && (
          <button
            onClick={() =>
              setTimeline((prev) => {
                if (prev === -1) return;
                return prev + 1;
              })
            }
            className="arrow-btn"
          >
            &rarr;
          </button>
        )}
      </div>
    </div>
  );
};

export default Vivek;
