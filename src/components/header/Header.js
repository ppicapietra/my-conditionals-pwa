import React from 'react';
import { useState } from 'react';
import logo from '../../assets/images/logo256.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import SideMenu from '../../components/sideMenu/SideMenu';
import './Header.css';

const Header = ( { onMenuClick } ) => {

    const [ isMenuOpen, setIsMenuOpen ] = useState( false );

    const handleMenuClick = () => {
        setIsMenuOpen( !isMenuOpen );
    };

    const toggleMenu = () => {
        setIsMenuOpen( !isMenuOpen );
    };

    return (
        <>
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <FontAwesomeIcon icon={faBars} className="Menu-icon" onClick={handleMenuClick} />
            </header>
            <SideMenu isOpen={isMenuOpen} toggleMenu={toggleMenu} />
        </>
    );
};

export default Header;
