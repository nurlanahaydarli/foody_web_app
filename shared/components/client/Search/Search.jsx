import styles from './search.module.css'
import RightIcon from "../svg/RightIcon";

export default function Search(){
    return(
        <>
            <div className={styles.search_container}>
                <input type="text" placeholder={'Search'} />
                <div className={styles.search_result} style={{display: 'none'}}>
                    <ul>
                        <li>
                            <img src="/imgs/logo.png" alt=""/>
                            <div>
                                <p>
                                    Mc Donald’s
                                </p>
                                <span>Delicius and fresh</span>
                            </div>
                        </li>
                        <li>
                            <img src="/imgs/logo.png" alt=""/>
                            <div>
                                <p>
                                    Mc Donald’s
                                </p>
                                <span>Delicius and fresh</span>
                            </div>
                        </li>
                        <li>
                            <img src="/imgs/logo.png" alt=""/>
                            <div>
                                <p>
                                    Mc Donald’s
                                </p>
                                <span>Delicius and fresh</span>
                            </div>
                        </li>
                    </ul>
                    <div className={styles.more_btn}>
                        <button >
                            <span>More</span> <RightIcon />
                        </button>
                    </div>

                </div>
            </div>
        </>
    )
}