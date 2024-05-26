// import { ApexOptions } from "apexcharts";
// import React, { useState } from "react";
// import ReactApexChart from "react-apexcharts";
// import styles from './card.module.css'

// const options: ApexOptions = {
//     legend: {
//         show: false,
//         position: "top",
//         horizontalAlign: "left",
//     },
//     colors: ["#3C50E0", "#80CAEE"],
//     chart: {
//         fontFamily: "Satoshi, sans-serif",
//         height: 335,
//         type: "area",
//         dropShadow: {
//             enabled: true,
//             color: "#623CEA14",
//             top: 10,
//             blur: 4,
//             left: 0,
//             opacity: 0.1,
//         },

//         toolbar: {
//             show: false,
//         },
//     },
//     responsive: [
//         {
//             breakpoint: 1024,
//             options: {
//                 chart: {
//                     height: 300,
//                 },
//             },
//         },
//         {
//             breakpoint: 1366,
//             options: {
//                 chart: {
//                     height: 350,
//                 },
//             },
//         },
//     ],
//     stroke: {
//         width: [2, 2],
//         curve: "straight",
//     },
//     // labels: {
//     //   show: false,
//     //   position: "top",
//     // },
//     grid: {
//         xaxis: {
//             lines: {
//                 show: true,
//             },
//         },
//         yaxis: {
//             lines: {
//                 show: true,
//             },
//         },
//     },
//     dataLabels: {
//         enabled: false,
//     },
//     markers: {
//         size: 4,
//         colors: "#fff",
//         strokeColors: ["#3056D3", "#80CAEE"],
//         strokeWidth: 3,
//         strokeOpacity: 0.9,
//         strokeDashArray: 0,
//         fillOpacity: 1,
//         discrete: [],
//         hover: {
//             size: undefined,
//             sizeOffset: 5,
//         },
//     },
//     xaxis: {
//         type: "category",
//         categories: [
//             "Sep",
//             "Oct",
//             "Nov",
//             "Dec",
//             "Jan",
//             "Feb",
//             "Mar",
//             "Apr",
//             "May",
//             "Jun",
//             "Jul",
//             "Aug",
//         ],
//         axisBorder: {
//             show: false,
//         },
//         axisTicks: {
//             show: false,
//         },
//     },
//     yaxis: {
//         title: {
//             style: {
//                 fontSize: "0px",
//             },
//         },
//         min: 0,
//         max: 100,
//     },
// };

// interface AreaChartState {
//     series: {
//         name: string;
//         data: number[];
//     }[];
// }

// const AreaChart: React.FC = () => {
//     const [state, setState] = useState<AreaChartState>({
//         series: [
//             {
//                 name: "Product One",
//                 data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 45],
//             },

//             {
//                 name: "Product Two",
//                 data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39, 51],
//             },
//         ],
//     });

//     const handleReset = () => {
//         setState((prevState) => ({
//             ...prevState,
//         }));
//     };
//     handleReset;

//     return (
//         <>
//             <div className={styles.card_item}>
//                 <div className={styles.card_box}>
//                     <h3 className={styles.card_title}>Total Amount</h3>
//                     <div>
//                         <div id="chartOne" className="-ml-5">
//                             <ReactApexChart
//                                 options={options}
//                                 series={state.series}
//                                 type="area"
//                                 height={350}
//                                 width={"100%"}
//                             />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default AreaChart;