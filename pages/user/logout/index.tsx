import React from 'react';
import Header from '../../../shared/components/client/Header/Header';
import Navbar from '../../../shared/components/Client/user-NAV';

function Logouth() {
    return (
        <div>
        <div className=' p-8'>
        <Header/>
        <Navbar active={5}/>
        </div>
        
        <footer className=' bg-black w-full  h-96'>
            footer
        </footer>
    </div>
    );
}

export default Logouth;
