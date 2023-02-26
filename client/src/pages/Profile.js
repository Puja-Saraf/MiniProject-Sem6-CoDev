/* eslint-disable */
import React from "react";
import maleUser from "../img/profuser.svg";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { api } from "../api";

export default function Profile({ user }) {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const navigate = useNavigate();
  if (!user) {
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <Oval color="#fd2f6e" height={80} width={80} />
      </div>
    );
  }

  if (user.user_id !== cookies["UserId"]) {
    navigate("/");
  }
  const deleteAccount = async () => {
    const params = {
      user_id: cookies["UserId"],
    };
    await api.deleteUser(params);
    removeCookie("UserId");
    removeCookie("AuthToken");
    navigate("/");
    window.location.reload();
  };

  return (
    <div className=" ml-6 mr-6 md:ml-10 md:mr-10 lg:ml-24 lg:mr-24 xl:ml-32 xl:mr-32 mt-28">
      <div className="flex flex-col md:flex-row justify-center items-center">
        <img
          className=" w-64 h-64 md:w-72 md:h-72 lg:w-[19rem] lg:h-[19rem] xl:w-80 xl:h-80 rounded-full"
          src={user.img_url ? user.img_url : maleUser}
          alt="profile pic"
        />
        <div className=" md:ml-8 lg:ml-10">
          <div className="flex flex-col md:flex-row items-center mt-6 md:mt-0">
            <h1 className="text-2xl lg:text-3xl font-bold text-[#fd2f6e]">
              {user.name}
            </h1>
            <div className="flex flex-row md:ml-6">
              <span>
                {user.show_email && (
                  <a
                    className="text-xl lg:text-2xl"
                    href={`mailto:${user.email}`}
                  >
                    <i className="fa-solid fa-envelope text-[#fd2f6e]"></i>
                  </a>
                )}
              </span>
              <span>
                {user.github_verified &&
                  user.github_username.trim().length > 0 && (
                    <a
                      className="text-xl lg:text-2xl ml-3"
                      href={`https://github.com/${user.github_username}`}
                      target="_blank"
                    >
                      <i className="fa-brands fa-github text-[#fd2f6e]"></i>
                    </a>
                  )}
              </span>
            </div>
          </div>
          <h3 className="text-center md:text-left text-base lg:text-lg font-medium">
            {user.professional_title}
          </h3>
          <br />
          <p className="text-sm lg:text-base ml-3 md:ml-0">
            {user.show_dob && (
              <span>
                <i className="fa-solid fa-cake-candles"></i> {user.dob_day}-
                {user.dob_month}-{user.dob_year}
              </span>
            )}
            {user.show_gender && user.gender === "man" && (
              <span>
                <i className="fa-solid fa-mars ml-4"></i> Male
              </span>
            )}
            {user.show_gender && user.gender === "woman" && (
              <span>
                <i className="fa-solid fa-venus ml-4"></i> Female
              </span>
            )}
          </p>
          <p className="ml-3 mr-3 md:ml-0 md:mr-0 mt-2 lg:mt-3 text-sm lg:text-base">
            {user.about}
          </p>
        </div>
      </div>
      <div className=" h-[2px] bg-slate-700 w-[100%] mt-14 opacity-20"></div>
      <div className="grid grid-cols-4 gap-5 md:grid-cols-7 md:gap-10 lg:grid-cols-9 lg:gap-8 xl:grid-cols-11 xl:gap-5 mt-11 ml-10 mr-10">
        {user.skills.map((skill, _index) => {
          const skillImg = require("../../public/img/skills/" +
            skill.key.replace(/ /g, "") +
            ".svg");
          return (
            <span className="tooltip relative" key={_index}>
              <img className="w-[100%] h-[100%]" src={skillImg} alt="skills" />{" "}
              <span className="tooltiptext">{skill.key}</span>
            </span>
          );
        })}
      </div>
      <div className=" h-[2px] bg-slate-700 w-[100%] mt-11 opacity-20"></div>
      {user.github_verified && user.github_username.trim().length > 0 && (
        <div className="flex flex-col mt-12 justify-center items-center">
          <div className="-ml-6 -mr-6 md:ml-0 md:mr-0">
            <img
              src={`https://github-readme-activity-graph.cyclic.app/graph?username=${user.github_username}&bg_color=fff&color=272727&line=fd2f6e&point=fe5740&custom_title=Github%20Contribution%20Graph`}
              alt="Github contribution graph"
            />
          </div>
          <div className=" h-[2px] bg-slate-700 w-[100%] mt-11 opacity-20"></div>
          <img
            className="mt-11"
            src={`https://github-readme-stats.vercel.app/api?username=${user.github_username}&bg_color=fff&border_color=fff&show_icons=true&theme=radical&custom_title=Github%20Stats&icon_color=fd2f6e&text_color=272727`}
            alt="Github stats"
          />
          <div className=" h-[2px] bg-slate-700 w-[100%] mt-11 opacity-20"></div>
        </div>
      )}
      <div className="mt-11 flex flex-row justify-center items-center">
        <button
          className="bg-[#fd2f6e] pt-2 pb-2 pl-4 pr-4 text-white text-lg rounded-full mr-6"
          onClick={() => {
            navigate("/editprofile");
          }}
        >
          Edit Profile
        </button>
        {/* <button
          className="bg-[#fe5740] pt-2 pb-2 pl-4 pr-4 text-white text-lg rounded-full"
          onClick={() => {
            navigate(`/resume/${user.user_id}`);
          }}
        >
          View Resume
        </button> */}
      </div>
      <div className="mt-4 flex justify-center items-center mb-14">
        {/* <button
          className="bg-[#fd2f6e] pt-2 pb-2 pl-4 pr-4 text-white text-lg rounded-full"
          onClick={deleteAccount}
        >
          Delete Account
        </button> */}
      </div>
    </div>
  );
}