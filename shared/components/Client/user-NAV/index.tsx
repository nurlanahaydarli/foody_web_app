import Image from 'next/image';
import React from 'react';
import Activeprofileicon from '../../../../public/Activeprofile.svg'
import ActiBasketIcon from '../../../../public/activeBasket.svg'
import defBasketIcon from'../../../../public/defaultBasket.svg'
import defPRofileIcon from'../../../../public/defProfile.svg'
import styles from '../user-NAV/Usernav.module.css'
import { useRouter } from 'next/router';
interface PROPs{
    active:number
}
function Navbar(props:PROPs) {
    const {push, pathname} =useRouter()
    let {active} = props
    return (
        <div className={styles.navbar}>
            <div
             className={ active===1? styles.icondiv+ ' '+styles.activediv: styles.icondiv }
             onClick={()=>push('/user/profile')}
             >
                <Image
                src={ active===1? Activeprofileicon:defPRofileIcon}
                alt='Activeprofileicon'
                width={24}
                height={24}
                />
                <h3 className={ active===1? styles.icondiv+ ' '+styles.activeText: styles.defaultText }>Profile</h3>

            </div>
            <div 
            className={ active===2? styles.icondiv+ ' '+styles.activediv: styles.icondiv }
            onClick={()=>push('/user/basket')}
            >
                <Image
                src={active===2?ActiBasketIcon:defBasketIcon}
                alt='defBasketIcon'
                width={24}
                height={24}
                />
                <h3 className={active===2? styles.icondiv+ ' '+styles.activeText: styles.defaultText }>Your Basket</h3>

            </div>
            <div 
            className={active===3? styles.icondiv+ ' '+styles.activediv: styles.icondiv }
            onClick={()=>push('/user/orders')}
            >
                <Image
                src={active===3?ActiBasketIcon:defBasketIcon}
                alt='defBasketIcon'
                width={24}
                height={24}
                />
                <h3 className={active===3? styles.icondiv+ ' '+styles.activeText: styles.defaultText }>Your Orders </h3>

            </div>
            <div
             className={active===4? styles.icondiv+ ' '+styles.activediv: styles.icondiv }
             onClick={()=>push('/user/checkout')}
             >
                <Image
                src={active===4?ActiBasketIcon:defBasketIcon}
                alt='defBasketIcon'
                width={24}
                height={24}
                />
                <h3 className={active===4? styles.icondiv+ ' '+styles.activeText: styles.defaultText }>Checkout</h3>

            </div>
            <div 
            className={active===5? styles.icondiv+ ' '+styles.activediv: styles.icondiv }
            onClick={()=>push('/user/logout')}
            >
                <Image
                src={active===5?ActiBasketIcon:defBasketIcon}
                alt='defBasketIcon'
                width={24}
                height={24}
                />
                <h3 className={active===5? styles.icondiv+ ' '+styles.activeText: styles.defaultText }>Logout</h3>

            </div>
        </div>
    );
}

export default Navbar;