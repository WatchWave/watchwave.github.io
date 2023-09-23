import React from 'react';

const Footer = () => {
	return (
		<div className="w-screen py-3 px-3 mt-16">
			<p className="font-poppins text-center text-gray-500">
				Made by <a href="https://lemirq.github.io">Vihaan</a> <span>© {new Date().getFullYear()}</span>
			</p>
		</div>
	);
};

export default Footer;
