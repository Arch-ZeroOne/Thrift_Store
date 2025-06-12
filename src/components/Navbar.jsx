import React, { use } from "react";
import Logo from "../assets/icons/site-logo.png";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";
import { auth } from "../firebase/config.js";
import {
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRef } from "react";
import { Code } from "firebase/data-connect";

//providers for different sign in types
const google_provider = new GoogleAuthProvider();
const github_provider = new GithubAuthProvider();

export const ERR0R_CODE = {
  INVALID_EMAIL: "auth/invalid-email",
  INVALID_CREDENTIALS: "auth/invalid-credential",
};

function Navbar() {
  return (
    <div className="font-[Ubuntu] flex justify-between p-4 shadow-lg">
      <BrandName />
      <Links />
      <SearchBar />
      <div className="flex gap-10 items-center">
        <AccountDrawer />
        <CartDrawer />
      </div>
    </div>
  );
}

function BrandName() {
  return (
    <div className="flex items-center">
      <img src={Logo} className="h-10" alt="" />
      <h1 className="font-bold ">UrbanFlick</h1>
    </div>
  );
}
function Links() {
  return (
    <div className="list-none flex items-center gap-9 font-medium cursor-pointer">
      <li>Home</li>
      <li>T-Shirts</li>
      <li>Pants</li>
      <li>Shoes</li>
    </div>
  );
}

function SearchBar() {
  return (
    <input type="text" placeholder="Search for a product" className="input" />
  );
}

function CartDrawer() {
  return (
    <div className="font-[Ubuntu]">
      <div className="drawer drawer-end">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label
            htmlFor="my-drawer-4"
            className="drawer-button btn btn-primary"
          >
            <i className="fa-solid fa-cart-shopping text-xl"></i>
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div
            className="menu bg-base-200 text-base-  content min-h-full  p-4 flex-col justify-between"
            style={{
              width: "25rem",
            }}
          >
            <div className="flex flex-col gap-3 ">
              <h1 className="font-bold text-2xl text-center">My Cart</h1>
              <h2 className="font-normal text-xl ml-3">Cart is Empty</h2>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center  justify-around w-full">
                <p className="text-xl">Total</p>
                <p className="text-xl">$0:00</p>
              </div>
              <button className="btn btn-dash btn-primary w-40">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AccountDrawer() {
  const modalRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  function closeModal() {
    modalRef.current.close();
    emailRef.current.value = "";
    passwordRef.current.value = "";
  }

  function showModal() {
    modalRef.current.showModal();
  }
  return (
    <div className="font-[Ubuntu]">
      <button className="btn" onClick={() => showModal()}>
        <i className="fa-solid fa-user text-lg"></i>
      </button>
      <dialog id="my_modal_3" className="modal" ref={modalRef}>
        <div className="modal-box">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => closeModal()}
            >
              ✕
            </button>
          </form>
          <div className="p-3 flex flex-col gap-5">
            <div className="flex justify-center font-[Ubuntu]">
              <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <legend className="font-bold text-2xl text-center">
                  Login
                </legend>

                <label className="font-medium text-lg">Email</label>
                <input
                  type="email"
                  className="input"
                  placeholder="Email"
                  ref={emailRef}
                />

                <label className="text-lg font-medium">Password</label>
                <input
                  type="password"
                  className="input"
                  placeholder="Password"
                  ref={passwordRef}
                />

                <button
                  className="btn btn-neutral mt-4"
                  onClick={() =>
                    signIn(emailRef.current, passwordRef.current, modalRef)
                  }
                >
                  Login
                </button>
              </fieldset>
            </div>
            <div className="flex items-center gap-3 justify-center cursor-pointer">
              <div
                className="flex items-center gap-2"
                onClick={() => ToggleForm(google_provider, modalRef)}
              >
                <i className="fa-brands fa-google text-xl"></i>
                <p className="font-bold">Google</p>
              </div>

              <div
                className="flex items-center gap-2"
                onClick={() => ToggleForm(github_provider, modalRef)}
              >
                <i className="fa-brands fa-github text-xl"></i>
                <p className="font-bold">Github</p>
              </div>
            </div>
            <div className="text-center">
              <p className="font-medium">Dont have an Account?</p>
              <NavLink to="/register">
                <li className="link link-neutral list-none underline-offset-2">
                  Register
                </li>
              </NavLink>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
}

function ToggleForm(provider, modalRef) {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      const { displayName } = user;
      modalRef.current.close();
      showSuccess(displayName);
    })
    .catch((error) => {
      console.log(error);
    });
  return null;
}

function signIn(emailRef, passwordRef, modal) {
  signInWithEmailAndPassword(auth, emailRef.value, passwordRef.value)
    .then((credential) => {
      const user = credential.user;
      const { displayName } = user;
      showSuccess(displayName);
      emailRef.value = "";
      passwordRef.value = "";
    })
    .catch((error) => {
      console.log(error);
      const code = error.code;
      console.log(code);

      switch (code) {
        case ERR0R_CODE.INVALID_EMAIL:
          showError("Invalid Email", modal);
          break;
        case ERR0R_CODE.INVALID_CREDENTIALS:
          showError("Invalid Credentials", modal);
          break;
      }
    });
}

export function showSuccess(displayName) {
  Swal.fire({
    icon: "success",
    title: "Logged in!",
    text: `Welcome Back ${displayName} !!`,
  });
}

export function showError(message, modal) {
  modal.current.close();
  Swal.fire({
    icon: "error",
    title: message,
    text: "User was not found please check your email and password",
  }).then((response) => {
    modal.current.showModal();
  });
}

function closeModal() {}
export default Navbar;
