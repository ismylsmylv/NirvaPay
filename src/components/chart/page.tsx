"use client";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import "./style.scss";
// import { dataset } from "../dataset/weather";
import React from "react";
// const dataset = [{ month: "june", band: 200 }];
const dataset = [
  {
    amount: 59,
    month: "Jan",
  },
  {
    amount: 50,
    month: "Feb",
  },
  {
    amount: 47,
    month: "Mar",
  },
  {
    amount: 54,
    month: "Apr",
  },
  {
    amount: 57,
    month: "May",
  },
  {
    amount: 60,
    month: "June",
  },
  {
    amount: 59,
    month: "July",
  },
  {
    amount: 65,
    month: "Aug",
  },
  {
    amount: 51,
    month: "Sept",
  },
  {
    amount: 60,
    month: "Oct",
  },
  {
    amount: 67,
    month: "Nov",
  },
  {
    amount: 61,
    month: "Dec",
  },
];
const valueFormatter = (value: number | null) => `${value}mm`;

const chartSetting = {
  yAxis: [
    {
      // label: "rainfall (mm)",
    },
  ],
  series: [{ dataKey: "amount", label: "Seoul rainfall", valueFormatter }],
  height: 300,
  sx: {
    [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
      transform: "translateX(-10px)",
    },
  },
};

export default function Charts() {
  const tickPlacement = "middle";
  const tickLabelPlacement = "middle";
  return (
    <div style={{ width: "100%" }} className="Charts">
      <BarChart
        dataset={dataset}
        xAxis={[
          {
            scaleType: "band",
            dataKey: "month",
            tickPlacement,
            tickLabelPlacement,
            hideTooltip: true,
          },
        ]}
        {...chartSetting}
      />
    </div>
  );
}
