const Footer = () => {
	return (
		<div className="w-screen py-3 px-3 mt-16 fr gap-2">
			<svg className="w-5 h-auto" xmlns="http://www.w3.org/2000/svg" width="145" height="125" viewBox="0 0 145 125">
				<path
					className="fill-gray-500"
					fillRule="evenodd"
					clipRule="evenodd"
					d="M56.0583 56.7265L72.7693 28.9571L95.9812 28.937L56.0312 96.7368L0 0H23.2009L56.0583 56.7265Z"
				/>
				<path
					className="fill-gray-500"
					fillRule="evenodd"
					clipRule="evenodd"
					d="M74.3425 0.917236V20.945ZM74.3425 20.945H110.167L61.3707 104.972L72.9712 125L145 0.917236H74.3425"
				/>
			</svg>
			<p className="font-poppins text-center text-gray-500">
				Curated by <a href="https://lemirq.github.io">Vihaan</a> <span>© {new Date().getFullYear()}</span>
			</p>
		</div>
	);
};

export default Footer;
