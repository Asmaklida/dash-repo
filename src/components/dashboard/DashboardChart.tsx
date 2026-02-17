import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface DashboardChartProps {
  title: string;
  type: "line" | "area" | "bar" | "donut" | "pie";
  series: any[];
  options?: ApexOptions;
  height?: number | string;
}

const DashboardChart: React.FC<DashboardChartProps> = ({
  title,
  type,
  series,
  options = {},
  height = 350,
}) => {
  const defaultOptions: ApexOptions = {
    chart: {
      toolbar: {
        show: false,
      },
      fontFamily: "Inter, sans-serif",
    },
    title: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    grid: {
      borderColor: "#f1f1f1",
      strokeDashArray: 5,
      padding: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
      },
    },
    theme: {
      mode: "light",
    },
    ...options,
  };

  return (
    <div className="rounded-2xl border border-gray-200/50 bg-white p-6 shadow-theme-md dark:border-gray-700/50 dark:bg-gray-dark/80">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-title-sm font-bold text-gray-900 dark:text-white">
          {title}
        </h3>
        <div className="h-1 w-10 rounded-full bg-gradient-to-r from-brand-500 to-purple-600"></div>
      </div>
      <div className="h-full w-full overflow-hidden">
        <ReactApexChart
          options={defaultOptions}
          series={series}
          type={type}
          height={height}
        />
      </div>
    </div>
  );
};

export default DashboardChart;
