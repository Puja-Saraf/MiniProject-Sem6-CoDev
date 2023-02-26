/* eslint-disable */
import React, { useState } from "react";
// import FileBase from 'react-file-base64';
import Multiselect from "multiselect-react-dropdown";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { api } from "../api";

export default function EditProfile({ user }) {
  const [cookies, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(user);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <Oval color="#fd2f6e" height={80} width={80} />
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData)
    const newOb = {
      user_id: formData.user_id,
      name: formData.name,
      dob_day: formData.dob_day,
      dob_month: formData.dob_month,
      dob_year: formData.dob_year,
      gender: formData.gender,
      img_url: formData.img_url,
      about: formData.about,
      skills: formData.skills,
      professional_title: formData.professional_title,
      years_of_experience: formData.years_of_experience,
      show_email: formData.show_email,
      github_username: formData.github_username,
      show_gender: formData.show_gender,
      show_dob: formData.show_dob,
    };
    const params = {
      user_id: cookies["UserId"],
      token: cookies["AuthToken"],
    };
    try {
      const res = await api.updateUser(newOb, params);
      // console.log(res)
      navigate("/profile");
      window.location.reload();
    } catch (e) {
      console.log(e.response.message);
    }
  };
  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const name = e.target.name;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const addSkill = (e) => {
    console.log(e);
    setFormData((prev) => {
      prev.skills = e;
      return prev;
    });
  };

  return (
    <div className="onboarding bg-[#FFD9C0] bg-opacity-20">
      <h2 className="text-2xl md:text-3xl font-bold text-[#fd2f6e] text-center pt-8 pb-5">
        Edit Profile
      </h2>

      <form
        className="justify-center w-[50%] ml-[25%] md:w-[36%] md:ml-[32%]"
        onSubmit={handleSubmit}
      >
        <section className="flex flex-col">
          <label htmlFor="name" className="mt-2.5 text-start">
            Full Name
          </label>
          <input
            className="p-2 md:p-3 w-[100%] border-[#2f2e41] border-2 rounded-lg mt-2.5 mb-2.5 text-base"
            id="name"
            type="text"
            name="name"
            placeholder="Full Name"
            required={true}
            value={formData.name}
            onChange={handleChange}
          />

          <label htmlFor="professional_title" className="mt-2.5 text-start">
            Professional Title
          </label>
          <input
            className="p-2 md:p-3 mt-2.5 w-[100%] mb-2.5 text-base border-[#2f2e41] border-2 rounded-lg"
            id="professional_title"
            type="text"
            name="professional_title"
            placeholder="Professional Title"
            required={true}
            value={formData.professional_title}
            onChange={handleChange}
          />

          <label htmlFor="years_of_experience" className="mt-2.5 text-start">
            Years of Experience
          </label>
          <input
            className="w-[100%] p-2 md:p-3 mt-2.5 mb-2.5 mr-2.5 text-base border-[#2f2e41] border-2 rounded-lg"
            id="years_of_experience"
            type="number"
            name="years_of_experience"
            placeholder="Years of Experience"
            required={true}
            value={formData.years_of_experience}
            onChange={handleChange}
          />

          <label htmlFor="github_username" className="mt-2.5 text-start">
            Github Username
          </label>
          <input
            className="w-[100%] p-2 md:p-3 mt-2.5 mb-2.5 text-base border-[#2f2e41] border-2 rounded-lg"
            id="github_username"
            type="text"
            name="github_username"
            placeholder="Github Username"
            value={formData.github_username}
            onChange={handleChange}
          />

          <label className="mt-2.5 text-start">Birthday</label>
          <div className="multiple-input-container flex flex-row">
            <input
              className="w-[30%] p-2 md:p-3 mt-2.5 mb-2.5 mr-2.5 text-base border-[#2f2e41] border-2 rounded-lg"
              id="dob_day"
              type="number"
              name="dob_day"
              placeholder="DD"
              required={true}
              value={formData.dob_day}
              onChange={handleChange}
            />

            <input
              className="w-[30%] p-2 md:p-3 mt-2.5 mb-2.5 mr-2.5 text-base border-[#2f2e41] border-2 rounded-lg"
              id="dob_month"
              type="number"
              name="dob_month"
              placeholder="MM"
              required={true}
              value={formData.dob_month}
              onChange={handleChange}
            />

            <input
              className="w-[40%] p-2 md:p-3 mt-2.5 mb-2.5 mr-2.5 text-base border-[#2f2e41] border-2 rounded-lg"
              id="dob_year"
              type="number"
              name="dob_year"
              placeholder="YYYY"
              required={true}
              value={formData.dob_year}
              onChange={handleChange}
            />
          </div>

          <label htmlFor="show-dob" className="mt-7 text-start check-cont">
            Show DOB on my Profile
            <input
              className=""
              id="show-dob"
              type="checkbox"
              name="show_dob"
              onChange={handleChange}
              checked={formData.show_dob}
            />
            <span className="checkmark"></span>
          </label>

          <label className="mt-2.5 text-start">Gender</label>
          <div className="multiple-input-container flex flex-row">
            <input
              className="hidden p-2 md:p-3 mt-2.5 mb-2.5 mr-2 text-base border-[#2f2e41] border-2 rounded-lg"
              id="man-gender-identity"
              type="radio"
              name="gender"
              value="man"
              onChange={handleChange}
              checked={formData.gender === "man"}
            />
            <label
              htmlFor="man-gender-identity"
              className="mt-2.5 mb-2.5 p-2.5 border-gray-400 border-2 rounded-lg mr-2.5 transition-all duration-300 cursor-pointer"
            >
              Man
            </label>
            <input
              className="hidden p-2 md:p-3 mt-2.5 mb-2.5 mr-2 text-base border-[#2f2e41] border-2 rounded-lg"
              id="woman-gender-identity"
              type="radio"
              name="gender"
              value="woman"
              onChange={handleChange}
              checked={formData.gender === "woman"}
            />
            <label
              htmlFor="woman-gender-identity"
              className="mt-2.5 mb-2.5 p-2.5 border-gray-400 border-2 rounded-lg mr-2.5 transition-all duration-300 cursor-pointer"
            >
              Woman
            </label>
            <input
              className="hidden p-2 md:p-3 mt-2.5 mb-2.5 mr-2 text-base border-[#2f2e41] border-2 rounded-lg"
              id="more-gender-identity"
              type="radio"
              name="gender"
              value="other"
              onChange={handleChange}
              checked={formData.gender === "other"}
            />
            <label
              htmlFor="more-gender-identity"
              className="mt-2.5 mb-2.5 p-2.5 border-gray-400 border-2 rounded-lg mr-2.5 transition-all duration-300 cursor-pointer"
            >
              Other
            </label>
          </div>

          <label htmlFor="show-gender" className="mt-7 text-start check-cont">
            Show Gender on my Profile
            <input
              className=""
              id="show-gender"
              type="checkbox"
              name="show_gender"
              onChange={handleChange}
              checked={formData.show_gender}
            />
            <span className="checkmark"></span>
          </label>

          <label htmlFor="show-email" className="mt-5 text-start check-cont">
            Show Email on my Profile
            <input
              className=""
              id="show-email"
              type="checkbox"
              name="show_email"
              onChange={handleChange}
              checked={formData.show_email}
            />
            <span className="checkmark"></span>
          </label>

          <label htmlFor="skills" className="mt-8 text-start">
            Skills
          </label>
          <Multiselect
            displayValue="key"
            className="dropdown"
            groupBy="cat"
            onKeyPressFn={function noRefCheck() {}}
            onRemove={addSkill}
            onSearch={function noRefCheck() {}}
            onSelect={addSkill}
            options={[
              { cat: "Programming Languages", key: "C or C++" },
              { cat: "Programming Languages", key: "Java" },
              { cat: "Programming Languages", key: "Python" },
              { cat: "Programming Languages", key: "Rust" },

              { cat: "Web (Frontend)", key: "HTML5" },
              { cat: "Web (Frontend)", key: "CSS3" },
              { cat: "Web (Frontend)", key: "Javascript" },
              { cat: "Web (Frontend)", key: "ReactJS" },
              { cat: "Web (Frontend)", key: "AngularJS" },
              { cat: "Web (Frontend)", key: "VueJS" },
              { cat: "Web (Frontend)", key: "Typescript" },
              { cat: "Web (Frontend)", key: "TailwindCSS" },
              { cat: "Web (Frontend)", key: "Bootstrap" },

              { cat: "App", key: "ReactNative" },
              { cat: "App", key: "Kotlin" },
              { cat: "App", key: "Flutter" },
              { cat: "App", key: "Swift" },

              { cat: "Backend", key: "NodeJS" },
              { cat: "Backend", key: "ExpressJS" },
              { cat: "Backend", key: "Django" },
              { cat: "Backend", key: "Flask" },
              { cat: "Backend", key: "Php" },

              { cat: "Databases", key: "Firebase" },
              { cat: "Databases", key: "MySQL" },
              { cat: "Databases", key: "MongoDB" },

              { cat: "Web3", key: "Ethereum" },
              { cat: "Web3", key: "Solidity" },
            ]}
            // selectionLimit={6}
            placeholder="Skills"
            style={{
              chips: {
                background: "#fd2f6e",
              },
              searchBox: {
                border: "2px solid #2f2e41",
                borderRadius: "8px",
                padding: "10px",
                marginTop: "0.625rem",
                marginBottom: "0.625rem",
              },
            }}
          />

          <label htmlFor="about" className="mt-2.5 text-start">
            About me
          </label>
          <input
            className="w-[100%] p-2 md:p-3 mt-2.5 mb-2.5 text-base border-[#2f2e41] border-2 rounded-lg"
            id="about"
            type="text"
            name="about"
            required={true}
            placeholder="I like long walks..."
            value={formData.about}
            onChange={handleChange}
          />

          <label htmlFor="img_url" className=" mt-4 mb-2.5 text-start">
            Profile Photo
          </label>
          {/* <FileBase className='mt-2.5 mb-2.5' type="file" multiple={false} onDone={({ base64 }) => setFormData({ ...formData, img_url: base64 })} /> */}
          <input
            className="w-[100%] p-2 md:p-3 mt-2.5 mb-2.5 text-base border-[#2f2e41] border-2 rounded-lg"
            id="img_url"
            type="text"
            name="img_url"
            placeholder="image url"
            value={formData.img_url}
            onChange={handleChange}
          />
          <div className="photo-container w-[100%] mt-2.5 mb-2.5">
            {formData.img_url && (
              <img src={formData.img_url} alt="profile pic preview" />
            )}
          </div>
        </section>

        <button className="text-white bg-gradient-to-r from-[#fd2f6e] to-[#fe5740] px-4 py-2 md:px-6 md:py-3 m-2 rounded-full font-semibold w-fit text-lg md:text-xl cursor-pointer hover:from-[#FFD9C0] hover:to-[#FFD9C0] hover:text-[#fe5740]">
          Submit
        </button>
      </form>
    </div>
  );
}
