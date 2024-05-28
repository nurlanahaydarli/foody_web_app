import {ApexOptions} from "apexcharts";
import React, {useState} from "react";
import ReactApexChart from "react-apexcharts";
import styles from './card.module.css'

interface DonutChartState {
    series: number[];
}

const options: ApexOptions = {
    chart: {
        fontFamily: "Satoshi, sans-serif",
        type: "donut",
    },
    colors: ["#3C50E0", "#6577F3", "#8FD0EF", "#0FADCF"],
    labels: ["Bir iki doner ", "Mc Donalds", "KFC", "Papa's Jonhs"],
    legend: {
        show: false,
        position: "bottom",
    },

    plotOptions: {
        pie: {
            donut: {
                size: "65%",
                background: "transparent",
            },
        },
    },
    dataLabels: {
        enabled: false,
    },
    responsive: [
        {
            breakpoint: 2600,
            options: {
                chart: {
                    width: 380,
                },
            },
        },
        {
            breakpoint: 640,
            options: {
                chart: {
                    width: 200,
                },
            },
        },
    ],
};

const DonutChart: React.FC = () => {
    const [state, setState] = useState<DonutChartState>({
        series: [65, 34, 12, 56],
    });

    const handleReset = () => {
        setState((prevState) => ({
            ...prevState,
            series: [65, 34, 12, 56],
        }));
    };
    handleReset;

    return (
        <>
            <div className={styles.card_item}>
                <div className={styles.card_box}>
                    <h3 className={styles.card_title}>Orders</h3>
                    <div className="mb-2">
                        <div id="chartThree" className="mx-auto flex justify-center">
                            <ReactApexChart
                                options={options}
                                series={state.series}
                                type="donut"
                                height={330}
                            />
                        </div>
                    </div>

                    <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
                        <div className="w-full px-8 sm:w-1/2">
                            <div className="flex w-full items-center">
                                <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#3C50E0]"></span>
                                <p className="text-[#c7c7c7]">
                                    <span> Bir iki doner </span>
                                    <span> 65% </span>
                                </p>
                            </div>
                        </div>
                        <div className="w-full px-8 sm:w-1/2">
                            <div className="flex w-full items-center">
                                <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#6577F3]"></span>
                                <p className="text-[#c7c7c7]">
                                    <span> MC Donalds </span>
                                    <span> 34% </span>
                                </p>
                            </div>
                        </div>
                        <div className="w-full px-8 sm:w-1/2">
                            <div className="flex w-full items-center">
                                <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#8FD0EF]"></span>
                                <p className="text-[#c7c7c7]">
                                    <span> Papa's Johns </span>
                                    <span> 45% </span>
                                </p>
                            </div>
                        </div>
                        <div className="w-full px-8 sm:w-1/2">
                            <div className="flex w-full items-center">
                                <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#0FADCF]"></span>
                                <p className="text-[#c7c7c7]">
                                    <span> KFC </span>
                                    <span> 12% </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DonutChart;