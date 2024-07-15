import React from "react";
import Intro from "@containers/Intro";
import Banner from "@containers/Banner";


const Home = () => {
	return (
		<div className="w-[100vw] min-h-screen  font-integralcf">
            <Intro />
            <Banner/>
		</div>
	);
};

export default Home;
