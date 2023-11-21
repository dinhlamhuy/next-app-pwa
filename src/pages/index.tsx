import styles from "../styles/Home.module.css";
import dynamic from "next/dynamic";

const Recharts = dynamic(
  import("recharts").then((mod) => mod.AreaChart),
  { ssr: false }
);
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
import { useEffect, useState } from "react";
import axios from "axios";
const datacot = [
  {
    name: "Page A",
    correct: 4000,
    incorrect: 2400,
    unreadable: 2400,
  },
  {
    name: "Page B",
    correct: 3000,
    incorrect: 1398,
    unreadable: 2210,
  },
  {
    name: "Page C",
    correct: 2000,
    incorrect: 9800,
    unreadable: 2290,
  },
  {
    name: "Page D",
    correct: 2780,
    incorrect: 3908,
    unreadable: 2000,
  },
  {
    name: "Page E",
    correct: 1890,
    incorrect: 4800,
    unreadable: 2181,
  },
  {
    name: "Page F",
    correct: 2390,
    incorrect: 3800,
    unreadable: 2500,
  },
  {
    name: "Page G",
    correct: 3490,
    incorrect: 4300,
    unreadable: 2100,
  },
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
        startAngle={startAngle + 3}
        endAngle={endAngle - 3}
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
      >{`${label}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1)}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#fff000"
      >
        {`(Rate ${value}%)`}
      </text>
    </g>
  );
};

export default function Home() {
  const [activeIndex, setActiveIndex] = useState([0, 1, 2, 3]);
  const [Total_Car, setTotal_Car] = useState(0);
  const [Total_Car_Read, setTotal_Car_Read] = useState(0);
  const [Total_Car_Unread, setTotal_Car_Unread] = useState(0);
  const [Total_Car_Read_Correct, setTotal_Car_Read_Correct] = useState(0);
  const [Total_Car_Read_Incorrect, setTotal_Car_Read_Incorrect] = useState(0);
  const [Total_Car_In, setTotal_Car_In] = useState(0);
  const [Total_Car_Out, setTotal_Car_Out] = useState(0);
  const [Total_Car_WrongRule, setTotal_Car_WrongRule] = useState(0);
  const [Total_Car_Customer, setTotal_Car_Customer] = useState(0);
  const [Total_Car_Strange, setTotal_Car_Strange] = useState(0);
  const [Total_Car_Lock, setTotal_Car_Lock] = useState(0);
  const [Total_Car_Week, setTotal_Car_Week] = useState<any>([]);
  const [Total_Car_Month, setTotal_Car_Month] = useState<any>([]);
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - 1);
  const formattedDate = currentDate.toISOString().split('T')[0];
  const data2 = [
    // { name: "OK", value: Total_Car_Read_Percent, label: "READABLE", color: "#FF4500"  },
    {
      name: "OK",
      value: parseFloat(((Total_Car_Unread / Total_Car) * 100).toFixed(2)),
      label: "UNREADABLE",
      color: "#FF4500",
    },
    {
      name: "OK",
      value: parseFloat(
        ((Total_Car_Read_Correct / Total_Car) * 100).toFixed(2)
      ),
      label: "CORRECT",
      color: "#00FF02",
    },
    {
      name: "OK",
      value: parseFloat(
        ((Total_Car_Read_Incorrect / Total_Car) * 100).toFixed(2)
      ),
      label: "INCORRECT",
      color: "#FDF5E6",
    },
  ];
  // const onPieEnter = useCallback(
  //   (_: any, index: SetStateAction<number>) => {
  //     setActiveIndex(index);
  //   },
  //   [setActiveIndex]
  // );

  
  const GetData = async () => {
    const url = "http://192.168.32.65:6969/api/Statistical_All_iParking_System";
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    var obj = {
      Date: formattedDate,
    };
    await axios
      .post(url, obj, config)
      .then((response) => {
        setTotal_Car(response.data.Total_Car);
        setTotal_Car_Read(response.data.Total_Car_Read);
        setTotal_Car_Unread(response.data.Total_Car_Unread);
        setTotal_Car_Read_Correct(response.data.Total_Car_Read_Correct);
        setTotal_Car_Read_Incorrect(response.data.Total_Car_Read_Incorrect);
        setTotal_Car_In(response.data.Total_Car_In);
        setTotal_Car_Out(response.data.Total_Car_Out);
        setTotal_Car_WrongRule(response.data.Total_Car_WrongRule);
        setTotal_Car_Customer(response.data.Total_Car_Customer);
        setTotal_Car_Strange(response.data.Total_Car_Strange);
        setTotal_Car_Lock(response.data.Total_Car_Lock);
      })
      .finally(() => {});
  };
  const GetDataWeek = async () => {
    const url = "http://192.168.32.65:6969/api/Statistical_All_iParking_System_Week";
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };


    var obj = {
      Date: formattedDate,
      days:"-6"
    };
    await axios
      .post(url, obj, config)
      .then((response) => {
        setTotal_Car_Week(response.data)
        // console.log(response.data)
      })
      .finally(() => {});
  };
  const GetDataMonth = async () => {
    const url = "http://192.168.32.65:6969/api/Statistical_All_iParking_System_Week";
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };


    var obj = {
      Date: formattedDate,
      days:"-90"
    };
    await axios
      .post(url, obj, config)
      .then((response) => {
        setTotal_Car_Month(response.data)
        // console.log(response.data)
      })
      .finally(() => {});
  };

  useEffect(() => {
    GetData();
    GetDataWeek();
    GetDataMonth();
    const intervalId = setInterval(() => {
      GetData();
      GetDataWeek();
      GetDataMonth();
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      console.log('phay', payload);
      return (

        <div className="custom-tooltip" style={{backgroundColor:"rgba(0, 0, 0, 0.603)"}}>
           <p className="intro">{`${payload[0].payload.name}`}</p>
          <p className="label" style={{ color:`${payload[0].fill}`}}>{`${payload[0].name} : ${payload[0].value}`}</p>
          <p className="label" style={{ color:`${payload[1].fill}`}}>{`${payload[1].name} : ${payload[1].value}`}</p>
          <p className="label" style={{ color:`${payload[2].fill}`}}>{`${payload[2].name} : ${payload[2].value}`}</p>
          
          {/* <p className="intro"></p>
          <p className="desc">Anything you want can be displayed here.</p> */}
        </div>
      );
    }
  
    return null;
  };


  const datamonth = Total_Car_Week.map((item: { Ngay: any; Chinh_Xac: string; K_Chinh_Xac: string; K_Doc_Duoc: string; }) => ({
    name: item.Ngay,
    CORRECT: parseInt(item.Chinh_Xac),
    INCORRECT:parseInt(item.K_Chinh_Xac),
    UNREADABLE:parseInt(item.K_Doc_Duoc),
  }));

  const data= Total_Car_Week.map((item: { Thu: any; Chinh_Xac: string; K_Chinh_Xac: string; K_Doc_Duoc: string; }) => ({
    name: item.Thu,
    CORRECT: parseInt(item.Chinh_Xac),
    INCORRECT:parseInt(item.K_Chinh_Xac),
    UNREADABLE:parseInt(item.K_Doc_Duoc),
  }));
  return (
    <main className={styles.body_card}>
      <div className={styles.title}>DASHBROAD IPARKING</div>
      {/* card thông số */}
      <div className="grid grid-cols-1 xl:grid-cols-7 md:grid-cols-3 lg:grid-cols-4 grid-flow-col ">
        <div className={styles.ring}>
          {Total_Car}
          <div className={styles.namecardcircle}> Total</div>
        </div>
        <div className={styles.ring}>
          {Total_Car_In}<div className={styles.namecardcircle}>In</div>
        </div>
        <div className={styles.ring}>
          {Total_Car_Out}<div className={styles.namecardcircle}>Out</div>
        </div>
        <div className={styles.ring}>
          {Total_Car_Customer}

          {/* <div className={styles.namecardcircle1}>{Total_Car_Read_Correct}/{Total_Car_Read_Incorrect}</div> */}
          <div className={styles.namecardcircle}>GUEST</div>
        </div>
        <div className={styles.ring}>
          {Total_Car_Strange}
          <div className={styles.namecardcircle}>UNKNOW</div>
        </div>
        <div className={styles.ring}>
          {Total_Car_WrongRule}
          <div className={styles.namecardcircle}>W-RULE</div>
        </div>
        <div className={styles.ring}>
          {Total_Car_Lock}
          <div className={styles.namecardcircle}>LOCK</div>
        </div>
      </div>

      <div className="grid grid-cols-3 grid-flow-col mt-12 gap-5 text-center">
        <div className={styles.row_chart}>
          Chart 1 <br />
          <div className={styles.contentchart}>
            <LineChart
              width={550}
              height={400}
              data={datamonth}
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
              <Tooltip content={CustomTooltip}/>
              <Legend />
              <Line
                type="monotone"
                dataKey="CORRECT"
                stroke="#00FF02"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="INCORRECT" stroke="#FDF5E6" />
              <Line type="monotone" dataKey="UNREADABLE" stroke="#FF4500" />
            </LineChart>
          </div>
        </div>
        <div className={styles.row_chart}>
          Chart 2
          <div className={styles.contentchart}>
            <BarChart
              width={550}
              height={400}
              data={data}
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
              <Tooltip content={CustomTooltip} />
              <Legend />
              <Bar dataKey="CORRECT" stackId="a" fill="#00FF02" />
              <Bar dataKey="INCORRECT" stackId="a" fill="#FDF5E6" />
              <Bar dataKey="UNREADABLE" fill="#FF4500" />
            </BarChart>
          </div>
        </div>
        <div className={styles.row_chart}>
          PIE DONUT CHART
          <div className={styles.contentchart}>
            <PieChart width={800} height={800}>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={data2}
                cx={280}
                cy={150}
                innerRadius={70}
                outerRadius={100}
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
