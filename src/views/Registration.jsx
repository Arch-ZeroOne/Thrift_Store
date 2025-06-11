import React from "react";
import Icon from "../assets/images/e-commerce.png";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useRef } from "react";
function Registration() {
  return (
    <div className="flex gap-3 justify-between mt-10 shadow-2xl w-[60%]  ml-auto mr-auto  rounded-lg h-130 items-center font-[Ubuntu]  ">
      <div className="flex items-center flex-col  gap-5 p-5">
        <div className="flex flex-col gap-3">
          <h2 className="font-bold text-2xl text-center ">
            Register in <span className="text-[#3E6990]">UrbanFlick</span>
          </h2>
          <section className="flex text-sm gap-1 text-center font-medium">
            <p>Register as a Seller, Not a Seller?</p>
            <p className="text-red-500">Switch Role</p>
          </section>
        </div>
        <Icons />
        <h3 className="font-medium text-center">Or</h3>
        <Form />
      </div>
      <Illustration />
    </div>
  );
}

function Form() {
  const email_ref = useRef();
  const password_ref = useRef();
  return (
    <section className="font-[Ubuntu]  flex flex-col items-center gap-5 ">
      <div>
        <label className="input validator">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </g>
          </svg>
          <input
            type="text"
            required
            placeholder="Username"
            minlength="3"
            maxlength="30"
          />
        </label>
      </div>
      <div>
        <label className="input validator">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
              <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
            </g>
          </svg>
          <input
            type="password"
            required
            placeholder="Password"
            minlength="8"
          />
        </label>
      </div>
      <div>
        <button className="btn btn-neutral w-50 rounded-xl">Sign Up</button>
      </div>
    </section>
  );
}

function Illustration() {
  return (
    <div className="h-full ">
      <img className="h-full w-100 " src={Icon}></img>
    </div>
  );
}

function Icons() {
  const icons = [
    {
      name: "Github",
      icon: "fa-brands fa-github text-2xl",
    },

    {
      name: "Google",
      icon: "fa-brands fa-google text-2xl",
    },
  ];
  return (
    <div className="flex items-center gap-3">
      {icons.map((item) => (
        <IconBox name={item.name} icon={item.icon} />
      ))}
    </div>
  );
}

function IconBox({ name, icon }) {
  return (
    <div className="border border-black/30 p-3  font-[Ubuntu] rounded-xl cursor-pointer">
      <div className=" w-full flex gap-3">
        <i className={icon}></i>
        <p className="font-medium">{name}</p>
      </div>
    </div>
  );
}

export default Registration;
