/* eslint-disable */
import React from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import landing1 from "../img/landing1.svg";
import landing2 from "../img/landing2.svg";
import logo from "../img/logo.svg";

export default function LandingPage({ user }) {
  const navigate = useNavigate();

  const handleClick = async () => {
    const res = await api.login();
    console.log(res.data);
  };

  return (
    <div className="snap-y w-full h-[100vh]">
      <div className="h-[100vh] w-full bg-[#FFD9C0] align-middle flex flex-col lg:flex-row items-center justify-center snap-start">
        <img src={landing1} className="h-60 md:h-72 lg:h-96" alt="" />
        <div className="flex flex-col items-center justify-center">
          <img src={logo} className="h-14 lg:h-16 mt-24 lg:mt-0" alt="" />
          <h1 className="text-[#2f2e41] text-4xl font-bold w-3/4 lg:text-5xl mt-4 text-center">
            Welcome to <span className="text-[#fd2f6e]">Co</span>
            <span className="text-[#fe5740]">Dev</span>!
          </h1>
          <p className="text-[#2f2e41] mt-12 text-2xl font-semibold w-2/3 text-center">
            A place to collaborate with fellow developers across the world!!
          </p>
        </div>
      </div>
      <div className="h-[100vh] w-full align-middle flex flex-col lg:flex-row items-center justify-center snap-start">
        <img src={landing2} className="h-44 md:h-60 lg:h-64" alt="" />
        <div className="flex flex-col items-center justify-center lg:w-1/2">
          <div className="flex flex-row mt-16 lg:mt-0 items-center justify-center">
            <img src={logo} className="h-11 lg:h-14" alt="" />
            <p className="text-[#fd2f6e] text-4xl font-bold w-2/3 ml-3 lg:text-5xl">
              Co<span className="text-[#fe5740]">Dev</span>
            </p>
          </div>
          <p className="text-[#2f2e41] text-xl font-semibold w-2/3 mt-6 lg:text-2xl text-center">
            Join us to connect with some of the best developers and collaborate
            to turn your idea into reality!
          </p>
          <button
            onClick={handleClick}
            className="text-white bg-gradient-to-r from-[#fd2f6e] to-[#fe5740] px-6 py-4 rounded-full font-semibold mx-10 w-fit text-2xl my-14 cursor-pointer hover:from-[#FFD9C0] hover:to-[#FFD9C0] hover:text-[#fe5740]"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
