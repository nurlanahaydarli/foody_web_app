import React, {useState} from "react";
import ReactApexChart from "react-apexcharts";
import styles from "./card.module.css";
import {useTranslation} from "next-i18next";
export default function LineChart() {

    const [series] = useState([
        {
            name: "Sample Data",
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }])
    const {t} =useTranslation("common")
    const [options] = useState<ApexCharts.ApexOptions>({
        chart: {
            height: 350,
            type: 'line',
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.5
            },
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        }
    });
    return (
        <>
            <div className={styles.card_item}>
                <div className={styles.card_box}>
                    <h3 className={styles.card_title}>{t("Restaurants")}</h3>
                    <ReactApexChart
                        options={options}
                        series={series}
                        type="line"
                        height={350}
                    />
                </div>
            </div>
        </>
    )
}