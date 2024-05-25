// import {ApexOptions} from "apexcharts";
// import React, {useState} from "react";
// import ReactApexChart from "react-apexcharts";
// import styles from './card.module.css'

// const options: ApexOptions = {
//     colors: ["#3C50E0", "#80CAEE"],
//     chart: {
//         fontFamily: "Satoshi, sans-serif",
//         type: "bar",
//         height: 335,
//         stacked: true,
//         toolbar: {
//             show: false,
//         },
//         zoom: {
//             enabled: false,
//         },
//     },

//     responsive: [
//         {
//             breakpoint: 1536,
//             options: {
//                 plotOptions: {
//                     bar: {
//                         borderRadius: 0,
//                         columnWidth: "25%",
//                     },
//                 },
//             },
//         },
//         {
//             breakpoint: 640,
//             options: {
//                 plotOptions: {
//                    width: '100%'
//                 },
//             },
//         },
//     ],
//     plotOptions: {
//         bar: {
//             horizontal: false,
//             borderRadius: 0,
//             columnWidth: "25%",
//             borderRadiusApplication: "end",
//             borderRadiusWhenStacked: "last",
//         },
//     },
//     dataLabels: {
//         enabled: false,
//     },

//     xaxis: {
//         categories: ["M", "T", "W", "T", "F", "S", "S"],
//     },
//     legend: {
//         position: "top",
//         horizontalAlign: "left",
//         fontWeight: 500,
//         fontSize: "14px",

//         markers: {
//             radius: 99,
//         },
//     },
//     fill: {
//         opacity: 1,
//     },
// };

// interface BarChartState {
//     series: {
//         name: string;
//         data: number[];
//     }[];
// }

// const BarChart: React.FC = () => {
//     const [state, setState] = useState<BarChartState>({
//         series: [
//             {
//                 name: "Sales",
//                 data: [44, 55, 41, 67, 22, 43, 65],
//             },
//             {
//                 name: "Revenue",
//                 data: [13, 23, 20, 8, 13, 27, 15],
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
//                     <h3 className={styles.card_title}>User Count</h3>
//                     <div>
//                         <div id="chartTwo" className="-mb-9 -ml-5">
//                             <ReactApexChart
//                                 options={options}
//                                 series={state.series}
//                                 type="bar"
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

// export default BarChart;