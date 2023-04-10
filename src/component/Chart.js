import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const Chart = ({ data, year, county, district, submit }) => {
  const barChartRef = useRef(null);
  const pieChartRef = useRef(null);

  useEffect(() => {
    if (submit) {
      const barChart = echarts.init(barChartRef.current);
      const pieChart = echarts.init(pieChartRef.current);
      const datas = data
        .filter((e) => e.site_id === county)
        .filter((e) => e.village === district)[0];

      //柱狀圖
      barChart.setOption({
        title: {
          left: "center",
          text: "人口數統計"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["男性", "女性"],
          bottom: 10,
          left: "center"
        },
        xAxis: {
          type: "category",
          name: "型態",
          data: ["共同生活", "獨立生活"]
        },
        yAxis: {
          type: "value",
          name: "數量"
        },
        series: [
          {
            name: "男性",
            color: "#7D5FB2",
            data: [datas?.household_ordinary_m, datas?.household_single_m],
            type: "bar"
          },
          {
            name: "女性",
            color: "#C29FFF",
            data: [datas?.household_ordinary_f, datas?.household_single_f],
            type: "bar"
          }
        ]
      });

      //圓餅圖
      pieChart.setOption({
        title: {
          text: "戶數統計",
          left: "center"
        },
        tooltip: {
          trigger: "item"
        },
        legend: {
          bottom: 10,
          left: "center"
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",
            color: ["#A3B1FF", "#626EB2"],
            label: {
              show: true,
              formatter(param) {
                return " (" + param.percent + "%)";
              }
            },
            data: [
              { value: datas?.household_ordinary_total, name: "共同生活" },
              { value: datas?.household_single_total, name: "獨立生活" }
            ]
          }
        ]
      });

      return () => {
        barChart.dispose();
        pieChart.dispose();
      };
    }
  }, [data, year, county, district, submit]);

  return (
    <div style={{ margin: "40px 0" }}>
      <div ref={barChartRef} style={{ width: "100%", height: "400px" }}></div>
      <div
        ref={pieChartRef}
        style={{ width: "100%", height: "400px", marginTop: "30px" }}
      ></div>
    </div>
  );
};

export default Chart;
