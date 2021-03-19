import React, { useState, useEffect } from "react"
import { fetchDailyData } from "../../api"
import { Line, Bar } from "react-chartjs-2"
import styles from "./Charts.module.css"

const Chart = ({ data, country }) => {
  const [dailydata, setDailyData] = useState([])
  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData())
    }
    fetchAPI()
  }, [])
  // line chart
  const lineChart = dailydata[0] ? (
    <Line
      data={{
        labels: dailydata.map(({ date }) => date),
        datasets: [
          {
            data: dailydata.map(({ confirmed }) => confirmed),
            label: "Infected",
            borderColor: "#3333ff",
            fill: true,
          },
          {
            data: dailydata.map(({ deaths }) => deaths),
            label: "Deaths",
            borderColor: "red",
            backgroundColor: "rgba(255,0,0,0.5)",
            fill: true,
          },
        ],
      }}
    />
  ) : null
  //Bar chart for specific country
  const barChart = data.confirmed ? (
    <Bar
      data={{
        labels: ["Infected", "Recoverd", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: [
              "rgba(0, 0, 255, 0.5)",
              "rgba(0, 255,  0, 0.5)",
              "rgba(255, 0, 0, 0.5)",
            ],
            data: [
              data.confirmed.value,
              data.recovered.value,
              data.deaths.value,
            ],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: {
          display: true,
          text: `Current state in ${country}`,
        },
      }}
    />
  ) : null

  return (
    <div className={styles.container}>{country ? barChart : lineChart}</div>
  )
}
export default Chart
