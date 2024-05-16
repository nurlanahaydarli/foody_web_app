import LogoWeb from "../svg/LogoWeb";
import FbSvg from "../svg/FbSvg";
import TwitterSvg from "../svg/TwitterSvg";
import InstagramSvg from "../svg/InstagramSvg";
import styles from './footer.module.css'

export default function Footer(){
    return(
        <>
            <footer className={styles.footer_container}>
                <div className={styles.footer_box}>
                    <div className="flex flex-col md:flex-row ">
                        <div className="basis-1/3">
                            <div className={styles.footer_left}>
                                <LogoWeb />
                                <p>
                                    Lorem ipsum is placeholder text commonly used in the graphic,
                                </p>
                                <ul className={styles.footer_social}>
                                    <li>
                                        <a href="#" target='_blank'>
                                            <FbSvg/>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" target='_blank'>
                                            <InstagramSvg />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" target='_blank'>
                                            <TwitterSvg />
                                        </a>
                                    </li>

                                </ul>
                            </div>
                        </div>
                        <div className="basis-3/4">
                            <div className="flex flex-col md:flex-row ">
                                <div className="basis-1/3">
                                    <div className={styles.footer_links}>
                                        <ul>
                                            <h4>Popular</h4>
                                            <li>Programming</li>
                                            <li>Books for children</li>
                                            <li>Psychology</li>
                                            <li>Business </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="basis-1/3">
                                    <div className={styles.footer_links}>
                                        <ul>
                                            <h4>Cash</h4>
                                            <li>Delivery</li>
                                            <li>Payment</li>
                                            <li>About the store</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="basis-1/3">
                                    <div className={styles.footer_links}>
                                        <ul>
                                            <h4>Help</h4>
                                            <li>Contacts</li>
                                            <li>Purchase returns</li>
                                            <li>Buyer help</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.terms}>
                        <p>
                            All rights reserved © 2003-2022 Foody TERMS OF USE | Privacy Policy
                        </p>
                    </div>
                </div>
            </footer>
        </>
    )
}