"use client";

import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function DashboardLeftGraph() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const barValue = [
    { month: "Jan", revenue: 4000 },
    { month: "Feb", revenue: 3200 },
    { month: "Mar", revenue: 1100 },
    { month: "Apr", revenue: 3500 },
    { month: "May", revenue: 2800 },
    { month: "Jun", revenue: 1200 },
    { month: "Jul", revenue: 4100 },
    { month: "Aug", revenue: 3800 },
    { month: "Sep", revenue: 4300 },
    { month: "Oct", revenue: 1200 },
    { month: "Nov", revenue: 4900 },
    { month: "Dec", revenue: 3100 },
  ];

  return (
    <div>
      <p className='text-xl md:text-2xl border-b border-[#D1CEC6] pb-3 mb-4'>
        Revenue Trend
      </p>
      <div className='w-full h-60 md:h-80 lg:h-186 -ml-8 md:ml-0'>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart
            data={barValue}
            margin={{
              top: isMobile ? 20 : 30,
              right: isMobile ? 5 : 30,
              left: isMobile ? 5 : 0,
              bottom: isMobile ? 15 : 20,
            }}
            barCategoryGap={isMobile ? "7%" : "10%"}>
            <XAxis
              dataKey='month'
              tick={{ fill: "#70706C", fontSize: isMobile ? 10 : 15 }}
              axisLine={{ stroke: "#FFFFFF" }}
            />
            <YAxis
              tick={{ fill: "#70706C", fontSize: isMobile ? 10 : 15 }}
              axisLine={{ stroke: "#FFFFFF" }}
              domain={[0, 6000]}
              label={
                isMobile
                  ? undefined
                  : {
                      angle: -90,
                      position: "insideLeft",
                      fill: "#70706C",
                    }
              }
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "2px solid #D1E3D9",
                borderRadius: "8px",
                padding: "12px 16px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
              formatter={(value: unknown) => [
                `$${typeof value === "number" ? value.toLocaleString() : 0}`,
                "Monthly Revenue",
              ]}
              labelStyle={{ color: "#304C3E", fontWeight: "bold" }}
              itemStyle={{ color: "#619B7F", fontWeight: "500" }}
              wrapperStyle={{ color: "#619B7F" }}
              cursor={{ fill: "rgba(209, 227, 217, 0.3)" }}
            />
            <Bar
              dataKey='revenue'
              fill='#D1E3D9'
              stroke='#D1CEC6'
              strokeWidth={1}
              radius={[7, 7, 0, 0]}
              maxBarSize={isMobile ? 40 : 100}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
