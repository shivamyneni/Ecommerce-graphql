import React from "react";
const Introbg = require("@images/Introbg.jpg");

const Intro = () => {
	return (
		<div className="w-screen sm:w-screen md:w-screen lg:w-screen h-[100vh] xs:h-auto sm:h-auto bg-[#F2F0F1] flex flex-wrap pt-[60px]">
			<div className="xs:w-screen sm:w-screen md:w-[50vw] xs:h-auto sm:h-auto md:h-min-screen lg:h-min-screen lg:w-[50vw] flex flex-col justify-end  pl-[16px] md:pl-[60px] lg:pl-[60px] ">
				<p className="text-[34px] md:text-[64px] lg:text-[64px]  tracking-wide text-start">
					find clothes <br /> that matches
					<br /> your style
				</p>
				<p className="font-inter opacity-60 mt-[16px] mb-[16px] w-[90%] text-start font-light">
					Browse through our diverse range of meticulously crafted
					garments,designed to bring out your individuality andcater to your
					sense of style
				</p>
				<a className="cursor-pointer">
					<div className="bg-black w-fit px-[20px] py-[15px] mt-[10px] rounded-[30px]">
						<p className="text-[white] w-[200px]  font-inter cursor-pointer">
							Shop Now
						</p>
					</div>
				</a>
				<div className="flex flex-row w-[70%] flex-wrap mt-[18px] justify-between items-center mb-[10%]">
					<div className="flex flex-col  ">
						<p className="font-inter font-bold text-[32px] text-start ">200+</p>
						<p className="font-inter text-[12px] text-start opacity-60">
							International Brands
						</p>
					</div>
					<div className="flex flex-col ">
						<p className="font-inter font-bold text-[32px] text-start">2000+</p>
						<p className="font-inter text-[12px] text-start opacity-60">
							High-Quality Products
						</p>
					</div>
					<div className="flex flex-col ">
						<p className="font-inter font-bold text-[32px] text-start">
							30000+
						</p>
						<p className="font-inter text-[12px] text-start opacity-60">
							Happy Customers
						</p>
					</div>
				</div>
			</div>
			<div className="xs:w-screen sm:w-screen md:w-[50vw] xs:h-auto sm:h-auto md:h-min-screen lg:h-min-screen lg:w-[50vw] flex flex-col justify-end  ">
				<img className="w-full " src={Introbg} />
			</div>
		</div>
	);
};

export default Intro;
