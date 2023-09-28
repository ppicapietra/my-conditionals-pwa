import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AppContext from './model/AppContext';
import Home from './pages/home/Home';
import About from './pages/about/About';

function App() {

	const [ deferredPrompt, setDeferredPrompt ] = useState( null );

	const promptInstall = () => {
		if ( deferredPrompt ) {
			deferredPrompt.prompt();
			deferredPrompt.userChoice.then( ( choiceResult ) => {
				if ( choiceResult.outcome === 'accepted' ) {
					console.log( 'User accepted the install prompt' );
				} else {
					console.log( 'User dismissed the install prompt' );
				}
				setDeferredPrompt( null );
			} );
		}
	};


	useEffect( () => {
		const handleEvent = ( e ) => {
			// Evita que Chrome muestre el aviso
			e.preventDefault();
			// Guarda el evento para usarlo más tarde
			setDeferredPrompt( e );
		}
		window.addEventListener( 'beforeinstallprompt', handleEvent );

		return () => {
			window.removeEventListener( 'beforeinstallprompt', handleEvent );
		};
	}, [] );


	return (
		<AppContext.Provider value={{ deferredPrompt, promptInstall }}>
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
