import React, { useState } from 'react';
import Navbar from '../../../shared/components/Client/user-NAV';
import MainLayout from "../../../shared/components/admin/Layout/MainLayout";

function Checkout() {
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('+994');
    const [error, setError] = useState('');
    const [formatMessage, setFormatMessage] = useState('');
    const [errorNumber, setErrorNumber] = useState('');
    const [formatNumber, setFormatNumber] = useState('');

    const addressRegex = /^[a-zA-Z0-9\s,'-]*$/;
    const azerbaijanPhoneRegex = /^\+994-\d{2}-\d{3}-\d{2}-\d{2}$/;

    const handleChange = (e) => {
        const value = e.target.value;
        setAddress(value);

        if (!addressRegex.test(value)) {
            setError("Yanlış adres formatı!");
            setFormatMessage("Örnək format: Ataturk 45 Ganclik Baku");
        } else {
            setError('');
            setFormatMessage('');
        }
    }

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
        if (digits.length > 8) {
            formatted += '-' + digits.substring(5, 7);
        } else if (digits.length > 5) {
            formatted += '-' + digits.substring(5);
        }
        if (digits.length > 10) {
            formatted += '-' + digits.substring(7, 9);
        } else if (digits.length > 8) {
            formatted += '-' + digits.substring(7);
        }

        return formatted;
    };

    const handleChange1 = (event) => {
        let value = event.target.value;

       
        if (!value.startsWith('+994')) {
            value = '+994' + value.replace(/^\+994/, '');
        }

        
        const formattedValue = formatPhoneNumber(value);
        setPhoneNumber(formattedValue);

     
        if (formattedValue === '+994' || formattedValue === '+994-' || azerbaijanPhoneRegex.test(formattedValue)) {
            setErrorNumber('');
            setFormatNumber('');
        } else {
            setErrorNumber("Azerbaycan nömresi girməlisiz!");
            setFormatNumber("Örnək: +994-55-555-55-55");
        }
    };

    return (
        <>
            <MainLayout>
                <div className='px-8 pt-1 pb-[100px]'>
                    <div className='flex flex-row'>
                        <Navbar active={4}/>

                        <div className='w-5/12 mx-5 mt-5 bg-cardColor p-4 bg-rounded-md shadow-md'>
                            <h1 className='text-grayText2 text-2xl font-bold'>Checkout</h1>
                            <div>
                                <label className='text-grayText2 font-bold'>Delivery Address</label>
                            
                                <input 
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={address}
                                    onChange={handleChange}
                                    required
                                    className='w-10/12 h-14 p-5 rounded-md'
                                    placeholder='Atatürk 45 Gençlik Baku' 
                                />
                                
                            </div>
                            {error && <span className='text-mainRed'>{error}</span>}
                            <br />
                            {formatMessage && <span className=' text-green'>{formatMessage}</span>}

                            <div>
                                <label className='text-grayText2 font-bold'>Phone Number</label>
                            
                                <input 
                                    type="text"
                                    id="phoneNumber"
                                    name="number"
                                    value={phoneNumber}
                                    onChange={handleChange1}
                                    required
                                    className='w-10/12 h-14 p-5 rounded-md'
                                    placeholder='+994' 
                                />
                                
                            </div>

                            {errorNumber && <span className=' text-mainRed'>{errorNumber}</span>}
                            <br />
                            {formatNumber && <span className=' text-green'>{formatNumber}</span>}
                        </div>
                    </div>
                </div>
            </MainLayout>
        </>
    );
}

export default Checkout;
