import React, { useState, useEffect } from "react";
import Icon from "../assets/images/e-commerce.png";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GithubAuthProvider,
  GoogleAuthProvider,
} from "firebase/auth";

import { auth } from "../firebase/config";
import { useRef } from "react";
import { ERR0R_CODE } from "../components/Navbar";
import { useRole } from "../context/RoleContext";
import createClaims from "../api/Auth";

import Swal from "sweetalert2";

function Registration() {
  const { isSeller, setIsSeller } = useRole();
  const [role, setRole] = useState("");
  const currentUser = auth.currentUser;

  console.log(isSeller);

  useEffect(() => {
    let value = isSeller ? "Seller" : "Buyer";
    setRole(value);
  }, [isSeller]);

  return (
    <div className="flex gap-3 justify-between mt-10 shadow-2xl w-[65%]  ml-auto mr-auto  rounded-lg h-130 items-center font-[Ubuntu]">
      <div className="flex items-center flex-col  gap-5 p-5">
        <div className="flex flex-col gap-3">
          <h2 className="font-bold text-2xl text-center ">
            Register in <span className="text-[#3E6990]">UrbanFlick</span>
          </h2>
          <section className="flex text-sm gap-1 text-center font-medium">
            <p>
              Register as a <span className="text-blue-500">{role}</span>, Not a
              <span className="text-blue-500"> {role}?</span>
            </p>
            <p
              className="text-red-500 cursor-pointer hover:underline underline-offset-2"
              onClick={() => setIsSeller(!isSeller)}
            >
              Switch Role
            </p>
          </section>
        </div>
        <Icons />
        <h3 className="font-medium text-center">Or</h3>
        <Form isSeller={isSeller} />
      </div>
      <Illustration />
    </div>
  );
}

function Form({ isSeller }) {
  const email_ref = useRef();
  const password_ref = useRef();

  function handleRegistration() {
    register(email_ref.current, password_ref.current, isSeller);
  }
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
              <rect width="20" height="16" x="2" y="4" rx="2"></rect>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
            </g>
          </svg>
          <input
            type="email"
            placeholder="email@site.com"
            required
            ref={email_ref}
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
            ref={password_ref}
          />
        </label>
      </div>
      <div>
        <button
          className="btn btn-neutral w-50 rounded-xl"
          onClick={() => handleRegistration()}
        >
          Sign Up
        </button>
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
  const github_provider = new GithubAuthProvider();
  const google_provider = new GoogleAuthProvider();
  const icons = [
    {
      name: "Github",
      icon: "fa-brands fa-github text-2xl",
      provider: github_provider,
    },

    {
      name: "Google",
      icon: "fa-brands fa-google text-2xl",
      provider: google_provider,
    },
  ];
  return (
    <div className="flex items-center gap-3">
      {icons.map((item) => (
        <IconBox name={item.name} icon={item.icon} provider={item.provider} />
      ))}
    </div>
  );
}

function IconBox({ name, icon, provider }) {
  const { isSeller } = useRole();
  function handleSignIn() {
    signInWithProvider(provider, isSeller);
  }
  return (
    <div className="border border-black/30 p-3  font-[Ubuntu] rounded-xl cursor-pointer">
      <div className=" w-full flex gap-3" onClick={() => handleSignIn()}>
        <i className={icon}></i>
        <p className="font-medium">{name}</p>
      </div>
    </div>
  );
}

function register(gmail, password, isSeller) {
  createUserWithEmailAndPassword(auth, gmail.value, password.value)
    .then((credential) => {
      const user = credential.user;
      const { email } = user;
      //is Seller goes undefined here
      createClaims(user.uid, isSeller);
      showSuccess(email, gmail, password);
    })
    .catch((error) => {
      const code = error.code;

      switch (code) {
        case ERR0R_CODE.INVALID_EMAIL:
          showError("Invalid Email Please use a Valid Email");
          break;

        case ERR0R_CODE.INVALID_CREDENTIALS:
          showError("Invalid Credentials Please check credentials");
          break;
      }
    });
}

function showSuccess(username, emailRef, passwordRef) {
  let timerInterval;
  Swal.fire({
    title: "Registration Successfull!",
    html: `${username} was successfully registered`,
    timer: 2000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
      const timer = Swal.getPopup().querySelector("b");
      timerInterval = setInterval(() => {
        timer.textContent = `${Swal.getTimerLeft()}`;
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    },
  }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
      if (emailRef && passwordRef) {
        emailRef.value = "";
        passwordRef.value = "";
      }
    }
  });
}

function signInWithProvider(provider, isSeller) {
  signInWithPopup(auth, provider).then((credential) => {
    const user = credential.user;
    const { displayName } = user;
    showSuccess(displayName);
  });
}

function showError(error) {
  Swal.fire({
    icon: "error",
    title: "Invalid credentials",
    text: `${error}`,
  });
}

export default Registration;
