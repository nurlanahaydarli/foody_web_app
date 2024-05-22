import dynamic from "next/dynamic";
import { useState } from 'react';
import styles from './card.module.css'



export default function ChartCard() {
    return (
        <>
            <div className={styles.card_box}>
                <h3 className={styles.card_title}>title</h3>
                <div className={styles.card_body}>

                </div>
                
            </div>
        </>
    )
}