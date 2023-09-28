import React from 'react';
import Header from '../../components/header/Header';
import './About.css';

function About() {
	return (
		<div className="App">
			<Header />
			<main className="about-container">
				<div className="about-content">
					<p>This application was created by Pablo Picapietra, with assistance from Mariela Fernanda Moreno Pazos.</p>
					<p><a href="https://github.com/ppicapietra/my-conditionals-pwa" target="_blank" rel="noopener noreferrer">See in GitHub</a></p>
				</div>
			</main>
		</div>
	);
}

export default About;
