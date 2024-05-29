import React, { useReducer, useState } from 'react';
import Navbar from '../../../shared/components/Client/user-NAV';
import MainLayout from "../../../shared/components/admin/Layout/MainLayout";
import paymentIcon from '../../../public/paymentIcon.svg';
import paymentEmpytIcon from '../../../public/paymentEmpytIcon.svg';
import confirmationIcon from '../../../public/confirmationIcon.svg';
import Image from 'next/image';

const initialState = {
    address: '',
    phoneNumber: '+994',
    error: '',
    formatMessage: '',
    errorNumber: '',
    formatNumber: '',
}

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_ADDRESS":
            return { ...state, address: action.payload };
        case "SET_PHONE_NUMBER":
            return { ...state, phoneNumber: action.payload };
        case "SET_ERROR":
            return { ...state, error: action.payload };
        case "SET_FORMAT_MESSAGE":
            return { ...state, formatMessage: action.payload };
        case "SET_ERROR_NUMBER":
            return { ...state, errorNumber: action.payload };
        case "SET_FORMAT_NUMBER":
            return { ...state, formatNumber: action.payload };

        default:
            return state;
    }
}

const addressRegex = /^[a-zA-Z0-9\s,'-]*$/;
const azerbaijanPhoneRegex = /^\+994-(50|51|55|60|70|77|99)-\d{3}-\d{2}-\d{2}$/;

const formatPhoneNumber = (value) => {
    const digits = value.replace(/[^\d]/g, '').substring(3);
    let formatted = '+994';

    if (digits.length > 2) {
        formatted += '-' + digits.substring(0, 2);
    } else {
        formatted += '-' + digits;
    }
    if (digits.length > 5) {
        formatted += '-' + digits.substring(2, 5);
    } else if (digits.length > 2) {
        formatted += '-' + digits.substring(2);
    }
    if (digits.length > 7) {
        formatted += '-' + digits.substring(5, 7);
    } else if (digits.length > 5) {
        formatted += '-' + digits.substring(5);
    }
    if (digits.length > 9) {
        formatted += '-' + digits.substring(7, 9);
    } else if (digits.length > 7) {
        formatted += '-' + digits.substring(7);
    }

    return formatted;
};

function Checkout() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [isRectVisible, setIsRectVisible] = useState(false);
    const [isRectVisible2, setIsRectVisible2] = useState(false);
    const [checkoutComplete, setCheckoutComplete] = useState(false);

    const handleChange = (e) => {
        const value = e.target.value;
        dispatch({ type: "SET_ADDRESS", payload: value });

        if (!addressRegex.test(value)) {
            dispatch({ type: "SET_ERROR", payload: "Yanlış adres formatı!" });
            dispatch({ type: "SET_FORMAT_MESSAGE", payload: "Örnək format: Ataturk 45 Ganclik Baku" });
        } else {
            dispatch({ type: "SET_ERROR", payload: '' });
            dispatch({ type: "SET_FORMAT_MESSAGE", payload: '' });
        }
    }

    const handleChange1 = (event) => {
        let value = event.target.value;

        if (!value.startsWith('+994')) {
            value = '+994' + value.replace(/^\+994/, '');
        }

        const formattedValue = formatPhoneNumber(value);

        dispatch({ type: 'SET_PHONE_NUMBER', payload: formattedValue });

        if (formattedValue === '+994' || formattedValue === '+994-' || azerbaijanPhoneRegex.test(formattedValue)) {
            dispatch({ type: "SET_ERROR_NUMBER", payload: '' });
            dispatch({ type: "SET_FORMAT_NUMBER", payload: '' });
        } else {
            dispatch({ type: "SET_ERROR_NUMBER", payload: "Azerbaycan nömresi girməlisiz!" });
            dispatch({ type: "SET_FORMAT_NUMBER", payload: "Örnək: +994-55-555-55-55" });
        }
    };

    const handleToggle = () => {
        setIsRectVisible2(true);
        setIsRectVisible(false);
    };

    const handleToggle2 = () => {
        setIsRectVisible(true);
        setIsRectVisible2(false);
    };

    const handleCheckout = () => {
        setCheckoutComplete(true);
    };

    return (
        <>
            <MainLayout>
                <div className='px-8 pt-1 pb-[100px]'>
                    <div className='flex flex-row'>
                        <div className="w-1/4">
                            <Navbar active={4} />
                        </div>

                        <div className="w-3/4">
                            {checkoutComplete ? (
                                <div className='w-10/12 ml-5 mt-4 rounded-md bg-cardColor bg-rounded-md shadow-md'>
                                    <div className=' flex justify-center mt-20'>
                                        <Image src={confirmationIcon} />
                                    </div>
                                    <h1 className='flex justify-center text-2xl font-bold text-grayText2'>Your order has been</h1>
                                    <h1 className='flex justify-center text-2xl font-bold text-grayText2'>received</h1>
                                </div>
                            ) : (
                                <>
                                    <div className="flex justify-between">
                                        <div className='w-8/12 mx-5 mt-5 bg-cardColor p-4 bg-rounded-md shadow-md'>
                                            <h1 className='text-grayText2 text-2xl font-bold mt-6 ml-6'>Checkout</h1>

                                            <div className=' mt-6 ml-6'>
                                                <label className='text-grayText2 font-bold'>Delivery Address</label>
                                                <input
                                                    type="text"
                                                    id="address"
                                                    name="address"
                                                    value={state.address}
                                                    onChange={handleChange}
                                                    required
                                                    className='w-11/12 h-14 p-5 rounded-md'
                                                    placeholder='Atatürk 45 Gençlik Baku'
                                                />
                                            </div>
                                            {state.error && <span className='text-mainRed'>{state.error}</span>}
                                            <br/>
                                            {state.formatMessage &&
                                            <span className=' text-green'>{state.formatMessage}</span>}

                                            <label className='text-grayText2 font-bold ml-6'>Phone Number</label>
                                            <div className='ml-6'>
                                                <input
                                                    type="text"
                                                    id="phoneNumber"
                                                    name="number"
                                                    value={state.phoneNumber}
                                                    onChange={handleChange1}
                                                    required
                                                    className='w-11/12 h-14 p-5 rounded-md'
                                                    placeholder='+994'
                                                />
                                            </div>

                                            {state.errorNumber &&
                                            <span className=' text-mainRed'>{state.errorNumber}</span>}
                                            <br/>
                                            {state.formatNumber &&
                                            <span className=' text-green'>{state.formatNumber}</span>}

                                            <h1 className='ml-6 font-bold text-grayText2 '>Payment Method</h1>


                                            <div className="flex ml-6 mt-4">
                                                <button onClick={handleToggle}>
                                                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <rect x="0.5" y="0.5" width="29" height="29" rx="14.5"
                                                              fill="white" stroke="#6FCF97"/>
                                                        {isRectVisible2 &&
                                                        <rect x="8" y="8" width="15" height="15" rx="7.5"
                                                              fill="#6FCF97"/>}
                                                    </svg>
                                                </button>
                                                <h1 className={`ml-2 ${isRectVisible2 ? 'text-textColorGreen' : ''}`}>pay
                                                    at the door</h1>

                                                <button className=' ml-16' onClick={handleToggle2}>
                                                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <rect x="0.5" y="0.5" width="29" height="29" rx="14.5"
                                                              fill="white" stroke="#6FCF97"/>
                                                        {isRectVisible &&
                                                        <rect x="8" y="8" width="15" height="15" rx="7.5"
                                                              fill="#6FCF97"/>}
                                                    </svg>
                                                </button>
                                                <h1 className={`ml-2 ${isRectVisible ? 'text-textColorGreen' : ''}`}>pay
                                                    at the door by credit card</h1>
                                            </div>

                                            

                                            <div className='flex items-center justify-center mt-16'>
                                                <button
                                                    className={`w-11/12 h-11 ${isRectVisible || isRectVisible2 ? 'bg-textColorGreen' : ' bg-overlayColorGreen'} text-white rounded-sm`}
                                                    onClick={handleCheckout}
                                                    disabled={!isRectVisible && !isRectVisible2}
                                                >
                                                    Checkout
                                                </button>
                                            </div>
                                        </div>





                                        <div className=' w-4/12 h-5/6 mt-5 bg-cardColor rounded-md shadow-md'>
                                            <h1 className='flex justify-center text-grayText font-bold mt-5 text-xl'>Your
                                                Order</h1>

                                            <div className='flex p-2'>
                                                <h1 className='font-bold text-2xl text-grayText'>1</h1>

                                                <div className='flex gap-16 ml-2'>
                                                    <h5 className='text-grayText mt-1 text-lg'>x Papa John’s Pizza
                                                        Restaurant</h5>
                                                    <h5 className='mt-1.5 text-lg text-grayText'>$8.00</h5>
                                                </div>
                                            </div>

                                            <div className='flex p-2'>
                                                <h1 className='font-bold text-2xl text-grayText'>2</h1>

                                                <div className='flex gap-52 ml-2'>
                                                    <h5 className='text-grayText mt-1 text-lg'>x Papa Coffee</h5>
                                                    <h5 className='mt-1.5 text-lg text-grayText'>$8.00</h5>
                                                </div>
                                            </div>

                                            <div className='flex p-2'>
                                                <h1 className='font-bold text-2xl text-grayText'>2</h1>

                                                <div className='flex gap-56 ml-2'>
                                                    <h5 className='text-grayText mt-1 text-lg'>x Coca Cola</h5>
                                                    <h5 className='mt-1.5 text-lg text-grayText'>$8.00</h5>
                                                </div>
                                            </div>

                                            <div className='flex p-2'>
                                                <h1 className='font-bold text-2xl text-grayText'>2</h1>

                                                <div className='flex gap-52 ml-2'>
                                                    <h5 className='text-grayText mt-1 text-lg'>x Papa Coffee</h5>
                                                    <h5 className='mt-1.5 text-lg text-grayText'>$8.00</h5>
                                                </div>
                                            </div>

                                            <div className='flex p-2'>
                                                <h1 className='font-bold text-2xl text-grayText'>1</h1>

                                                <div className='flex gap-16 ml-2'>
                                                    <h5 className='text-grayText mt-1 text-lg'>x Papa John’s Pizza
                                                        Restaurant</h5>
                                                    <h5 className='mt-1.5 text-lg text-grayText'>$8.00</h5>
                                                </div>
                                            </div>

                                            <hr className=' mt-8 w-11/12'/>

                                            <div className='flex gap-64 mt-4'>
                                                <h1 className='font-bold text-2xl text-grayText ml-9'>Total</h1>
                                                <h5 className='mt-1 text-xl text-grayText ml-6'>$17.80</h5>
                                            </div>

                                            <h1 className=' mt-7'></h1>

                                        </div>



                                    </div>

                                </>
                            )}
                        </div>
                    </div>
                </div>
            </MainLayout>
        </>
    );
}

export default Checkout;
