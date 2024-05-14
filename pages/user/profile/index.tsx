import React from 'react';
import Header from '../../../shared/components/client/Header/Header';
import Nav from '../../../shared/components/client/Nav/Nav';
import Footer from '../../../shared/components/client/Footer/Footer';
import Navbar from '../../../shared/components/Client/user-NAV';

function Profile() {
    return (
        <div>
            <div className=' p-8'>
            <Header/>
            <Navbar active={1}/>
            </div>

            <footer className=' bg-black w-full  h-96'>
                footer
            </footer>
        </div>
    );
}

export default Profile;