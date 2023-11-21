"use client";
import styles from "../../styles/Home.module.css";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  Sector,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {  useEffect, useState } from "react";
import axios from "axios";
// import dynamic from 'next/dynamic'
 
// const NoSSR = dynamic(() => import('../components/no-ssr'), { ssr: false })
const datacot = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const data2 = [
  { name: "OK", value: 400, label: "A", color: "#00FF7F" },
  { name: "OK", value: 300, label: "B", color: "#FF0000" },
  { name: "OK", value: 300, label: "C", color: "#00FF00" },
  { name: "OK", value: 200, label: "D", color: "#ffffff" },
];

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
    label,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      {/* <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}> */}
        {/* {payload.name} */}
      {/* </text> */}
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={payload.color}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle +3}
        endAngle={endAngle-3}
        innerRadius={outerRadius + 7}
        outerRadius={outerRadius + 12}
        // fill={fill}
        fill={payload.color}

        // fill="none"
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#fff000"
      >{`PV ${label}  ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) }
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#fff000"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};
const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
export default function User() {
  const [activeIndex, setActiveIndex] = useState([0, 1, 2, 3]);
  const [Total_Car, setTotal_Car] = useState("");
  const [Total_Car_Read, setTotal_Car_Read] = useState("");
  const [Total_Car_Unread, setTotal_Car_Unread] = useState("");
  const [Total_Car_Read_Correct, setTotal_Car_Read_Correct] = useState("");
  const [Total_Car_Read_Incorrect, setTotal_Car_Read_Incorrect] = useState("");
  const [Total_Car_Percent, setTotal_Car_Percent] = useState("");
  const [Total_Car_Read_Percent, setTotal_Car_Read_Percent] = useState("");
  const [Total_Car_Unread_Percent, setTotal_Car_Unread_Percent] = useState("");
  const [Total_Car_Read_Correct_Percent, setTotal_Car_Read_Correct_Percent] =
    useState("");
  const [
    Total_Car_Read_Incorrect_Percent,
    setTotal_Car_Read_Incorrect_Percent,
  ] = useState("");
  // const onPieEnter = useCallback(
  //   (_: any, index: SetStateAction<number>) => {
  //     setActiveIndex(index);
  //   },
  //   [setActiveIndex]
  // );



  const  GetData =  async () => {
    const url = "http://192.168.32.65:6969/api/Statistical_All_iParking_System";
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
      var obj = {
        Date: "2023-11-14",
      };
      await  axios
        .post(url, obj, config)
        .then((response) => {
          // if(response.data.length > 0){
            // console.log(response.data);
  
            setTotal_Car(response.data.Total_Car);
            setTotal_Car_Read(response.data.Total_Car_Read);
            setTotal_Car_Unread(response.data.Total_Car_Unread);
            setTotal_Car_Read_Correct(response.data.Total_Car_Read_Correct);
            setTotal_Car_Read_Incorrect(response.data.Total_Car_Read_Incorrect);
            setTotal_Car_Percent(response.data.Total_Car_Percent);
            setTotal_Car_Read_Percent(response.data.Total_Car_Read_Percent);
            setTotal_Car_Unread_Percent(response.data.Total_Car_Unread_Percent);
            setTotal_Car_Read_Correct_Percent(
              response.data.Total_Car_Read_Correct_Percent
            );
            setTotal_Car_Read_Incorrect_Percent(
              response.data.Total_Car_Read_Incorrect_Percent
            );

          // } 
        })
        .finally(() => {});
  };

  // useEffect(() => {
  //   GetData();
  //   const intervalId = setInterval(() => {
  //     GetData();
  //   }, 30000);

  //   return () => clearInterval(intervalId);
  // }, []);

  return (
    <main className={styles.body_card}>
      <div className={styles.title}>DASHBROAD IPARKING</div>
      {/* card thông số */}
      <div className="grid grid-cols-1 xl:grid-cols-7 md:grid-cols-3 lg:grid-cols-4 grid-flow-col ">
        <div className={styles.ring}>
          {Total_Car}
          <div> Total</div>
        </div>
        <div className={styles.ring}>
          null<div>In</div>
        </div>
        <div className={styles.ring}>
          null<div>Out</div>
        </div>
        <div className={styles.ring}>
          {Total_Car_Read}
          <div>recog</div>
        </div>
        <div className={styles.ring}>
          {Total_Car_Unread}
          <div>N-recog</div>
        </div>
        <div className={styles.ring}>
          {Total_Car_Read_Correct}
          <div>Sucess</div>
        </div>
        <div className={styles.ring}>
          {Total_Car_Read_Incorrect}
          <div>Fail</div>
        </div>
      </div>

      <div className="grid grid-cols-3 grid-flow-col mt-12 gap-5 text-center">
        <div className={styles.row_chart}>
          Chart 1 <br />
          <div className={styles.contentchart}>
            <LineChart
              width={550}
              height={400}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="pv"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
          </div>
        </div>
        <div className={styles.row_chart}>
          Chart 2
          <div className={styles.contentchart}>
            <BarChart
              width={550}
              height={400}
              data={datacot}
              margin={{
                top: 10,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pv" stackId="a" fill="#8884d8" />
              <Bar dataKey="amt" stackId="a" fill="#82ca9d" />
              <Bar dataKey="uv" fill="#ffc658" />
            </BarChart>
          </div>
        </div>
        <div className={styles.row_chart}>
          Chart 3
          <div className={styles.contentchart}>
            <PieChart width={900} height={900}>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={data2}
                cx={280}
                cy={150}
                innerRadius={80}
                outerRadius={120}
                fill="#fff000"
                dataKey="value"
                // onMouseEnter={onPieEnter}
              />
            </PieChart>
          </div>
        </div>
      </div>
    </main>
  );
}
