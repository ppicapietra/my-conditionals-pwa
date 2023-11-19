import React, { useContext } from 'react';
import AppContext from '../../model/AppContext';
import Header from '../../components/header/Header';
import './About.css';

function About() {

	const { appVersion } = useContext( AppContext );

	return (
		<div className="App">
			<Header />
			<main className="about-container">
				<p className='about-text'>This application was developed by Pablo Picapietra, with translation assistance from the excellent English teacher Mariela Fernanda Moreno Pazos.</p>
				<div className='about-links'>
					<p><a href="https://github.com/ppicapietra/my-conditionals-pwa" target="_blank" rel="noopener noreferrer">See in GitHub</a></p>
				</div>
				<p className='about-version'>v{appVersion}</p>
			</main>
		</div>
	);
}

export default About;
