import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faHome, faShareAlt, faInfoCircle, faDownload } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import AppContext from '../../model/AppContext';
import './SideMenu.css';

function SideMenu( props ) {

	const { deferredPrompt, promptInstall, appVersion } = useContext( AppContext );

	const isWebShareAPIAvailable = () => {
		return !!navigator.share;
	}


	const shareApp = () => {
		if ( navigator.share ) {
			navigator.share( {
				title: 'My Conditionals App',
				text: 'Check out this awesome app!',
				url: window.location.href,
			} )
				.then( () => console.info( 'Successful share' ) )
				.catch( ( error ) => console.error( 'Error sharing', error ) );
		} else {
			console.info( 'Web Share API not supported' );
		}
	}

	return (
		<div className={`side-menu ${ props.isOpen ? 'open' : '' }`}>

			<div className="menu-header">
				<button onClick={props.toggleMenu} className="close-button">
					<FontAwesomeIcon icon={faTimes} />
				</button>
			</div>

			<div className="menu-item">
				<div className="icon-container">
					<FontAwesomeIcon icon={faHome} style={{ color: '#3498db' }} />
				</div>
				<Link to="/">Home</Link>
			</div>

			{isWebShareAPIAvailable() && (
				<div className="menu-item" onClick={shareApp}>
					<div className="icon-container">
						<FontAwesomeIcon icon={faShareAlt} style={{ color: '#2ecc71' }} />
					</div>
					<span>Share App</span>
				</div>
			)}


			{deferredPrompt && (
				<div className="menu-item" onClick={promptInstall}>
					<div className="icon-container">
						<FontAwesomeIcon icon={faDownload} style={{ color: '#2ecc71' }} />
					</div>
					<span>Install App</span>
				</div>
			)}

			<div className="menu-item">
				<div className="icon-container">
					<FontAwesomeIcon icon={faInfoCircle} style={{ color: '#e67e22' }} />
				</div>
				<Link to="/about">About</Link>
			</div>

			<p className='menu-app-version'>v{appVersion}</p>
		</div>
	);
}

export default SideMenu;
