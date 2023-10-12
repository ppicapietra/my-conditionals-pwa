import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AppContext from './model/AppContext';
import Home from './pages/home/Home';
import About from './pages/about/About';

const APP_VERSION = "1.1.0";

function App() {

	const [ deferredPrompt, setDeferredPrompt ] = useState( null );

	const promptInstall = () => {
		if ( deferredPrompt ) {
			deferredPrompt.prompt();
			deferredPrompt.userChoice.then( ( choiceResult ) => {
				if ( choiceResult.outcome === 'accepted' ) {
					console.info( 'User accepted the install prompt' );
				} else {
					console.info( 'User dismissed the install prompt' );
				}
				setDeferredPrompt( null );
			} );
		}
	};


	useEffect( () => {
		const handleEvent = ( e ) => {
			e.preventDefault();
			setDeferredPrompt( e );
		}
		window.addEventListener( 'beforeinstallprompt', handleEvent );
		window.addEventListener('appinstalled', (evt) => {
			setDeferredPrompt(null);
		});

		return () => {
			window.removeEventListener( 'beforeinstallprompt', handleEvent );
		};
	}, [] );


	return (
		<AppContext.Provider value={{ deferredPrompt, promptInstall, appVersion: APP_VERSION }}>
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
					{/* Add other routes as needed */}
				</Routes>
			</Router>
		</AppContext.Provider>
	);
}

export default App;
